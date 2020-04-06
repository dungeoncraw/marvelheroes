import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import heroesService from './service';
import { HeroListActionTypes } from './types';
import { getApiErrorContext } from '../../utils';
import { notification } from 'antd';
import { fetchHeroListRequest, fetchHeroListSuccess, fetchHeroListError } from './actions';

export function* handleFetchHeroListRequest(action: ReturnType<typeof fetchHeroListRequest>) {
  try {
    const res = yield call(heroesService.fetchHeroList, action.payload);
    yield put(fetchHeroListSuccess(res.data));
  } catch (err) {
    const erroMessage = getApiErrorContext(err);
    notification.error({message: erroMessage})
    yield put(fetchHeroListError(erroMessage));
  }
}

function* watchFetchHeroesListRequest() {
  yield takeEvery(HeroListActionTypes.FETCH_HERO_LIST_REQUEST, handleFetchHeroListRequest);
}

function* heroListSaga() {
  yield all([
    fork(watchFetchHeroesListRequest),
  ]);
}

export default heroListSaga;
