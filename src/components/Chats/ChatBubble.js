import React from "react";
import { Box, Link, Tooltip } from "@mui/material";
function ChatBubble({ message, loading, isImageGenerator }) {
    const { content, role } = message;
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
                    <Tooltip title={"Download"}>
                        <Link href={content}>
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
                        </Link>
                    </Tooltip>
                ) : (
                    <>{content}</>
                )}
            </Box>
        </Box>
    );
}

export default ChatBubble;
