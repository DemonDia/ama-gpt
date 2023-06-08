import React, { useState, useRef, useEffect } from "react";
import AMASama from "../../pictures/luminasama.png";
import { Badge, Box, Typography, Grid } from "@mui/material";
import { characterOnClick, chatShow, imageGeneratorShow } from "./Dialogues";

import "./assistant.css";
function Assistant({ reply, chats, isChatMode }) {
    // ================helper function================
    const displayMessage = (messageToDislay) => {
        console.log(ref);
        if (ref) {
            ref.current.classList.add("responds");
            setDialogue(messageToDislay);
            setTimeout(function () {
                console.log("ref", ref);
                if (ref.current) {
                    ref.current.classList.remove("responds");
                    // setDialogue("");
                }
            }, 2500);
        }
    };
    // ================display random messages when================
    const ref = useRef();
    // change chat

    // clicked
    const clickedCharacter = () => {
        displayMessage(
            characterOnClick[
                Math.floor(Math.random() * characterOnClick.length)
            ]
        );
    };

    // type out a short portion of the result prompt
    // if its AMA
    // if its not AMA, just say "Image is created!"
    const [dialogue, setDialogue] = useState("");
    useEffect(() => {
        let arr = isChatMode ? chatShow : imageGeneratorShow;
        displayMessage(arr[Math.floor(Math.random() * arr.length)]);
    }, []);

    return (
        <Box
            sx={{
                margin: "10px",
                // width: {
                //     xs: "90%",
                //     sm: "80%",
                //     md: "40%",
                // },
            }}
        >
            <Grid container>
                <Grid item xs={6}>
                    {" "}
                    <img
                        ref={ref}
                        className="assistant"
                        src={AMASama}
                        onClick={() => {
                            clickedCharacter();
                        }}
                    />
                    <Box sx={{ width: "auto" }}>
                        <Typography
                            variant={"h6"}
                            sx={{
                                textAlign: "center",
                                background: "#08C5AE",
                                color: "white",
                                width: "fit-content",
                                margin: "10px auto",
                                padding: "5px",
                                borderRadius: "10px",
                            }}
                        >
                            AMA Sama
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    {dialogue ? (
                        <>
                            <Box
                                component={"div"}
                                sx={{
                                    textAlign: "left",
                                    height: "auto",
                                    maxHeight:
                                        ref && ref.current.offsetHeight > 0
                                            ? ref.current.offsetHeight
                                            : "100px",
                                    color: "white",
                                    background: "#08C5AE",
                                    borderRadius: "10px",
                                    margin: "1px",
                                    padding: "1px",
                                    textOverflow: "ellipsis",
                                    overflow: "ellipsis",
                                    p: 1,
                                }}
                            >
                                {dialogue}
                            </Box>
                        </>
                    ) : (
                        <></>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default Assistant;
