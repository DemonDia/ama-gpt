import React from "react";
import { Box, Typography } from "@mui/material";
function ChatBubble({ message }) {
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
                sx={{
                    color: role == "user" ? "black" : "white",
                    background:
                        role == "user" ? "white" : "rgba(8, 197, 174, 1)",
                    margin: "5px",
                    padding: "5px",
                    borderRadius: "5px",
                    width: "fit-content",
                    height: "fit-content",
                }}
            >
                {content}
            </Box>
        </Box>
    );
}

export default ChatBubble;
