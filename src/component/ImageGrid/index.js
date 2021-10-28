import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import MainImage from './assets/img/main.jpg';
import MainVideo from './assets/video/main.mp4';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectOwnedBlock,
  makeSelectSelectedBlock,
} from '../../containers/App/selectors';
import { updateSelectedImage } from '../../containers/App/actions';
import styles from './styles/ImageGrid.module.scss';

class ImageGrid extends React.PureComponent {
  state = {
    src: MainImage,
    crop: {
      unit: '%',
      aspect: 1,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.selectedBlock !== this.props.selectedBlock) {
      this.setState(
        (prevState) => ({
          ...prevState,
          crop: {
            ...prevState.crop,
            x: this.cropX,
            y: this.cropY,
            width: this.cropWidth,
            height: this.cropHeight,
          },
        }),
        this.onCropComplete,
      );
    }
  }

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onChange = (crop, cropPercentage) => {};

  onCropComplete = () => {
    this.makeClientCrop();
  };

  makeClientCrop = async () => {
    const { dispatchUpdateSelectedImage } = this.props;
    const {
      crop: { width, height },
    } = this.state;

    if (this.imageRef && width && height) {
      const selectedImage = await this.getCroppedImg();
      return dispatchUpdateSelectedImage(selectedImage);
    }
  };

  getCroppedImg() {
    const image = this.imageRef;
    const { crop } = this.state;

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      (crop.x / 100) * image.width * scaleX,
      (crop.y / 100) * image.height * scaleY,
      (crop.width / 100) * image.width * scaleX,
      (crop.height / 100) * image.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          // reject(new Error('Canvas is empty'));
          // console.error('Canvas is empty');
          return;
        }
        // eslint-disable-next-line no-param-reassign
        blob.name = 'selectedImage.jpeg';
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  get blockSize() {
    const { ownedBlock } = this.props;

    if (ownedBlock) {
      return ownedBlock.size;
    }

    return 5;
  }

  get cropWidth() {
    const { selectedBlock } = this.props;

    if (!selectedBlock) {
      return 0;
    }

    return this.blockSize;
  }

  get cropHeight() {
    const { selectedBlock } = this.props;

    if (!selectedBlock) {
      return 0;
    }

    return this.blockSize;
  }

  get cropX() {
    const { selectedBlock, ownedBlock } = this.props;

    if (!selectedBlock) {
      return null;
    }

    if (ownedBlock) {
      const selectedBlockID = ownedBlock.blockIDs[0];
      return ((selectedBlockID % 20) / 20) * 100;
    }

    const selectedBlockID = selectedBlock.id;
    return ((selectedBlockID % 20) / 20) * 100;
  }

  get cropY() {
    const { selectedBlock, ownedBlock } = this.props;

    if (!selectedBlock) {
      return null;
    }

    if (ownedBlock) {
      const selectedBlockID = ownedBlock.blockIDs[0];
      return (Math.floor(selectedBlockID / 20) / 20) * 100;
    }

    const selectedBlockID = selectedBlock.id;
    return (Math.floor(selectedBlockID / 20) / 20) * 100;
  }

  render() {
    const { crop, src } = this.state;

    return (
      <div className={styles.wrapper}>
        <ReactCrop
          className={styles.root}
          src={src}
          crop={crop}
          onImageLoaded={this.onImageLoaded}
          onChange={this.onChange}
          locked
        />
        <div className={styles.video}>
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            style={{ display: 'block', maxWidth: '100%' }}
          >
            <source src={MainVideo} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedBlock: makeSelectSelectedBlock(),
  ownedBlock: makeSelectOwnedBlock(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateSelectedImage: (image) =>
    dispatch(updateSelectedImage.request(image)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(ImageGrid);
