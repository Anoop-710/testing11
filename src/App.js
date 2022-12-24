import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Footer from "./Components/Footer";
import TypingBox from "./Components/TypingBox";
import { useTheme } from "./Context/ThemeContext";
import { GlobalStyles } from "./Styles/global";
import { auth } from './firebaseConfig';
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import {Routes,Route} from 'react-router-dom';
import Alert from "./Components/Alert";
import { AlertContextProvider } from "./Context/AlertContext";


function App() {

  const { theme } = useTheme();
  return (

    <ThemeProvider theme={theme}>
    <GlobalStyles/>
      <Alert />
      <Routes>
        <Route path='/' element={<HomePage/>}   />
        <Route path='/user' element={<UserPage/>} />
      </Routes>
    </ThemeProvider>
    
  );
}

export default App;
