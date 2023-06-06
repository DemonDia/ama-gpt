// ====================================general imports====================================
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toolbar } from "@mui/material";
import "./App.css";

// ====================================page imports====================================
// ===============landing page===============
import LandingPage from "./pages/LandingPage";

// ===============authentication page===============
import RegistrationPage from "./pages/authentication/RegistrationPage";
import LoginPage from "./pages/authentication/LoginPage";

// ====================================component imports====================================
// ===============general===============
import Navbar from "./components/general/Navbar";
function App() {
    return (
        <div className="App">
            <Navbar />
            <Toolbar />
            <div className="pageContainer">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
