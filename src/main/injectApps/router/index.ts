import { render, unmountComponentAtNode } from 'react-dom';
import { InjectedSidebar } from '../components/InjectedSidebar';
import { InjectedAppsMessagePayload, InjectedAppsMessageType } from './types';

export const getInjectedAppsIPCRoutes = ({
  microAppMountNode,
  pageNode,
}: {
  microAppMountNode: Element;
  pageNode: Element;
}) => ({
  [InjectedAppsMessageType.RENDER_COMPONENT]: (
    payload: InjectedAppsMessagePayload[InjectedAppsMessageType.RENDER_COMPONENT]
  ): Promise<void> => {
    const { type } = payload;

    return new Promise((resolve, reject) => {
      switch (type) {
        case 'injected_sidebar': {
          render(InjectedSidebar(), microAppMountNode, () => {
            resolve();
          });
          break;
        }
        default:
          reject(new TypeError(`Unknown component type: ${type}`));
      }
    });
  },
  [InjectedAppsMessageType.DESTROY_COMPONENT]: async (
    payload: InjectedAppsMessagePayload[InjectedAppsMessageType.DESTROY_COMPONENT]
  ): Promise<void> => {
    const { type } = payload;

    switch (type) {
      case 'injected_sidebar': {
        unmountComponentAtNode(microAppMountNode);
        break;
      }
      default:
        throw new Error(`Unknown component type: ${type}`);
    }
  },
});
