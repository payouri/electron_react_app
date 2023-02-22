import {
  NavigationDescriptor,
  NavigationEntry,
  UseAppNavigationType,
} from '../../types';

export type NavigationMenuProps = {
  navigationEntries: [NavigationEntry, NavigationDescriptor][];
  open?: boolean;
} & Pick<UseAppNavigationType, 'currentNavigationEntry' | 'goTo' | 'location'>;
