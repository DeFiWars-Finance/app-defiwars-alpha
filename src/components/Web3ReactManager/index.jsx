import React, { useCallback, createContext, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useWeb3React } from '@web3-react/core'

import { NetworkContextName } from '../../constants'

import { injected } from "../connectors/index";

import { setAccountAddress, setNetId } from "../../state/user/actions";

const Web3ReactManagerContext = createContext(null);

export const Web3ReactManager = ({ children }) => {

  const dispatch = useDispatch();

  const netId = useSelector(state => {
    return state.user.netId
  });

  const accountAddress = useSelector(state => {
    return state.user.accountAddress
  });

  const {
    active,
    error,
    activate,
    deactivate,
    account,
    chainId,
    library,
  } = useWeb3React(NetworkContextName);

  const connect = useCallback(() => {
    activate(injected);
  }, [activate]);

  const disconnect = useCallback(() => {
    deactivate()
  }, [deactivate])

  const value = {
    active,
    error,
    account,
    connect,
    disconnect,
    library,
    netId,
    accountAddress,
  };

  useEffect(
    () => {
      dispatch(setAccountAddress(account));
    },
    [account]
  )

  useEffect(
    () => {
      dispatch(setNetId(chainId));
    },
    [chainId]
  )
  return (
    <Web3ReactManagerContext.Provider value={value}>
      {children}
    </Web3ReactManagerContext.Provider>
  );
}

export const useWeb3ReactManager = () => useContext(
  Web3ReactManagerContext
);
