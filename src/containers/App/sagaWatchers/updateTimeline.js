import { put, takeLatest } from 'redux-saga/effects';
import { updateTimeline } from '../actions';

function* watchUpdateTimeline() {
  yield takeLatest(updateTimeline.REQUEST, requestUpdateTimeline);
}

function* requestUpdateTimeline({ payload: { timeline } }) {
  yield put(updateTimeline.success(timeline));
}

export default watchUpdateTimeline;
