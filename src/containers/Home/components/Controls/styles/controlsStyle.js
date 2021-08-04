const controlsStyle = (theme) => ({
  control: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    '&:hover, &:active, &:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  controlChecked: {
    backgroundColor: 'rgba(175, 199, 255, 1)',
    '&:hover, &:active, &:focus': {
      backgroundColor: 'rgba(175, 199, 255, 0.8) !important',
    },
  },
  expandControlChecked: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    '&:hover, &:active, &:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.3) !important',
    },
  },
  filtersWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  filtersContent: {
    padding: '10px 20px 10px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    background: '#070B20',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
  },
  filterLabel: {
    fontSize: '13px',
    fontWeight: '600',
    lineHeight: '120%',
  },
  filterRoot: {
    margin: '0',
  },
  mapWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  mapContent: {
    width: '145px',
    background: '#070B20',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
  },
  mapTitle: {
    fontSize: '13px',
    fontWeight: '600',
    lineHeight: '120%',
    textAlign: 'start',
  },
  prices: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '130%',
    textAlign: 'start',
  },
  buttonCollapse: {
    paddingBottom: '10px',
  },
  buttonCollapseActive: {
    transform: 'rotate(180deg)',
  },
});

export default controlsStyle;
