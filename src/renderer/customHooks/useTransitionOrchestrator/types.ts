import { CSSProperties } from 'styled-components';

export type UseTransitionOrchestratorState = {
  elementsStyles: Record<string, CSSProperties>;
};

export type UseElementTransitionStyleParams = {
  elementId: string;
};

export type UseElementTransitionStyleReturnType = {
  style: CSSProperties;
};

export type UseTransitionOrchestratorParams = {
  defaultTransition?: CSSProperties['transition'];
};

export type UseTransitionOrchestratorReturnType = {
  updateElementStyle: (elementId: string, style: CSSProperties) => void;
  resetElementStyle: (elementId: string) => void;
};
