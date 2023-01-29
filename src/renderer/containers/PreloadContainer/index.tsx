import { Loader } from 'renderer/components/Loader';
import { useAppConfig } from 'renderer/customHooks/useAppConfig';
import { useInitApp } from 'renderer/customHooks/useInitApp';
import { useTheme } from 'styled-components';
import { MainContainer } from '../MainContainer';
import { PageContainer } from '../MainContainer/styles';

export const PreloadContainer = () => {
  const [appConfigState] = useAppConfig();
  const { isLoading, hasInit } = useInitApp(appConfigState);
  const {
    grayscale: { 40: gray40 },
  } = useTheme();

  return isLoading || !hasInit ? (
    <PageContainer direction="row">
      <Loader fillSpace color={gray40} size="4rem" />
    </PageContainer>
  ) : (
    <MainContainer />
  );
};
