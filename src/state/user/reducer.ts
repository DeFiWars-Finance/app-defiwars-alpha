import { createReducer } from '@reduxjs/toolkit'
import { INITIAL_ALLOWED_SLIPPAGE, DEFAULT_DEADLINE_FROM_NOW } from '../../constants'
import { updateVersion } from '../global/actions'
import {
  addSerializedPair,
  addSerializedToken,
  removeSerializedPair,
  removeSerializedToken,
  SerializedPair,
  SerializedToken,
  updateMatchesDarkMode,
  updateUserDarkMode,
  updateUserExpertMode,
  updateUserSlippageTolerance,
  updateUserDeadline,
  muteAudio,
  unmuteAudio,
  setNetId,
  setHaveNFT,
  setAccountAddress,
  setIsInWar,
  setIsReady,
  setEthBalance,
  setJediLPBalance,
  setDarthLPBalance,
  setDwarfBalance,
  setNFTs
} from './actions'

const currentTimestamp = () => new Date().getTime()

export interface Input {
  internalType?: string
  name?: string | undefined
  type?: string
  indexed?: boolean
}

export interface NFT {
  logo: string;
  title: string;
  id: number;
  price: number;
  side: string;
  pd: number;
  pk: number;
  ps: number;
  pc: number;
  ph: number;
  total: number;
  suply: number;
  amount: number;
}

export interface Output {
  internalType?: string;
  name?: string;
  type?: string;
}

export interface DwarfABI {
  inputs?: undefined | Input[]
  stateMutability?: string;
  type?: string;
  anonymous?: boolean;
  name?: string;
  outputs?: Output[];
}

export interface Erc20ABI {
  anonymous?: boolean;
  inputs?: Input[];
  name?: string;
  type?: string;
  outputs?: Output[];
  stateMutability?: string;
}

export interface Erc1155ABI {
  anonymous?: boolean;
  inputs?: Input[];
  name?: string;
  type?: string;
  outputs?: Output[];
  stateMutability?: string;
}

export interface UserState {
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number

  userDarkMode: boolean | null // the user's choice for dark mode or light mode
  matchesDarkMode: boolean // whether the dark mode media query matches

  userExpertMode: boolean

  // user defined slippage tolerance in bips, used in all txns
  userSlippageTolerance: number

  // deadline set by user in minutes, used in all txns
  userDeadline: number

  tokens: {
    [chainId: number]: {
      [address: string]: SerializedToken
    }
  }

  pairs: {
    [chainId: number]: {
      // keyed by token0Address:token1Address
      [key: string]: SerializedPair
    }
  }

  timestamp: number

  audioPlay: boolean
  nftDarthAddress: string
  nftJediAddress: string
  accountAddress: string | null
  netId: number | null
  haveNFT: boolean
  isInWar: boolean
  isReady: boolean
  jediLP: number
  darthLP: number
  dwarf: number
  ethbalance: number
  mainNetId: number | null
  dwarfAddress: string
  lpJediAddress: string
  lpDarthAddress: string
  dwarfABI: DwarfABI[]
  erc20ABI: Erc20ABI[]
  erc1155ABI: Erc1155ABI[]
  NFTs: NFT[]
}

function pairKey(token0Address: string, token1Address: string) {
  return `${token0Address};${token1Address}`
}

export const initialState: UserState = {
  userDarkMode: null,
  matchesDarkMode: false,
  userExpertMode: false,
  userSlippageTolerance: INITIAL_ALLOWED_SLIPPAGE,
  userDeadline: DEFAULT_DEADLINE_FROM_NOW,
  tokens: {},
  pairs: {},
  timestamp: currentTimestamp(),
  audioPlay: true,
  accountAddress: null,
  netId: null,
  haveNFT: false,
  isInWar: false,
  isReady: false,
  jediLP: 0,
  darthLP: 0,
  dwarf: 0,
  ethbalance: 0,
  mainNetId: 56,
  nftJediAddress: '0xa11D97bbaBb630DddDee556c714861A6601a4b6A',
  nftDarthAddress: '0x037454167Dd6C49f90F7c54E7A3632E3E6A809f5',
  dwarfAddress: '0x75d80714Bd5146796C7AaFe6bA32ae878768B165',
  lpJediAddress: '0xdad7ce09f6e5243fa5f0b64a48e4318c69eaf5b7',
  lpDarthAddress: '0xcda8906ca5b25c1664edaf6e57850238f4aa19db',
  dwarfABI: [{'inputs':[{'internalType':'address','name':'_DWARFToken','type':'address'},{'internalType':'address','name':'_DarthLPToken','type':'address'},{'internalType':'address','name':'_JediLPToken','type':'address'},{'internalType':'address','name':'_DarthNFT','type':'address'},{'internalType':'address','name':'_JediNFT','type':'address'},{'internalType':'address','name':'_JediToken','type':'address'},{'internalType':'address','name':'_DarthToken','type':'address'}],'stateMutability':'nonpayable','type':'constructor'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'owner','type':'address'},{'indexed':true,'internalType':'address','name':'approved','type':'address'},{'indexed':true,'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'Approval','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'owner','type':'address'},{'indexed':true,'internalType':'address','name':'operator','type':'address'},{'indexed':false,'internalType':'bool','name':'approved','type':'bool'}],'name':'ApprovalForAll','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'previousOwner','type':'address'},{'indexed':true,'internalType':'address','name':'newOwner','type':'address'}],'name':'OwnershipTransferred','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'from','type':'address'},{'indexed':true,'internalType':'address','name':'to','type':'address'},{'indexed':true,'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'Transfer','type':'event'},{'inputs':[],'name':'DWARFToken','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'DarthLPToken','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'DarthNFT','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'DarthToken','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'JediLPToken','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'JediNFT','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'JediToken','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'to','type':'address'},{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'approve','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'owner','type':'address'}],'name':'balanceOf','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'baseTokenURI','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'baseURI','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'burn','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'buydarth','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'buyjedi','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'canClaim','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'claim','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'closemarket','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'darthPower','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'exists','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'expiryDate','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'getApproved','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'getOwner','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'hodlamount','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'owner','type':'address'},{'internalType':'address','name':'operator','type':'address'}],'name':'isApprovedForAll','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'isInWar','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'isOpened','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'isOwner','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'jediPower','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'mint','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'name','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'openmarket','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'owner','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'ownerOf','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'peace','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'renounceOwnership','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'resetExpiryDate','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'from','type':'address'},{'internalType':'address','name':'to','type':'address'},{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'safeTransferFrom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'from','type':'address'},{'internalType':'address','name':'to','type':'address'},{'internalType':'uint256','name':'tokenId','type':'uint256'},{'internalType':'bytes','name':'_data','type':'bytes'}],'name':'safeTransferFrom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'operator','type':'address'},{'internalType':'bool','name':'approved','type':'bool'}],'name':'setApprovalForAll','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'string','name':'baseURI_','type':'string'}],'name':'setBaseURI','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_DWARFToken','type':'address'}],'name':'setDWARFToken','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_DarthLPToken','type':'address'}],'name':'setDarthLPToken','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_DarthNFT','type':'address'}],'name':'setDarthNFT','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_JediLPToken','type':'address'}],'name':'setJediLPToken','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_JediNFT','type':'address'}],'name':'setJediNFT','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'period','type':'uint256'}],'name':'stakeDarth','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'period','type':'uint256'}],'name':'stakeJedi','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'staked','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'stakedDarth','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'a','type':'address'}],'name':'stakedJedi','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'bytes4','name':'interfaceId','type':'bytes4'}],'name':'supportsInterface','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'symbol','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'tokenURI','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'from','type':'address'},{'internalType':'address','name':'to','type':'address'},{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'transferFrom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'newOwner','type':'address'}],'name':'transferOwnership','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'war','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_token','type':'address'},{'internalType':'uint256','name':'_amount','type':'uint256'}],'name':'withdrawToken','outputs':[],'stateMutability':'nonpayable','type':'function'}],
  erc20ABI: [{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'owner','type':'address'},{'indexed':true,'internalType':'address','name':'spender','type':'address'},{'indexed':false,'internalType':'uint256','name':'value','type':'uint256'}],'name':'Approval','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'from','type':'address'},{'indexed':true,'internalType':'address','name':'to','type':'address'},{'indexed':false,'internalType':'uint256','name':'value','type':'uint256'}],'name':'Transfer','type':'event'},{'inputs':[{'internalType':'address','name':'owner','type':'address'},{'internalType':'address','name':'spender','type':'address'}],'name':'allowance','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'spender','type':'address'},{'internalType':'uint256','name':'amount','type':'uint256'}],'name':'approve','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'account','type':'address'}],'name':'balanceOf','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'totalSupply','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'recipient','type':'address'},{'internalType':'uint256','name':'amount','type':'uint256'}],'name':'transfer','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'sender','type':'address'},{'internalType':'address','name':'recipient','type':'address'},{'internalType':'uint256','name':'amount','type':'uint256'}],'name':'transferFrom','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'nonpayable','type':'function'}],
  erc1155ABI: [{'inputs':[],'stateMutability':'nonpayable','type':'constructor'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'_owner','type':'address'},{'indexed':true,'internalType':'address','name':'_operator','type':'address'},{'indexed':false,'internalType':'bool','name':'_approved','type':'bool'}],'name':'ApprovalForAll','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'previousOwner','type':'address'},{'indexed':true,'internalType':'address','name':'newOwner','type':'address'}],'name':'OwnershipTransferred','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'_operator','type':'address'},{'indexed':true,'internalType':'address','name':'_from','type':'address'},{'indexed':true,'internalType':'address','name':'_to','type':'address'},{'indexed':false,'internalType':'uint256[]','name':'_ids','type':'uint256[]'},{'indexed':false,'internalType':'uint256[]','name':'_amounts','type':'uint256[]'}],'name':'TransferBatch','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'internalType':'address','name':'_operator','type':'address'},{'indexed':true,'internalType':'address','name':'_from','type':'address'},{'indexed':true,'internalType':'address','name':'_to','type':'address'},{'indexed':false,'internalType':'uint256','name':'_id','type':'uint256'},{'indexed':false,'internalType':'uint256','name':'_amount','type':'uint256'}],'name':'TransferSingle','type':'event'},{'anonymous':false,'inputs':[{'indexed':false,'internalType':'string','name':'_uri','type':'string'},{'indexed':true,'internalType':'uint256','name':'_id','type':'uint256'}],'name':'URI','type':'event'},{'inputs':[{'internalType':'address','name':'pool','type':'address'}],'name':'addLendingPool','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_owner','type':'address'},{'internalType':'uint256','name':'_id','type':'uint256'}],'name':'balanceOf','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address[]','name':'_owners','type':'address[]'},{'internalType':'uint256[]','name':'_ids','type':'uint256[]'}],'name':'balanceOfBatch','outputs':[{'internalType':'uint256[]','name':'','type':'uint256[]'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'_from','type':'address'},{'internalType':'uint256','name':'_id','type':'uint256'},{'internalType':'uint256','name':'_amount','type':'uint256'}],'name':'burn','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'contractURI','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_maxSupply','type':'uint256'},{'internalType':'uint256','name':'_price','type':'uint256'},{'internalType':'uint256','name':'pd','type':'uint256'},{'internalType':'uint256','name':'pk','type':'uint256'},{'internalType':'uint256','name':'ps','type':'uint256'},{'internalType':'uint256','name':'pc','type':'uint256'},{'internalType':'uint256','name':'ph','type':'uint256'}],'name':'create','outputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'','type':'uint256'}],'name':'creators','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'pool','type':'address'}],'name':'delLendingPool','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'getOwner','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'_owner','type':'address'},{'internalType':'address','name':'_operator','type':'address'}],'name':'isApprovedForAll','outputs':[{'internalType':'bool','name':'isOperator','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_id','type':'uint256'}],'name':'isExist','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'isOwner','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'','type':'address'}],'name':'isPool','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_id','type':'uint256'}],'name':'maxSupply','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_tokenId','type':'uint256'}],'name':'mint','outputs':[{'internalType':'uint256','name':'_tokenPrice','type':'uint256'}],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_to','type':'address'},{'internalType':'uint256','name':'_tokenId','type':'uint256'}],'name':'mintTo','outputs':[{'internalType':'uint256','name':'_tokenPrice','type':'uint256'}],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'name','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'owner','outputs':[{'internalType':'address','name':'','type':'address'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'account','type':'address'}],'name':'powerOf','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_id','type':'uint256'}],'name':'price','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'renounceOwnership','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_from','type':'address'},{'internalType':'address','name':'_to','type':'address'},{'internalType':'uint256[]','name':'_ids','type':'uint256[]'},{'internalType':'uint256[]','name':'_amounts','type':'uint256[]'},{'internalType':'bytes','name':'_data','type':'bytes'}],'name':'safeBatchTransferFrom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_from','type':'address'},{'internalType':'address','name':'_to','type':'address'},{'internalType':'uint256','name':'_id','type':'uint256'},{'internalType':'uint256','name':'_amount','type':'uint256'},{'internalType':'bytes','name':'_data','type':'bytes'}],'name':'safeTransferFrom','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_operator','type':'address'},{'internalType':'bool','name':'_approved','type':'bool'}],'name':'setApprovalForAll','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'string','name':'_newBaseMetadataURI','type':'string'}],'name':'setBaseMetadataURI','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'address','name':'_proxyRegistryAddress','type':'address'}],'name':'setProxyRegistryAddress','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'','type':'uint256'}],'name':'settings','outputs':[{'internalType':'uint256','name':'pd','type':'uint256'},{'internalType':'uint256','name':'pk','type':'uint256'},{'internalType':'uint256','name':'ps','type':'uint256'},{'internalType':'uint256','name':'pc','type':'uint256'},{'internalType':'uint256','name':'ph','type':'uint256'},{'internalType':'uint256','name':'pave','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'bytes4','name':'_interfaceID','type':'bytes4'}],'name':'supportsInterface','outputs':[{'internalType':'bool','name':'','type':'bool'}],'stateMutability':'pure','type':'function'},{'inputs':[],'name':'symbol','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'','type':'uint256'}],'name':'tokenMaxSupply','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'','type':'uint256'}],'name':'tokenPrice','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'','type':'uint256'}],'name':'tokenSupply','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'tokenId','type':'uint256'}],'name':'tokenURI','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'},{'inputs':[],'name':'totalExist','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'uint256','name':'_id','type':'uint256'}],'name':'totalSupply','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'},{'inputs':[{'internalType':'address','name':'newOwner','type':'address'}],'name':'transferOwnership','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[{'internalType':'uint256','name':'_id','type':'uint256'}],'name':'uri','outputs':[{'internalType':'string','name':'','type':'string'}],'stateMutability':'view','type':'function'}],
  NFTs: [
    {
      logo: 'img/YODWARF/YODWARF_iBW(MIAMI).png',
      title: 'YoDWARF MIAMI',
      id: 1,
      price: 333,
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
      price: 111,
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
      price: 66,
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
      price: 57,
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
      price: 48,
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
      price: 39,
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
      price: 30,
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
      price: 333,
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
      price: 111,
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
      price: 66,
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
      price: 57,
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
      price: 48,
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
      price: 39,
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
      price: 30,
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
      price: 333,
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
      price: 111,
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
      price: 66,
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
      price: 57,
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
      price: 48,
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
      price: 39,
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
      price: 30,
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
      price: 333,
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
      price: 111,
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
      price: 66,
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
      price: 57,
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
      price: 48,
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
      price: 39,
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
      price: 30,
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
  ]
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateVersion, state => {
      // slippage isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (typeof state.userSlippageTolerance !== 'number') {
        state.userSlippageTolerance = INITIAL_ALLOWED_SLIPPAGE
      }

      // deadline isnt being tracked in local storage, reset to default
      // noinspection SuspiciousTypeOfGuard
      if (typeof state.userDeadline !== 'number') {
        state.userDeadline = DEFAULT_DEADLINE_FROM_NOW
      }

      state.lastUpdateVersionTimestamp = currentTimestamp()
    })
    .addCase(updateUserDarkMode, (state, action) => {
      state.userDarkMode = action.payload.userDarkMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateMatchesDarkMode, (state, action) => {
      state.matchesDarkMode = action.payload.matchesDarkMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserExpertMode, (state, action) => {
      state.userExpertMode = action.payload.userExpertMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserSlippageTolerance, (state, action) => {
      state.userSlippageTolerance = action.payload.userSlippageTolerance
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserDeadline, (state, action) => {
      state.userDeadline = action.payload.userDeadline
      state.timestamp = currentTimestamp()
    })
    .addCase(addSerializedToken, (state, { payload: { serializedToken } }) => {
      state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {}
      state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken
      state.timestamp = currentTimestamp()
    })
    .addCase(removeSerializedToken, (state, { payload: { address, chainId } }) => {
      state.tokens[chainId] = state.tokens[chainId] || {}
      delete state.tokens[chainId][address]
      state.timestamp = currentTimestamp()
    })
    .addCase(addSerializedPair, (state, { payload: { serializedPair } }) => {
      if (
        serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address
      ) {
        const { chainId } = serializedPair.token0
        state.pairs[chainId] = state.pairs[chainId] || {}
        state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair
      }
      state.timestamp = currentTimestamp()
    })
    .addCase(removeSerializedPair, (state, { payload: { chainId, tokenAAddress, tokenBAddress } }) => {
      if (state.pairs[chainId]) {
        // just delete both keys if either exists
        delete state.pairs[chainId][pairKey(tokenAAddress, tokenBAddress)]
        delete state.pairs[chainId][pairKey(tokenBAddress, tokenAAddress)]
      }
      state.timestamp = currentTimestamp()
    })
    .addCase(muteAudio, state => {
      state.audioPlay = false
    })
    .addCase(unmuteAudio, state => {
      state.audioPlay = true
    })
    .addCase(setAccountAddress, (state, action) => {
      const { payload = null } = action;
      state.accountAddress = payload ? String(action.payload) : null
    })
    .addCase(setNetId, (state, action) => {
      state.netId = action.payload ? Number(action.payload) : null
    })
    .addCase(setHaveNFT, (state, { payload: { haveNFT } }) => {
      state.haveNFT = haveNFT;
    })
    .addCase(setIsInWar, (state, { payload: { isInWar } }) => {
      state.isInWar = isInWar;
    })
    .addCase(setIsReady, (state, { payload: { isReady } }) => {
      state.isReady = isReady;
    })
    .addCase(setEthBalance, (state, { payload: { ethbalance } }) => {
      state.ethbalance = ethbalance;
    })
    .addCase(setJediLPBalance, (state, { payload: { jediLP } }) => {
      state.jediLP = jediLP;
    })
    .addCase(setDarthLPBalance, (state, { payload: { darthLP } }) => {
      state.darthLP = darthLP;
    })
    .addCase(setDwarfBalance, (state, { payload: { dwarf } }) => {
      state.dwarf = dwarf;
    })

    .addCase(setNFTs, (state, { payload: { NFTs } }) => {
      state.NFTs = NFTs;
    })
)
