import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './css/custom-scrollbar.css'
import CssBaseLine from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import Home from './pages/Home'
import Board from './pages/Board'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  const theme = createTheme({
    palette: { mode: 'dark' }
  })


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://trello-backend-v1.onrender.com');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    const intervalId = setInterval(fetchData, 180000); // fetch data every 3 minutes

    return () => clearInterval(intervalId); // cleanup function to clear the interval
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='boards' element={<Home />} />
            <Route path='boards/:boardId' element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
