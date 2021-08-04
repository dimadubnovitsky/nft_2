import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectFilters,
  makeSelectIsFilters,
  makeSelectIsHeatMap,
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
import {
  updateFilters,
  updateIsFilters,
  updateIsHeatMap,
  updateIsTimeline,
} from '../../../App/actions';
import HearMapRangeImage from './assets/images/heatMapRange.png';
import controlsStyle from './styles/controlsStyle';

const Control = ({ classes, name, value, icon: Icon, onChange }) => (
  <Box paddingX={2} textAlign="right">
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

const Filters = ({ filters, dispatchUpdateFilters, classes }) => (
  <div className={classes.filtersWrapper}>
    <div className={classes.filtersContent}>
      {Object.keys(filters).map((key) => (
        <div>
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
  </div>
);

const HeatMap = ({ classes }) => (
  <div className={classes.mapWrapper}>
    <div className={classes.mapContent}>
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.mapTitle}>Block Price</div>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <img src={HearMapRangeImage} />
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
  </div>
);

class Controls extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      controls: false,
    };
  }

  onExpand = (value) => {
    this.setState({ controls: value });
    if (value === false) {
      this.props.dispatchUpdateIsFilters(value);
      this.props.dispatchUpdateIsTimeline(value);
      this.props.dispatchUpdateIsHeatMap(value);
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
        {this.state.controls && (
          <>
            <Grid item xs={12}>
              <Control
                classes={classes}
                name="isFilters"
                value={isFilters}
                onChange={(event, value) => {
                  dispatchUpdateIsFilters(value);
                }}
                icon={FilterListIcon}
              />
            </Grid>
            <Grid item xs={12}>
              <Control
                classes={classes}
                name="isTimeline"
                value={isTimeline}
                onChange={(event, value) => {
                  dispatchUpdateIsTimeline(value);
                }}
                icon={TimerIcon}
              />
            </Grid>
            <Grid item xs={12}>
              <Control
                classes={classes}
                name="isHeatMap"
                value={isHeatMap}
                onChange={(event, value) => {
                  dispatchUpdateIsHeatMap(value);
                }}
                icon={WhatshotIcon}
              />
            </Grid>
          </>
        )}
        {isFilters && (
          <Grid item xs={12}>
            <Filters
              filters={filters}
              dispatchUpdateFilters={dispatchUpdateFilters}
              classes={classes}
            />
          </Grid>
        )}
        {isHeatMap && (
          <Grid item xs={12}>
            <HeatMap classes={classes} />
          </Grid>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFilters: makeSelectIsFilters(),
  filters: makeSelectFilters(),
  isTimeline: makeSelectIsTimeline(),
  isHeatMap: makeSelectIsHeatMap(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateIsFilters: (isFilters) =>
    dispatch(updateIsFilters.request(isFilters)),
  dispatchUpdateIsTimeline: (isTimeline) =>
    dispatch(updateIsTimeline.request(isTimeline)),
  dispatchUpdateIsHeatMap: (isHeatMap) =>
    dispatch(updateIsHeatMap.request(isHeatMap)),
  dispatchUpdateFilters: (filters) => dispatch(updateFilters.request(filters)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(controlsStyle),
)(Controls);
