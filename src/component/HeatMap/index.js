import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { animated, Transition } from 'react-spring';
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
      <Transition
        items={isHeatMap}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {(style, springIsHeatMap) =>
          springIsHeatMap && (
            <animated.div className={styles.root} style={style}>
              <img src={heatMap} alt="" />
            </animated.div>
          )
        }
      </Transition>
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
