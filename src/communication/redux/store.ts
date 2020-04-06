import { Store, combineReducers, compose, applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import { HeroListState } from "../store/heroes/types";
import { notification } from "antd";
import heroListSaga from "../store/heroes/saga";
import { heroListReducer } from "../store/heroes/reducer";

import { fork, all } from "redux-saga/effects";

export interface StoreState {
  heroListReducer: HeroListState;
}
export function* rootSaga() {
  yield all([fork(heroListSaga)]);
}
export function createReduxStore(): Store<any> {
  let reducer = combineReducers<StoreState>({
    heroListReducer,
  });

  const sagaMiddleware = createSagaMiddleware({
    onError: handleError,
  });
  let middleware = [sagaMiddleware];

  const store = createStore(
    reducer,
    compose(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
const handleError = (error: Error) => {
  notification.error({message: error.message});
};
