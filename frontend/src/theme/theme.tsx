import { Height, Padding } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';
import { over } from 'stompjs';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(60, 60, 211)',
    },
    secondary: {
      main: 'rgb(60, 60, 211, 0.2)',
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        asterisk: {
          display: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small"
      }
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiSelect-select': {
            border: 'none',
          },
        },
      },
    },
  },
});

export const chartPaperStyle = {
  padding: 3,
  backgroundColor: "#ffffff",
  borderRadius: 2,
};
export const paperStyle = {
  padding: 3,
  textAlign: "center",
  borderRadius: 2,
};

export const mealsBoxStyle = {
  width: '100%',
  height: '240px',
  overflowX: 'auto',
  overflowY: 'hidden',
  display: 'flex',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '1px',
  gap:'10px',
  padding: '5px',
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
};

export default theme;