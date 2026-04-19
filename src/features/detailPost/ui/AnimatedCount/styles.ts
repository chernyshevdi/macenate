import { makeStyles } from '@/shared/theme/makeStyles';

export const useAnimatedCountStyles = makeStyles((theme) => ({
  countText: {
    ...theme.typography.counter,
    color: theme.color.textCounter,
  },
}));
