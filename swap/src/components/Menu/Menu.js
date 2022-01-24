import React, { Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Switch, NavLink, Link } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import { slide as MenuMobile } from 'react-burger-menu';
import style from './Menu.module.css';

let styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    right: "36px",
    top: "60px",
  },

  bmBurgerBars: {
    background: "#fff",
    height: "3px",
  },
  bmBurgerBarsLastChild: {
    display: "none",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    top: 0,
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
    position: "relative",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    display: "flex",
    flexDirection: "column",
  },
  bmItem: {
    display: "inline-block",
    color: "#fff",
    fontSize: "24px",
    fontFamily: "Roboto",
    padding: "5px 0",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
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
  };

  onResize() {
    this.setState({
      width: window.innerWidth,
    });
  }

  componentWillMount() {
    this.onResize();
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.width < 768 ? (
          <MenuMobile styles={styles} right pageWrapId="root">
            <NavLink exact to="/What_is_DWARF">What is $DWARF?</NavLink>

            <a onClick={() => this.showHideDefi(!this.state.showDefi)}>
              DeFi Products
            </a>
            <Collapse isOpened={this.state.showDefi}>
              <div
                onMouseLeave={() => this.showHideDefi(false)}
                className={
                  this.state.showDefi
                    ? style.submenuMobile + " " + style.submenuActive
                    : style.submenuMobile
                }
              >
                <a href="/swap/#/pool">Polarized Liquidity Pools</a>
                <a href="/swap">DWARFSwap</a>
                <NavLink exact to="/NFA_Market">NFT Marketplace</NavLink>
                <NavLink exact to="/The_Army">My NFTs</NavLink>
              </div>
            </Collapse>

            <NavLink exact to="/About_the_Team">The Team</NavLink>

            <NavLink exact to="/Make_Contact">Make Contact</NavLink>
          </MenuMobile>
        ) : null}
        <div className={style.Menu}>
          <ul className={style.mainMenu}>
            <li>
              <NavLink exact to="/What_is_DWARF">What is $DWARF?</NavLink>
            </li>
            <li onMouseEnter={() => this.showHideDefi(true)}>
              {" "}
              <a>DeFi Products</a>
              <Collapse isOpened={this.state.showDefi}>
                <div
                  onMouseLeave={() => this.showHideDefi(false)}
                  className={
                    this.state.showDefi
                      ? style.submenu + " " + style.submenuActive
                      : style.submenu
                  }
                >
                  <a href="/swap/#/pool">Polarized Liquidity Pools</a>
                  <a href="/swap">DWARFSwap</a>
                  <NavLink exact to="/NFA_Market">NFT Marketplace</NavLink>
                  <NavLink exact to="/The_Army">My NFTs</NavLink>
                </div>
              </Collapse>
            </li>
            <li>
              <NavLink exact to="/About_the_Team">The Team</NavLink>
            </li>
            <li>
              <NavLink exact to="/Make_Contact">Make Contact</NavLink>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Menu;
