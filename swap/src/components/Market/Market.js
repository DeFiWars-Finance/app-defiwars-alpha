import React from "react";
import style from "./Market.css";
import appStyle from "../../App.module.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Store from "../../store/store";

const store = Store.store;
const emitter = Store.emitter

class Market extends React.Component {
  constructor(props) {
    super(props);
    const accountAddress = store.getStore("accountAddress");
    const haveNFT = store.getStore("haveNFT");
    const isInWar = store.getStore("isInWar");
    const dwarf = store.getStore("dwarf");
    const opened = store.getStore("opened");
    const NFTs = store.getStore("NFTs");

    this.state = {
      accountAddress: accountAddress,
      haveNFT: haveNFT,
      isInWar: isInWar,
      dwarf: dwarf,
      opened: opened,
      NFTs: NFTs,
    };
    this.balances = this.balances.bind(this);
    this.nbalances = this.nbalances.bind(this);
    this.openclose = this.openclose.bind(this);
  }
  
    
  balances() {
    const accountAddress = store.getStore("accountAddress");
    const haveNFT = store.getStore("haveNFT");
    const isInWar = store.getStore("isInWar");
    const dwarf = store.getStore("dwarf");
    const opened = store.getStore("opened");
    const NFTs = store.getStore("NFTs");
    this.setState({
        accountAddress: accountAddress,
        haveNFT: haveNFT,
        isInWar: isInWar,
        dwarf: dwarf,
        opened: opened,
        NFTs: NFTs,
    })
    console.log("got new balances")
  }
  
  async nbalances() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const NFTs = store.getStore("NFTs");
    await this.setState({
        NFTs:NFTs,
    })
    console.log("got new NFT balances")
  }
  
  async stakeDwarf() {
      store.setReady(true);
      const accountAddress = store.getStore("accountAddress");
      const dwarfAddress = store.getStore("dwarfAddress");
      const dwarfABI = store.getStore("dwarfABI");
      const web3 = store.getStore("web3");
      const dwarfContract = new web3.eth.Contract(dwarfABI, dwarfAddress);

      const erc20ABI = store.getStore("erc20ABI");
      const dwarf20Address = store.getStore("dwarf20Address");

      let dwarf20Contract = new web3.eth.Contract(erc20ABI, dwarf20Address)

      var allowance = await dwarf20Contract.methods.allowance(accountAddress, dwarfAddress).call({ from: accountAddress, })
      const ethAllowance = parseFloat(allowance)/10**18;
      if(parseFloat(ethAllowance) < 3000) {
          await dwarf20Contract.methods.approve(dwarfAddress, web3.utils.toWei("999999999999999", "ether")).send({ from: accountAddress, })
      }

      try {
        var result = await dwarfContract.methods.openmarket().send({ from: accountAddress, });
      } catch(error) {
        store.setReady(false);
      }
      store.checkMarket();
      store.setReady(false);
  }

  async claimDwarf() {
      store.setReady(true);
      const accountAddress = store.getStore("accountAddress");
      const dwarfAddress = store.getStore("dwarfAddress");
      const dwarfABI = store.getStore("dwarfABI");
      const web3 = store.getStore("web3");
      const dwarfContract = new web3.eth.Contract(dwarfABI, dwarfAddress);
      try {
        var result = await dwarfContract.methods.closemarket().send({ from: accountAddress, });
      } catch(error) {
        store.setReady(false);
      }
      store.checkMarket();
      store.setReady(false);
  }
  
  async buyJediNFT(id) {
      store.setReady(true);
      const accountAddress = store.getStore("accountAddress");
      const dwarfAddress = store.getStore("dwarfAddress");
      const dwarfABI = store.getStore("dwarfABI");
      const web3 = store.getStore("web3");
      const dwarfContract = new web3.eth.Contract(dwarfABI, dwarfAddress);
      try {
        var result = await dwarfContract.methods.buyjedi(id).send({ from: accountAddress, });
        console.log(result);
      } catch(error) {
        store.setReady(false);
        console.log(error);
      }
      store.setReady(false);
      store.getBalances();
  }

  async buyDarthNFT(id) {
      store.setReady(true);
      const accountAddress = store.getStore("accountAddress");
      const dwarfAddress = store.getStore("dwarfAddress");
      const dwarfABI = store.getStore("dwarfABI");
      const web3 = store.getStore("web3");
      const dwarfContract = new web3.eth.Contract(dwarfABI, dwarfAddress);
      try {
        await dwarfContract.methods.buydarth(id).send({ from: accountAddress, })
          .on('confirmation', function(confirmationNumber, receipt){
            console.log(confirmationNumber, receipt);
            if(confirmationNumber == 1) {
              store.getBalances();
            }
          })
        console.log("done");
      } catch(error) {
        store.setReady(false);
        console.log(error);
      }
      store.setReady(false);
      store.getBalances();
  }


  componentWillMount() {
      emitter.on('balances', this.balances);
      emitter.on('nbalances', this.nbalances);
      emitter.on('opened', this.openclose);
  }
  
  componentWillUnmount() {
      emitter.on('balances', this.balances);
      emitter.on('nbalances', this.balances);
      emitter.on('opened', this.openclose);
  }
  
  openclose(opened) {
    this.setState({
        opened:opened,
    })
  };

  renderJediNFTs = (NFTs) => {

    return NFTs.filter((NFT) => {
      if(NFT.side === 'jedi') {
        return true
      } else {
        return false
      }
    }).map((NFT) => {
      return this.renderNFT(NFT)
    })
  }
  

  renderDarthNFTs = (NFTs) => {

    return NFTs.filter((NFT) => {
      if(NFT.side === 'darth') {
        return true
      } else {
        return false
      }
    }).map((NFT) => {
      return this.renderNFT(NFT)
    })
  }

  
  renderNFT = (NFT) => {
    var goto =  () => this.buyJediNFT(NFT.id);
    if(NFT.side === 'darth') {
      goto = () => this.buyDarthNFT(NFT.id);
    }
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

              <button onClick={goto}>Buy</button>
            </div>
    )
  }
  
  render() {
    const { accountAddress, opened, dwarf, NFTs } = this.state;
    return (
      <div className={style.Sword}>
        <Header />
        <div className={appStyle.container}>
{(() => {
    if (opened) {
      return (
        <div className={appStyle.flexcol}>
          <div className={appStyle.flexrow}>
            <div className={style.text}>
            {
              this.renderJediNFTs(NFTs)
            }
            </div>
            <div className={style.text}>
            {
              this.renderDarthNFTs(NFTs)
            }
            </div>
          </div>
          <div className={style.textcenter}>
            <div className={appStyle.nfblock}>
              <img src="img/market.png" alt="NFT Marketplace" />
              <p>{dwarf} <br />DWARF</p>

              <button onClick={this.claimDwarf}>Close NFT Marketplace</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
          <div className={style.textcenter}>
            <div className={appStyle.nfblock}>
              <img src="img/market.png" alt="NFT Marketplace" />
              <p>{dwarf} <br />DWARF</p>

              <button disabled={dwarf===0} onClick={this.stakeDwarf}>Open NFT Marketplace</button>
            </div>
          </div>
      )
    }
})()}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Market;