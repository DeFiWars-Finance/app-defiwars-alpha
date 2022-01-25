import React, { Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Switch, NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Credentials, StringTranslations } from '@crowdin/crowdin-api-client';
import Popups from '../components/Popups';
import Web3ReactManager from '../components/Web3ReactManager';
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './AddLiquidity/redirects';
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects';
import AddLiquidity from './AddLiquidity';
import Pool from './Pool';
import PoolFinder from './PoolFinder';
import RemoveLiquidity from './RemoveLiquidity';
import Swap from './Swap';
import { RedirectPathToSwapOnly } from './Swap/redirects';
import { EN, allLanguages } from '../constants/localisation/languageCodes';
import { LanguageContext } from '../hooks/LanguageContext';
import { TranslationsContext } from '../hooks/TranslationsContext';
import Sword from '../components/Sword/Sword';
import Contact from '../components/Contact/Contact';
import Home from '../components/Home/Home';
import About from '../components/About/About';
import Collections from '../components/Collections/Collections';
import Auction from '../components/Auction/Auction';
import Market from '../components/Market/Market';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

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
        <Header />

        <AppWrapper className="container">
          <BodyWrapper>
            <Popups />
            <Web3ReactManager>
              <Switch>
                <Route exact strict path='/What_is_DWARF' component={Home} />
                <Route exact strict path='/About_the_Team' component={About} />
                <Route exact strict path='/Make_Contact' component={Contact} />
                <Route exact strict path='/NFA_Market' component={Market} />
                <Route exact strict path='/swap' component={Swap} />
                <Route exact strict path='/find' component={PoolFinder} />
                <Route exact strict path='/pool' component={Pool} />
                <Route exact path='/add' component={AddLiquidity} />
                <Route exact strict path='/remove/:currencyIdA/:currencyIdB' component={RemoveLiquidity} />

                {/* Redirection: These old routes are still used in the code base */}
                <Route exact path='/add/:currencyIdA' component={RedirectOldAddLiquidityPathStructure} />
                <Route exact path='/add/:currencyIdA/:currencyIdB' component={RedirectDuplicateTokenIds} />
                <Route exact strict path='/remove/:tokens' component={RedirectOldRemoveLiquidityPathStructure} />

                <Route component={RedirectPathToSwapOnly} />
              </Switch>
            </Web3ReactManager>
            <Marginer />
          </BodyWrapper>
        </AppWrapper>

        <Footer />
      </HashRouter>
    </Suspense>
  )
}
