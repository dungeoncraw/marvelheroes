import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import heroesService from './service';
import { HeroListActionTypes } from './types';
import { getApiErrorContext } from '../../utils';
import { notification } from 'antd';
import { fetchHeroListRequest, fetchHeroListSuccess, fetchHeroListError, updateHeroRequest, updateHeroSuccess, updateHeroError } from './actions';

function* handleFetchHeroListRequest(action: ReturnType<typeof fetchHeroListRequest>) {
  try {
    const res = yield call(heroesService.fetchHeroList, action.payload);
    yield put(fetchHeroListSuccess(res.data.data));
  } catch (err) {
    const erroMessage = getApiErrorContext(err);
    notification.error({message: erroMessage})
    yield put(fetchHeroListError(erroMessage));
  }
}

function* watchFetchHeroesListRequest() {
  yield takeEvery(HeroListActionTypes.FETCH_HERO_LIST_REQUEST, handleFetchHeroListRequest);
}

function* handleUpdateHeroInfoRequest(action: ReturnType<typeof updateHeroRequest>) {
  try {
    // MOCKED CALL
    yield put(updateHeroSuccess(action.payload));
  } catch (err) {
    const erroMessage = getApiErrorContext(err);
    notification.error({message: erroMessage})
    yield put(updateHeroError(erroMessage));
  }
}

function* watchUpdateHeroRequest() {
  yield takeEvery(HeroListActionTypes.UPDATE_HERO_LIST_REQUEST, handleUpdateHeroInfoRequest);
}
function* heroListSaga() {
  yield all([
    fork(watchFetchHeroesListRequest),
    fork(watchUpdateHeroRequest)
  ]);
}

export default heroListSaga;
