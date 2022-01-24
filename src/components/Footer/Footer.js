import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import style from './Footer.css';
import appStyle from '../../App.module.css';

class Footer extends React.Component {
  openLinkTab(event) {
    event.preventDefault();

    let left = (window.screen.width - 500) / 2;
    let top = (window.screen.height / 4);

    window.open(
      event.currentTarget.href,
      event.currentTarget.name,
      `
        fullscreen=yes,
        toolbar=yes,
        scrollbars=yes,
        resizable=yes,
        width=500,
        height=600,
        top=${top},
        left=${left}
      `
    );
  }

  render() {
    return (
      <div className={appStyle.flexauto}>
        <div className={appStyle.container}>
          <div className={style.footer}>
            <a
              href='https://www.twitter.com/DeFiWars_crypto'
              rel='noreferrer noopener'
              target='_blank'
              name='DeFiWars Twitter'
              onClick={this.openLinkTab}
            >
              <img src='img/twitter.png' alt='Twitter' />
            </a>
            <a
              href='https://www.t.me/defiwarsfinance'
              rel='noreferrer noopener'
              target='_blank'
              name='DeFiWars Telegram'
              onClick={this.openLinkTab}
            >
              <img src='img/telegram.png' alt='Telegram' />
            </a>
            <a
              href='https://discord.gg/7CQr6u2e'
              rel='noreferrer noopener'
              target='_blank'
              name='DeFiWars Discord'
              onClick={this.openLinkTab}
            >
              <img src='img/discord.png' alt='Discord' />
            </a>
	          <a
              href='https://www.reddit.com/r/DeFiWars_Finance'
              rel='noreferrer noopener'
              target='_blank'
              name='DeFiWars Reddit'
              onClick={this.openLinkTab}
            >
	            <img src='img/reddit.png' alt='Reddit' />
	          </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
