import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' ></Route>
        <Route exact path='/home' ></Route>
        <Route path='/home/:id' ></Route>
        <Route path='/createActivity' ></Route>
        <h1>Henry Countries</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
