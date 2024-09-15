import React, { useState, useEffect } from 'react';
import './App.css';
import { Home } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

type AgentType = {
  selectValue: number,
  name: string,
  responseEndPoint: string
}

export const App:React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
