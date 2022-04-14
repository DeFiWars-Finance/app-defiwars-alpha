import "./App.css";
import "./fonts/Roboto/stylesheet.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sword from "./components/Sword/Sword";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Oracle from "./components/Oracle/Oracle";
import Collections from "./components/Collections/Collections";
import Market from "./components/Market/Market";
import Login from "./components/Login/Login";
import Auction from "./components/Auction/Auction";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sword/>} />
          <Route path="/What_is_DWARF" element={<Home/>} />
          <Route path="/Liquidity_Pools" element={<Sword/>} />
          <Route path="/DWARFSwap" element={<Sword/>} />
          <Route path="/NFA_Market" element={<Market/>} />
          <Route path="/The_Army" element={<Oracle/>} />
          <Route path="/NFA_Collections" element={<Collections/>} />
          <Route path="/About_the_Team" element={<About/>} />
          <Route path="/Make_Contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/auction" element={<Auction/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
