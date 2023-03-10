import { WindowType } from 'main/lib/Browser/types';
import { useEffect } from 'react';
import {
  NavigationMenu,
  NavigationRouter,
  useAppNavigation,
} from 'renderer/customHooks/useAppNavigation';
import { getNavigationEntries } from 'renderer/customHooks/useAppNavigation/helpers/getNavigationEntries';
import { useCrossWindowMessage } from 'renderer/customHooks/useCrossWindowMessage';
import { useElementTransitionStyle } from 'renderer/customHooks/useTransitionOrchestrator';
import { PageContainer } from './styles';

export const MainContainer = () => {
  const { currentNavigationEntry, goTo, location, navigationMap } =
    useAppNavigation();

  // const { sendMessage } = useCrossWindowMessage({
  //   windowType: WindowType.MAIN,
  // });

  // useEffect(() => {
  //   sendMessage({
  //     requestType: 'test',
  //     payload: {
  //       test: 'test',
  //     },
  //     senderType: WindowType.MAIN,
  //     recipientType: WindowType.SECONDARY,
  //   })
  //     .then((...args) => console.log('response', ...args))
  //     .catch(console.error);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const { style } = useElementTransitionStyle({
    elementId: 'main-container',
  });

  return (
    <PageContainer style={style}>
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
