import AppBar from "./components/AppBar";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/home.tsx";
import Games from "./pages/games.tsx";
import Login from "./pages/login.tsx";
import Register from "./pages/register.tsx";
import Wallet from "./pages/wallet.tsx";
import Verify from "./pages/verify.tsx";
import Deposit from "./pages/deposit.tsx";
import Buy from "./pages/buy.tsx";
import BuyTicket from "./pages/buyTicket.tsx";
import Sell from "./pages/sell.tsx";
import Success from "./pages/success.tsx";
import Withdraw from "./pages/withdraw.tsx";

function App() {
  return (
    <>
      <Router>
        <div>
          <div className="appbar">
            <AppBar></AppBar>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="games" element={<Games />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="verify" element={<Verify />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="buy" element={<Buy />} />
            <Route path="buyTicket" element={<BuyTicket />} />
            <Route path="sell" element={<Sell />} />
            <Route path="success" element={<Success />} />
            <Route path="withdraw" element={<Withdraw />} />
          </Routes>
          <div className="navbar">
            <NavigationBar></NavigationBar>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
