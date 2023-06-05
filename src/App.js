// ====================================general imports====================================
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// ====================================page imports====================================
// ===============landing page===============
import LandingPage from "./pages/LandingPage";

// ====================================component imports====================================
function App() {
    return (
        <div className="App">
            <div className="pageContainer">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
