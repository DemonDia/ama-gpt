import React from "react";
import { Box } from "@mui/material";
function ChatBubble({ message, loading, isImageGenerator }) {
    const { content, role } = message;
    console.log("content", content);
    console.log("typeof", typeof content);
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: role == "user" ? "flex-end" : "flex-start",
            }}
        >
            <Box
                className={loading ? "typingMessage" : ""}
                sx={{
                    color: role == "user" ? "black" : "white",
                    background:
                        role == "user" ? "white" : "rgba(8, 197, 174, 1)",
                    margin: "5px",
                    padding: "5px",
                    borderRadius: "5px",
                    height: "fit-content",
                    maxWidth: "60%",
                    textAlign: "left",
                }}
            >
                {isImageGenerator && role == "system" ? (
                    <>
                        <img
                            src={content}
                            lowsrc={content}
                            loading="lazy"
                            style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </>
                ) : (
                    <>{content}</>
                )}
            </Box>
        </Box>
    );
}

export default ChatBubble;
