import React, { useEffect, useMemo, useState } from 'react';
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { SMTToken } from '../hooks/SMTToken';
import { TokenCondiv } from '../context/TokenContext'
import Spinner from 'react-bootstrap/Spinner';
import Wallet from '../hooks/Wallet';
import Transaction from '../hooks/Transaction';

const Swap = () => {

  const [depositAmount, setDepositAmount] = useState(0);  

  const { deposit, cTokenBalance, exchangeRate } = SMTToken();

  const { ethBalance } = Wallet();

  const { txnStatus, setTxnStatus } = Transaction();
  
  const handleDepositSubmit = () => deposit(depositAmount);
  
  const convertedAmount = useMemo(() => Number(depositAmount / exchangeRate).toFixed(4), [depositAmount, exchangeRate]);  

  if (txnStatus === 'LOADING') {
    return (
      <Container show>
        <div>
          <Spinner animation="border" role="status" className="m-auto" />
        </div>
      </Container>
    );
  }

  if (txnStatus === 'COMPLETE') {
    return (
      <Container show>
        <div>
          <div block center className="mb-5">
            Txn Was successful!
          </div>
          <Button onClick={() => setTxnStatus('NOT_SUBMITTED')}>Go Back</Button>
        </div>
      </Container>
    );
  }

  if (txnStatus === 'ERROR') {
    return (
      <Container show>
        <div>
          <div>Txn ERROR</div>
          <Button onClick={() => setTxnStatus('NOT_SUBMITTED')}>Go Back</Button>
        </div>
      </Container>
    );
  }  
  
  return (
    <div>
      <div>
        <div block t2 className="mb-3">
          Deposit
        </div>        
        <input type="number" value={depositAmount} onChange={()=> setDepositAmount()} />        
        <input type="number" value={convertedAmount} />
        <Button className="mt-3" disabled={depositAmount <= 0} onClick={handleDepositSubmit}>Deposit {depositAmount} ETH</Button>
      </div>
    </div>
  );
};

export default Swap;
