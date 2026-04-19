import * as SecureStore from 'expo-secure-store';
import { makeAutoObservable, runInAction } from 'mobx';

const TOKEN_KEY = 'mecenate.uuidToken.v1';

function createUuidV4() {
  // RFC4122 v4 (no native crypto; sufficient for this test API bearer token)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (placeholder) => {
    const randomNibble = (Math.random() * 16) | 0;
    const variantNibble = placeholder === 'x' ? randomNibble : (randomNibble & 0x3) | 0x8;
    return variantNibble.toString(16);
  });
}

export class SessionStore {
  token: string | null = null;
  hydrated = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isReady() {
    return this.hydrated && !!this.token;
  }

  async hydrate() {
    const existing = await SecureStore.getItemAsync(TOKEN_KEY);
    if (existing) {
      runInAction(() => {
        this.token = existing;
        this.hydrated = true;
      });
      return;
    }

    const created = createUuidV4();
    await SecureStore.setItemAsync(TOKEN_KEY, created);

    runInAction(() => {
      this.token = created;
      this.hydrated = true;
    });
  }
}

