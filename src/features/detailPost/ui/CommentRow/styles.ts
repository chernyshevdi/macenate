import { StyleSheet } from 'react-native';

import { makeStyles } from '@/shared/theme/makeStyles';

export const useCommentRowStyles = makeStyles((theme) => ({
  commentRow: {
    flexDirection: 'row',
    gap: theme.spacing[10],
    paddingVertical: theme.spacing[12],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.color.border,
  },
  commentBody: { flex: 1 },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.pill,
  },
  commentAuthor: {
    ...theme.typography.authorName,
    marginBottom: theme.spacing[4],
    color: theme.color.textPrimary,
  },
  commentText: {
    ...theme.typography.body,
    color: theme.color.textPrimary,
  },
  commentLike: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
  },
  commentLikeText: {
    marginTop: 2,
    ...theme.typography.micro,
    color: theme.color.textSecondary,
  },
}));
