import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CSSProperties } from 'styled-components';
import { UseTransitionOrchestratorState } from './types';

const initialState: UseTransitionOrchestratorState = {
  elementsStyles: {},
};

const slice = createSlice({
  name: 'transitions',
  initialState,
  reducers: {
    setElementStyle(
      state,
      action: PayloadAction<{
        elementId: string;
        style: CSSProperties;
      }>
    ) {
      const { elementId, style } = action.payload;

      state.elementsStyles[elementId] = style;
    },
    resetElementStyle: (
      state,
      action: PayloadAction<{
        elementId: string;
        defaultTransition?: CSSProperties['transition'];
      }>
    ) => {
      const { elementId, defaultTransition } = action.payload;

      if (!defaultTransition) delete state.elementsStyles[elementId];
      else {
        state.elementsStyles[elementId] = {
          transition: defaultTransition,
        };
      }
    },
    reset: () => initialState,
  },
});

export const { actions, reducer, name: key } = slice;
export { initialState as initialConfigsState };
