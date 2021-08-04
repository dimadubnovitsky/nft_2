import React from 'react';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectHistory,
  makeSelectIsTimeline,
  makeSelectTimeline,
} from '../../../App/selectors';
import { withStyles } from '@material-ui/core';
import { updateTimeline } from '../../../App/actions';
import timelineStyle from './styles/timelineStyle';
import arrowUp from '../../../../images/arrow_up.svg';
import { Spring, animated } from 'react-spring';

const TimelineTransition = ({ classes, children, from, to, visible = true }) =>
  visible && (
    <Spring from={from} to={to}>
      {(style) => (
        <animated.div className={classes.timelineItem} style={style}>
          {children}
        </animated.div>
      )}
    </Spring>
  );

const timelineItemLevels = {
  default: {
    width: '22px',
    height: '3px',
    opacity: 0.3,
  },
  outside: {
    position: 'relative',
    width: '50px',
    height: '6px',
    opacity: 0.3,
  },
  level5: {
    width: '25px',
    height: '4px',
    opacity: 0.5,
  },
  level4: {
    width: '30px',
    height: '4px',
    opacity: 0.6,
  },
  level3: {
    width: '40px',
    height: '5px',
    opacity: 0.7,
  },
  level2: {
    width: '50px',
    height: '6px',
    opacity: 0.8,
  },
  level1: {
    width: '60px',
    height: '8px',
    opacity: 0.9,
  },
  current: {
    position: 'relative',
    width: '80px',
    height: '20px',
    opacity: 1,
  },
};

const FirstTimelineItem = ({
  classes,
  index,
  timeline,
  history,
  historyItem,
  dispatchUpdateTimeline,
}) => {
  const from = timelineItemLevels.default;
  let to = timelineItemLevels.default;

  if (index === timeline && index !== 0) {
    to = timelineItemLevels.level5;
  }
  if (index - timeline === 1 && timeline !== 0) {
    to = timelineItemLevels.level1;
  }
  if (index === 0) {
    to = timelineItemLevels.outside;
  }
  if (index === timeline && index === 0) {
    to = timelineItemLevels.current;
  }

  return (
    <TimelineTransition classes={classes} from={from} to={to}>
      <div
        className={classNames(classes.dateWrapper, {
          [classes.dateWrapperCurrent]: index === timeline && index === 0,
          [classes.dateWrapperOutside]: index === 0,
        })}
      >
        {index !== 0 && (
          <img
            src={arrowUp}
            className={classes.arrowUp}
            onClick={() => dispatchUpdateTimeline(index - 1)}
          />
        )}
        <div className={classes.date}>{historyItem.date}</div>
        <img
          src={arrowUp}
          className={classes.arrowDown}
          onClick={() => dispatchUpdateTimeline(index + 1)}
        />
      </div>
    </TimelineTransition>
  );
};

const SecondTimelineItem = ({
  classes,
  index,
  timeline,
  history,
  historyItem,
}) => {
  const from = timelineItemLevels.default;
  let to = timelineItemLevels.default;

  if (index === timeline && index !== 0) {
    to = timelineItemLevels.level4;
  }
  if (index - timeline === 1 && timeline !== 0) {
    to = timelineItemLevels.level2;
  }
  if (index === timeline && index === 0) {
    to = timelineItemLevels.level1;
  }

  return <TimelineTransition classes={classes} from={from} to={to} />;
};

const ThirdTimelineItem = ({
  classes,
  index,
  timeline,
  history,
  historyItem,
}) => {
  const from = timelineItemLevels.default;
  let to = timelineItemLevels.default;

  if (
    (index === timeline && index !== 0) ||
    (index - timeline === 1 && timeline !== 0)
  ) {
    to = timelineItemLevels.level3;
  }
  if (index === timeline && index === 0) {
    to = timelineItemLevels.level2;
  }

  return (
    <TimelineTransition
      classes={classes}
      from={from}
      to={to}
      visible={index === timeline || index - timeline === 1}
    />
  );
};

const FourthTimelineItem = ({
  classes,
  index,
  timeline,
  history,
  historyItem,
}) => {
  const from = timelineItemLevels.default;
  let to = timelineItemLevels.default;

  if (index === timeline && index !== 0) {
    to = timelineItemLevels.level2;
  }
  if (index - timeline === 1 && timeline !== 0) {
    to = timelineItemLevels.level4;
  }
  if (index === timeline && index === 0) {
    to = timelineItemLevels.level3;
  }

  return (
    <TimelineTransition
      classes={classes}
      from={from}
      to={to}
      visible={index === timeline || index - timeline === 1}
    />
  );
};

const FifthTimelineItem = ({
  classes,
  index,
  timeline,
  history,
  historyItem,
}) => {
  const from = timelineItemLevels.default;
  let to = timelineItemLevels.default;

  if (index === timeline && index !== 0) {
    to = timelineItemLevels.level1;
  }
  if (index - timeline === 1 && timeline !== 0) {
    to = timelineItemLevels.level5;
  }
  if (index === timeline && index === 0) {
    to = timelineItemLevels.level4;
  }

  return <TimelineTransition classes={classes} from={from} to={to} />;
};

const SixthTimelineItem = ({
  classes,
  index,
  timeline,
  history,
  historyItem,
  dispatchUpdateTimeline,
}) => {
  const from = timelineItemLevels.default;
  let to = timelineItemLevels.default;

  if (index === timeline && index === 0) {
    to = timelineItemLevels.level5;
  }
  if (index === history.length - 1) {
    to = timelineItemLevels.outside;
  }
  if (index === timeline && index !== 0) {
    to = timelineItemLevels.current;
  }

  return (
    <TimelineTransition classes={classes} from={from} to={to}>
      <div
        className={classNames(classes.dateWrapper, {
          [classes.dateWrapperCurrent]: index === timeline && index !== 0,
          [classes.dateWrapperOutside]: index === history.length - 1,
        })}
      >
        <img
          src={arrowUp}
          className={classes.arrowUp}
          onClick={() => dispatchUpdateTimeline(index - 1)}
        />
        <div className={classes.date}>{historyItem.date}</div>
        {index + 1 !== history.length && (
          <img
            src={arrowUp}
            className={classes.arrowDown}
            onClick={() => dispatchUpdateTimeline(index + 1)}
          />
        )}
      </div>
    </TimelineTransition>
  );
};

// TODO: Scale solution to infinite number of timelineItems. For now it works with limited amount of entries.
class TimeLine extends React.PureComponent {
  render() {
    const { classes, history, timeline, isTimeline, dispatchUpdateTimeline } =
      this.props;

    return (
      isTimeline && (
        <div className={classes.root}>
          <div className={classes.timeline}>
            {history.map((historyItem, index) => (
              <div
                className={classes.timelineSection}
                onClick={
                  timeline !== index && (() => dispatchUpdateTimeline(index))
                }
              >
                <FirstTimelineItem
                  classes={classes}
                  index={index}
                  timeline={timeline}
                  history={history}
                  historyItem={historyItem}
                  dispatchUpdateTimeline={dispatchUpdateTimeline}
                />
                <SecondTimelineItem
                  classes={classes}
                  index={index}
                  timeline={timeline}
                  history={history}
                  historyItem={historyItem}
                />
                <ThirdTimelineItem
                  classes={classes}
                  index={index}
                  timeline={timeline}
                  history={history}
                  historyItem={historyItem}
                />
                <FourthTimelineItem
                  classes={classes}
                  index={index}
                  timeline={timeline}
                  history={history}
                  historyItem={historyItem}
                />
                <FifthTimelineItem
                  classes={classes}
                  index={index}
                  timeline={timeline}
                  history={history}
                  historyItem={historyItem}
                />
                <SixthTimelineItem
                  classes={classes}
                  index={index}
                  timeline={timeline}
                  history={history}
                  historyItem={historyItem}
                  dispatchUpdateTimeline={dispatchUpdateTimeline}
                />
              </div>
            ))}
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = createStructuredSelector({
  history: makeSelectHistory(),
  timeline: makeSelectTimeline(),
  isTimeline: makeSelectIsTimeline(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateTimeline: (timeline) =>
    dispatch(updateTimeline.request(timeline)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(timelineStyle),
)(TimeLine);
