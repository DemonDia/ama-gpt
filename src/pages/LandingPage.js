import React from "react";
import logo from "../pictures/AMAGPT copy.png";
// import leftCharacter from "../pictures/Hayate_Stamp.png";
// import rightCharacter from "../pictures/kokoasama.png";
import leftCharacter from "../pictures/leftchar.png";
import rightCharacter from "../pictures/rightchar.png";
import { Typography, Box, Link } from "@mui/material";
import KeyFeature from "../components/landing/KeyFeature";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
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

    const goDown = () => {
        var access = document.getElementById(keyFeatures[0].id);
        access.scrollIntoView({ behavior: "smooth" }, true);
    };
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
                <Typography variant="h5" sx={{ margin: "30px" }}>
                    AMA (Ask me anything)! Literally ANYTHING!
                </Typography>
                <Box>
                    <img src={leftCharacter} alt="Left Character" />
                    <img src={rightCharacter} alt="Right Character" />
                </Box>
                {/* <Link
                    onClick={() => {
                        goDown();
                    }}
                    sx={{
                        color: "black",
                        "&:hover": {
                            color: "#08C5AE",
                            cursor: "pointer",
                        },
                    }}
                > */}
                    <ArrowDownwardIcon
                        onClick={() => {
                            goDown();
                        }}
                        sx={{
                            fontSize: "50px",
                            margin: "30px auto",
                            color: "black",
                            "&:hover": {
                                color: "#08C5AE",
                                cursor: "pointer",
                            },
                            animation:"bounce 1s infinite",
                            "@keyframes bounce": {  
                                "0%": { transform: "translateY(0)" },
                                "50%": { transform: "translateY(-10px)" },
                                "100%": { transform: "translateY(0)" },

                            }
                        }}
                    />
                {/* </Link> */}
                {/* <Typography
                    variant="h4"
                    sx={{
                        color: "#05BDA7",
                        fontFamily: "Inika",
                        fontWeight: "bold",
                    }}
                >
                    Try us for free today!
                </Typography> */}
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
