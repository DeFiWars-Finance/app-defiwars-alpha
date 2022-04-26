import "./App.css";
import "./fonts/Roboto/stylesheet.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3ReactManager from "./components/Web3ReactManager";
import Sword from "./pages/Sword/Sword";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Oracle from "./pages/Oracle/Oracle";
import Collections from "./pages/Collections/Collections";
import Market from "./pages/Market/Market";
import Login from "./pages/Login/Login";
import Auction from "./pages/Auction/Auction";
import Swap from "./pages/Swap/Swap";
import Pool from "./pages/Pool";
import AddLiquidity from './pages/AddLiquidity';
import DefiWarsLayout from "./layouts/DefiWarsLayout";
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './pages/AddLiquidity/redirects';
import ProtectedRoute from './Auth/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Web3ReactManager>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DefiWarsLayout />}>
              <Route index element={<Sword />} />
              <Route path="/What_is_DWARF" element={<Home />} />
              <Route path="/Liquidity_Pools" element={<Sword />} />
              <Route path="/DWARFSwap" element={<Sword />} />
              <Route path="/NFA_Market" element={<Market />} />
              <Route path="/The_Army" element={<Oracle />} />
              <Route path="/NFA_Collections" element={<Collections />} />
              <Route path="/About_the_Team" element={<About />} />
              <Route path="/Make_Contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auction" element={<Auction />} />
              <Route path='/swap' element={
                <ProtectedRoute>
                  <Swap />
                </ProtectedRoute>
              } />

              <Route path='/pool' element={
                <ProtectedRoute>
                  <Pool />
                </ProtectedRoute>
              } />

              <Route path='/add' element={
                <ProtectedRoute>
                  <AddLiquidity />
                </ProtectedRoute>
              } />

              <Route path='/add/:currencyIdA' element={
                <ProtectedRoute>
                  <RedirectOldAddLiquidityPathStructure />
                </ProtectedRoute>
              } />
              <Route path='/add/:currencyIdA/:currencyIdB' element={
                <ProtectedRoute>
                  <RedirectDuplicateTokenIds />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </Web3ReactManager>
    </div>
  );
}

export default App;
