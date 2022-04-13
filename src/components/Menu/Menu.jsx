import React from 'react';
import style from './Menu.module.css';
import { Collapse } from 'react-collapse';
import { NavLink } from 'react-router-dom';
import { slide as MenuMobile } from 'react-burger-menu';

let styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '36px',
    top: '60px',
  },
  bmBurgerBars: {
    background: '#fff',
    height: '3px',
  },
  bmBurgerBarsLastChild: {
    display: 'none',
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top: 0,
  },
  bmMenu: {
    background: '#e910ff',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    position: 'relative',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
    display: 'flex',
    flexDirection: 'column',
  },
  bmItem: {
    display: 'inline-block',
    color: '#f2ff00',
    fontSize: '24px',
    fontFamily: 'Roboto',
    padding: '5px 0',
  },
  bmOverlay: {
    background: 'rgba(50, 50, 150, 0.3)',
    top: 0,
  },
};

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showDefi: false,
        width: window.innerWidth,
    };
    this.showHideDefi = this.showHideDefi.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  showHideDefi = (value) => {
    this.setState({ showDefi: value });
  }

  onResize() {
    this.setState({
        width: window.innerWidth,
    });
  }

  componentWillMount() {
    this.onResize();
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    return (
      <React.Fragment> {
        this.state.width < 768 ? (
          <MenuMobile styles = { styles } right pageWrapId = { 'root' }>
            <NavLink exact to = '/What_is_DWARF'>What is DeFiWars?</ NavLink>
            <a onClick = { () => this.showHideDefi(!this.state.showDefi) }>
              DWARFSwap & Warzone
            </ a>
            <Collapse isOpened = { this.state.showDefi }>
              <div onMouseLeave = { () => this.showHideDefi(false) } className = { this.state.showDefi ? style.submenuMobile + ' ' + style.submenuActive : style.submenuMobile }>
                <a href='/swap'>DWARFSwap</ a>
                <a href='/swap/#/pool'>PoLPs</ a>
                <NavLink exact to='/NFA_Market'>Warzone Marketplace</ NavLink>
                <NavLink exact to='/The_Army'>My Power</ NavLink>
              </ div>
            </ Collapse>
            <NavLink exact to='/NFA_Collections'>Scheduled Warfare</ NavLink>
            <NavLink exact to='/About_the_Team'>The Team</ NavLink>
            <NavLink exact to='/Make_Contact'>Make Contact</ NavLink>
          </ MenuMobile>
        ) : null
      }
        <div className = { style.Menu }>
          <ul className = { style.mainMenu }>
            <li>
              <NavLink exact to='/What_is_DWARF'>What is DeFiWars?</ NavLink>
            </ li>
            <li onMouseEnter = { () => this.showHideDefi(true) }>
              {' '}
              <a>DWARFSwap & Warzone</a>
              <Collapse isOpened = { this.state.showDefi }>
                <div onMouseLeave = { () => this.showHideDefi(false) } className = { this.state.showDefi ? style.submenu + ' ' + style.submenuActive : style.submenu }>
                  <a href = '/swap'>DWARFSwap</a>
                  <a href = '/swap/#/pool'>PoLPs</a>
                  <NavLink exact to = '/NFA_Market'>Warzone Marketplace</ NavLink>
                  <NavLink exact to = '/The_Army'>My Power</ NavLink>
                </div>
              </ Collapse>
            </ li>
            <li>
              {' '}
              <NavLink exact to = '/NFA_Collections'>Scheduled Warfare</NavLink>
            </ li>
            <li>
              <NavLink exact to = '/About_the_Team'>The Team</NavLink>
            </ li>
            <li>
              <NavLink exact to = '/Make_Contact'>Make Contact</NavLink>
            </ li>
          </ ul>
        </ div>
      </ React.Fragment>
    );
  }
}

export default Menu;
