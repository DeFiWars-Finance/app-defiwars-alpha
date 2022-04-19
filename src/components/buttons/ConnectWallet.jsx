import { useNavigate } from "react-router-dom";
import React from "react";
import { useWeb3ReactManager } from '../Web3ReactManager';
import useSound from "use-sound";
import bladeSound from "../../swap.mp3";
import Parser from 'html-react-parser';
import ConnectIcon from "../icons/connect";
import style from './ConnectWallet.css';
import { useSelector } from "react-redux";

const ConnectWallet = ({ sound }) => {

  const [playSound] = useSound(bladeSound);

  const navigate = useNavigate();

  const state = useSelector( state => state.user)

  const {
    accountAddress,
    haveNFT,
    inProcess,
    isInWar,
    loggedIn,
    mainNetId,
    netId,
  } = state;

  const {
    active,
    connect,
    disconnect,
    mint,
    peace,
    war,
  } = useWeb3ReactManager();

  const changeStatus = () => {
    if(!active) {
      if (sound)
        playSound();
      return connect();
    }

      if (accountAddress && netId === mainNetId) {
        if (loggedIn) {
          //This is the actual Key to access DeFiWars Finance
          if (haveNFT) {
            if (isInWar) {
              //This means to unstake $DWARF
              peace();
              navigate('/NFA_Market', { replace: true });
            }
            else {
              //This means to stake $DWARF
              war();

              navigate('/NFA_Collections', { replace: true });
            }
          }
          else {
            mint();
            navigate('/Liquidity_Pools', { navigate: true });
          }
        }
        else {
          return navigate('/login', { navigate: true });
        }
      } else {
        navigate('/', { replace: true });
        return disconnect();
      }

    navigate('/', { replace: true });
    return disconnect();
  }

  const getButtonText = () => {
    if (!accountAddress)
      return 'Connect<br />Wallet';

    if (netId !== mainNetId)
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
      <a onClick={changeStatus}>
        {Parser(getButtonText())}
      </a>
      <ConnectIcon width={100} height={32} />
    </div>
  )
};

export default ConnectWallet;
