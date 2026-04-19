import React, { type ReactNode } from 'react';
import { View } from 'react-native';

import { FeedSkeletonItem } from '@/features/feed/ui/skeleton/FeedSkeletonItem';
import { SkeletonGroup } from '@/shared/ui/Skeleton/SkeletonGroup';

import { useFeedListStyles } from './styles';

type Props = {
  listHeader: ReactNode;
};

export default function FeedListSkeleton({ listHeader }: Props) {
  const styles = useFeedListStyles();

  return (
    <View style={styles.screen}>
      {listHeader}
      <SkeletonGroup>
        <FeedSkeletonItem />
        <View style={styles.skeletonGap} />
        <FeedSkeletonItem />
        <View style={styles.skeletonGap} />
        <FeedSkeletonItem />
      </SkeletonGroup>
    </View>
  );
}
