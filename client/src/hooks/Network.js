import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';

const supportedCompNetworks = [4];

function Network() {  
    
  const { chainId } = useWeb3React();

  const isValidCompNetwork = useMemo(() => {

    return supportedCompNetworks.includes(chainId);

  }, [chainId]);

  return { isValidNetwork: isValidCompNetwork };
}

export default Network;
