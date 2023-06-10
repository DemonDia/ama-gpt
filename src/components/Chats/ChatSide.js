import React from "react";
import { Box, Typography, Button } from "@mui/material";

function ChatSide({ chats, selectChat, selectedChat }) {
    return (
        <Box
            sx={{
                marginTop: "10px",

                height: "60vh",
            }}
        >
            <Typography variant={"h5"}>Chats</Typography>
            <Box sx={{ overflowY: "scroll", height: "100%" }}>
                {chats && chats.length > 0 ? (
                    <>
                        {chats.map((chat) => {
                            const { chatName, id } = chat;
                            return (
                                <Box
                                    key={id}
                                    onClick={() => {
                                        selectChat({ chatName, id });
                                    }}
                                    variant={"contained"}
                                    sx={{
                                        borderRadius: "5px",
                                        width: "90%",
                                        textAlign: "left",
                                        justifyContent: "start",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        background:
                                            selectedChat &&
                                            selectedChat.id == id
                                                ? "#08C5AE"
                                                : "#EBEBEB",
                                        color:
                                            selectedChat &&
                                            selectedChat.id == id
                                                ? "white"
                                                : "black",
                                        margin: "10px auto",
                                        padding: "10px",
                                        "&:hover": {
                                            background:
                                                selectedChat &&
                                                selectedChat.id == id
                                                    ? "rgba(8, 197, 174, 0.7)"
                                                    : "#08C5AE",
                                            color: "white",
                                            cursor: "pointer",
                                        },
                                        transition: "background 0.5s"
                                    }}
                                >
                                    {chatName}
                                </Box>
                            );
                        })}
                    </>
                ) : (
                    <>
                        <Box
                            sx={{
                                padding: "10px",
                                background: "rgb(150 150 150 / 10%)",
                                boxRadius: "5px",
                            }}
                        >
                            <Typography variant={"h6"}>No chats yet</Typography>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default ChatSide;
