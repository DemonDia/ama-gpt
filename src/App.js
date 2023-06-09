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

// ===============AMA page===============
import AMAPage from "./pages/AMAPage";
// ===============image generator page===============
import ImageGenerationPage from "./pages/ImageGenerationPage";

// ====================================component imports====================================
// ===============general===============
import Navbar from "./components/general/Navbar";
import Footer from "./components/general/Footer";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Toolbar />
            <div className="pageContainer">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    {/* authentication */}
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* ama */}
                    <Route exact path="/ama" element={<AMAPage />} />
                    {/* image generator */}
                    <Route
                        exact
                        path="/image-generator"
                        element={<ImageGenerationPage />}
                    />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
