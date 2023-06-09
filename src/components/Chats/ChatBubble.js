import React from "react";
import { Box, Link, Tooltip } from "@mui/material";
function ChatBubble({ message, loading, isImageGenerator }) {
    const { content, role } = message;
    const handleDownloadImage = (hrefLink) => {
        fetch(hrefLink, {
            method: "GET",
            headers: {},
        })
            .then((response) => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "image.png";
                    link.click();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
