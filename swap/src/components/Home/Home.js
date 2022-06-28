import React from 'react';
import style from './Home.css';
import appStyle from '../../pages/App.module.css';
// import Footer from '../Footer/Footer';
// import Header from '../Header/Header';

class Home extends React.Component {
  render() {
    return (
      <div className={style.Sword}>
        <div className={appStyle.container}>
          <div className={style.text}>
            <p className='text'>
    	        DeFiWars Finance is an NFT(Non-Fungible Token)-based GameFi ecosystem,
    	    	  comprised of multiple digital assets, where users can accrue value via
              impermanent-loss-free PoLPs (Polarized Liquidity Pools), as well as be
              able to stake, claim/buy NFTs, and stake $DWARF to increase their individual
              APY, using proprietary consensus algorithm ‘PoLP’ (Proof-of-Liquidity Provisioning).
              Initially, DeFiWars Finance works with 3 different fungible tokens: $DWARF
              (native and governance token), $DARTH (utility token), and $JEDI (utility token).
	          </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
