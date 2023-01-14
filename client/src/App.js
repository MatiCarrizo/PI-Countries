import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import CreateActivity from './components/CreateActivity/CreateActivity';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route path='/home/:id' component={Detail} />
        <Route path='/createActivity' component={CreateActivity} />
      </div>
    </BrowserRouter>
  );
}

export default App;
