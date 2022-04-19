import { useCallback, useState, useContext, createContext, useMemo, useEffect} from "react";

import { useWeb3React } from '@web3-react/core'

import { NetworkContextName } from '../constants'

import { injected } from "../components/connectors/index";

const StoreContext = createContext(null);


export const StoreProvider = ({ children }) => {



  const value = {
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};

