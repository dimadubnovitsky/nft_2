import { put, takeLatest } from 'redux-saga/effects';
import { updateSelectedBlock } from '../actions';

function* watchUpdateSelectedBlock() {
  yield takeLatest(updateSelectedBlock.REQUEST, requestUpdateSelectedBlock);
}

function* requestUpdateSelectedBlock({ payload: { selectedBlock } }) {
  yield put(updateSelectedBlock.success(selectedBlock));
}

export default watchUpdateSelectedBlock;
