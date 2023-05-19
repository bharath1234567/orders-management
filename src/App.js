// App.js
import React, { useState } from "react";
import LoginPage from "./components/login/login";
import OrdersPage from "./components/orders/order";
import './App.css'
const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return <div className='App' >{isLoggedIn ? <OrdersPage /> : <LoginPage onLogin={handleLogin} />}</div>;
};

export default App;
