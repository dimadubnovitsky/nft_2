import { put, takeLatest } from 'redux-saga/effects';
import { clearBlock } from '../actions';

function* watchClearBlock() {
  yield takeLatest(clearBlock.REQUEST, requestClearBlock);
}

function* requestClearBlock() {
  yield put(clearBlock.success());
}

export default watchClearBlock;
