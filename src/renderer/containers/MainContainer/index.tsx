import { getNavigationEntries } from 'renderer/customHooks/useAppNavigation/helpers/getNavigationEntries';
import {
  NavigationMenu,
  NavigationRouter,
  useAppNavigation,
} from 'renderer/customHooks/useAppNavigation';
import { PageContainer } from './styles';

export const MainContainer = () => {
  const { currentNavigationEntry, goTo, location, navigationMap } =
    useAppNavigation();

  return (
    <PageContainer>
      <NavigationMenu
        currentNavigationEntry={currentNavigationEntry}
        goTo={goTo}
        location={location}
        navigationEntries={getNavigationEntries(navigationMap)}
      />
      <NavigationRouter navigationMap={navigationMap} />
    </PageContainer>
  );
};
