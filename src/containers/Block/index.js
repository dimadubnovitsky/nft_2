import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectBlock,
  makeSelectLoading,
  makeSelectSelectedImage,
  makeSelectUser,
} from '../App/selectors';
import Block from './components';
import {
  clearBlock,
  getBlock,
  updateBlock,
  purchaseBlock,
} from '../App/actions';

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  block: makeSelectBlock(),
  user: makeSelectUser(),
  selectedImage: makeSelectSelectedImage(),
});

const mapDispatchToProps = (dispatch, props) => ({
  onInitialLoad: () => {
    dispatch(getBlock.request(props.match.params.blockID));
  },
  onUnmount: () => {
    dispatch(clearBlock.request());
  },
  onSubmit: (data) =>
    new Promise((resolve) => {
      dispatch(updateBlock.request(data, resolve));
    }),
  onPurchase: (id) => dispatch(purchaseBlock.request(id)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Block);
