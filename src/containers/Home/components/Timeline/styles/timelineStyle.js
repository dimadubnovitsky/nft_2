const timelineStyle = (theme) => ({
  root: {
    padding: '0 70px 0 20px',
  },
  timeline: {
    maxWidth: '80px',
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
  dateWrapperOutside: {
    display: 'flex',
  },
  date: {
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
});

export default timelineStyle;
