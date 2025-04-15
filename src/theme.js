import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // ...existing code...
  
  components: {
    // ...existing code...
    
    MuiButton: {
      styleOverrides: {
        root: {
          // Remove this section that's causing the issue
          // '.MuiAppBar-root &': {
          //   backgroundColor: 'white',
          //   color: '#2E7D32',
          //   '&:hover': {
          //     backgroundColor: '#f0f0f0',
          //   }
          // }
        }
      }
    },
    
    // ...existing code...
  }
});

export default theme;