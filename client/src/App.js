import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
  
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import BoardPage from './components/views/BoardPage/BoardPage'
import Posting from './components/views/BoardPage/Posting'

function App() {
  return (
    <BrowserRouter>
      <div>  
        <Routes>
          <Route exact path="/" element = {<LandingPage/>}/>
          <Route exact path="/login" element = {<LoginPage/>}/>
          <Route exact path="/register" element = {<RegisterPage/>}/>
          <Route exact path="/board" element = {<BoardPage/>}/>
          <Route exact path="/posting" element = {<Posting/>}/>
        </Routes>
      </div>  
    </BrowserRouter>
  );
}

export default App;