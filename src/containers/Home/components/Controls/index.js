import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { animated, Transition } from 'react-spring';
import {
  makeSelectFilters,
  makeSelectIsFilters,
  makeSelectIsHeatMap,
  makeSelectIsShowAllBlocks,
  makeSelectIsTimeline,
} from '../../../App/selectors';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  withStyles,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import TimerIcon from '@material-ui/icons/Timer';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import {
  updateFilters,
  updateIsFilters,
  updateIsHeatMap,
  updateIsTimeline,
  updateIsShowAllBlocks,
} from '../../../App/actions';
import HearMapRangeImage from './assets/images/heatMapRange.png';
import controlsStyle from './styles/controlsStyle';

const Control = ({ classes, name, value, icon: Icon, onChange, style }) => (
  <Box paddingX={2} textAlign="right" component={animated.div} style={style}>
    <Checkbox
      classes={{
        root: classes.control,
        checked: classes.controlChecked,
      }}
      checked={value}
      onChange={onChange}
      icon={<Icon />}
      checkedIcon={<Icon color="primary" />}
      name={name}
    />
  </Box>
);

const filtersMessages = {
  myLands: 'My Lands',
  forSale: 'For Sale',
  unavailable: 'Unavailable',
};

const Filters = ({ filters, dispatchUpdateFilters, classes, style }) => (
  <animated.div className={classes.filtersWrapper} style={style}>
    <div className={classes.filtersContent}>
      {Object.keys(filters).map((key) => (
        <div key={key}>
          <FormControlLabel
            label={filtersMessages[key]}
            classes={{
              label: classes.filterLabel,
              root: classes.filterRoot,
            }}
            control={
              <Checkbox
                checked={filters[key]}
                onChange={(event, value) => {
                  dispatchUpdateFilters({
                    ...filters,
                    [key]: value,
                  });
                }}
                name={key}
              />
            }
          />
        </div>
      ))}
    </div>
  </animated.div>
);

const HeatMap = ({ classes, style }) => (
  <animated.div className={classes.mapWrapper} style={style}>
    <div className={classes.mapContent}>
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.mapTitle}>Block Price</div>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <img src={HearMapRangeImage} alt="Heat Map Price Range" />
              </Grid>
              <Grid item xs={10}>
                <div className={classes.prices}>
                  <div className={classes.price}>100</div>
                  <div className={classes.price}>80</div>
                  <div className={classes.price}>60</div>
                  <div className={classes.price}>40</div>
                  <div className={classes.price}>20</div>
                  <div className={classes.price}>1</div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  </animated.div>
);

class Controls extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      controls: false,
      showBlocksValue: false,
    };
    this.animationInterval = null;
  }

  onExpand = (value) => {
    this.setState({ controls: value });
    if (value === false) {
      this.props.dispatchUpdateIsFilters(value);
      this.props.dispatchUpdateIsTimeline(value);
      this.props.dispatchUpdateIsHeatMap(value);
    }
  };

  setBlockAnimation = (value) => {
    this.setState({ showBlocksValue: value });

    if (value) {
      this.animationInterval = setInterval(() => {
        this.props.dispatchUpdateIsShowAllBlocks(true);
        setTimeout(() => this.props.dispatchUpdateIsShowAllBlocks(false), 1000);
      }, 5000);
    } else {
      clearInterval(this.animationInterval);
    }
  };

  render() {
    const {
      classes,
      isFilters,
      filters,
      isTimeline,
      isHeatMap,
      dispatchUpdateIsFilters,
      dispatchUpdateIsTimeline,
      dispatchUpdateIsHeatMap,
      dispatchUpdateFilters,
    } = this.props;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box paddingX={2} paddingBottom={1} textAlign="right">
            <Checkbox
              classes={{
                root: classes.control,
                checked: classes.expandControlChecked,
              }}
              onChange={(event, value) => {
                this.onExpand(value);
              }}
              icon={<ExpandMoreIcon />}
              checkedIcon={<ExpandLessIcon />}
              name="expand"
            />
          </Box>
        </Grid>
        <Transition
          items={
            this.state.controls
              ? [
                  {
                    name: 'isFilters',
                    value: isFilters,
                    onChange: (event, value) => dispatchUpdateIsFilters(value),
                    icon: FilterListIcon,
                  },
                  {
                    name: 'isTimeline',
                    value: isTimeline,
                    onChange: (event, value) => dispatchUpdateIsTimeline(value),
                    icon: TimerIcon,
                  },
                  {
                    name: 'isHeatMap',
                    value: isHeatMap,
                    onChange: (event, value) => dispatchUpdateIsHeatMap(value),
                    icon: WhatshotIcon,
                  },
                  {
                    name: 'isShowAllBlocks',
                    value: this.state.showBlocksValue,
                    onChange: (event, value) => this.setBlockAnimation(value),
                    icon: ViewComfyIcon,
                  },
                ]
              : []
          }
          keys={(key) => key.name}
          trail={100}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {(style, { name, value, onChange, icon, ...item }) => (
            <Grid item xs={12}>
              <Control
                classes={classes}
                name={name}
                value={value}
                onChange={onChange}
                icon={icon}
                style={style}
              />
            </Grid>
          )}
        </Transition>
        <Transition
          items={isFilters}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {(style, springIsFilters) =>
            springIsFilters && (
              <Grid item xs={12}>
                <Filters
                  filters={filters}
                  dispatchUpdateFilters={dispatchUpdateFilters}
                  classes={classes}
                  style={style}
                />
              </Grid>
            )
          }
        </Transition>
        <Transition
          items={isHeatMap}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {(style, springIsHeatMap) =>
            springIsHeatMap && (
              <Grid item xs={12}>
                <HeatMap classes={classes} style={style} />
              </Grid>
            )
          }
        </Transition>
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFilters: makeSelectIsFilters(),
  filters: makeSelectFilters(),
  isTimeline: makeSelectIsTimeline(),
  isHeatMap: makeSelectIsHeatMap(),
  isShowAllBlocks: makeSelectIsShowAllBlocks(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateIsFilters: (isFilters) =>
    dispatch(updateIsFilters.request(isFilters)),
  dispatchUpdateIsTimeline: (isTimeline) =>
    dispatch(updateIsTimeline.request(isTimeline)),
  dispatchUpdateIsHeatMap: (isHeatMap) =>
    dispatch(updateIsHeatMap.request(isHeatMap)),
  dispatchUpdateIsShowAllBlocks: (isShowAllBlocks) =>
    dispatch(updateIsShowAllBlocks.request(isShowAllBlocks)),
  dispatchUpdateFilters: (filters) => dispatch(updateFilters.request(filters)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(controlsStyle),
)(Controls);
