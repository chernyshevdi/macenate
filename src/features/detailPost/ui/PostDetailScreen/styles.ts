import { StyleSheet } from 'react-native';

import { makeStyles } from '@/shared/theme/makeStyles';

export const usePostDetailScreenStyles = makeStyles((theme) => ({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenRoot: {
    flex: 1,
    backgroundColor: theme.color.surface,
  },
  listFlex: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing[8],
    paddingHorizontal: theme.spacing[16],
  },
  commentsTitle: {
    ...theme.typography.commentsCountTitle,
    color: theme.color.textCommentsHeader,
  },
  sortLink: {
    ...theme.typography.sortLabel,
    color: theme.color.sortLink,
  },
  commentRowOuter: {
    paddingHorizontal: theme.spacing[16],
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.spacing[10],
    paddingHorizontal: theme.spacing[16],
    paddingVertical: theme.spacing[10],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.color.border,
    backgroundColor: theme.color.surface,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    minHeight: 40,
    maxHeight: 110,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: theme.spacing[12],
    paddingVertical: theme.spacing[10],
    color: theme.color.textPrimary,
    borderColor: theme.color.border,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listFooter: {
    height: theme.spacing[16],
  },
  listFooterSpinner: {
    marginTop: theme.spacing[12],
  },
}));
