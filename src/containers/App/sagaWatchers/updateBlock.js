import { put, takeLatest, call } from 'redux-saga/effects';
import { updateBlock } from '../actions';

function* watchUpdateBlock() {
  yield takeLatest(updateBlock.REQUEST, requestUpdateBlock);
}
const loadImage = (block) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(block.image[0]);
  });

function* requestUpdateBlock({ payload: { block, resolve } }) {
  let image;

  if (
    block.image &&
    block.image.length > 0 &&
    typeof block.image !== 'string'
  ) {
    image = yield call(loadImage, block);
  }

  resolve();

  yield put(
    updateBlock.success({
      ...block,
      image,
    }),
  );
}

export default watchUpdateBlock;
