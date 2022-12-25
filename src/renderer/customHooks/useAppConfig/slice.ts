import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UseAppConfigState } from './types';

const initialState: UseAppConfigState = {
  config: null,
  loading: true,
};

const slice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setConfigState(state, action: PayloadAction<UseAppConfigState>) {
      if (action.payload.loading || !action.payload.config) {
        state.config = null;
        state.loading = true;
      } else {
        Object.assign(state, action.payload);
      }
    },
    reset: () => initialState,
  },
});

export const { actions, reducer, name: key } = slice;
export { initialState as initialConfigsState };
