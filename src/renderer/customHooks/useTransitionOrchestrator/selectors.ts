import { RootState } from 'renderer/store/types';
import { CSSProperties } from 'styled-components';
import { initialConfigsState } from './slice';
import { UseTransitionOrchestratorState } from './types';

export const selectTransitionOrchestratorState = (
  state: RootState
): UseTransitionOrchestratorState => state.transitions || initialConfigsState;

export const selectElementStyles =
  (elementId: string) =>
  (state: RootState): CSSProperties =>
    selectTransitionOrchestratorState(state).elementsStyles[elementId] ?? {};
