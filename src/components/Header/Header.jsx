import React, { useEffect } from 'react';
import style from './Header.css';
import appStyle from '../../App.module.css';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import ConnectWallet from "../buttons/ConnectWallet";
import { useActiveWeb3React } from 'hooks'
import { useDefiwarsMin } from "hooks/useNFT";
import { useSelector } from 'react-redux';

const Header = () => {

  const { active } = useActiveWeb3React();

  const { onMint, checkNFT} = useDefiwarsMin();
  const isInWar = useSelector( state => state.user.isInWar);
  const ethBalance = useSelector( state => state.user.ethbalance);
  const jediLP = useSelector( state => state.user.jediLP);
  const darthLP = useSelector( state => state.user.darthLP);
  const dwarf = useSelector( state => state.user.dwarf);

  return (
    <header className={appStyle.flexauto}>
      <div className={style.logo}>
        <Link to='/'>
          <img src='/img/sword-logo.png' alt='Home' />
        </Link>
        <ConnectWallet sound />
      </div>
    <button onClick={onMint}> OnMint</button>
    <br />
    <span style={{color: 'white' }}>{`ethBalance: ${ethBalance}`}</span>
    <br />
    <span style={{color: 'white' }}>{`jediBalance: ${jediLP}`}</span>
    <br />
    <span style={{color: 'white' }}>{`darthBalance: ${darthLP}`}</span>
    <br />
    <span style={{color: 'white' }}>{`dwarfBalance: ${dwarf}`}</span>
    <br />
    <button onClick={checkNFT}>
    checkNFT
    </button>

      <div className={appStyle.container}>
        <Menu showMenu={active} />
      </div>
    </header>
  );
}

export default Header;
