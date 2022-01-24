import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import style from './Footer.css';
import appStyle from '../../pages/App.module.css';

class Footer extends React.Component {
  render() {
    return (
      <div className={appStyle.flexauto}>
        <div className={appStyle.container}>
          <div className='footer'>
            <Link
              href='https://www.twitter.com/DeFiWars_crypto'
              rel='noreferrer noopener'
              target='_self'
            >
              <img src='img/twitter.png' alt='Twitter' />
            </Link>

            <Link
              href='https://www.t.me/defiwarsfinance'
              rel='noreferrer noopener'
              target='_self'
            >
              <img src='img/telegram.png' alt='Telegram' />
            </Link>

            <Link
              href='https://discord.gg/7CQr6u2e'
              rel='noreferrer noopener'
              target='_self'
            >
              <img src='img/discord.png' alt='Discord' />
            </Link>

	          <Link
              href='https://www.reddit.com/r/DeFiWars_Finance'
              rel='noreferrer noopener'
              target='_self'
            >
	            <img src='img/reddit.png' alt='Reddit' />
	          </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
