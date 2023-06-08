import React from "react";
import { Box, Typography, Button } from "@mui/material";

function ChatSide({ chats, selectChat, selectedChat }) {
    return (
        <Box
            sx={{
                marginTop: "10px",
                // boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.4)",
                maxHeight: "800px",
                overflowY: "scroll",
                display: "grid",
            }}
        >
            <Typography variant={"h5"}>Chats</Typography>
            {chats.map((chat) => {
                const { chatName, id } = chat;
                return (
                    <Button
                        key={id}
                        onClick={() => {
                            selectChat({ chatName, id });
                        }}
                        variant={"contained"}
                        sx={{
                            height: "30px",
                            width: "90%",
                            textAlign: "left",
                            justifyContent: "start",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            background:
                                selectedChat && selectedChat.id == id
                                    ? "#08C5AE"
                                    : "white",
                            color:
                                selectedChat && selectedChat.id == id
                                    ? "white"
                                    : "black",
                            // boxShadow:"none",
                            margin: "5px",
                            "&:hover": {
                                background:
                                    selectedChat && selectedChat.id == id
                                        ? "rgba(8, 197, 174, 0.7)"
                                        : "rgba(250, 250, 250, 1)",
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
