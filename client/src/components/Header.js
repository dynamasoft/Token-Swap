import React,  { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useWeb3React } from '@web3-react/core';
import Wallet from '../hooks/Wallet';
import { SMTToken } from '../hooks/SMTToken';
import WalletConnect from '../hooks/WalletConnect';

const Header = () => {  
  const { account } = useWeb3React();
  const { fetchEthBalance, ethBalance } = Wallet();
  const { fetchSMTTokenBalance, fetchSMTTokenExchangeRate, SMTTokenBalance, exchangeRate }  =  SMTToken();

  useEffect(() => {    
    
    if (account) 
    {
      debugger;
      fetchEthBalance();     
      fetchSMTTokenBalance();
      fetchSMTTokenExchangeRate();
    }
  }, [account]);

  return (
    <Navbar className="justify-content-between">
    <div style={{ maxWidth: 300 }}>          
        ETH balance: {ethBalance}
    </div>
    <div style={{ maxWidth: 300 }}>          
        SMT balance: {SMTTokenBalance}
    </div>

    <div style={{ maxWidth: 300 }}>          
        SMT Exchange Rate: {exchangeRate}
    </div>



    <WalletConnect />
  </Navbar> 
  );
};

export default Header;
