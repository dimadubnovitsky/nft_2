import { delay, put, takeLatest } from 'redux-saga/effects';
import { loadData } from '../actions';

function* watchLoadData() {
  yield takeLatest(loadData.REQUEST, requestLoadData);
}

function* requestLoadData() {
  try {
    yield delay(1000);

    yield put(loadData.success());
  } catch (error) {
    yield put(loadData.failure());
  }
}

export default watchLoadData;
