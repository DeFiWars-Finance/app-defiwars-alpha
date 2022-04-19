import React, { useMemo } from "react";
import style from "./Sword.module.css";
import appStyle from "../../App.module.css";
import Parser from 'html-react-parser';
import ConnectIcon from "../../components/icons/connect";
import SwordIcon from "../../components/icons/sword";

import { useDispatch, useSelector  } from "react-redux";
import { setAccountAddress } from "../../state/user/actions";

const Sword = () => {

  const dispatch = useDispatch();

  const accountAddress = useSelector(
    state => state.user.accountAddress
  );

  const connect = () => {}

  const showSword = useMemo(() => accountAddress != null, [accountAddress]);

  let connectButton = "Connect<br /> Wallet";

  var address = "";
  if (accountAddress) {
    address = accountAddress.substring(0, 6) + '...' + accountAddress.substring(accountAddress.length - 4, accountAddress.length)
  }
  if (accountAddress) {
    connectButton = "<br />" + address;
  }

  return (
    <>
        <div className={style.mobileSword}>
          <div className={style.mobileSwordWrapper}>
            <img
              src="img/blade-mobile.png"
              className={
                showSword
                  ? style.mobileSwordBladeActive
                  : style.mobileSwordBlade
              }
              alt="Light Saber"
            />
            <img
              src="img/handle-mobile.png"
              className={style.mobileSwordHandle}
              alt="Light Saber Handle"
            />
          </div>
        </div>

        <div className={style.mainSword}>
          <img
            className={style.handle}
            src="img/handle.png"
            alt="Light Saber Handle" />
          <img
            className={showSword ? style.activeSword : style.blade}
            src="img/blade.png"
            alt="Light Saber" />
        </div>

      <div className={appStyle.container}>
        <div className={style.mainConnectWallet}>
          <div>
            <div className={style.connectWallet}>
              <a onClick={connect}>
                {Parser(connectButton)}
              </a>
              <ConnectIcon width={260} height={91}/>
            </div>
          </div>
          <div>
            <div className={style.info}>
              <p>
                Every PoLP official NFT can be staked within DeFiWars Finance
                ecosystem, traded in any open NFT market, and acquired by other
                users and digital art collectors. Genesis Edition is inspired
                by a cult movie saga from 1970s; there will be 4 lead characters
                (YoDWARF, ObiDWARF, DWARF Vader and DWARF Sith), and 3 general
                tiers: MIAMI, CLASSIC, and COMMON; COMMON category includes 5
                different classes (for example: GOLDEN, PINK, RED, GREEN, BLUE).
              </p>
              <SwordIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sword;
