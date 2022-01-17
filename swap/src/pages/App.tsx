import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Switch, NavLink, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Credentials, StringTranslations } from '@crowdin/crowdin-api-client'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './AddLiquidity/redirects'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import AddLiquidity from './AddLiquidity'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import Swap from './Swap'
import { RedirectPathToSwapOnly } from './Swap/redirects'
import { EN, allLanguages } from '../constants/localisation/languageCodes'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'

const AppWrapper = styled.div`
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 16px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  justify-content: center;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper className="container">
          <div className="logo">
            <a href="/"><img src="img/sword-logo.png" alt="Home" /></a>
          </div>

          <div className="Menu">
            <ul className="mainMenu">
              <li>
                <a href="/What_is_DWARF">What is $DWARF?</a>
              </li>
              <li>
                <a href="/NFA_Collections">Claim NFTs</a>
              </li>
              <li>
                <a href="/About_the_Team">The Team</a>
              </li>
              <li>
                <a href="/Make_Contact">Make Contact</a>
              </li>
            </ul>
          </div>

          <BodyWrapper>
            <Popups />
            <Web3ReactManager>
              <Switch>
                <Route exact strict path="/swap" component={Swap} />
                <Route exact strict path="/find" component={PoolFinder} />
                <Route exact strict path="/pool" component={Pool} />
                <Route exact path="/add" component={AddLiquidity} />
                <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

                {/* Redirection: These old routes are still used in the code base */}
                <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />

                <Route component={RedirectPathToSwapOnly} />
              </Switch>
            </Web3ReactManager>
            <Marginer />
          </BodyWrapper>

          <div className="container">
            <div className="footer">
              <a href="https://www.t.me/defiwarsfinance" rel="noreferrer noopener" target="_blank">
                <img src="img/telegram.png" alt="Telegram" />
              </a>
              <a href="https://discord.gg/7CQr6u2e" rel="noreferrer noopener" target="_blank">
                <img src="img/discord.png" alt="Discord" />
              </a>
              <a href="https://www.reddit.com/r/DeFiWars_Finance" rel="noreferrer noopener" target="_blank">
                <img src="img/reddit.png" alt="Reddit" />
              </a>
            </div>
          </div>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
