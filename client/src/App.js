import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppContextProvider } from "./context/TokenContext";
import Header from "./components/Header";
import Home from "./components/Home";
//import logo from "./logo.svg";
import "./App.css";

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

function App() {
  return (
    <AppContextProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <div>          
          <Header />
          <Router>
            <Route exact path="/" component={Home} />
          </Router>
        </div>
      </Web3ReactProvider>
    </AppContextProvider>
  );
}

export default App;
