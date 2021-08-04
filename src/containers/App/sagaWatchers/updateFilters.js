import { put, takeLatest } from 'redux-saga/effects';
import { updateFilters } from '../actions';

function* watchUpdateFilters() {
  yield takeLatest(updateFilters.REQUEST, requestUpdateFilters);
}

function* requestUpdateFilters({ payload: { filters } }) {
  yield put(updateFilters.success(filters));
}

export default watchUpdateFilters;
