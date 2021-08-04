import { put, takeLatest } from 'redux-saga/effects';
import { updateIsFilters } from '../actions';

function* watchUpdateIsFilters() {
  yield takeLatest(updateIsFilters.REQUEST, requestUpdateIsFilters);
}

function* requestUpdateIsFilters({ payload: { isFilters } }) {
  yield put(updateIsFilters.success(isFilters));
}

export default watchUpdateIsFilters;
