import {
  AppActionTypes,
} from '../Enums/AppActionTypes';
import {
  IAppAction,
} from '../Actions/App/IAppAction';
import {
  isAppAction,
} from '../TypeGuards/isAppAction';
import {
  TReducer,
} from '../TypeAliases/TReducer';

export const strings = {
  PREVIOUS_STATE_INVALID:
    'The previousState argument passed to the loadingReducer function was ' +
    'not a boolean.',
};

export const loadingReducer: TReducer<boolean, IAppAction> =
  (previousState: boolean = false,
    action: IAppAction): boolean =>
{
  if (typeof previousState !== 'boolean') {
    throw new Error(strings.PREVIOUS_STATE_INVALID);
  }

  if (action &&
      isAppAction(action) &&
      action.type === AppActionTypes.Loading &&
      typeof action.value === 'boolean')
  {
    return action.value;
  }
  
  return previousState;
}

export default loadingReducer;