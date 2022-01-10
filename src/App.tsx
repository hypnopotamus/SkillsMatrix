import { ThemeProvider } from '@mui/material/styles';
import { theme } from './appTheme';
import TitleComparison from './pages/TitleComparison';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TitleComparison />
    </ThemeProvider>
  );
}

export default App;
