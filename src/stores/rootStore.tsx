import React, { createContext, useContext, useMemo } from 'react';

import { SessionStore } from './sessionStore';

export class RootStore {
  session = new SessionStore();
}

const RootStoreContext = createContext<RootStore | null>(null);

export function RootStoreProvider({
  children,
  store,
}: {
  children: React.ReactNode;
  store: RootStore;
}) {
  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>;
}

export function useRootStore(): RootStore {
  const ctx = useContext(RootStoreContext);
  if (!ctx) throw new Error('useRootStore must be used within RootStoreProvider');
  return ctx;
}

export function useCreateRootStore() {
  return useMemo(() => new RootStore(), []);
}

