import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors';

const theme = createMuiTheme((theme)=>({
  palette: {
    primary: { 
      main: colors.PRIMARY,
    },
    secondary: {
      main: colors.SECONDARY
    }
  },
  typography:{
    fontFamily: `'Open Sans', sans-serif`
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform:'none'
      },
    },
    MuiTab:{
      root: {
        textTransform:'none'
      }
    }
  },
}));

export default theme