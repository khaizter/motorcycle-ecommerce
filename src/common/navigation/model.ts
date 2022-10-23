type Case = 'authenticated' | 'non-authenticated' | 'always';

export interface NavigationItem {
  label: string;
  path: string;
  case: Case;
}
