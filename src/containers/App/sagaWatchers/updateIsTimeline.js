import { put, takeLatest } from 'redux-saga/effects';
import { updateIsTimeline } from '../actions';

function* watchUpdateIsTimeline() {
  yield takeLatest(updateIsTimeline.REQUEST, requestUpdateIsTimeline);
}

function* requestUpdateIsTimeline({ payload: { isTimeline } }) {
  yield put(updateIsTimeline.success(isTimeline));
}

export default watchUpdateIsTimeline;
