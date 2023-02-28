import { render, unmountComponentAtNode } from 'react-dom';
import { createRoot, Root } from 'react-dom/client';
import { HandlerResponse } from '../../lib/MessageBridge/types';
import { ElementPicker } from '../components/ElementPicker';
import { InjectedSidebar } from '../components/InjectedSidebar';
import {
  InjectedAppsMessagePayload,
  InjectedAppsCrossWindowRequestType,
  InjectedAppsMessageResponse,
} from './types';

let root: Root | null = null;

export const getInjectedAppsIPCRoutes = ({
  microAppMountNode,
  pageNode,
  onAppMount,
  onAppUnMount,
}: {
  microAppMountNode: Element;
  pageNode: Element;
  onAppMount: (appId: string) => void;
  onAppUnMount: (appId: string) => void;
}) => ({
  [InjectedAppsCrossWindowRequestType.RENDER_COMPONENT]: (
    payload: InjectedAppsMessagePayload[InjectedAppsCrossWindowRequestType.RENDER_COMPONENT]
  ): Promise<
    HandlerResponse<
      InjectedAppsMessageResponse[InjectedAppsCrossWindowRequestType.RENDER_COMPONENT]
    >
  > => {
    const { type } = payload;
    return new Promise((resolve, reject) => {
      switch (type) {
        case 'injected_sidebar': {
          render(InjectedSidebar(), microAppMountNode, () => {
            resolve({
              hasFailed: false,
              payload: undefined,
            });
            onAppMount(type);
          });
          break;
        }
        default:
          reject(new TypeError(`Unknown component type: ${type}`));
      }
    });
  },
  [InjectedAppsCrossWindowRequestType.DESTROY_COMPONENT]: async (
    payload: InjectedAppsMessagePayload[InjectedAppsCrossWindowRequestType.DESTROY_COMPONENT]
  ): Promise<
    HandlerResponse<
      InjectedAppsMessageResponse[InjectedAppsCrossWindowRequestType.RENDER_COMPONENT]
    >
  > => {
    const { type } = payload;

    switch (type) {
      case 'injected_sidebar': {
        unmountComponentAtNode(microAppMountNode);
        onAppUnMount(type);
        return {
          hasFailed: false,
          payload: undefined,
        };
      }
      default:
        throw new Error(`Unknown component type: ${type}`);
    }
  },
  [InjectedAppsCrossWindowRequestType.HEALTH_CHECK]: (): Promise<
    HandlerResponse<
      InjectedAppsMessageResponse[InjectedAppsCrossWindowRequestType.HEALTH_CHECK]
    >
  > => {
    if (!root) {
      root = createRoot(microAppMountNode);
      if (microAppMountNode instanceof HTMLElement) {
        microAppMountNode.style.position = 'fixed';
        microAppMountNode.style.top = '0';
        microAppMountNode.style.left = '0';
      }
      root.render(<ElementPicker elementType="image" />);
      pageNode.appendChild(microAppMountNode);
    }
    return Promise.resolve({
      hasFailed: false,
      payload: { isAlive: true },
    });
  },
});
