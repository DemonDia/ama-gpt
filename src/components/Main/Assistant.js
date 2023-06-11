import React, { useState, useRef, useEffect } from "react";
// import AMASama from "../../pictures/luminasama.png";
import AMASama from "../../pictures/assistant.png";
import { Box, Typography, Grid } from "@mui/material";
import { toast } from "react-hot-toast";
import {
    characterOnClick,
    chatShow,
    imageGeneratorShow,
    isTypingMessages,
    imageGeneratorComplete,
    answerComplete,
} from "./Dialogues";

import "./assistant.css";
import {
    getChatInfo,
    getChatMessages,
} from "../../helperfunctions/FirebaseRealtimeDB";

function Assistant({ reply, isChatMode, isTyping, currentChatId }) {
    // ================ states ================
    const [hover, setHover] = useState(false);
    // ================helper function================
    // assistant to display message
    const displayMessage = (messageToDislay) => {
        if (ref) {
            ref.current.classList.add("responds");
            setDialogue(messageToDislay);
            setTimeout(function () {
                if (ref.current) {
                    ref.current.classList.remove("responds");
                }
            }, 2500);
        }
    };

    // ====================== generate json file ======================
    const generateJsonData = (currentMessages) => {
        var resultantJsonData = [];
        for (var i = 0; i < currentMessages.length; i++) {
            resultantJsonData.push(currentMessages[i]);
        }
        return resultantJsonData;
    };
    const generateJsonFile = (currentMessages, jsonFileName) => {
        jsonFileName = jsonFileName || "exported";
        const data = JSON.stringify(generateJsonData(currentMessages));
        const blob = new Blob([data], { type: "text/plain" });
        const e = document.createEvent("MouseEvents"),
            a = document.createElement("a");
        a.download = jsonFileName + ".json";
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
        e.initEvent(
            "click",
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            0,
            false,
            false,
            false,
            false,
            0,
            null
        );
        a.dispatchEvent(e);
    };

    // ================display random messages when================
    const ref = useRef();

    // clicked
    const clickedCharacter = () => {
        displayMessage(
            characterOnClick[
                Math.floor(Math.random() * characterOnClick.length)
            ]
        );
    };

    // type out a short portion of the result prompt
    const resultTriggered = () => {
        const arr = isChatMode ? answerComplete : imageGeneratorComplete;
        displayMessage(arr[Math.floor(Math.random() * arr.length)]);

    };
    useEffect(() => {
        resultTriggered();
    }, [reply]);

    // if its typing
    const isGeneratingResult = () => {
        if (isTyping) {
            displayMessage(
                isTypingMessages[
                    Math.floor(Math.random() * isTypingMessages.length)
                ]
            );
        }
    };
    useEffect(() => {
        isGeneratingResult();
    }, [isTyping]);

    // if its AMA
    // if its not AMA, just say "Image is created!"
    const [dialogue, setDialogue] = useState("");
    useEffect(() => {
        let arr = isChatMode ? chatShow : imageGeneratorShow;
        displayMessage(arr[Math.floor(Math.random() * arr.length)]);
    }, []);

    // export chat
    const exportChat = async () => {
        const exportChat = await getChatInfo(currentChatId);
        const exportedMessages = await getChatMessages(currentChatId);
        Promise.allSettled([exportChat, exportedMessages]).then((results) => {
            const [chatInfo, messages] = results;
            if (!chatInfo.value || !messages.value) {
                toast("Error exporting");
            } else {
                generateJsonFile(messages.value);
                toast("Exported!");
            }
        });
    };

    return (
        <Box
            sx={{
                margin: "10px auto",
                height: "40vh",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Box sx={{ height: "10%", width: "100%" }}>
                {/* <Grid item xs={6}> */}
                {dialogue ? (
                    <>
                        <Box
                            className={isTyping ? "typingMessage" : ""}
                            component={"div"}
                            sx={{
                                textAlign: "left",
                                height: "auto",
                                maxHeight:
                                    ref && ref.current.offsetHeight > 0
                                        ? ref.current.offsetHeight
                                        : "100%",
                                color: "white",
                                background: "#08C5AE",
                                borderRadius: "10px",
                                margin: "1px",
                                padding: "1px",
                                width: "fit-content",
                                maxWidth: "100%",
                                p: 1,
                                position: "relative",
                                zIndex: 2,
                                opacity: hover ? 1 : 0.7,
                                transition: "opacity 0.5s",
                            }}
                            isTyping={isTyping}
                        >
                            {dialogue}
                        </Box>
                    </>
                ) : (
                    <></>
                )}
                {/* </Grid> */}
            </Box>
            <Box sx={{ height: "90%" }}>
                {/* <Grid item xs={6}> */}{" "}
                <img
                    ref={ref}
                    className="assistant"
                    src={AMASama}
                    onClick={() => {
                        clickedCharacter();
                    }}
                    sx={{
                        width: "100%",
                        margin: "auto",
                        zIndex: -1,
                        position: "absolute",
                    }}
                />
                <Box sx={{ width: "auto" }}>
                    <Typography
                        variant={"subtitle1"}
                        sx={{
                            textAlign: "center",
                            // alignSelf:"center",
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
                    <Typography
                        variant={"subtitle2"}
                        sx={{
                            textAlign: "center",
                            background: "#09AC99",
                            color: "white",
                            width: "fit-content",
                            margin: "10px auto",
                            padding: "5px",
                            borderRadius: "10px",
                        }}
                        onClick={() => {
                            exportChat();
                        }}
                    >
                        Export
                    </Typography>
                </Box>
                {/* </Grid> */}
            </Box>
        </Box>
    );
}

export default Assistant;
