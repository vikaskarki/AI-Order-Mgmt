import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MenuPage from "./MenuPage"; // Corrected path

// Home component that shows QR code
const Home = () => {
  const [orderURL] = useState("https://192.168.56.1:5173/menu");

  return (
    <div className="main-container">
      <h1 className="title">YOUR ORDER HERE</h1>
      <div className="qr-box">
        <p className="instruction">Scan this QR code to place your order:</p>
        <QRCodeSVG value={orderURL} size={200} level="H" includeMargin={true} />
      </div>
    </div>
  );
};

// Main App component that handles routing
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page with QR */}
        <Route path="/" element={<Home />} />

        {/* Menu page with AI interaction */}
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
