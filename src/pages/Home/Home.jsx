import React from "react";
import style from "./Home.css";

const Home = () => (
  <div className={style.text}>
    <p>
        DeFiWars Finance is an NFT(Non-Fungible Token)-based GameFi ecosystem,
        comprised of multiple digital assets, where users can accrue value via
        impermanent-loss-free LPs (Liquidity Pools), as well as be able to stake,
        swap and claim/buy NFTs to increase their individual APY, using proprietary
        consensus algorithm ‘PoLP’ (Proof-of-Liquidity Provision). DeFiWars Finance
        works with 3 different fungible tokens: $DWARF (native and governance token),
        $DARTH (utility token), and $JEDI (utility token); as well as with 2 types
        of NFTs: graphical, and non-graphical.
    </p>
    <p>
        To enroll in a Scheduled Warfare, you have to first provide some liquidity
        on one or more PoLPs (Polarised Liquidity Pools), depending if you want to
        support $JEDI or $DARTH. Be sure to mint your "WAR" ngNFT and then direct to
        DWARFSwap to find the appropriate PoLP. Remember that you can swap $BNB for
        $DWARF at any given point in time to satisfy your liquidity provisioning choice.
    </p>
  </div>
);

export default Home;
