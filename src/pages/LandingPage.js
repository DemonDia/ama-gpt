import React from "react";
import logo from "../pictures/AMAGPT copy.png";
import leftCharacter from "../pictures/Hayate_Stamp.png";
import rightCharacter from "../pictures/kokoasama.png";
import { Typography, Box } from "@mui/material";
function LandingPage() {
    return (
        <Box
            sx={{
                height: "200vh",
            }}
        >
            <Box
                sx={{
                    height: "100vh",
                    margin: "auto",
                    alignContent: "center",
                    display: "grid",
                }}
            >
                {" "}
                <img src={logo} alt="App Logo" style={{ margin: "auto" }} />
                <Typography variant="h5">
                    AMA (Ask me anything)! Literally ANYTHING!
                </Typography>
                <Box>
                    <img src={leftCharacter} alt="Left Character" />
                    <img src={rightCharacter} alt="Right Character" />
                </Box>
                <Typography
                    variant="h4"
                    sx={{
                        color: "#05BDA7",
                        fontFamily: "Inika",
                        fontWeight: "bold",
                    }}
                >
                    Try us for free today!
                </Typography>
            </Box>
        </Box>
    );
}

export default LandingPage;
