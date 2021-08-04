import { put, takeLatest } from 'redux-saga/effects';
import { clearSelectedBlock } from '../actions';

function* watchClearSelectedBlock() {
  yield takeLatest(clearSelectedBlock.REQUEST, requestClearSelectedBlock);
}

function* requestClearSelectedBlock() {
  yield put(clearSelectedBlock.success());
}

export default watchClearSelectedBlock;
