import { createTheme } from '@material-ui/core/styles';

const primaryColor = '#5244DF';
const secondaryColor = '#9E92AD';
const spacing = 10;

const theme = createTheme({
  variables: {},
  spacing,
  typography: {
    fontFamily: ['Open Sans'].join(','),
  },
  palette: {
    type: 'dark',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: primaryColor,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: secondaryColor,
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: 'none',
      },
    },
  },
});

export default theme;
