import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import Assistant from "../components/Main/Assistant";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Grid } from "@mui/material";

import ChatSide from "../components/Chats/ChatSide";
import { ref, onValue, push, get } from "firebase/database";
import { db } from "../firebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import ChatComponent from "../components/Chats/ChatComponent";
function AMAPage() {
    const nav = useNavigate();
    const [currUserId, setCurrUserId] = useState(null);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

    const selectChat = (selectedNewChat) => {
        if (currentChat && currentChat.id == selectedNewChat.id) {
            setCurrentChat(null);
        } else {
            setCurrentChat(selectedNewChat);
            const getMessages = ref(db, "message/");
            get(getMessages)
                .then((snapshot) => {
                    let messages = [];
                    if (snapshot.exists()) {
                        let data = snapshot.val();
                        Object.keys(data).forEach((key) => {
                            const currRecord = data[key];
                            if (currRecord.chatId == selectedNewChat.id) {
                                const { role, content } = data[key];
                                const chatMessage = {
                                    role,
                                    content,
                                };
                                messages.push(chatMessage);
                            }
                        });
                    }
                    setCurrentChat({
                        id: selectedNewChat.id,
                        chatName: selectedNewChat.chatName,
                        messages,
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };
    const [currMessage, setCurrMessage] = useState("");

    const createNewChat = (chatName) => {
        let newChat = {
            chatName: chatName ? chatName : "New Chat",
            userId: currUserId,
            createdDate: new Date().toISOString(),
            type: "ama",
        };
        let tempChats = chats;
        tempChats.push(newChat);
        const createdChat = push(ref(db, "chat/"), newChat);
        get(createdChat)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const selectedChat = {
                        id: createdChat.key,
                        chatName: data.chatName,
                    };
                    // then create message
                    selectChat(selectedChat);
                    sendMessageHelper(chatName, "user", createdChat.key);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        toast("Created");
    };
    const sendMessageHelper = (message, role, chatId) => {
        const newMessage = {
            role,
            content: message,
            chatId,
            sentDate: new Date().toISOString(),
        };
        push(ref(db, "message/"), newMessage);
        var messages = currentChat.messages;
        // messages.push({ role, content: message });
        setCurrentChat({
            ...currentChat,
            messages: [...messages, { role, content: message }],
        });
    };
    const sendMessage = (keycode) => {
        if (keycode === "Enter" && currMessage.length > 0) {
            if (!currentChat) {
                // create new chat
                createNewChat(currMessage);
            } else {
                // message on existing chat
                sendMessageHelper(currMessage, "user", currentChat.id);
            }
            toast("Message sent");
            setCurrMessage("");
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                nav("/login");
            }
            setCurrUserId(user.uid);

            // refactored
            onValue(ref(db), (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    if (data.hasOwnProperty("chat")) {
                        let userChats = [];
                        Object.keys(data.chat).forEach((key) => {
                            const currRecord = data.chat[key];
                            if (
                                currRecord.userId == user.uid &&
                                currRecord.type == "ama"
                            ) {
                                const { chatName, createdDate } = currRecord;
                                const chatRecord = {
                                    chatName,
                                    createdDate,
                                    id: key,
                                };
                                userChats.push(chatRecord);
                            }
                        });
                        setChats(userChats);
                    }
                    if (data.hasOwnProperty("message")) {
                        let messages = [];
                        if (currentChat) {
                            Object.keys(data.message).forEach((key) => {
                                const currRecord = data.message[key];
                                if (currRecord.chatId == currentChat.id) {
                                    const { role, content } = data.message[key];
                                    const chatMessage = {
                                        role,
                                        content,
                                    };
                                    messages.push(chatMessage);
                                }
                            });
                            setCurrentChat({
                                id: currentChat.id,
                                chatName: currentChat.chatName,
                                messages,
                            });
                        }
                    }
                }
            });
        });
    }, []);
    return (
        <div>
            <Toaster />
            <Grid container>
                <Grid item xs={12} sm={12} md={4} lg={6}>
                    <Assistant isChatMode={true} />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={2}>
                    <ChatSide
                        chats={chats}
                        selectChat={selectChat}
                        createNewChat={createNewChat}
                        selectedChat={currentChat}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={4}>
                    <ChatComponent
                        sendMessage={sendMessage}
                        currMessage={currMessage}
                        setCurrMessage={setCurrMessage}
                        currentChat={currentChat}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default AMAPage;
