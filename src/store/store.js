import React from 'react';
import Web3 from 'web3';

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

const getAccountsCallback = (
  updateAccountAddress,
) => (error, accounts) => {
  if (error) {
    const message = 'Cannot retrieve account data.';
  } else {
    const accountAddress = accounts.length === 0 ? null: accounts[0];
    updateAccountAddress(accountAddress);
    emitter.emit('enabled', accountAddress);
    console.log('enabled');
  }
};

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.store = {
      accountAddress: null,
      haveNFT: false,
      isInWar: false,
      loggedin: false,
      JWT: null,
      web3: null,
      netId: 0,
      mainNetId: 56,
      jediLP: 0,
      darthLP: 0,
      dwarf: 0,
      stakedDarth: 0,
      stakedJedi: 0,
      opened: false,
      staked: false,
      canClaim: false,
      nftJediAddress: '0xdf53a77Bfe29BeF8Ed5553E49235AfFCf8d1A59C',
      nftDarthAddress: '0xA23ac3C61127476F029d87827D04A1d2E0B17101',
      dwarf20Address: '0x33C29af05cA9aE21D8e1bf01Ad5adeFE7b2EE5Ff',
      dwarfAddress: '0x28b75eD75f96DD01b89d1D205054269a3b567700',
      lpJediAddress: '0xdad7ce09f6e5243fa5f0b64a48e4318c69eaf5b7',
      lpDarthAddress: '0xcda8906ca5b25c1664edaf6e57850238f4aa19db',
      auctionAddress: '0x9AD0197363c0f23b4c097F04A2577c15866696A6',
      dwarfABI: [{'inputs':[{'internalType':'address','name':'_DWARFToken','type':'address'},{'internalType':'address','name':'_DarthLPToken','type':'address'},{'internalType':'address','name':'_JediLPToken','type':'address'},{'internalType':'address','name':'_DarthNFT','type':'address'},{'internalType':'address','name':'_JediNFT','type':'address'},{'internalType':'address','name':'_JediToken','type':'address'},{'internalType':'address','name':'_DarthToken','type':'address'}],'stateMutability':'nonpayable','type':'constructor'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'owner','type':'address'},{'indexed':true,'internalType':'address','name':'approved','type':'address'},{'indexed':true,'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'Approval','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'owner','type':'address'},{'indexed':true,'internalType':'address','name':'operator','type':'address'},{'indexed':false,'internalType':'bool','name':'approved','type':'bool'}],'name':'ApprovalForAll','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'previousOwner','type':'address'},{'indexed':true,'internalType':'address','name':'newOwner','type':'address'}],'name':'OwnershipTransferred','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'from','type':'address'},{'indexed':true,'internalType':'address','name':'to','type':'address'},{'indexed':true,'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'Transfer','type':'event'},{'inputs':[],'name':'DWARFToken','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'DarthLPToken','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'DarthNFT','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'DarthToken','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'JediLPToken','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'JediNFT','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'JediToken','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'to','type':'address'},{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'approve','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'owner','type':'address'}],'name':'balanceOf','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'baseTokenURI','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'baseURI','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'burn','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'buydarth','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'buyjedi','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'canClaim','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'claim','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'closemarket','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'darthPower','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'exists','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'expiryDate','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'getApproved','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'getOwner','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'hodlamount','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'owner','type':'address'},{'internalType':'address','name':'operator','type':'address'}],'name':'isApprovedForAll','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'isInWar','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'isOpened','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'isOwner','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'jediPower','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'mint','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'name','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'openmarket','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'owner','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'ownerOf','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'peace','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'renounceOwnership','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'resetExpiryDate','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'from','type':'address'},{'internalType':'address','name':'to','type':'address'},{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'safeTransferFrom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'from','type':'address'},{'internalType':'address','name':'to','type':'address'},{'internalType':'uint256','name':'tokenId','type':'uint256'},{'internalType':'bytes','name':'_data','type':'bytes'}],'name':'safeTransferFrom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'operator','type':'address'},{'internalType':'bool','name':'approved','type':'bool'}],'name':'setApprovalForAll','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'string','name':'baseURI_','type':'string'}],'name':'setBaseURI','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_DWARFToken','type':'address'}],'name':'setDWARFToken','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_DarthLPToken','type':'address'}],'name':'setDarthLPToken','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_DarthNFT','type':'address'}],'name':'setDarthNFT','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_JediLPToken','type':'address'}],'name':'setJediLPToken','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_JediNFT','type':'address'}],'name':'setJediNFT','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'period','type':'uint256'}],'name':'stakeDarth','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'period','type':'uint256'}],'name':'stakeJedi','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'staked','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'stakedDarth','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'stakedJedi','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'bytes4','name':'interfaceId','type':'bytes4'}],'name':'supportsInterface','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'symbol','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'tokenURI','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'from','type':'address'},{'internalType':'address','name':'to','type':'address'},{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'transferFrom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'newOwner','type':'address'}],'name':'transferOwnership','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'war','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_token','type':'address'},{'internalType':'uint256','name':'_amount','type':'uint256'}],'name':'withdrawToken','outputs':[],'stateMutability':'nonpayable','type':'function'}],
      erc20ABI: [{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'owner','type':'address'},{'indexed':true,'internalType':'address','name':'spender','type':'address'},{'indexed':false,'internalType':'uint256','name':'value','type':'uint256'}],'name':'Approval','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'from','type':'address'},{'indexed':true,'internalType':'address','name':'to','type':'address'},{'indexed':false,'internalType':'uint256','name':'value','type':'uint256'}],'name':'Transfer','type':'event'},{'inputs':[{'internalType':'address','name':'owner','type':'address'},{'internalType':'address','name':'spender','type':'address'}],'name':'allowance','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'spender','type':'address'},{'internalType':'uint256','name':'amount','type':'uint256'}],'name':'approve','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'account','type':'address'}],'name':'balanceOf','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'totalSupply','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'recipient','type':'address'},{'internalType':'uint256','name':'amount','type':'uint256'}],'name':'transfer','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'sender','type':'address'},{'internalType':'address','name':'recipient','type':'address'},{'internalType':'uint256','name':'amount','type':'uint256'}],'name':'transferFrom','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'nonpayable','type':'function'}],
      erc1155ABI: [{'inputs':[],'stateMutability':'nonpayable','type':'constructor'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'_owner','type':'address'},{'indexed':true,'internalType':'address','name':'_operator','type':'address'},{'indexed':false,'internalType':'bool','name':'_approved','type':'bool'}],'name':'ApprovalForAll','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'previousOwner','type':'address'},{'indexed':true,'internalType':'address','name':'newOwner','type':'address'}],'name':'OwnershipTransferred','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'_operator','type':'address'},{'indexed':true,'internalType':'address','name':'_from','type':'address'},{'indexed':true,'internalType':'address','name':'_to','type':'address'},{'indexed':false,'internalType':'uint256[]','name':'_ids','type':'uint256[]'},{'indexed':false,'internalType':'uint256[]','name':'_amounts','type':'uint256[]'}],'name':'TransferBatch','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'_operator','type':'address'},{'indexed':true,'internalType':'address','name':'_from','type':'address'},{'indexed':true,'internalType':'address','name':'_to','type':'address'},{'indexed':false,'internalType':'uint256','name':'_id','type':'uint256'},{'indexed':false,'internalType':'uint256','name':'_amount','type':'uint256'}],'name':'TransferSingle','type':'event'},{'anonymous':false,'inputs':[{'indexed':false,'internalType':'string','name':'_uri','type':'string'},{'indexed':true,'internalType':'uint256','name':'_id','type':'uint256'}],'name':'URI','type':'event'},{'inputs':[{'internalType':'address','name':'pool','type':'address'}],'name':'addLendingPool','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_owner','type':'address'},{'internalType':'uint256','name':'_id','type':'uint256'}],'name':'balanceOf','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address[]','name':'_owners','type':'address[]'},{'internalType':'uint256[]','name':'_ids','type':'uint256[]'}],'name':'balanceOfBatch','outputs':[{'internalType':'uint256[]','name':'','type':'uint256[]'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'_from','type':'address'},{'internalType':'uint256','name':'_id','type':'uint256'},{'internalType':'uint256','name':'_amount','type':'uint256'}],'name':'burn','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'contractURI','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_maxSupply','type':'uint256'},{'internalType':'uint256','name':'_price','type':'uint256'},{'internalType':'uint256','name':'pd','type':'uint256'},{'internalType':'uint256','name':'pk','type':'uint256'},{'internalType':'uint256','name':'ps','type':'uint256'},{'internalType':'uint256','name':'pc','type':'uint256'},{'internalType':'uint256','name':'ph','type':'uint256'}],'name':'create','outputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'','type':'uint256'}],'name':'creators','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'pool','type':'address'}],'name':'delLendingPool','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'getOwner','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'_owner','type':'address'},{'internalType':'address','name':'_operator','type':'address'}],'name':'isApprovedForAll','outputs':[{'internalType':'bool','name':'isOperator','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_id','type':'uint256'}],'name':'isExist','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'isOwner','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'','type':'address'}],'name':'isPool','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_id','type':'uint256'}],'name':'maxSupply','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_tokenId','type':'uint256'}],'name':'mint','outputs':[{'internalType':'uint256','name':'_tokenPrice','type':'uint256'}],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_to','type':'address'},{'internalType':'uint256','name':'_tokenId','type':'uint256'}],'name':'mintTo','outputs':[{'internalType':'uint256','name':'_tokenPrice','type':'uint256'}],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'name','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'owner','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'account','type':'address'}],'name':'powerOf','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_id','type':'uint256'}],'name':'price','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'renounceOwnership','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_from','type':'address'},{'internalType':'address','name':'_to','type':'address'},{'internalType':'uint256[]','name':'_ids','type':'uint256[]'},{'internalType':'uint256[]','name':'_amounts','type':'uint256[]'},{'internalType':'bytes','name':'_data','type':'bytes'}],'name':'safeBatchTransferFrom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_from','type':'address'},{'internalType':'address','name':'_to','type':'address'},{'internalType':'uint256','name':'_id','type':'uint256'},{'internalType':'uint256','name':'_amount','type':'uint256'},{'internalType':'bytes','name':'_data','type':'bytes'}],'name':'safeTransferFrom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_operator','type':'address'},{'internalType':'bool','name':'_approved','type':'bool'}],'name':'setApprovalForAll','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'string','name':'_newBaseMetadataURI','type':'string'}],'name':'setBaseMetadataURI','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_proxyRegistryAddress','type':'address'}],'name':'setProxyRegistryAddress','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'','type':'uint256'}],'name':'settings','outputs':[{'internalType':'uint256','name':'pd','type':'uint256'},{'internalType':'uint256','name':'pk','type':'uint256'},{'internalType':'uint256','name':'ps','type':'uint256'},{'internalType':'uint256','name':'pc','type':'uint256'},{'internalType':'uint256','name':'ph','type':'uint256'},{'internalType':'uint256','name':'pave','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'bytes4','name':'_interfaceID','type':'bytes4'}],'name':'supportsInterface','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'pure','type':'function'},{'inputs':[],'name':'symbol','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'','type':'uint256'}],'name':'tokenMaxSupply','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'','type':'uint256'}],'name':'tokenPrice','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'','type':'uint256'}],'name':'tokenSupply','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'tokenURI','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'totalExist','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_id','type':'uint256'}],'name':'totalSupply','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'newOwner','type':'address'}],'name':'transferOwnership','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'_id','type':'uint256'}],'name':'uri','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'}],
      NFTs: [
        {
          logo: 'img/YODWARF/YODWARF_iBW(MIAMI).png',
          title: 'YoDWARF MIAMI',
          id: 1,
          price: 30000,
          side: 'jedi',
          pd: 100,
          pk: 100,
          ps: 100,
          pc: 100,
          ph: 100,
          total: 33,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/YODWARF/YODWARF_iBW(CLASSIC).png',
          title: 'YoDWARF CLASSIC',
          id: 2,
          price: 21000,
          side: 'jedi',
          pd: 75,
          pk: 100,
          ps: 50,
          pc: 50,
          ph: 100,
          total: 100,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/YODWARF/YODWARF_iBW(GOLD).png',
          title: 'YoDWARF GOLD',
          id:3,
          price: 12000,
          side: 'jedi',
          pd: 50,
          pk: 100,
          ps: 40,
          pc: 40,
          ph: 75,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/YODWARF/YODWARF_iBW(TURQUOISE).png',
          title: 'YoDWARF TURQUOISE',
          id: 4,
          price: 10363,
          side: 'jedi',
          pd: 45,
          pk: 100,
          ps: 35,
          pc: 35,
          ph: 70,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/YODWARF/YODWARF_iBW(PINK).png',
          title: 'YoDWARF PINK',
          id: 5,
          price: 8727,
          side: 'jedi',
          pd: 40,
          pk: 100,
          ps: 30,
          pc: 30,
          ph: 65,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/YODWARF/YODWARF_iBW(GREEN).png',
          title: 'YoDWARF GREEN',
          id: 6,
          price: 7090,
          side: 'jedi',
          pd: 35,
          pk: 100,
          ps: 25,
          pc: 25,
          ph: 60,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/YODWARF/YODWARF_iBW(BLUE).png',
          title: 'YoDWARF BLUE',
          id: 7,
          price: 5454,
          side: 'jedi',
          pd: 30,
          pk: 100,
          ps: 20,
          pc: 20,
          ph: 55,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/OBIDWARF/OBI_DWARF_3D(MIAMI).png',
          title: 'Obi-DWARF MIAMI',
          id: 8,
          price: 30000,
          side: 'jedi',
          pd: 100,
          pk: 100,
          ps: 100,
          pc: 100,
          ph: 100,
          total: 33,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/OBIDWARF/OBI_DWARF_3D(CLASSIC).png',
          title: 'Obi-DWARF CLASSIC',
          id: 9,
          price: 21000,
          side: 'jedi',
          pd: 100,
          pk: 75,
          ps: 75,
          pc: 100,
          ph: 75,
          total: 100,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/OBIDWARF/OBI_DWARF_3D(GOLD).png',
          title: 'Obi-DWARF GOLD',
          id: 10,
          price: 12000,
          side: 'jedi',
          pd: 100,
          pk: 70,
          ps: 70,
          pc: 95,
          ph: 70,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/OBIDWARF/OBI_DWARF_3D(TURQUOISE).png',
          title: 'Obi-DWARF TURQUOISE',
          id: 11,
          price: 10363,
          side: 'jedi',
          pd: 100,
          pk: 65,
          ps: 65,
          pc: 90,
          ph: 65,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/OBIDWARF/OBI_DWARF_3D(PINK).png',
          title: 'Obi-DWARF PINK',
          id: 12,
          price: 8727,
          side: 'jedi',
          pd: 100,
          pk: 60,
          ps: 60,
          pc: 85,
          ph: 60,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/OBIDWARF/OBI_DWARF_3D(GREEN).png',
          title: 'Obi-DWARF GREEN',
          id: 13,
          price: 7090,
          side: 'jedi',
          pd: 100,
          pk: 55,
          ps: 55,
          pc: 80,
          ph: 55,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/OBIDWARF/OBI_DWARF_3D(BLUE).png',
          title: 'Obi-DWARF BLUE',
          id: 14,
          price: 5454,
          side: 'jedi',
          pd: 100,
          pk: 50,
          ps: 50,
          pc: 75,
          ph: 50,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFVADER/DWARFVADER_iBW(MIAMI).png',
          title: 'DWARF Vader MIAMI',
          id: 1,
          price: 30000,
          side: 'darth',
          pd: 100,
          pk: 100,
          ps: 100,
          pc: 100,
          ph: 100,
          total: 33,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFVADER/DWARFVADER_iBW(CLASSIC).png',
          title: 'DWARF Vader CLASSIC',
          id: 2,
          price: 21000,
          side: 'darth',
          pd: 75,
          pk: 100,
          ps: 50,
          pc: 100,
          ph: 50,
          total: 100,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFVADER/DWARFVADER_iBW(RED).png',
          title: 'DWARF Vader RED',
          id: 3,
          price: 12000,
          side: 'darth',
          pd: 70,
          pk: 95,
          ps: 45,
          pc: 100,
          ph: 45,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFVADER/DWARFVADER_iBW(PURPLE).png',
          title: 'DWARF Vader PURPLE',
          id: 4,
          price: 10363,
          side: 'darth',
          pd: 65,
          pk: 90,
          ps: 40,
          pc: 100,
          ph: 40,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFVADER/DWARFVADER_iBW(TURQUOISE).png',
          title: 'DWARF Vader TURQUOISE',
          id: 5,
          price: 8727,
          side: 'darth',
          pd: 60,
          pk: 85,
          ps: 35,
          pc: 100,
          ph: 35,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFVADER/DWARFVADER_iBW(GREEN).png',
          title: 'DWARF Vader GREEN',
          id: 6,
          price: 7090,
          side: 'darth',
          pd: 55,
          pk: 80,
          ps: 30,
          pc: 100,
          ph: 30,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFVADER/DWARFVADER_iBW(PINK).png',
          title: 'DWARF Vader PINK',
          id: 7,
          price: 5454,
          side: 'darth',
          pd: 50,
          pk: 75,
          ps: 25,
          pc: 100,
          ph: 25,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFSITH/DWARFSITH_iBW(MIAMI).png',
          title: 'DWARF Sith MIAMI',
          id: 8,
          price: 30000,
          side: 'darth',
          pd: 100,
          pk: 100,
          ps: 100,
          pc: 100,
          ph: 100,
          total: 33,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFSITH/DWARFSITH_iBW(CLASSIC).png',
          title: 'DWARF Sith CLASSIC',
          id: 9,
          price: 21000,
          side: 'darth',
          pd: 100,
          pk: 75,
          ps: 100,
          pc: 50,
          ph: 50,
          total: 100,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFSITH/DWARFSITH_iBW(GREEN).png',
          title: 'DWARF Sith GREEN',
          id: 10,
          price: 12000,
          side: 'darth',
          pd: 100,
          pk: 70,
          ps: 95,
          pc: 45,
          ph: 45,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFSITH/DWARFSITH_iBW(PINK).png',
          title: 'DWARF Sith PINK',
          id: 11,
          price: 10363,
          side: 'darth',
          pd: 100,
          pk: 65,
          ps: 90,
          pc: 40,
          ph: 40,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFSITH/DWARFSITH_iBW(TURQUOISE).png',
          title: 'DWARF Sith TURQUOISE',
          id: 12,
          price: 8727,
          side: 'darth',
          pd: 100,
          pk: 60,
          ps: 85,
          pc: 35,
          ph: 35,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFSITH/DWARFSITH_iBW(GOLD).png',
          title: 'DWARF Sith GOLD',
          id: 13,
          price: 7090,
          side: 'darth',
          pd: 100,
          pk: 55,
          ps: 80,
          pc: 30,
          ph: 30,
          total: 400,
          suply: 0,
          amount: 0,
        },
        {
          logo: 'img/DWARFSITH/DWARFSITH_iBW(BLUE).png',
          title: 'DWARF Sith BLUE',
          id: 14,
          price: 5454,
          side: 'darth',
          pd: 100,
          pk: 50,
          ps: 75,
          pc: 25,
          ph: 25,
          total: 400,
          suply: 0,
          amount: 0,
        },
      ],
    };
    this.checkNFT = this.checkNFT.bind(this);
    this.checkNet = this.checkNet.bind(this);
    this.getBalances = this.getBalances.bind(this);
    this.checkMarket = this.checkMarket.bind(this);
    emitter.on('enabled', this.checkNFT);
    emitter.on('enabled', this.checkMarket);
  }

  getStore(index) {
    console.log(this.store[index], index);
    return(this.store[index]);
  }

  setStore(obj) {
    this.store = {...this.store, ...obj};
  }

  updateState(key) {
    return (value) => {
      this.setStore({ [key]: value });
    };
  }

  setReady(inproccess) {
    this.setStore({ inProcess: inproccess });
    emitter.emit('ready', inproccess);
  }

  setLogin(inproccess) {
    this.setStore({ loggedin: inproccess });
    emitter.emit('loggedin', inproccess);
    emitter.emit('ready', inproccess);
  }

  setJWT(JWT) { this.setStore({ JWT: JWT }); }

  async connect() {
    let web3;
    if (window.ethereum) { /* Modern dapp browsers... */
      web3 = new Web3(window.ethereum);
      this.setStore({ web3: web3 });
      try { /* Request account access if needed */
        await window.ethereum.enable();
        web3.eth.getAccounts(getAccountsCallback(this.updateState('accountAddress'), ), );
      } catch (error) {
        console.error(error);
      }
    } else if (window.web3) { /* Legacy dapp browsers... */
      web3 = new Web3(window.web3.currentProvider);
      this.setStore({ web3: web3 });
      try { /* Request account access if needed */
        await window.web3.currentProvider.enable();
        web3.eth.getAccounts(getAccountsCallback(this.updateState('accountAddress'), ), );
      } catch (error) {
        console.error(error);
      }
    }
  }

  async mint() {
    if (await this.checkNet()) {
      this.setReady(true);
      const accountAddress = this.getStore('accountAddress');
      const dwarfAddress = this.getStore('dwarfAddress');
      const dwarfABI = this.getStore('dwarfABI');
      const web3 = this.getStore('web3');
      const dwarfContract = new web3.eth.Contract(dwarfABI, dwarfAddress);
      try {
        var result = await dwarfContract.methods.mint().send({ from: accountAddress, });
        console.log(result);
      } catch (error) {
        this.setReady(false);
        console.error(error);
      }
      console.log(result);
      await this.checkNFT();
    } else {
    this.setReady(false);
    console.log(result);
    }
  }

  async deposit(bnbvalue) {
    console.log('deposit');
    if (await this.checkNet()) {
      console.log('setReady');
      this.setReady(true);
      const accountAddress = this.getStore('accountAddress');
      const auctionAddress = this.getStore('auctionAddress');
      const web3 = this.getStore('web3');
      console.log('web3');
      try {
        let send = web3.eth.sendTransaction({ from: accountAddress, to: auctionAddress, value: web3.utils.toWei(bnbvalue, 'ether') });
        emitter.emit('auction', true);
        console.log(send);
      } catch (error) {
        this.setReady(false);
        console.error(error);
      }
    } else {
      this.setReady(false);
      console.log('setReady', false);
    }
  }

  async peace() { /** User cannot engage in Scheduled Warfares */
    if (await this.checkNet()) {
      this.setReady(true);
      const accountAddress = this.getStore('accountAddress');
      const dwarfAddress = this.getStore('dwarfAddress');
      const dwarfABI = this.getStore('dwarfABI');
      const web3 = this.getStore('web3');
      const dwarfContract = new web3.eth.Contract(dwarfABI, dwarfAddress);
      try {
        var result = await dwarfContract.methods.peace().send({ from: accountAddress, });
          console.log(result);
        await this.checkNFT();
      } catch (error) {
        this.setReady(false);
        console.error(error);
      }
    } else {
      this.setReady(false);
      console.log(result);
    }
  }

  async war() { /** User can engage in Scheduled Warfares **/
    if (await this.checkNet()) {
      this.setReady(true);
      const accountAddress = this.getStore('accountAddress');
      const dwarfAddress = this.getStore('dwarfAddress');
      const dwarfABI = this.getStore('dwarfABI');
      const web3 = this.getStore('web3');
      const dwarfContract = new web3.eth.Contract(dwarfABI, dwarfAddress);
      try {
        var result = await dwarfContract.methods.war().send({ from: accountAddress, });
          console.log(result);
      } catch (error) {
        this.setReady(false);
        console.error(error);
      }
    } else {
      this.setReady(false);
    }
    console.log(result);
    await this.checkNFT();
  }

  async checkNet() {
    const web3 = this.getStore('web3');
    const mainNetId = this.getStore('mainNetId');
    var netId = await web3.eth.net.getId();
      await this.setStore({ netId: netId });
      emitter.emit('netId', netId);
      return(mainNetId === netId);
  }

  async checkNFT() { /* Check for WAR NFT, then check if NFTs are staking */
    const accountAddress =  this.getStore('accountAddress');
    const dwarfAddress =  this.getStore('dwarfAddress');
    const dwarfABI =  this.getStore('dwarfABI');
    const web3 =  this.getStore('web3');
    web3.eth.net.getId().then(netId => {
      console.log(netId);
      this.setStore({ netId: netId });
      emitter.emit('netId', netId);
    });
    var balance = await web3.eth.getBalance(accountAddress);
      balance = parseFloat(balance)/10**18;
      this.setStore({ ethbalance: parseFloat(balance) });
      console.log(balance);
    const dwarfContract = new web3.eth.Contract(dwarfABI, dwarfAddress);
    var havenft = await dwarfContract.methods.exists(accountAddress).call({ from: accountAddress, });
      if (havenft) {
        console.log(havenft);
        this.setStore({ haveNFT: havenft });
        emitter.emit('haveNFT', havenft);
        try {
          var isInWar = await dwarfContract.methods.isInWar(accountAddress).call({ from: accountAddress, });
          console.log(isInWar);
          await this.setStore({ isInWar: isInWar });
          emitter.emit('isInWar', isInWar);
        } catch (error) {
          this.setReady(false);
          console.error(error);
        }
      } else {
      await this.setStore({ haveNFT: havenft });
      this.getBalances();
      console.log(balance);
      }
  }

  async getBalances() {
    const accountAddress = this.getStore('accountAddress');
    const web3 = this.getStore('web3');
    const erc20ABI = this.getStore('erc20ABI');
    const lpJediAddress = this.getStore('lpJediAddress');
    const lpDarthAddress = this.getStore('lpDarthAddress');
    const dwarf20Address = this.getStore('dwarf20Address');
    let jediContract = new web3.eth.Contract(erc20ABI, lpJediAddress);
    var balance = await jediContract.methods.balanceOf(accountAddress).call({ from: accountAddress, });
      balance = parseFloat(balance)/10**18;
      await this.setStore({ jediLP: balance });
      console.log(balance);
    let darthContract = new web3.eth.Contract(erc20ABI, lpDarthAddress);
    balance = await darthContract.methods.balanceOf(accountAddress).call({ from:accountAddress, });
      balance = parseFloat(balance)/10**18;
      await this.setStore({ darthLP: balance });
      console.log(balance);
    let dwarf20Contract = new web3.eth.Contract(erc20ABI, dwarf20Address);
    balance = await dwarf20Contract.methods.balanceOf(accountAddress).call({ from: accountAddress, });
      balance = parseFloat(balance)/10**18;
      await this.setStore({ dwarf: balance });
      console.log(balance);
    emitter.emit('balances', '');
    this.getNFTBalances();
  }

  async getNFTBalances() {
    const accountAddress = this.getStore('accountAddress');
    const web3 = this.getStore('web3');
    const erc1155ABI = this.getStore('erc1155ABI');
    const NFTJediAddress = this.getStore('NFTJediAddress');
    const NFTDarthAddress = this.getStore('NFTDarthAddress');
    const NFTs = this.getStore('NFTs');
    let jediContract = new web3.eth.Contract(erc1155ABI, NFTJediAddress);
    let darthContract = new web3.eth.Contract(erc1155ABI, NFTDarthAddress);
    NFTs.map(async (NFT) => { /* Spelling must be improved ('suply' -> 'supply') */
      if (NFT.side === 'jedi') {
        NFT.suply = await jediContract.methods.totalSupply(NFT.id).call({ from: accountAddress, });
        NFT.amount = await jediContract.methods.balanceOf(accountAddress, NFT.id).call({ from: accountAddress, });
      } else {
        NFT.suply = await darthContract.methods.totalSupply(NFT.id).call({ from: accountAddress, });
        NFT.amount = await darthContract.methods.balanceOf(accountAddress, NFT.id).call({ from: accountAddress, });
      }
    });
    await this.setStore({ NFTs: NFTs });
    console.log('NFTs saved');
    emitter.emit('nbalances', '');
    console.log('nbalances');
  }

  async checkMarket() { /* 3,000 $DWARF staking */
    this.setReady(true);
    try {
      const accountAddress = this.getStore('accountAddress');
      const web3 = this.getStore('web3');
      const dwarfAddress = this.getStore('dwarfAddress');
      const dwarfABI = this.getStore('dwarfABI');
      const dwarfContract = new web3.eth.Contract(dwarfABI, dwarfAddress);
      var opened = await dwarfContract.methods.isOpened(accountAddress).call({ from: accountAddress, });
        if (opened) {
          console.log(opened);
          emitter.emit('opened', opened);
        } else {
          await this.setStore({ opened: opened });
        }
      var staked = await dwarfContract.methods.staked(accountAddress).call({ from: accountAddress, });
        if (staked) {
          console.log(staked);
          emitter.emit('staked', staked);
          var stakedJedi = await dwarfContract.methods.stakedJedi(accountAddress).call({ from: accountAddress, });
            stakedJedi = parseFloat(stakedJedi)/10**18;
            await this.setStore({ stakedJedi: stakedJedi });
          var stakedDarth = await dwarfContract.methods.stakedDarth(accountAddress).call({ from: accountAddress, });
            stakedDarth = parseFloat(stakedDarth)/10**18;
            await this.setStore({ stakedDarth: stakedDarth });
          var canClaim = await dwarfContract.methods.canClaim(accountAddress).call({ from:accountAddress, });
            await this.setStore({ canClaim: canClaim });
            console.log(canClaim);
        } else {
          await this.setStore({ staked: staked });
        }
    } catch (error) {
      this.setReady(false);
      console.error(error);
    }
  }
}

var store = new Store();

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  store: store,
  emitter: emitter,
};
