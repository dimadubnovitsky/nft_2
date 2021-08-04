import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsAuthorized, makeSelectLoading } from '../App/selectors';
import ConnectPage from './components';
import { authorize } from '../App/actions';

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  isAuthorized: makeSelectIsAuthorized(),
});

const mapDispatchToProps = (dispatch) => ({
  onConnect: () => dispatch(authorize.request()),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ConnectPage,
);
