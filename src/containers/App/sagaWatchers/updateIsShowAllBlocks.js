import { put, takeLatest } from 'redux-saga/effects';
import { updateIsShowAllBlocks } from '../actions';

function* watchUpdateIsShowAllBlocks() {
  yield takeLatest(updateIsShowAllBlocks.REQUEST, requestUpdateIsShowAllBlocks);
}

function* requestUpdateIsShowAllBlocks({ payload: { isShowAllBlocks } }) {
  yield put(updateIsShowAllBlocks.success(isShowAllBlocks));
}

export default watchUpdateIsShowAllBlocks;
