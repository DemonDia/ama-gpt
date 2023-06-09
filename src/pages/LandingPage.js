import React from "react";
import logo from "../pictures/AMAGPT copy.png";
// import leftCharacter from "../pictures/Hayate_Stamp.png";
// import rightCharacter from "../pictures/kokoasama.png";
import leftCharacter from "../pictures/leftchar.png";
import rightCharacter from "../pictures/rightchar.png";
import { Typography, Box } from "@mui/material";
import KeyFeature from "../components/landing/KeyFeature";
// import AMAFeaturePage from "../pictures/AMA.png";
function LandingPage() {
    const keyFeatures = [
        {
            title: "AMA",
            description:
                "Need a portable buddy to answer your questions on the go?",
            redirect: "/ama",
            id: "#ama",
            image: "",
        },
        {
            title: "Image generator",
            description: "Need any image any time? For any purpose?",
            redirect: "/image-generator",
            id: "#image-generator",
            image: "",
        },
    ];
    return (
        <Box>
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
            {keyFeatures.map((item, index) => {
                const { title, description, redirect, id, image } = item;
                const titleDisplay = index + 1 + ". " + title;
                return (
                    <KeyFeature
                        key={index}
                        title={titleDisplay}
                        description={description}
                        redirect={redirect}
                        id={id}
                        image={image}
                    />
                );
            })}
        </Box>
    );
}

export default LandingPage;
