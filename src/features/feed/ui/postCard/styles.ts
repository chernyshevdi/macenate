import { StyleSheet } from 'react-native';

import { makeStyles } from '@/shared/theme/makeStyles';

export const useFeedPostCardStyles = makeStyles((theme) => ({
  surface: {
    backgroundColor: theme.color.surface,
    paddingVertical: theme.spacing[12],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: theme.spacing[16],
    paddingHorizontal: theme.spacing[16],
    gap: theme.spacing[12],
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.pill,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  coverWrap: {
    position: 'relative',
  },
  body: {
    paddingHorizontal: theme.spacing[16],
  },
  authorText: {
    ...theme.typography.authorName,
    color: theme.color.textPrimary,
  },
  titleText: {
    ...theme.typography.title,
    color: theme.color.textPrimary,
  },
  previewText: {
    ...theme.typography.body,
    color: theme.color.textSecondary,
  },
  previewReadMoreHost: {
    position: 'relative',
    width: '100%',
  },
  previewMeasureSlot: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    opacity: 0.02,
  },
  previewMeasureText: {
    ...theme.typography.body,
    color: theme.color.textSecondary,
  },
  previewShowMorePressable: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing[4],
  },
  previewShowMoreLabel: {
    ...theme.typography.body,
    color: theme.color.sortLink,
  },
  paidOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paidIcon: {
    width: 42,
    height: 42,
  },
  paidTitle: {
    ...theme.typography.bodySemibold,
    textAlign: 'center',
    color: theme.color.surface,
  },
  donationButton: {
    width: '60%',
  },
  skeletonSection: {
    paddingHorizontal: theme.spacing[16],
  },
}));
