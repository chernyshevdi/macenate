import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';

import type { PostDto } from '@/entities/post/types';
import { useFeedInfinite } from '@/features/feed/model/useFeedInfinite';
import PostCard from '@/features/feed/ui/postCard';
import { useTheme } from '@/shared/theme/ThemeProvider';
import { ErrorState } from '@/shared/ui/ErrorState';
import { SegmentationTab, type SegmentationTabValue } from '@/features/feed/ui/segmentationTab/SegmentationTab';
import { Spacer } from '@/shared/ui/Spacer';

import FeedListSkeleton from './feedListSkeleton';
import { useFeedListStyles } from './styles';

function FeedList() {
  const styles = useFeedListStyles();
  const theme = useTheme();
  const [tierFilter, setTierFilter] = useState<SegmentationTabValue>('all');
  const [manualRefreshing, setManualRefreshing] = useState(false);

  const feedQuery = useFeedInfinite({
    limit: 20,
    tier: tierFilter === 'all' ? undefined : tierFilter,
  });

  const posts: PostDto[] = useMemo(
    () => feedQuery.data?.pages.flatMap((page) => page.posts) ?? [],
    [feedQuery.data?.pages]
  );

  const listHeader = (
    <View style={styles.listHeader}>
      <SegmentationTab value={tierFilter} onChange={setTierFilter} />
      <Spacer size={12} />
    </View>
  );

  if (feedQuery.isError && posts.length === 0) {
    return (
      <View style={styles.screen}>
        {listHeader}
        <ErrorState onRetry={() => feedQuery.refetch()} />
      </View>
    );
  }

  if (feedQuery.isLoading && posts.length === 0) {
    return <FeedListSkeleton listHeader={listHeader} />;
  }

  return (
    <FlatList
      key={tierFilter}
      contentContainerStyle={styles.listScrollSurface}
      data={posts}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={listHeader}
      renderItem={({ item }) => (
        <View style={styles.postRow}>
          <PostCard post={item} />
        </View>
      )}
      onEndReachedThreshold={0.6}
      onEndReached={() => {
        if (feedQuery.hasNextPage && !feedQuery.isFetchingNextPage) void feedQuery.fetchNextPage();
      }}
      ListFooterComponent={
        <View style={styles.footer}>
          {feedQuery.isFetchingNextPage ? <ActivityIndicator /> : null}
          {feedQuery.isError && posts.length > 0 ? (
            <View style={styles.footerErrorWrap}>
              <ErrorState onRetry={() => feedQuery.refetch()} />
            </View>
          ) : null}
        </View>
      }
      refreshControl={
        <RefreshControl
          refreshing={manualRefreshing}
          onRefresh={async () => {
            setManualRefreshing(true);
            try {
              await feedQuery.refetch();
            } finally {
              setManualRefreshing(false);
            }
          }}
          tintColor={theme.color.textSecondary}
        />
      }
    />
  );
}

export default FeedList;
