import { ContractFactory } from './ContractFactory';
import SMT_TOKEN_JSON from '../artifacts/contracts/SMT.sol/SMT.json';
import TOKEN_ADDRESS from '../artifacts/contracts/config.json';
import Network from './Network';
import { useWeb3React } from '@web3-react/core';
import { useTokenContext } from '../context/TokenContext';
import { formatUnits, parseEther } from '@ethersproject/units';
import { useEffect } from 'react';

export const SMTToken = () => {  

  debugger;

  const { account } = useWeb3React();
  
  const { isValidNetwork } = Network();
  
  const SMTTokenContractAddress = TOKEN_ADDRESS; 

  const SMTTokenContract = ContractFactory(SMTTokenContractAddress, SMT_TOKEN_JSON.abi);

  const { setSMTTokenBalance, setExchangeRate, setTxnStatus, SMTTokenBalance, exchangeRate } = useTokenContext();

  const fetchSMTTokenBalance = async () => 
  { 
    const SMTTokenBalance = await SMTTokenContract.balanceOf(account);
    setSMTTokenBalance(formatUnits(SMTTokenBalance, 8));
  };

  const getSMTTokenExchangeRate = async () => {
    
    try {
      
      return setExchangeRate(2);

    } 
    
    catch (error) 
    {
      console.log(error);
    }
  };

  const deposit = async (amount) => {

    debugger;

    if (account)// && isValidNetwork) 
    {    
      try 
      {
        setTxnStatus('LOADING');
        
        const txn = await SMTTokenContract.mint({
          from: account,
          value: parseEther(amount),
        });
     
        await txn.wait(1);
        debugger;
        await fetchSMTTokenBalance();
     
        setTxnStatus('COMPLETE');

      } 
      
      catch (error) 
      {
        debugger;
        setTxnStatus('ERROR');
      }
    }
  };

  useEffect(() => 
  {
    if (account) 
    {
      getSMTTokenExchangeRate();
    }
  }, [account]);

  return {
    SMTTokenBalance,
    exchangeRate,
    getSMTTokenExchangeRate,
    fetchSMTTokenBalance,
    deposit,
  };
};
