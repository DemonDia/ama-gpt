import React, { useEffect } from "react";
import logo from "../pictures/AMAGPT copy.png";
// import leftCharacter from "../pictures/Hayate_Stamp.png";
// import rightCharacter from "../pictures/kokoasama.png";
import AOS from "aos";
import "aos/dist/aos.css";
import leftCharacter from "../pictures/leftchar.png";
import rightCharacter from "../pictures/rightchar.png";
import { Typography, Box, Link } from "@mui/material";
import KeyFeature from "../components/landing/KeyFeature";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AMAPic from "../pictures/AMA.png";
import ImageGeneratorPic from "../pictures/ImageGenerator.png";
function LandingPage() {
    const keyFeatures = [
        {
            title: "AMA",
            description:
                "Need a portable buddy to answer your questions on the go?",
            redirect: "/ama",
            id: "#ama",
            image: AMAPic,
        },
        {
            title: "Image generator",
            description: "Need any image any time? For any purpose?",
            redirect: "/image-generator",
            id: "#image-generator",
            image: ImageGeneratorPic,
        },
    ];

    const goDown = () => {
        var access = document.getElementById(keyFeatures[0].id);
        access.scrollIntoView({ behavior: "smooth" }, true);
    };
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
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
                <Typography
                    variant="h5"
                    sx={{
                        margin: "30px",
                        "&:hover": {
                            scale: "1.5",
                            cursor: "pointer",
                        },
                        transition: "scale 0.5s",
                    }}
                >
                    AMA (Ask me anything)! Literally ANYTHING!
                </Typography>
                <Box>
                    <img src={leftCharacter} alt="Left Character" />
                    <img src={rightCharacter} alt="Right Character" />
                </Box>
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
                            scale: "1.4",
                        },
                        transition: "scale 0.5s",
                        animation: "bounce 1s infinite",
                        "@keyframes bounce": {
                            "0%": { transform: "translateY(0)" },
                            "50%": { transform: "translateY(-10px)" },
                            "100%": { transform: "translateY(0)" },
                        },
                    }}
                />
            </Box>
            {keyFeatures.map((item, index) => {
                const { title, description, redirect, id, image } = item;
                const titleDisplay = index + 1 + ". " + title;
                return (
                    <div data-aos="fade-down" key={index}>
                        <KeyFeature
                            data-aos="fade-down"
                            key={index}
                            title={titleDisplay}
                            description={description}
                            redirect={redirect}
                            id={id}
                            image={image}
                        />
                    </div>
                );
            })}
        </Box>
    );
}

export default LandingPage;
