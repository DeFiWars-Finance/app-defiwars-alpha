import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Parser from 'html-react-parser';
import Store from '../../store/store';
import appStyle from '../../pages/App.module.css';
import style from './Header.css';
import Menu from '../Menu/Menu';

const store = Store.store;
const emitter = Store.emitter

class Header extends React.Component {
  render() {
    return (
      <header className={appStyle.flexauto}>
        <div className={style.logo}>
          <NavLink exact to='/' className='logo'>
            <img src='img/sword-logo.png' alt='Home' />
          </NavLink>
        </div>

        <div className={appStyle.container}>
          <Menu />
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
