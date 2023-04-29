
import React from "react"
import './App.css';

import PortfolioContainer from './portfolioContainer/PortfolioContainer.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <PortfolioContainer></PortfolioContainer>
    </div>
  );
}

export default App;
