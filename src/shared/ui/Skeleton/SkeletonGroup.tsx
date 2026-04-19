import React, { createContext, useContext, useEffect } from 'react';
import { Easing, type SharedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const SkeletonProgressContext = createContext<SharedValue<number> | null>(null);

export function SkeletonGroup({ children }: { children: React.ReactNode }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1100, easing: Easing.linear }), -1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SkeletonProgressContext.Provider value={progress}>{children}</SkeletonProgressContext.Provider>;
}

export function useSkeletonProgress() {
  const ctx = useContext(SkeletonProgressContext);
  if (!ctx) throw new Error('useSkeletonProgress must be used within SkeletonGroup');
  return ctx;
}

