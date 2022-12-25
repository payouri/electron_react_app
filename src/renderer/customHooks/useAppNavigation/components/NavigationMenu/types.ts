import {
  NavigationDescriptor,
  NavigationEntry,
  UseAppNavigationType,
} from '../../types';

export type NavigationMenuProps = {
  navigationEntries: [NavigationEntry, NavigationDescriptor][];
} & Pick<UseAppNavigationType, 'currentNavigationEntry' | 'goTo' | 'location'>;
