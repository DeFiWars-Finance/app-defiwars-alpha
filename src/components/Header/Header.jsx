import React, { useEffect } from 'react';
import style from './Header.css';
import appStyle from '../../App.module.css';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import ConnectWallet from "../buttons/ConnectWallet";
import { useWeb3ReactManager } from '../Web3ReactManager';

const Header = () => {

  const { active } = useWeb3ReactManager();

  return (
    <header className={appStyle.flexauto}>
      <div className={style.logo}>
        <Link to='/'>
          <img src='/img/sword-logo.png' alt='Home' />
        </Link>
        <ConnectWallet sound />
      </div>

      <div className={appStyle.container}>
        <Menu showMenu={active} />
      </div>
    </header>
  );
}

export default Header;
