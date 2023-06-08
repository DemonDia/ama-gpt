import React from 'react';
import { Box, Typography, Button } from "@mui/material";

function ChatSide({createNewChat, chats, selectChat}) {
    return (
        <Box sx={{ margin: "10px" }}>
        <Typography variant={"h5"}>Chats</Typography>
        <Button
            onClick={() => {
                createNewChat();
            }}
            variant={"contained"}
            sx={{
                height: "30px",
                width: "100%",
                textAlign: "left",
                background: "white",
                color: "black",
                fontWeight: "bold",
                margin: "5px",
                "&:hover": {
                    background: "rgba(250, 250, 250, 1)",
                },
            }}
        >
            New Chat
        </Button>
        {chats.map((chat) => {
            const { chatName, id } = chat;
            return (
                <Button
                    onClick={() => {
                        selectChat(id);
                    }}
                    variant={"contained"}
                    sx={{
                        height: "30px",
                        width: "100%",
                        textAlign: "left",
                        justifyContent: "start",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        background: "white",
                        color: "black",
                        margin: "5px",
                        "&:hover": {
                            background:
                                "rgba(250, 250, 250, 1)",
                        },
                    }}
                >
                    {chatName}
                </Button>
            );
        })}
    </Box>
    );
}

export default ChatSide;