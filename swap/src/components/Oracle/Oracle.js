import React from "react";
import style from "./Oracle.css";
import appStyle from "../../App.module.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Store from "../../store/store";

const store = Store.store;
const emitter = Store.emitter

class Oracle extends React.Component {
  constructor(props) {
    super(props);
    const accountAddress = store.getStore("accountAddress");
    const haveNFT = store.getStore("haveNFT");
    const isInWar = store.getStore("isInWar");
    const dwarf = store.getStore("dwarf");
    const darthLP = store.getStore("darthLP");
    const jediLP = store.getStore("jediLP");
    const NFTs = store.getStore("NFTs");

    this.state = {
      accountAddress:accountAddress,
      haveNFT:haveNFT,
      isInWar:isInWar,
      dwarf:dwarf,
      jediLP:jediLP,
      darthLP:darthLP,
      NFTs:NFTs,
      JediPower:{
          pd:0,
          pk:0,
          ps:0,
          pc:0,
          ph:0,
      },
      DarthPower:{
          pd:0,
          pk:0,
          ps:0,
          pc:0,
          ph:0,
      },
    };
    this.balances = this.balances.bind(this);
    this.calcPowers = this.calcPowers.bind(this);
    this.calcPowers();
  }
  
    
  async balances() {
    const accountAddress = store.getStore("accountAddress");
    const haveNFT = store.getStore("haveNFT");
    const isInWar = store.getStore("isInWar");
    const dwarf = store.getStore("dwarf");
    const NFTs = store.getStore("NFTs");
    const darthLP = store.getStore("darthLP");
    const jediLP = store.getStore("jediLP");
    await this.setState({
        accountAddress:accountAddress,
        haveNFT:haveNFT,
        isInWar:isInWar,
        dwarf:dwarf,
        darthLP:darthLP,
        jediLP:jediLP,
        NFTs:NFTs,
    })
    this.calcPowers();
  }
  
  async calcPowers()  {
    const { NFTs } = this.state
    var  tempJediPower = {
          pd:0,
          pk:0,
          ps:0,
          pc:0,
          ph:0,
      };

    await NFTs.filter((NFT) => {
      if(NFT.side === 'jedi' && parseFloat(NFT.amount) > 0) {
        return true
      } else {
        return false
      }
    }).map((NFT) => {
      console.log(NFT);
      tempJediPower.pd = Math.floor((tempJediPower.pd + parseFloat(NFT.amount)*NFT.pd) / (parseFloat(NFT.amount)+1));
      tempJediPower.pk = Math.floor((tempJediPower.pk + parseFloat(NFT.amount)*NFT.pk) / (parseFloat(NFT.amount)+1));
      tempJediPower.ps = Math.floor((tempJediPower.ps + parseFloat(NFT.amount)*NFT.ps) / (parseFloat(NFT.amount)+1));
      tempJediPower.pc = Math.floor((tempJediPower.pc + parseFloat(NFT.amount)*NFT.pc) / (parseFloat(NFT.amount)+1));
      tempJediPower.ph = Math.floor((tempJediPower.ph + parseFloat(NFT.amount)*NFT.ph) / (parseFloat(NFT.amount)+1));
    });
    var  tempDarthPower = {
          pd:0,
          pk:0,
          ps:0,
          pc:0,
          ph:0,
      };

    await NFTs.filter((NFT) => {
      if(NFT.side === 'darth' && parseFloat(NFT.amount) > 0) {
        return true
      } else {
        return false
      }
    }).map((NFT) => {
      console.log(NFT);
      tempDarthPower.pd = Math.floor((tempDarthPower.pd + parseFloat(NFT.amount)*NFT.pd) / (parseFloat(NFT.amount)+1));
      tempDarthPower.pk = Math.floor((tempDarthPower.pk + parseFloat(NFT.amount)*NFT.pk) / (parseFloat(NFT.amount)+1));
      tempDarthPower.ps = Math.floor((tempDarthPower.ps + parseFloat(NFT.amount)*NFT.ps) / (parseFloat(NFT.amount)+1));
      tempDarthPower.pc = Math.floor((tempDarthPower.pc + parseFloat(NFT.amount)*NFT.pc) / (parseFloat(NFT.amount)+1));
      tempDarthPower.ph = Math.floor((tempDarthPower.ph + parseFloat(NFT.amount)*NFT.ph) / (parseFloat(NFT.amount)+1));
    });
    
    await this.setState({
        JediPower:tempJediPower,
        DarthPower:tempDarthPower,
    }); 
    console.log(tempJediPower);
    console.log(tempDarthPower);
    console.log(this.state.JediPower, 'JediPower');
    console.log(this.state.DarthPower, 'DarthPower');
  }

  renderJediNFTs = () => {
    const { NFTs } = this.state

    return NFTs.filter((NFT) => {
      if(NFT.side === 'jedi' && parseFloat(NFT.amount) > 0) {
        return true
      } else {
        return false
      }
    }).map((NFT) => {
      return this.renderNFT(NFT)
    })
  }
  

  renderDarthNFTs = () => {
    const { NFTs } = this.state

    return NFTs.filter((NFT) => {
      if(NFT.side === 'darth' && parseFloat(NFT.amount) > 0) {
        return true
      } else {
        return false
      }
    }).map((NFT) => {
      return this.renderNFT(NFT)
    })
  }

  componentWillMount() {
      emitter.on('balances', this.balances);
      emitter.on('nbalances', this.balances);
  }
  
  componentWillUnmount() {
      emitter.on('balances', this.balances);
      emitter.on('nbalances', this.balances);
  }

  
  renderNFT = (NFT) => {
    return (
            <div className={appStyle.nfblock}>
              <div className={appStyle.nfblockPower}>
                <span>Damage: {NFT.pd}</span>
                <span>Kinetics: {NFT.pk}</span>
                <span>Speed: {NFT.ps}</span>
                <span>Conversion: {NFT.pc}</span>
                <span>Healing: {NFT.ph}</span>
                <span>{NFT.suply}/{NFT.total}</span>
              </div>
              <div className={appStyle.nfblockMine}>
                <span>{NFT.amount}</span>
              </div>
              <img src={NFT.logo} alt="" />
              <p>{NFT.title}</p>
              <p className={NFT.side}>{NFT.price} <br />DWARF</p>

            </div>
    )
  }

  render() {
    const { accountAddress, jediLP, darthLP, JediPower, DarthPower} = this.state;
    return (
      <div className={style.Sword}>
        <Header />
        <div className={appStyle.container}>
          <div className={appStyle.flexrow}>
            <div className={appStyle.flexcol}>
              <div className={style.textcenter}>
                <div className={appStyle.nfblock}>
                  <img src="img/jedi.png" alt="JEDI" />
                  <p>{jediLP} <br /> JEDI/DWARF PoLP</p>
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
              this.renderJediNFTs()
            }
            </div>
            <div className={appStyle.flexcol}>
              <div className={style.textcenter}>
                <div className={appStyle.nfblock}>
                  <img src="img/dart.png" alt="DARTH" />
                  <p>{darthLP} <br /> DARTH/DWARF PoLP</p>
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
              this.renderDarthNFTs()
            }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Oracle;
