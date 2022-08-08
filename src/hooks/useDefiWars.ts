import { useActiveWeb3React } from "hooks";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BigNumber } from "ethers";
import {
  setIsReady,
  setHaveNFT,
  setIsInWar,
  setEthBalance,
  setJediLPBalance,
  setDarthLPBalance,
  setDwarfBalance,
  setNFTs,
  setInProcess,
  setAuctionSuccess,
  setIsOpened,
  setIsStaked,
  setCanClaim,
} from "state/user/actions";

// import { AbiItem } from 'web3-utils'

import { NFT } from "../state/user/reducer";

import { provider } from "web3-core";
import Web3 from "web3";
import { AppState } from "state";

export const useDefiwars = () => {
  const { account, library, chainId } = useActiveWeb3React();

  const dispatch = useDispatch();

  const userState = useSelector((state: AppState) => state.user);
  const {
    dwarfABI,
    dwarfAddress,
    dwarf20Address,
    lpDarthAddress,
    lpJediAddress,
    nftJediAddress,
    nftDarthAddress,
    erc1155ABI,
    erc20ABI,
    NFTs,
    auctionAddress,
  } = userState;

  const web3 = useMemo(() => {
    if (library || window.ethereum) return new Web3((library ? library.provider : window.ethereum) as provider);
    return null;
  }, [library]);

  // Contracts
  const dwarfContract = useMemo(() => {
    if (dwarfABI && dwarfAddress && web3) {
      return new web3.eth.Contract(JSON.parse(JSON.stringify(dwarfABI)), dwarfAddress);
    }
    return null;
  }, [dwarfABI, dwarfAddress, web3]);

  const dwarf20Contract = useMemo(() => {
    if (erc20ABI && dwarf20Address && web3) {
      return new web3.eth.Contract(JSON.parse(JSON.stringify(erc20ABI)), dwarf20Address);
    }
    return null;
  }, [erc20ABI, dwarf20Address, web3]);

  const jediContract = useMemo(() => {
    if (erc20ABI && lpJediAddress && web3) {
      return new web3.eth.Contract(JSON.parse(JSON.stringify(erc20ABI)), lpJediAddress);
    }
    return null;
  }, [erc20ABI, lpJediAddress, web3]);

  const darthContract = useMemo(() => {
    if (erc20ABI && lpDarthAddress && web3) {
      return new web3.eth.Contract(JSON.parse(JSON.stringify(erc20ABI)), lpDarthAddress);
    }
    return null;
  }, [erc20ABI, lpDarthAddress, web3]);

  const nftJediContract = useMemo(() => {
    if (erc1155ABI && nftJediAddress && web3) {
      return new web3.eth.Contract(JSON.parse(JSON.stringify(erc1155ABI)), nftJediAddress);
    }
    return null;
  }, [erc1155ABI, nftJediAddress, web3]);

  const nftDarthContract = useMemo(() => {
    if (erc1155ABI && nftDarthAddress && web3) {
      return new web3.eth.Contract(JSON.parse(JSON.stringify(erc1155ABI)), nftDarthAddress);
    }
    return null;
  }, [erc1155ABI, nftDarthAddress, web3]);

  // get Balances functions
  const getEthBalance = useCallback(async () => {
    if (!web3 || !account) return;
    let balance = await web3.eth.getBalance(account);
    return parseFloat(balance) / 10 ** 18;
  }, [account, web3]);

  const getJediBalance = useCallback(async () => {
    if (!jediContract || !account) return 0;

    let balance = await jediContract.methods.balanceOf(account).call({ from: account });

    return parseFloat(balance) / 10 ** 18;
  }, [jediContract, account]);

  const getDarhBalance = useCallback(async () => {
    if (!darthContract || !account) return 0;

    let balance = await darthContract.methods.balanceOf(account).call({ from: account });

    return parseFloat(balance) / 10 ** 18;
  }, [darthContract, account]);

  const getDwarfBalance = useCallback(async () => {
    if (!dwarfContract || !account) return 0;

    let balance = await dwarfContract.methods.balanceOf(account).call({ from: account });

    return parseFloat(balance) / 10 ** 18;
  }, [dwarfContract, account]);

  const getNftJediBalance = useCallback(
    async (nftId) => {
      if (!nftJediContract || !account || !nftId)
        return {
          amount: 0,
          suply: 0,
        };

      const amount = await nftJediContract.methods.balanceOf(account, nftId).call({ from: account });
      const suply = await nftJediContract.methods.totalSupply(nftId).call({ from: account });

      return { amount, suply };
    },
    [nftJediContract, account]
  );

  const getNftDarthBalance = useCallback(
    async (nftId) => {
      if (!nftDarthContract || !account || nftId)
        return {
          suply: 0,
          amount: 0,
        };

      const amount = await nftDarthContract.methods.balanceOf(account, nftId).call({ from: account });

      const suply = await nftDarthContract.methods.totalSupply(nftId).call({ from: account });

      return { amount, suply };
    },
    [nftDarthContract, account]
  );

  // onMint function
  const onMint = useCallback(async () => {
    if (!dwarfContract) return null;
    if (!dwarf20Contract) return null;
    if (!web3) return null;

    // set status in inProcess
    dispatch(setInProcess({ inProcess: true }));
    try {
      // const ethAllowance = parseFloat(allowance)/10**18;
      // if(ethAllowance < 3000) {
      //   await dwarf20Contract.methods.approve(dwarfAddress, web3.utils.toWei('999999999999999', 'ether')).send({ from: account, })
      // }
      let allowance = await dwarf20Contract.methods.allowance(account, dwarfAddress).call({ from: account });
      let hodlamount = await dwarfContract.methods.hodlamount().call({ from: account });
      if (parseFloat(allowance) < parseFloat(hodlamount)) {
        await dwarf20Contract.methods
          .approve(dwarfAddress, BigNumber.from(hodlamount))
          .send({ from: account });
      }
      const mint = await dwarfContract.methods.openMarket().send({ from: account });
      await checkNFT();
      await checkMarket();
      dispatch(setInProcess({ inProcess: false }));
      return mint;
    } catch (error) {
      console.log("Mint error", error);
      dispatch(setInProcess({ inProcess: false }));
    }
  }, [dwarfContract, account, dwarf20Contract, web3]);

  const checkHaveNFT = useCallback(async () => {
    if (!dwarfContract) return false;

    const haveNFT = await dwarfContract.methods.exists(account).call({ from: account });

    return haveNFT;
  }, [dwarfContract, account]);

  const checkIsInWar = useCallback(async () => {
    if (!dwarfContract) return false;

    const inWar = await dwarfContract.methods.isInWar(account).call({ from: account });

    return inWar;
  }, [account, dwarfContract]);

  const checkNFT = useCallback(async () => {
    if (!dwarfContract) return;
    // the following lines are not needed since we have
    // the chainId variable
    // console.log('checkNFT',chainId);
    // web3.eth.net.getId().then( netId => console.log(netId) );

    const haveNFT = await checkHaveNFT();

    dispatch(
      setHaveNFT({
        haveNFT,
      })
    );

    const isInWar = await checkIsInWar();

    dispatch(
      setIsInWar({
        isInWar,
        inProcess: false,
      })
    );

    // If the user is not in war it means is not ready
    dispatch(
      setIsReady({
        isReady: isInWar,
      })
    );

    // get/update Balances
    // ETH balance
    const ethbalance = (await getEthBalance()) || 0;

    dispatch(
      setEthBalance({
        ethbalance: ethbalance,
      })
    );

    // //JEDI balance
    const jedibalance = (await getJediBalance()) || 0;
    dispatch(
      setJediLPBalance({
        jediLP: jedibalance,
      })
    );

    // //DARTH balance
    const darthbalance = (await getDarhBalance()) || 0;
    dispatch(
      setDarthLPBalance({
        darthLP: darthbalance,
      })
    );

    // //DWARF balance
    const dwarfbalance = (await getDwarfBalance()) || 0;
    dispatch(
      setDwarfBalance({
        dwarf: dwarfbalance,
      })
    );

    // Get NFT balances
    //
    const getNftBalances = async (nft: NFT): Promise<NFT> => {
      let balance = {};
      if (nft.side === "jedi") {
        balance = await getNftJediBalance(nft.id);
      } else {
        balance = await getNftDarthBalance(nft.id);
      }

      return {
        ...nft,
        ...balance,
      };
    };

    // Update Each NFT present in colletion
    const updatedNfts = await Promise.all(NFTs.map(getNftBalances));

    dispatch(
      setNFTs({
        NFTs: updatedNfts,
      })
    );

    // console.log(updatedNfts);
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
    getNftJediBalance,
  ]);

  const onWar = useCallback(async () => {
    if (!dwarfContract) return;
    if (!dwarf20Contract) return;
    dispatch(setInProcess({ inProcess: true }));

    try {
      let allowance = await dwarf20Contract.methods.allowance(account, dwarfAddress).call({ from: account });
      let hodlamount = await dwarfContract.methods.hodlamount().call({ from: account });
      if (parseFloat(allowance) < parseFloat(hodlamount)) {
        await dwarf20Contract.methods
          .approve(dwarfAddress, BigNumber.from(hodlamount))
          .send({ from: account });
      }
      const result = await dwarfContract.methods.openMarket().send({
        from: account,
      });
      dispatch(
        setIsInWar({
          isInWar: true,
          inProcess: false,
        })
      );
      checkNFT();
    } catch (error) {
      dispatch(
        setIsInWar({
          isInWar: false,
          inProcess: false,
        })
      );
    }
  }, [dwarfContract]);

  const onPeace = useCallback(async () => {
    if (!dwarfContract) return;
    dispatch(setInProcess({ inProcess: true }));

    try {
      const result = await dwarfContract.methods.closeMarket().send({
        from: account,
      });
      dispatch(
        setIsInWar({
          isInWar: false,
          inProcess: false,
        })
      );
      checkNFT();
      dispatch(setInProcess({ inProcess: false }));
    } catch (error) {
      console.log(error);
      dispatch(setInProcess({ inProcess: false }));
    }
  }, [dwarfContract]);

  const onDeposit = useCallback(
    async (bnbValue) => {
      if (!web3) return console.log("no web3 client connected");

      const isInWar = await checkIsInWar();

      if (!isInWar) return console.log("is not in war");

      if (!account) return console.log("no account active");

      try {
        const send = web3.eth.sendTransaction({
          from: account,
          to: auctionAddress,
        });

        dispatch(
          setAuctionSuccess({
            auctionSuccess: true,
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    [web3, account, auctionAddress]
  );

  const checkMarket = useCallback(async () => {
    if (!dwarfContract || !account) return console.log("No account or Contract found");

    try {
      const opened = await dwarfContract.methods.isInWar(account).call({ from: account });

      if (opened) {
        dispatch(
          setIsOpened({
            isOpened: true,
          })
        );
      }

      const staked = await dwarfContract.methods.stakedLP(account).call({ from: account });

      console.log("is staked:", staked);

      const stakedJediResponse = await dwarfContract.methods.stakeJediLP(account).call({ from: account });

      const stakedJedi = parseFloat(stakedJediResponse) / 10 ** 18;

      const stakedDarthResposne = await dwarfContract.methods.stakedDarth(account).call({ from: account });

      const stakedDarth = parseFloat(stakedDarthResposne) / 10 ** 18;

      dispatch(
        setIsStaked({
          isStaked: true,
          stakedJedi,
          stakedDarth,
        })
      );

      const canClaim = await dwarfContract.methods.canClaimNFT(account).call({ from: account });

      dispatch(
        setCanClaim({
          canClaim,
        })
      );
    } catch (error) {
      console.log("checkMarket Error: ", error);
    }
  }, [dwarfContract, account]);

  const buyJediNFT = useCallback(
    async (id) => {
      if (!dwarfContract) return console.log("no account active");
      try {
        const result = await dwarfContract.methods.buyJediNFT(id).send({
          from: account,
        });

        console.log(`Jedi NFT with ${id} has been buyed successfully`);

        // update balances
        checkHaveNFT();
      } catch (error) {
        console.log(`Error buying a jedi NFT ${id}`, error);
      }
    },
    [dwarfContract, account]
  );

  const buyDarthNFT = useCallback(
    async (id) => {
      if (!dwarfContract) return console.log("no account active");

      try {
        const result = await dwarfContract.methods
          .buyDarthNFT(id)
          .send({ from: account })
          .on("confirmation", (confirmationNumber, receipt) => {
            if (confirmationNumber === 1) {
              checkHaveNFT();
              console.log(`Darth NFT with ${id} has been buyed successfully`);
            }
          });
      } catch (error) {
        console.log(`Error buying a Dwarf NFT ${id}`, error);
      }
    },
    [dwarfContract, account]
  );

  const stakeDwarf = useCallback(async () => {
    if (!dwarfContract || !dwarf20Contract || !web3) return console.log("no account active");

    const allowance = await dwarf20Contract.methods.allowance(dwarfAddress).call({ from: account });

    let hodlamount = await dwarfContract.methods.hodlamount().call({ from: account });
    if (parseFloat(allowance) < parseFloat(hodlamount)) {
      await dwarf20Contract.methods
        .approve(dwarfAddress, BigNumber.from(hodlamount))
        .send({ from: account });
    }

    // const ethAllowance = parseFloat(allowance) / 10 ** 18;

    // if (ethAllowance < 3000) {
    //   await dwarf20Contract.methods.approve(
    //     dwarfAddress,
    //     web3.utils.toWei('999999999999999', 'ether')
    //   ).send({ from: account })
    // }

    try {
      const result = await dwarfContract.methods.openMarket().send({ from: account });

      checkMarket();
    } catch (error) {
      console.log("Error stakeDwarf", error);
    }
  }, [dwarfContract, dwarf20Contract, dwarfAddress, account, web3]);

  const claimDwarf = useCallback(async () => {
    if (!dwarfContract) return console.log("no account active");

    try {
      const result = await dwarfContract.methods.closeMarket().send({ from: account });

      // update status by calling checkMarket method
      checkMarket();
      console.log("claimDwarf", result);
    } catch (error) {
      //QUESTION: should we mark the isReady as false?
      console.error("claimDwarf", error);
    }
  }, [dwarfContract, account]);

  return {
    onMint,
    checkNFT,
    onWar,
    onPeace,
    onDeposit,
    checkMarket,
    buyJediNFT,
    stakeDwarf,
  };
};
