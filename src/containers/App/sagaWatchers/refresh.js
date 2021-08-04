import { put, takeLatest } from 'redux-saga/effects';
import { refresh } from '../actions';

function* watchRefresh() {
  yield takeLatest(refresh.REQUEST, requestRefresh);
}

function* requestRefresh() {
  yield put(refresh.success());
}

export default watchRefresh;
