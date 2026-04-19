import { StyleSheet } from 'react-native';

import { makeStyles } from '@/shared/theme/makeStyles';

export const usePostHeaderStyles = makeStyles((theme) => ({
  headerRoot: {
    paddingHorizontal: theme.spacing[16],
    paddingTop: theme.spacing[12],
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[10],
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.pill,
  },
  authorName: {
    flex: 1,
    ...theme.typography.authorName,
    color: theme.color.textPrimary,
  },
  coverWrap: {
    overflow: 'hidden',
    borderRadius: theme.radius[16],
  },
  cover: {
    width: '100%',
    aspectRatio: 1,
  },
  overlayFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.color.overlay,
  },
  paidOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[16],
  },
  paidCard: {
    width: '100%',
    maxWidth: 360,
    padding: theme.spacing[16],
    alignItems: 'center',
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius[16],
  },
  paidTitle: {
    ...theme.typography.bodySemibold,
    textAlign: 'center',
    color: theme.color.textPrimary,
  },
  paidText: {
    ...theme.typography.meta,
    textAlign: 'center',
    color: theme.color.textSecondary,
  },
  postTitle: {
    ...theme.typography.title,
    color: theme.color.textPrimary,
  },
  postBody: {
    ...theme.typography.body,
    color: theme.color.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: theme.spacing[12],
    paddingVertical: theme.spacing[8],
    backgroundColor: theme.color.bg,
    borderColor: theme.color.border,
  },
  metaPillLikeActive: {
    backgroundColor: theme.color.feedLikeActive,
    borderColor: theme.color.feedLikeActive,
  },
  metaGap10: { width: theme.spacing[10] },
  metaGap12: { width: theme.spacing[12] },
  metaGap8: { width: theme.spacing[8] },
  metaCountText: {
    ...theme.typography.counter,
    color: theme.color.textCounter,
  },
}));
