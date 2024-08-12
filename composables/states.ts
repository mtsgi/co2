import type { Co2 } from '~/utils/types';

export const useTabs = () => useState<Co2.TabItem[]>('tabs', () => [
  { label: 'Console 1', history: [] },
]);
