import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';
import { makeSelectLocation } from './selectors';
import { loadData } from './actions';
import App from './components';

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

const mapDispatchToProps = (dispatch) => ({
  onInitialLoad: () => dispatch(loadData.request()),
});

const withSaga = injectSaga({ key: 'App', saga });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSaga,
)(App);
