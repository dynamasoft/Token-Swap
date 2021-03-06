import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import { useTokenContext } from '../context/TokenContext';

const Wallet = () => {  
  
  const { active, library, account } = useWeb3React();
  const { ethBalance, setEthBalance } = useTokenContext();

  const fetchEthBalance = async () => {     
    
    if (library && active && account) 
    { 
      const balance = await library.getBalance(account);
      var convertedBal = parseFloat(formatEther(balance)).toPrecision(4);      
      setEthBalance(convertedBal);
    } 
    else 
    {
      setEthBalance('Not Initialized');
    }
  };

  return { ethBalance, fetchEthBalance };
};

export default Wallet;
