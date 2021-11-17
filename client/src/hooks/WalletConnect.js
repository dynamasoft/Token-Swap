import React from 'react';
import Button from 'react-bootstrap/Button';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../hooks/connectors';
import { shortenAddress } from '../utils/shortenAddress';


const WalletButton = () => {
  const { activate, active, account, deactivate } = useWeb3React();

  if (active) 
  {
    
    return (
      <div className="d-flex flex-row justify-content-between" style={{ width: 350 }}>        
        <div uppercase color="green" t3 lineHeight="40px" className="mx-4">
          {shortenAddress(account)}
        </div>
        <Button onClick={deactivate}>Log Out</Button>
      </div>
    );
  }

  return (
    <div>      
      <div uppercase color="green" t3 lineHeight="40px" className="mx-2">
        Metamask
      </div>      
      <Button onClick={() => activate(injected)}>Connect</Button>
    </div>
  );
};

export default WalletButton;
