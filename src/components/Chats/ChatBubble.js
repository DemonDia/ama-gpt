import React from "react";
import { Box, Typography } from "@mui/material";
function ChatBubble({ message }) {
    const { content, role } = message;
    return (
        <Box
            sx={{
                color: role == "user" ? "black" : "white",
                background: role == "user" ? "white" : "rgba(8, 197, 174, 1)",
                margin: "5px",
                padding: "5px",
                borderRadius:"5px",
                width: "fit-content",
                height: "fit-content",
                textAlign: role == "user" ? "right" : "left",
                justifySelf: role == "user" ? "end" : "start",
            }}
        >
            {content}
        </Box>
    );
}

export default ChatBubble;
