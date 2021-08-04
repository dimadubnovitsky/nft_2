import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getBlock, updateSelectedImage } from '../actions';
import { makeSelectBlocks, makeSelectSelectedImage } from '../selectors';
import MainImage from '../../../component/ImageGrid/assets/img/main.jpg';

const cropX = (blockID) => ((blockID % 20) / 20) * 100;

const cropY = (blockID) => (Math.floor(blockID / 20) / 20) * 100;

const drawImage = () =>
  new Promise((resolve, reject) => {
    let img = new Image();
    img.src = MainImage;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });

const getCroppedImg = (image, blockID) => {
  const canvas = document.createElement('canvas');
  canvas.width = 5;
  canvas.height = 5;
  const ctx = canvas.getContext('2d');

  const x = (cropX(blockID) / 100) * image.width;
  const y = (cropY(blockID) / 100) * image.height;
  const width = (5 / 100) * image.width;
  const height = (5 / 100) * image.height;

  ctx.drawImage(image, x, y, width, height, 0, 0, 5, 5);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        //reject(new Error('Canvas is empty'));
        console.error('Canvas is empty');
        return;
      }
      // eslint-disable-next-line no-param-reassign
      blob.name = 'selectedImage.jpeg';
      const fileUrl = window.URL.createObjectURL(blob);
      resolve(fileUrl);
    }, 'image/jpeg');
  });
};

function* watchGetBlock() {
  yield takeLatest(getBlock.REQUEST, requestGetBlock);
}

function* requestGetBlock({ payload: { id } }) {
  const blocks = yield select(makeSelectBlocks());
  const block = blocks.find((item) => item.id === parseInt(id));

  const selectedImage = yield select(makeSelectSelectedImage());
  if (!selectedImage) {
    const renderedImage = yield call(drawImage);
    const newSelectedImage = yield call(getCroppedImg, renderedImage, block.id);

    yield put(updateSelectedImage.success(newSelectedImage));
  }

  yield put(getBlock.success(block));
}

export default watchGetBlock;
