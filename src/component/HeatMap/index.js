import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectHeatMap,
  makeSelectIsHeatMap,
} from '../../containers/App/selectors';
import { updateSelectedImage } from '../../containers/App/actions';
import styles from './styles/HeatMap.module.scss';

class HeatMap extends React.PureComponent {
  render() {
    const { heatMap, isHeatMap } = this.props;

    return (
      isHeatMap && (
        <div className={styles.root}>
          <img src={heatMap} alt="" />
        </div>
      )
    );
  }
}

const mapStateToProps = createStructuredSelector({
  heatMap: makeSelectHeatMap(),
  isHeatMap: makeSelectIsHeatMap(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateSelectedImage: (image) =>
    dispatch(updateSelectedImage.request(image)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(HeatMap);
