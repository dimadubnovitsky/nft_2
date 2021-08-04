import { put, takeLatest } from 'redux-saga/effects';
import { updateSelectedImage } from '../actions';

function* watchUpdateSelectedImage() {
  yield takeLatest(updateSelectedImage.REQUEST, requestUpdateSelectedImage);
}

function* requestUpdateSelectedImage({ payload: { selectedImage } }) {
  yield put(updateSelectedImage.success(selectedImage));
}

export default watchUpdateSelectedImage;
