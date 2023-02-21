import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getNavigationMap } from './helpers/getNavigationMap';
import { UseAppNavigation } from './types';

export * from './components/NavigationMenu';
export * from './components/NavigationRouter';

export const useAppNavigation: UseAppNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationMap = getNavigationMap();
  const matchFunctions = useMemo(
    () =>
      Object.entries(navigationMap).reduce<Record<string, RegExp>>(
        (acc, [key, value]) => {
          if (value.exactPath) return acc;

          return {
            ...acc,
            [key]: new RegExp(value.mountPoint.replace(/\*/g, '.+')),
          };
        },
        {}
      ),
    []
  );

  const [, currentNavigationEntry] =
    Object.entries(navigationMap).find(([key, navigationEntry]) => {
      const { exactPath, mountPoint } = navigationEntry;

      return exactPath
        ? location.pathname === mountPoint
        : location.pathname !== '/' &&
            matchFunctions[key].test(location.pathname);
    }) || [];

  return {
    navigationMap,
    location,
    currentNavigationEntry,
    goTo: (navigationEntry, preserveLocationState = true) => {
      const { mountPoint } = navigationMap[navigationEntry];
      if (preserveLocationState) {
        navigate({
          ...location,
          pathname: mountPoint,
        });
      } else {
        navigate(mountPoint);
      }
    },
  };
};
