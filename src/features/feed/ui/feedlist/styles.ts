import { makeStyles } from '@/shared/theme/makeStyles';

export const useFeedListStyles = makeStyles((theme) => ({
  listHeader: {
    paddingHorizontal: theme.spacing[16],
    paddingTop: theme.spacing[12],
  },
  screen: {
    flex: 1,
    backgroundColor: theme.color.bg,
  },
  skeletonGap: {
    height: theme.spacing[12],
  },
  postRow: {
    marginBottom: theme.spacing[16],
  },
  listScrollSurface: {
    backgroundColor: theme.color.bg,
  },
  footer: {
    paddingVertical: theme.spacing[12],
  },
  footerErrorWrap: {
    marginTop: theme.spacing[12],
    paddingHorizontal: theme.spacing[16],
  },
}));
