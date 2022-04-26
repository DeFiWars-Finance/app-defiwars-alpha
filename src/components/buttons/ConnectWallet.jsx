import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useWeb3ReactManager } from '../Web3ReactManager';
import { useWeb3React } from '@web3-react/core'

import { useActiveWeb3React } from 'hooks'
import { network } from '../../connectors';

import { NetworkContextName } from '../../constants';
import useSound from "use-sound";
import bladeSound from "../../swap.mp3";
import Parser from 'html-react-parser';
import { useWalletModal } from '@pancakeswap-libs/uikit'
import ConnectIcon from "../icons/connect";
import style from './ConnectWallet.css';
import { useSelector } from "react-redux";

import ConnectWalletButton from "../ConnectWalletButton";


import useAuth from '../../hooks/useAuth'

const ConnectWallet = ({ sound }) => {

  const { login, logout } = useAuth();
  const { onPresentConnectModal , onPresentAccountModal } = useWalletModal(login, logout)

  const [playSound] = useSound(bladeSound);

  const navigate = useNavigate();
  const location = useLocation();

  const state = useSelector(state => state.user)

  const {
    haveNFT,
    inProcess = false,
    isInWar = false,
    loggedIn = false,
    mainNetId,
  } = state;


  const { active, account, chainId } = useActiveWeb3React();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    active && playSound()
    if (active && from !== "/") {
      return navigate(from, { replace: true });
    }
  }, [active]);

  const getButtonText = () => {
    if (!account)
      return 'Connect<br />Wallet';

    if (chainId !== mainNetId)
      return 'Connect to <br /> BSC Mainnet';

    if (inProcess) {
      return 'processing <br /> ...';
    }

    if (!isInWar)
      return 'MINT my WAR <br />ngNFT';

    if (haveNFT && !isInWar)
      return 'Select PoLP <br />& Stake';

    if (haveNFT && isInWar)
      return 'MINT my PEACE <br />ngNFT';

    if (!haveNFT && !loggedIn && isInWar) {
      return 'LOGIN';
    }

  }

  return (
    <div className={style.connectWallet}>
      <a onClick={active ? onPresentAccountModal : onPresentConnectModal}>
        {Parser(getButtonText())}
      </a>
      <ConnectIcon width={100} height={32} />
    </div>
  )
};

export default ConnectWallet;
