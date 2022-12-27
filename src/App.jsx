import './App.css';
import { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './contexts/AuthProvider'
import LoginSplash from './views/LoginSplash';
import Home from './views/Home';
import Profile from './views/Profile';
import SingleCity from './views/SingleCity';
import SingleZip from './views/SingleZip';
import Search from './views/Search';

export default function App() {
  const { login, logout, user } = useContext(AuthContext)

  return (
    <div className="App" id="app">
      <BrowserRouter>
        <nav id="navibar" className="navbar navbar-expand-lg px-3 pb-0">
          <div className="container-fluid">
            <ul id="left-nav" className="navbar-nav align-items-center gap-4">
              <li className="nav-item"><Link to="/" className="nav-link active link-light"><strong>Home</strong></Link></li>
              <li className="nav-item"><Link to="Search" className="nav-link active link-light"><strong>Weather Search</strong></Link></li>
            </ul>
            <ul id="right-nav" className="navbar-nav align-items-center gap-3">
              {
                (user.loggedIn) ?
                <>
                <li className="nav-item text-light"><strong>Logged in as:</strong></li>
                <li className="nav-item text-light"><Link to="/profile" id="current-user" className="nav-link active"><strong>{ user.username }</strong></Link></li>
                <li className="nav-item nav-link active ms-4"><button onClick={logout}  className="btn btn-danger"><strong>Logout</strong></button></li>
                </> :
                <>
                <li className="nav-item text-light"><strong>(Currently not logged in.)</strong></li>
                <li className="nav-item nav-link active"><button onClick={login} className="btn btn-warning"><strong>Login</strong></button></li>
                </>
              }
              <li className="text-white text-end" id="titlehead">
                <h2><strong>MerryWeather</strong>☀️</h2>
                <p>Powered by <a href="https://openweathermap.org/" target="_blank"><strong>OpenWeather</strong></a></p>
              </li>
            </ul>
          </div>
        </nav>
        <hr />

        <Routes>
          <Route path="/" element={-
            (user.loggedIn) ?
            <>
            <Home />
            </> :
            <>
            <LoginSplash />
            </>} />
          <Route path="/search" element={<Search />}/>
          <Route path="/weather">
            <Route path="city">
              <Route path=":cityName" element={<SingleCity />}/>
            </Route>
            <Route path="zip">
              <Route path=":zipCode" element={<SingleZip />}/>
            </Route>
          </Route>
          <Route path="/profile" element={
            (user.loggedIn) ?
            <>
            <Profile />
            </> :
            <>
            <LoginSplash />
            </>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
