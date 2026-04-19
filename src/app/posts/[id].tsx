import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { PostDetailScreen } from '@/features/detailPost/ui/PostDetailScreen';

export default function PostRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <PostDetailScreen postId={String(id)} />;
}
