import React, { useEffect, useState } from 'react';
import style from './Menu.module.css';
import { Collapse } from 'react-collapse';
import { Link } from 'react-router-dom';
import { slide as MenuMobile } from 'react-burger-menu';

const Menu = ({ showMenu }) => {
  const [state, setState] = useState({
    showDefi: false,
    width: window.innerHeight,
  });


  const showHideDefi = value => setState({ ...state, showDefi: value });

  const onResize = () => setState({ width: window.innerWidth })

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const { width, showDefi } = state;

  if(!showMenu) // prevent to show the menu if the flag is false
    return null;

  return (
    <> {
      width < 768 ? (
        <MenuMobile styles={style} right pageWrapId={'root'}>
          <Link exact to='/What_is_DWARF'>What is DeFiWars?</ Link>
            DWARFSwap & Warzone
          <Collapse isOpened={showDefi}>
            <div onMouseLeave={() => this.showHideDefi(false)} className={showDefi ? style.submenuMobile + ' ' + style.submenuActive : style.submenuMobile}>
              <a href='/swap'>DWARFSwap</ a>
              <a href='/swap/#/pool'>PoLPs</ a>
              <Link exact to='/NFA_Market'>Warzone Marketplace</ Link>
              <Link exact to='/The_Army'>My Power</ Link>
            </ div>
          </ Collapse>
          <Link exact to='/NFA_Collections'>Scheduled Warfare</ Link>
          <Link exact to='/About_the_Team'>The Team</ Link>
          <Link exact to='/Make_Contact'>Make Contact</ Link>
        </ MenuMobile>
      ) : null
    }
      <div className={style.Menu}>
        <ul className={style.mainMenu}>
          <li>
            <Link exact to='/What_is_DWARF'>What is DeFiWars?</ Link>
          </ li>
          <li onMouseEnter={() => showHideDefi(true)}>
            <Link to="#">DWARFSwap & Warzone</Link>
            <Collapse isOpened={showDefi}>
              <div onMouseLeave={() => showHideDefi(false)} className={showDefi ? style.submenu + ' ' + style.submenuActive : style.submenu}>
                <Link to='/swap'>DWARFSwap</Link>
                <Link to='/swap/pool'>PoLPs</Link>
                <Link to='/NFA_Market'>Warzone Marketplace</Link>
                <Link to='/The_Army'>My Power</Link>
              </div>
            </ Collapse>
          </ li>
          <li>
            <Link exact to='/NFA_Collections'>Scheduled Warfare</Link>
          </ li>
          <li>
            <Link exact to='/About_the_Team'>The Team</Link>
          </ li>
          <li>
            <Link exact to='/Make_Contact'>Make Contact</Link>
          </ li>
        </ ul>
      </ div>
    </>
  );
}

export default Menu;
