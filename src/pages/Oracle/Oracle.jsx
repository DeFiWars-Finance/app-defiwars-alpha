import React, { useEffect, useState } from "react";
import style from "./Oracle.css";
import appStyle from "../../App.module.css";
import Store from "../../store/store";
import { useActiveWeb3React } from 'hooks'

const store = Store.store;
const emitter = Store.emitter

const setInitialState = (initialValues = {}) => {

  const haveNFT = store.getStore("haveNFT");
  const isInWar = store.getStore("isInWar");
  const dwarf = store.getStore("dwarf");
  const darthLP = store.getStore("darthLP");
  const jediLP = store.getStore("jediLP");
  const NFTS = store.getStore("NFTs") || [];

  return({
    ...initialValues,
    haveNFT: haveNFT,
    isInWar: isInWar,
    dwarf: dwarf,
    jediLP: jediLP,
    darthLP: darthLP,
    NFTs: NFTS,
    JediPower: {
      pd: 0,
      pk: 0,
      ps: 0,
      pc: 0,
      ph: 0,
    },
    DarthPower: {
      pd: 0,
      pk: 0,
      ps: 0,
      pc: 0,
      ph: 0,
    },
  });
}

const Oracle = (props) => {

const { account } = useActiveWeb3React();

  const [state, setState] = useState(setInitialState({accountAddress: account}))


  const { haveNFT, NFTs, JediPower, jediLP, darthLP, DarthPower } = state;

  const calcPowers = () => {
    const { NFTs } = state
    var tempJediPower = {
      pd: 0,
      pk: 0,
      ps: 0,
      pc: 0,
      ph: 0,
    };

    NFTs.filter((NFT) => {
      if (NFT.side === 'jedi' && parseFloat(NFT.amount) > 0) {
        return true
      } else {
        return false
      }
    }).forEach((NFT) => {
      console.log('xxxxxxxxxxxxxx', NFT);
      tempJediPower.pd = Math.floor((tempJediPower.pd + parseFloat(NFT.amount) * NFT.pd) / (parseFloat(NFT.amount) + 1));
      tempJediPower.pk = Math.floor((tempJediPower.pk + parseFloat(NFT.amount) * NFT.pk) / (parseFloat(NFT.amount) + 1));
      tempJediPower.ps = Math.floor((tempJediPower.ps + parseFloat(NFT.amount) * NFT.ps) / (parseFloat(NFT.amount) + 1));
      tempJediPower.pc = Math.floor((tempJediPower.pc + parseFloat(NFT.amount) * NFT.pc) / (parseFloat(NFT.amount) + 1));
      tempJediPower.ph = Math.floor((tempJediPower.ph + parseFloat(NFT.amount) * NFT.ph) / (parseFloat(NFT.amount) + 1));
    });
    var tempDarthPower = {
      pd: 0,
      pk: 0,
      ps: 0,
      pc: 0,
      ph: 0,
    };

    NFTs.filter((NFT) => {
      if (NFT.side === 'darth' && parseFloat(NFT.amount) > 0) {
        return true
      } else {
        return false
      }
    }).forEach((NFT) => {
      console.log(NFT);
      tempDarthPower.pd = Math.floor((tempDarthPower.pd + parseFloat(NFT.amount) * NFT.pd) / (parseFloat(NFT.amount) + 1));
      tempDarthPower.pk = Math.floor((tempDarthPower.pk + parseFloat(NFT.amount) * NFT.pk) / (parseFloat(NFT.amount) + 1));
      tempDarthPower.ps = Math.floor((tempDarthPower.ps + parseFloat(NFT.amount) * NFT.ps) / (parseFloat(NFT.amount) + 1));
      tempDarthPower.pc = Math.floor((tempDarthPower.pc + parseFloat(NFT.amount) * NFT.pc) / (parseFloat(NFT.amount) + 1));
      tempDarthPower.ph = Math.floor((tempDarthPower.ph + parseFloat(NFT.amount) * NFT.ph) / (parseFloat(NFT.amount) + 1));
    });

    setState({...state,
      JediPower: tempJediPower,
      DarthPower: tempDarthPower,
    });
    console.log('tempJediPower', tempJediPower);
    console.log('tempDarthPower', tempDarthPower);
  };

  const balances = () => {
    const haveNFT = store.getStore("haveNFT");
    const isInWar = store.getStore("isInWar");
    const dwarf = store.getStore("dwarf");
    const NFTs = store.getStore("NFTs");
    const darthLP = store.getStore("darthLP");
    const jediLP = store.getStore("jediLP");
    setState({...state,
      accountAddress: account,
      haveNFT: haveNFT,
      isInWar: isInWar,
      dwarf: dwarf,
      darthLP: darthLP,
      jediLP: jediLP,
      NFTs: NFTs,
    })
    calcPowers();
  }


  const renderJediNFTs = () => {
    const { NFTs = []} = state

    return NFTs.filter(nft => {
      if (nft.side === 'jedi' && parseFloat(nft.amount) > 0) {
        return true
      } else {
        return false
      }
    }).map((nft) => renderNFT(nft))
  }

 const renderDarthNFTs = () => {
    const { NFTs } = state

    return NFTs.filter((nft) => {
      if (nft.side === 'darth' && parseFloat(nft.amount) > 0) {
        return true
      } else {
        return false
      }
    }).map((nft) => renderNFT(nft))
  }

  useEffect(() => {
    emitter.on('balances', balances);
    emitter.on('nbalances', balances);

    calcPowers();

    return () => {
      emitter.on('balances', balances);
      emitter.on('nbalances', balances);
    }
  }, [])


  const renderNFT = (nft) => {
    return (
      <div className={appStyle.nfblock}>
        <div className={appStyle.nfblockPower}>
          <span>Damage: {nft.pd}</span>
          <span>Kinetics: {nft.pk}</span>
          <span>Speed: {nft.ps}</span>
          <span>Conversion: {nft.pc}</span>
          <span>Healing: {nft.ph}</span>
          <span>{nft.suply}/{nft.total}</span>
        </div>
        <div className={appStyle.nfblockMine}>
          <span>{nft.amount}</span>
        </div>
        <img src={nft.logo} alt="" />
        <p>{nft.title}</p>
        <p className={nft.side}>{nft.price} <br />DWARF</p>

      </div>
    )
  }

  return (
    <div className={appStyle.container}>
      <div className={appStyle.flexrow}>
        <div className={appStyle.flexcol}>
          <div className={style.textcenter}>
            <div className={appStyle.nfblock}>
              <img src="img/jedi.png" alt="JEDI" />
              <p>{jediLP} <br /> JEDI/DWARF LP</p>
              <table>
                <tr><td>Damage</td><td>{JediPower.pd}</td></tr>
                <tr><td>Kinetics</td><td>{JediPower.pk}</td></tr>
                <tr><td>Speed</td><td>{JediPower.ps}</td></tr>
                <tr><td>Conversion</td><td>{JediPower.pc}</td></tr>
                <tr><td>Healing</td><td>{JediPower.ph}</td></tr>
              </table>
            </div>
          </div>

          {
            renderJediNFTs()
          }
        </div>
        <div className={appStyle.flexcol}>
          <div className={style.textcenter}>
            <div className={appStyle.nfblock}>
              <img src="img/dart.png" alt="DARTH" />
              <p>{darthLP} <br /> DARTH/DWARF LP</p>
              <table>
                <tr><td>Damage</td><td>{DarthPower.pd}</td></tr>
                <tr><td>Kinetics</td><td>{DarthPower.pk}</td></tr>
                <tr><td>Speed</td><td>{DarthPower.ps}</td></tr>
                <tr><td>Conversion</td><td>{DarthPower.pc}</td></tr>
                <tr><td>Healing</td><td>{DarthPower.ph}</td></tr>
              </table>

            </div>
          </div>
          {
            renderDarthNFTs()
          }
        </div>
      </div>
    </div>
  );
}

export default Oracle;
