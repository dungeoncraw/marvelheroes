import { Store, combineReducers, compose, applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import { fork, all } from "redux-saga/effects";
import createSagaMiddleware from 'redux-saga';
import { HeroListState } from "../store/heroes/types";
import { notification } from "antd";
import heroListSaga from "../store/heroes/saga";
import { heroListReducer } from "../store/heroes/reducer";

export interface StoreState {
  heroListReducer: HeroListState;
}
function* rootSaga() {
  yield all([fork(heroListSaga)]);
}
export function createReduxStore(): Store<any> {
  let reducer = combineReducers<StoreState>({
    heroListReducer,
  });
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
  const sagaMiddleware = createSagaMiddleware({
    onError: handleError,
  });
  let middleware = [sagaMiddleware, thunk];

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
const handleError = (error: Error) => {
  notification.error({message: error.message});
};
