import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { selectElementStyles } from './selectors';
import { actions, key, reducer } from './slice';
import {
  UseElementTransitionStyleParams,
  UseElementTransitionStyleReturnType,
  UseTransitionOrchestratorParams,
  UseTransitionOrchestratorReturnType,
} from './types';

export const useElementTransitionStyle = ({
  elementId,
}: UseElementTransitionStyleParams): UseElementTransitionStyleReturnType => {
  // Create a reducer that is tied to the custom hook
  useInjectReducer({ key, reducer });
  // Get the style from the store
  const style = useSelector(selectElementStyles(elementId));

  return {
    style,
  };
};

export const useTransitionOrchestrator = ({
  defaultTransition,
}: UseTransitionOrchestratorParams): UseTransitionOrchestratorReturnType => {
  // Create a reducer that is tied to the custom hook
  useInjectReducer({ key, reducer });
  const dispatch = useDispatch();

  return {
    updateElementStyle: (elementId, style) => {
      // Dispatch an action to update the style in the store
      dispatch(
        actions.setElementStyle({
          elementId,
          style: {
            transition: defaultTransition,
            ...style,
          },
        })
      );
    },
    resetElementStyle: (elementId) => {
      // Dispatch an action to update the style in the store
      dispatch(actions.resetElementStyle({ elementId, defaultTransition }));
    },
  };
};
