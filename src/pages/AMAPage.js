// ==================== react ====================
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ==================== firebase ====================
import { ref, onValue, push, get } from "firebase/database";
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
    const [isTyping, setIsTyping] = useState(false);
    const [reply, setReply] = useState("");

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

    const refreshChat = async (chosenChat) => {
        const getMessages = ref(db, "message/");
        await get(getMessages)
            .then((snapshot) => {
                let messages = [];
                if (snapshot.exists()) {
                    let data = snapshot.val();
                    Object.keys(data).forEach((key) => {
                        const currRecord = data[key];
                        if (currRecord.chatId == chosenChat.id) {
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
                    id: chosenChat.id,
                    chatName: chosenChat.chatName,
                    messages,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // trigger the openAI
    // returns the message from openAI
    const triggerOpenAI = async (chatMessages, selectedChat) => {
        const systemMessage = {
            //  Explain things like you're talking to a software professional with 5 years of experience.
            role: "system",
            content: "Explain things in layman terms",
        };

        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [
                systemMessage, // The system message DEFINES the logic of our chatGPT
                ...chatMessages, // The messages from our chat with ChatGPT
            ],
        };

        setIsTyping(true);
        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
        })
            .then((data) => data.json())
            .then(async (data) => {
                const reply = data.choices[0].message.content;
                setReply(reply);
                setIsTyping(false);
                await sendMessageHelper(reply, "system", selectedChat.id);
            })
            .catch((err) => {
                setIsTyping(false);
                toast("Something went wrong, please try again later");
            });
    };

    // ==================== main functions ====================
    // select existing chat
    const selectChat = async (selectedNewChat) => {
        if (currentChat && currentChat.id == selectedNewChat.id) {
            setCurrentChat(null);
        } else {
            setCurrentChat(selectedNewChat);
            await refreshChat(selectedNewChat);
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
                        messages: [],
                    };
                    await sendMessageHelper(chatName, "user", createdChat.key);
                    await selectChat(selectedChat);
                    // await refreshChat(selectedChat);
                    await triggerOpenAI(
                        [{ content: chatName, role: "user" }],
                        selectedChat
                    );
                    await refreshChat(selectedChat);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        toast("Created");
    };

    // send message via enter
    const sendMessage = async (keycode) => {
        if (keycode === "Enter" && currMessage.length > 0) {
            setCurrMessage("");
            if (!currentChat) {
                // create new chat
                createNewChat(currMessage);
            } else {
                // message on existing chat
                await sendMessageHelper(currMessage, "user", currentChat.id);
                await triggerOpenAI(
                    [
                        ...currentChat.messages,
                        { content: currMessage, role: "user" },
                    ],
                    currentChat
                );
            }
            toast("Message sent");
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
                    <Assistant
                        isChatMode={true}
                        reply={reply}
                        isTyping={isTyping}
                        currentChat={currentChat}
                    />
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
                        loading={isTyping}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default AMAPage;
