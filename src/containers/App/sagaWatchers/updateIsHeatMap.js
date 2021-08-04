import { put, takeLatest } from 'redux-saga/effects';
import { updateIsHeatMap } from '../actions';

function* watchUpdateIsHeatMap() {
  yield takeLatest(updateIsHeatMap.REQUEST, requestUpdateIsHeatMap);
}

function* requestUpdateIsHeatMap({ payload: { isHeatMap } }) {
  yield put(updateIsHeatMap.success(isHeatMap));
}

export default watchUpdateIsHeatMap;
