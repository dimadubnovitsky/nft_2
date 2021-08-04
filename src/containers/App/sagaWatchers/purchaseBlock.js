import { put, takeLatest } from 'redux-saga/effects';
import { purchaseBlock } from '../actions';

function* watchPurchaseBlock() {
  yield takeLatest(purchaseBlock.REQUEST, requestPurchaseBlock);
}

function* requestPurchaseBlock({ payload: { block } }) {
  yield put(purchaseBlock.success(block));
}

export default watchPurchaseBlock;
