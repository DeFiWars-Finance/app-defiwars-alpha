import "./App.css";
import "./fonts/Roboto/stylesheet.css";
import { Route } from "react-router-dom";
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
      <Route path="/" exact component={Sword} />
      <Route path="/What_is_DWARF" exact component={Home} />
      <Route path="/Liquidity_Pools" exact component={Sword} />
      <Route path="/DWARFSwap" exact component={Sword} />
      <Route path="/NFA_Market" exact component={Market} />
      <Route path="/The_Army" exact component={Oracle} />
      <Route path="/NFA_Collections" exact component={Collections} />
      <Route path="/About_the_Team" exact component={About} />
      <Route path="/Make_Contact" exact component={Contact} />
      <Route path="/login" exact component={Login} />
      <Route path="/auction" exact component={Auction} />
    </div>
  );
}

export default App;
