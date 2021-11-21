import { ContractFactory } from './ContractFactory';
import SMT_TOKEN_JSON from '../artifacts/contracts/SMT.sol/SMT.json';
import TOKEN_ADDRESS from '../artifacts/contracts/config.json';
import Network from './Network';
import { useWeb3React } from '@web3-react/core';
import { useTokenContext } from '../context/TokenContext';
import { formatUnits, parseEther } from '@ethersproject/units';
import { useEffect } from 'react';

export const SMTToken = () => {    

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

  const fetchSMTTokenExchangeRate = async () => {
    
    try {
      debugger;
      var rate = await SMTTokenContract.callStatic.getExchangeRate();
      rate = formatUnits(rate, 0);      
      return setExchangeRate(rate);
    } 
    
    catch (error) 
    {
      console.log(error);
      debugger;
    }
  };

  const deposit = async (amount) => {

    

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
        
        await fetchSMTTokenBalance();
     
        setTxnStatus('COMPLETE');

      } 
      
      catch (error) 
      {
        
        setTxnStatus('ERROR');
      }
    }
  };

  useEffect(() => 
  {
    if (account) 
    {
      fetchSMTTokenExchangeRate();
    }
  }, [account]);

  return {
    SMTTokenBalance,
    exchangeRate,
    fetchSMTTokenExchangeRate,
    fetchSMTTokenBalance,
    deposit,
  };
};
