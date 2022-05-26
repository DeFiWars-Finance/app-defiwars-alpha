import { useActiveWeb3React } from "hooks";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsReady, setHaveNFT, setIsInWar,
  setEthBalance,
  setJediLPBalance,
  setDarthLPBalance,
  setDwarfBalance,
  setNFTs,
} from "state/user/actions";

import { AbiItem } from 'web3-utils'

import { NFT } from '../state/user/reducer';


import { provider } from 'web3-core';
import Web3 from 'web3';
import { AppState } from 'state'

export const useDefiwarsMin = () => {
  const { account, library, chainId } = useActiveWeb3React();

  const dispatch = useDispatch();
  const dwarfABI = useSelector((state: AppState) => state.user.dwarfABI);
  const mainNetId = useSelector((state: AppState) => state.user.mainNetId);
  const dwarfAddress = useSelector((state: AppState) => state.user.dwarfAddress);
  const lpjeiAddress = useSelector((state: AppState) => state.user.lpJediAddress);
  const lpDarthAddress = useSelector((state: AppState) => state.user.lpDarthAddress)
  const nftJediAddress = useSelector((state: AppState) => state.user.nftJediAddress)
  const nftDarthAddress = useSelector((state: AppState) => state.user.nftDarthAddress)
  const erc20ABI = useSelector((state: AppState) => state.user.erc20ABI);
  const erc1155ABI = useSelector((state: AppState) => state.user.erc1155ABI);
  const NFTs = useSelector((state: AppState) => state.user.NFTs)

  const web3 = useMemo(() => {
    if (library || window.ethereum)
      return new Web3((library ? library.provider : window.ethereum) as provider);
    return null;
  }, [library]);

  // Contracts
  const dwarfContract = useMemo(() => {
    if (dwarfABI && dwarfAddress && web3) {
      return new web3.eth.Contract(
        JSON.parse(JSON.stringify(dwarfABI)),
        dwarfAddress
      )
    }
    return null;
  }, [dwarfABI, dwarfAddress, web3])

  const jediContract = useMemo(() => {
    if (erc20ABI && lpjeiAddress && web3) {
      return new web3.eth.Contract(
        JSON.parse(JSON.stringify(erc20ABI)),
        lpjeiAddress
      )
    }
    return null;
  }, [erc20ABI, lpjeiAddress, web3])

  const darthContract = useMemo(() => {
    if (erc20ABI && lpDarthAddress && web3) {
      return new web3.eth.Contract(
        JSON.parse(JSON.stringify(erc20ABI)),
        lpDarthAddress
      )
    }
    return null;
  }, [erc20ABI, lpDarthAddress, web3])

  const nftJediContract = useMemo(() => {
    if (erc1155ABI && nftJediAddress && web3) {
      return new web3.eth.Contract(
        JSON.parse(JSON.stringify(erc1155ABI)),
        nftJediAddress
      )
    }
    return null;
  }, [erc1155ABI, nftJediAddress, web3])


  const nftDarthContract = useMemo(() => {
    if (erc1155ABI && nftDarthAddress && web3) {
      return new web3.eth.Contract(
        JSON.parse(JSON.stringify(erc1155ABI)),
        nftDarthAddress
      )
    }
    return null;
  }, [erc1155ABI, nftDarthAddress, web3])


  // get Balances functions
  const getEthBalance = useCallback(async () => {
    if (!web3 || !account) return;
    let balance = await web3.eth.getBalance(account);
    return parseFloat(balance) / 10 ** 18;

  }, [account, web3]);

  const getJediBalance = useCallback(async () => {
    if (!jediContract || !account) return 0;

    let balance = await jediContract.methods.balanceOf(account)
      .call({ from: account });

    return parseFloat(balance) / 10 ** 18;

  }, [jediContract, account]);

  const getDarhBalance = useCallback(async () => {
    if (!darthContract || !account) return 0;

    let balance = await darthContract.methods.balanceOf(account)
      .call({ from: account });

    return parseFloat(balance) / 10 ** 18;

  }, [darthContract, account]);

  const getDwarfBalance = useCallback(async () => {
    if (!dwarfContract || !account) return 0;

    let balance = await dwarfContract.methods.balanceOf(account)
      .call({ from: account });

    return parseFloat(balance) / 10 ** 18;

  }, [dwarfContract, account]);

  const getNftJediBalance = useCallback(async (nftId) => {
    if (!nftJediContract || !account || !nftId) return {
      amount: 0,
      suply: 0
    }

    const amount = await nftJediContract.methods.balanceOf(account, nftId)
      .call({ from: account });
    const suply = await nftJediContract.methods.totalSupply(nftId)
      .call({ from: account });

    return { amount, suply }

  }, [nftJediContract, account]);

  const getNftDarthBalance = useCallback(async (nftId) => {
    if (!nftDarthContract || !account || nftId) return {
      suply: 0,
      amount: 0
    }

    const amount = await nftDarthContract.methods.balanceOf(account, nftId)
      .call({ from: account });

    const suply = await nftDarthContract.methods.totalSupply(nftId)
      .call({ from: account });

    return { amount, suply };

  }, [nftDarthContract, account]);


  // onMint function
  const onMint = useCallback(async () => {
    if (!dwarfContract) return null;

    const mint = await dwarfContract.methods?.mint()?.send({ from: account, });

    console.log('Mint result', mint);
    return mint;
  }, [dwarfContract, account]);

  const checkHaveNFT = useCallback(async () => {
    if (!dwarfContract) return false;

    const haveNFT = await dwarfContract.methods.exists(account)
      .call({ from: account });

    return haveNFT;

  }, [dwarfContract, account])

  const checkIsInWar = useCallback(async () => {
    if (!dwarfContract) return false;

    const inWar = await dwarfContract.methods.isInWar(
      account
    ).call({ from: account });

    return inWar;
  }, [account, dwarfContract]);

  const checkNFT = useCallback(async () => {
    if (!dwarfContract) return;
    // the following lines are not needed since we have
    // the chainId variable
    // console.log('checkNFT',chainId);
    // web3.eth.net.getId().then( netId => console.log(netId) );

    const haveNFT = await checkHaveNFT();

    dispatch(setHaveNFT({
      haveNFT
    }));

    const isInWar = await checkIsInWar();

    dispatch(setIsInWar({
      isInWar
    }));

    // If the user is not in war it means is not ready
    dispatch(setIsReady({
      isReady: isInWar
    }));

    // get Balances
    // ETH balance
    const ethbalance = await getEthBalance() || 0;
    console.log(ethbalance);

    dispatch(setEthBalance({
      ethbalance: ethbalance
    }));

    // //JEDI balance
    const jedibalance = await getJediBalance() || 0;
    console.log('jedibalance', jedibalance);
    dispatch(setJediLPBalance({
      jediLP: jedibalance
    }));

    // //DARTH balance
    const darthbalance = await getDarhBalance() || 0;
    console.log('jedibalance', darthbalance);
    dispatch(setDarthLPBalance({
      darthLP: darthbalance
    }));

    // //DWARF balance
    const dwarfbalance = await getDwarfBalance() || 0;
    console.log('dwarfbalance', dwarfbalance);
    dispatch(setDwarfBalance({
      dwarf: dwarfbalance
    }));


    // Get NFT balances
    //
    const getNftBalances = async (nft:NFT): Promise<NFT> => {
      let balance = {};
      if (nft.side === 'jedi') {
        balance = await getNftJediBalance(nft.id)
      } else {
        balance = await getNftDarthBalance(nft.id)
      }
      console.log(`balance ${nft.side} for: ${nft.id}`, balance)

      return {
        ...nft,
        ...balance
      }
    }

    // Update Each NFT present in colletion
    const updatedNfts = await Promise.all(NFTs.map(getNftBalances))

    dispatch(setNFTs({
      NFTs: updatedNfts
    }));

    console.log(updatedNfts);

  }, [
    dwarfContract,
    getEthBalance,
    getJediBalance,
    getDarhBalance,
    getDwarfBalance,
    dispatch,
    checkHaveNFT,
    checkIsInWar,
    NFTs,
    getNftDarthBalance,
    getNftJediBalance
  ])

  return {
    onMint,
    checkNFT
  };
}
