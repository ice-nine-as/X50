import {
  getReducers,
} from './getReducers';
import {
  getRoutesMap,
} from './getRoutesMap';
import {
  History,
} from 'history';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import {
  composeWithDevTools,
} from 'redux-devtools-extension';
import {
  connectRoutes,
  RoutesMap,
} from 'redux-first-router';
import {
  TClientStoreReturn,
} from '../TypeAliases/TClientStoreReturn';
import {
  TStoreProps,
} from '../TypeAliases/TStoreProps';

import thunkMiddleware from 'redux-thunk';

export function configureClientStore(
  history:        History,
  preloadedState: Partial<TStoreProps> = {},
  routesMap:      RoutesMap = getRoutesMap()): TClientStoreReturn
{
  const {
    enhancer,
    middleware,
    reducer: locationReducer,
    thunk,
  } = connectRoutes(history, routesMap);

  const rootReducer = combineReducers<TStoreProps>(
    // @ts-ignore
    Object.assign({}, getReducers(), {
      location: locationReducer,
    })
  );

  const middlewares = applyMiddleware(thunkMiddleware, middleware);
  const enhancers   = composeWithDevTools(enhancer, middlewares);

  const store = createStore<TStoreProps, any, {}, {}>(
    rootReducer,
    preloadedState as TStoreProps,
    enhancers);

  return {
    store,
    thunk,
  };
}

export default configureClientStore;