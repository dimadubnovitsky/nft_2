import { delay, put, takeLatest } from 'redux-saga/effects';
import { authorize } from '../actions';

function* watchAuthorize() {
  yield takeLatest(authorize.REQUEST, requestAuthorize);
}

function* requestAuthorize() {
  try {
    yield delay(2000);

    yield put(authorize.success());
  } catch (error) {
    yield put(authorize.failure());
  }
}

export default watchAuthorize;
