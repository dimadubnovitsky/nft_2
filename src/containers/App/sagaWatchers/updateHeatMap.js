import { put, takeLatest } from 'redux-saga/effects';
import { updateHeatMap } from '../actions';

function* watchUpdateHeatMap() {
  yield takeLatest(updateHeatMap.REQUEST, requestUpdateHeatMap);
}

function* requestUpdateHeatMap({ payload: { heatMap } }) {
  yield put(updateHeatMap.success(heatMap));
}

export default watchUpdateHeatMap;
