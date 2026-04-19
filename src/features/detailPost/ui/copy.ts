import { Platform } from 'react-native';

export const postDetailCopy = {
  paidTitle: 'Контент скрыт по подписке',
  paidDescription: 'Доступ открывается после оплаты',
  premiumButton: 'Открыть Премиум',
  paidBodyStub: 'Полный текст доступен после оплаты.',
  sortNewFirst: 'Сначала новые',
  sortOldFirst: 'Сначала старые',
  commentPlaceholder: 'Ваш комментарий',
} as const;

function pluralRu(value: number, one: string, few: string, many: string): string {
  const mod10 = value % 10;
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

export function formatCommentsCount(count: number): string {
  const word = pluralRu(count, 'комментарий', 'комментария', 'комментариев');
  return `${count} ${word}`;
}

export const POST_DETAIL_SORT_HIT_SLOP = 10;

export const POST_DETAIL_KEYBOARD_EXTRA_BOTTOM = Platform.OS === 'ios' ? 0 : 20;
