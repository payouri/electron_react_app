import { NavigationDescriptor, NavigationEntry, NavigationMap } from '../types';

export const getNavigationEntries = (
  navigationMap: NavigationMap
): [NavigationEntry, NavigationDescriptor][] =>
  Object.entries(navigationMap) as [NavigationEntry, NavigationDescriptor][];
