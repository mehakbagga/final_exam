import './App.css';
import WelcomePage from './components/WelcomePage';
import AuctionShowPage from './components/AuctionShowPage';
import AuctionIndexPage from './components/AuctionIndexPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import AuctionNewPage from './components/AuctionNewPage';
import AuthRoute from './components/AuthRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import {useState, useEffect} from 'react'
import axios from 'axios';


function App() {
  
  const [user, setUser] = useState(null)
  const checkLoginStatus = () => {
    axios.get("http://localhost:3000/users/current", { withCredentials: true})
      .then(res => {
        if(res.data.user?.id) {
          setUser(res.data.user)
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(checkLoginStatus, [])

  const logInUser = (u) => {
    setUser(u)
  }

  const logUserOut = () => {
    setUser(null)
  }


  return (
    <BrowserRouter>
      <NavBar user={user} logUserOut={logUserOut}/>
      <Routes>
        <Route path="/" element={<WelcomePage />}/>
        <Route path="/auctions" element={<AuctionIndexPage user={user}/>}/>
        <Route path="/auctions/new" element={<AuthRoute isAllowed={!!user} component={<AuctionNewPage />}/>}>
        </Route>
        <Route path="/auctions/:id" element={<AuctionShowPage user={user}/>}/>
       
        <Route path="/sign_in" element={<SignInPage logInUser={logInUser}/>}/>
        <Route path="/sign_up" element={<SignUpPage logInUser={logInUser}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;