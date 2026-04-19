import { Image } from 'expo-image';
import React, { type FC, memo } from 'react';
import { Text, View } from 'react-native';

import type { PostDto } from '@/entities/post/types';
import { useTheme } from '@/shared/theme/ThemeProvider';
import { Button } from '@/shared/ui/Button';
import { SkeletonBlock } from '@/shared/ui/Skeleton/SkeletonBlock';
import { SkeletonGroup } from '@/shared/ui/Skeleton/SkeletonGroup';
import { Spacer } from '@/shared/ui/Spacer';

import paidIcon from '../../../../../../assets/paidIcon.png';

import { useFeedPostCardStyles } from '../styles';

const PAID_CONTENT = 'Платный контент';
const PAID_CONTENT_DESCRIPTION = 'Контент скрыт пользователем.\nДоступ откроется после доната';
const SEND_DONATE = 'Отправить донат';

type Props = {
  post: PostDto;
};

const PaidPostCard: FC<Props> = ({ post }) => {
  const styles = useFeedPostCardStyles();
  const theme = useTheme();

  return (
    <View style={styles.surface}>
      <View style={styles.header}>
        <Image source={{ uri: post.author.avatarUrl }} style={styles.avatar} />
        <Text style={styles.authorText} numberOfLines={1}>
          {post.author.displayName}
        </Text>
      </View>

      <View style={styles.coverWrap}>
        <Image source={{ uri: post.coverUrl }} style={styles.image} blurRadius={40} />
        <View style={styles.paidOverlay}>
          <Image source={paidIcon} style={styles.paidIcon} accessibilityLabel={PAID_CONTENT} />
          <Spacer size={8} />
          <Text style={styles.paidTitle}>{PAID_CONTENT_DESCRIPTION}</Text>
          <Spacer size={12} />
          <Button title={SEND_DONATE} style={styles.donationButton} />
        </View>
      </View>

      <Spacer size={16} />
      <SkeletonGroup>
        <View style={styles.skeletonSection}>
          <SkeletonBlock width="50%" height={26} radius={theme.radius[22]} />
          <Spacer size={8} />
          <SkeletonBlock width="100%" height={40} radius={theme.radius[22]} />
        </View>
      </SkeletonGroup>
    </View>
  );
};

export default memo(PaidPostCard);
