import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route} from 'react-router-dom'; 
import OnBoarding from './pages/OnBoarding';
import {useCookies} from 'react-cookie';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/onboarding" element={<OnBoarding/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
