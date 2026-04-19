import { makeStyles } from '@/shared/theme/makeStyles';

export const usePostReactionPillsStyles = makeStyles((theme) => ({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[16],
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9999,
    padding: theme.spacing[10],
  },
  pillLikeActive: {
    backgroundColor: theme.color.feedLikeActive,
  },
  pillNeutral: {
    backgroundColor: theme.color.feedPillNeutral,
  },
  likeMetaActive: {
    ...theme.typography.counter,
    color: theme.color.feedLikeActiveContrast,
  },
  metaSecondary: {
    ...theme.typography.counter,
    color: theme.color.textCounter,
  },
}));
