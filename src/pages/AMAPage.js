// ==================== react ====================
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ==================== firebase ====================
import { ref, onValue, push, get, query } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../configurations/firebaseConfig";

// ==================== components ====================
import ChatComponent from "../components/Chats/ChatComponent";
import ChatSide from "../components/Chats/ChatSide";
import Assistant from "../components/Main/Assistant";

// ==================== etc ====================
import { Grid } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

function AMAPage() {
    const nav = useNavigate();
    const [currUserId, setCurrUserId] = useState(null);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [currMessage, setCurrMessage] = useState("");

    // ==================== helper functions ====================
    // sends a message (from the assistant/user) to the current chat
    const sendMessageHelper = async (message, role, chatId) => {
        const newMessage = {
            role,
            content: message,
            chatId,
            sentDate: new Date().toISOString(),
        };
        await push(ref(db, "message/"), newMessage).then(() => {
            var messages =
                currentChat && currentChat.messages ? currentChat.messages : [];
            messages.push({ role, content: message });
            setCurrentChat({
                ...currentChat,
                messages,
            });
        });
    };

    // ==================== main functions ====================
    // select existing chat
    const selectChat = async (selectedNewChat) => {
        if (currentChat && currentChat.id == selectedNewChat.id) {
            setCurrentChat(null);
        } else {
            setCurrentChat(selectedNewChat);
            const getMessages = ref(db, "message/");
            await get(getMessages)
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

    // create new chat if not exist
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
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const selectedChat = {
                        id: createdChat.key,
                        chatName: data.chatName,
                    };
                    await sendMessageHelper(chatName, "user", createdChat.key);
                    selectChat(selectedChat);

                    // refreshChat(createNewChat.key);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        toast("Created");
    };

    // send message via enter
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

    // ==================== useEffect ====================
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                nav("/login");
            }
            setCurrUserId(user.uid);
            onValue(ref(db, "chat/"), (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    if (data) {
                        let userChats = [];
                        Object.keys(data).forEach((key) => {
                            const currRecord = data[key];
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
                }
            });
            onValue(ref(db, "message/"), (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    if (currentChat) {
                        let messages = [];
                        Object.keys(data).forEach((key) => {
                            const currRecord = data[key];
                            if (currRecord.chatId == currentChat.id) {
                                const { role, content } = data[key];
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
