import { useLocation, useNavigate } from 'react-router-dom';
import { getNavigationMap } from './helpers/getNavigationMap';
import { UseAppNavigation } from './types';

export * from './components/NavigationMenu';
export * from './components/NavigationRouter';

export const useAppNavigation: UseAppNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationMap = getNavigationMap();

  const currentNavigationEntry = Object.values(navigationMap).find(
    (navigationEntry) => {
      const { exactPath, mountPoint } = navigationEntry;
      return exactPath
        ? location.pathname === mountPoint
        : location.pathname.startsWith(mountPoint);
    }
  );

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
