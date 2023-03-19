import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#6bd4cd',
      darker: '#4aa39d',
    },
    neutral: {
      main: '#dfdfdf',
      contrastText: '#fff',
    },
  },
});

export default theme;
