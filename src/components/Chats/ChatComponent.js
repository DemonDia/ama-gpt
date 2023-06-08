import React from "react";
import { Box, Typography, TextField, FormControl } from "@mui/material";
import ChatBubble from "./ChatBubble";

function ChatComponent({
    sendMessage,
    currentChat,
    currMessage,
    setCurrMessage,
    loading,
}) {
    return (
        <Box
            sx={{
                marginTop: "10px",
                width: "100%",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.4)",
                maxHeight: "800px",
            }}
        >
            <Box
                sx={{
                    padding: "5px",
                    background: "white",
                }}
            >
                <Typography
                    variant={"h5"}
                    sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {currentChat && currentChat.chatName ? (
                        <>{currentChat.chatName}</>
                    ) : (
                        <>Select a chat</>
                    )}
                </Typography>
            </Box>
            <Box
                sx={{
                    padding: "5px",
                    background: "rgba(65, 65, 65, 0.1)",
                    boxShadow: "none",
                    overflowY: "scroll",
                    height: "600px",
                    display:
                        currentChat && currentChat.messages ? "block" : "grid",
                    justifyContent: "middle",
                }}
            >
                {currentChat && currentChat.messages ? (
                    <>
                        {currentChat.messages.map((message, idx) => {
                            return <ChatBubble key={idx} message={message} />;
                        })}
                    </>
                ) : (
                    <>
                        <Box
                            sx={{
                                margin: "auto",
                                padding: "15px",
                                textAlign: "center",
                                borderRadius: "5px",
                                background: "#049381",
                                color: "white",
                            }}
                        >
                            <Typography variant={"h6"}>Start a chat</Typography>
                        </Box>
                    </>
                )}
                {loading ? (
                    <>
                        <ChatBubble
                            message={{ content: "Typing ...", role: "system" }}
                        />
                    </>
                ) : (
                    <></>
                )}
            </Box>
            <Box
                sx={{
                    padding: "5px",
                    background: "white",
                    boxShadow: "",
                }}
            >
                <FormControl
                    sx={{
                        width: "100%",
                    }}
                    onKeyPress={(e) => {
                        sendMessage(e.key);
                    }}
                >
                    <TextField
                        value={currMessage}
                        onChange={(e) => {
                            setCurrMessage(e.target.value);
                        }}
                        placeholder="Type something"
                        label="Ask a question..."
                        variant="outlined"
                        sx={{
                            width: "100%",
                            margin: "auto",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            borderRadius: "10px",
                        }}
                    />
                </FormControl>
            </Box>
        </Box>
    );
}

export default ChatComponent;
