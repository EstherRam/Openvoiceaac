import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { SpeechProvider } from './contexts/SpeechContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CustomWordsProvider } from './contexts/CustomWordsContext';
import { HiddenWordsProvider } from './contexts/HiddenWordsContext';

function App() {
  return (
    <ThemeProvider>
      <CustomWordsProvider>
        <HiddenWordsProvider>
          <SpeechProvider>
            <RouterProvider router={router} />
          </SpeechProvider>
        </HiddenWordsProvider>
      </CustomWordsProvider>
    </ThemeProvider>
  );
}

export default App;
