export class ApiError extends Error {
  code: string;
  status?: number;

  constructor(message: string, opts?: { code?: string; status?: number }) {
    super(message);
    this.name = 'ApiError';
    this.code = opts?.code ?? 'UNKNOWN';
    this.status = opts?.status;
  }
}

type QueryValue = string | number | boolean | null | undefined;

function toQueryString(query?: Record<string, QueryValue>) {
  if (!query) return '';
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    params.append(key, String(value));
  });
  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

export type HttpClient = {
  get<T>(path: string, opts?: { query?: Record<string, QueryValue> }): Promise<T>;
  postJson<T>(path: string, body?: unknown, opts?: { query?: Record<string, QueryValue> }): Promise<T>;
};

export function createHttpClient(opts: { baseUrl: string; getToken: () => string | null }): HttpClient {
  async function request<T>(
    path: string,
    init: RequestInit & { query?: Record<string, QueryValue>; jsonBody?: unknown } = {}
  ) {
    const url = `${opts.baseUrl}${path}${toQueryString(init.query)}`;
    const token = opts.getToken();

    const body =
      init.jsonBody === undefined ? init.body : JSON.stringify(init.jsonBody);

    const res = await fetch(url, {
      ...init,
      body,
      headers: {
        ...(init.headers ?? {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: 'application/json',
        ...(init.jsonBody === undefined ? {} : { 'Content-Type': 'application/json' }),
      },
    });

    const isJson = (res.headers.get('content-type') ?? '').includes('application/json');
    const payload = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

    if (!res.ok) {
      const message =
        (payload && typeof payload === 'object' && 'error' in payload && (payload as any).error?.message) ||
        `HTTP ${res.status}`;
      const code =
        (payload && typeof payload === 'object' && 'error' in payload && (payload as any).error?.code) ||
        'HTTP_ERROR';
      throw new ApiError(message, { code, status: res.status });
    }

    return payload as T;
  }

  return {
    get: (path, options) => request(path, { method: 'GET', query: options?.query }),
    postJson: (path, body, options) => request(path, { method: 'POST', query: options?.query, jsonBody: body }),
  };
}

