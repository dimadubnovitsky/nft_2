const timelineStyle = (theme) => ({
  root: {
    paddingLeft: '20px',
  },
  timeline: {
    width: '80px',
  },
  timelineSection: {
    width: '100%',
    cursor: 'pointer',
    padding: theme.spacing(0.5, 0),
  },
  timelineItem: {
    margin: theme.spacing(1, 0),
    backgroundColor: '#AFC7FF',
    borderRadius: '2px',
    '&:first-child, &:last-child': {
      margin: 0,
    },
  },
  thumb: {
    backgroundColor: 'transparent',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
    marginLeft: '15px !important',
    marginBottom: '0px !important',
  },
  rail: {
    backgroundColor: 'transparent',
  },
  track: {
    backgroundColor: 'transparent',
  },
  thumdWrapper: {
    width: 'max-content',
    flexDirection: 'column',
  },
  dateWrapper: {
    display: 'none',
    position: 'absolute',
    width: 'max-content',
    paddingLeft: '10px',
    left: '80px',
    top: '50%',
    transform: 'translate(0, -50%)',
    flexDirection: 'column',
  },
  dateWrapperCurrent: {
    display: 'flex',
  },
  dateWrapperOutsideTop: {
    display: 'flex',
    transform: 'translate(0, -85%)',
  },
  dateWrapperOutsideBot: {
    display: 'flex',
    transform: 'translate(0, -15%)',
  },
  date: {
    width: 'max-content',
    padding: '4px 0',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '500',
    fontSize: '10px',
    lineHeight: '12px',
    color: '#CCCCCC',
    textAlign: 'left',
  },
  arrowUp: {
    width: '20px',
    opacity: '0.6',
    marginLeft: '5px',
  },
  arrowDown: {
    width: '20px',
    opacity: '0.6',
    marginLeft: '5px',
    transform: 'rotate(180deg)',
  },
  thumdArrowUp: {
    width: '20px',
    opacity: '0.6',
    marginLeft: '-17px',
  },
  thumdArrowDown: {
    width: '20px',
    opacity: '0.6',
    marginLeft: '-17px',
    transform: 'rotate(180deg)',
  },
  thumb1: {
    bottom: '80.5% !important',
  },
  thumb2: {
    bottom: '73.5% !important',
  },
  thumb3: {
    bottom: '67% !important',
  },
  thumb4: {
    bottom: '60% !important',
  },
  thumb5: {
    bottom: '53.5% !important',
  },
  thumb6: {
    bottom: '47% !important',
  },
  thumb7: {
    bottom: '40% !important',
  },
  thumb8: {
    bottom: '33.5% !important',
  },
  thumb9: {
    bottom: '26.5% !important',
  },
  thumb10: {
    bottom: '20% !important',
  },
  thumb11: {
    bottom: '13% !important',
  },
});

export default timelineStyle;
