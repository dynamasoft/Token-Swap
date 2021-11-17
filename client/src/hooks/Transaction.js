import { useTokenContext } from '../context/TokenContext';

const Transaction = () => {
  
  const { setTxnStatus, txnStatus } = useTokenContext();  

  return { setTxnStatus, txnStatus };
};

export default Transaction;
