import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectAllBlocks,
  makeSelectBlocks,
  makeSelectIsShowAllBlocks,
  makeSelectLoading,
} from '../App/selectors';
import Home from './components';
import { refresh } from '../App/actions';

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  blocks: makeSelectBlocks(),
  allBlocks: makeSelectAllBlocks(),
  isShowAllBlocks: makeSelectIsShowAllBlocks(),
});
const mapDispatchToProps = (dispatch) => ({
  onRefresh: () => dispatch(refresh.request()),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Home);
