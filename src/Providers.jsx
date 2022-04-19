import React from 'react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { NetworkContextName } from './constants'
import getLibrary from './utils/getLibrary'
import { Provider } from 'react-redux'
import store from "./state";
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const Providers = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          {children}
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
};

export default Providers;
