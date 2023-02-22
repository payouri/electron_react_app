// transform: scale(1.2);
//     filter: blur(5px);

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
  useInjectReducer({ key, reducer });
  const style = useSelector(selectElementStyles(elementId));

  return {
    style,
  };
};

export const useTransitionOrchestrator = ({
  defaultTransition,
}: UseTransitionOrchestratorParams): UseTransitionOrchestratorReturnType => {
  useInjectReducer({ key, reducer });
  const dispatch = useDispatch();

  return {
    updateElementStyle: (elementId, style) => {
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
      dispatch(actions.resetElementStyle({ elementId, defaultTransition }));
    },
  };
};
