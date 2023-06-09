// ==================== react ====================
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ==================== firebase ====================
import { ref as refDb, onValue, push, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../configurations/firebaseConfig";
import { getChatMessages } from "../helperfunctions/FirebaseRealtimeDB";
import {
    ref as refStorage,
    getDownloadURL,
    uploadString,
} from "firebase/storage";

// ==================== components ====================
import ChatComponent from "../components/Chats/ChatComponent";
import ChatSide from "../components/Chats/ChatSide";
import Assistant from "../components/Main/Assistant";

// ==================== etc ====================
import { Grid } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

function ImageGenerationPage() {
    // ==================== states  ====================
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
        await push(refDb(db, "message/"), newMessage).then(() => {
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
        await getChatMessages(
            chosenChat && chosenChat.id ? chosenChat.id : null
        ).then((messages) => {
            const chatMessages = [];
            messages.forEach((message) => {
                const { role, content } = message;
                const chatMessage = {
                    role,
                    content,
                };
                chatMessages.push(chatMessage);
                setCurrentChat({
                    id: chosenChat.id,
                    chatName: chosenChat.chatName,
                    messages: chatMessages,
                });
            });
        });
    };

    // trigger the openAI
    // returns the message from openAI
    const triggerOpenAI = async (userPrompt, selectedChat) => {
        await sendMessageHelper(userPrompt, "user", selectedChat.id);
        setIsTyping(true);
        const imageParameters = {
            prompt: userPrompt,
            n: parseInt(1),
            size: "1024x1024",
            response_format: "b64_json",
        };

        await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(imageParameters),
        })
            .then((data) => data.json())
            .then(async (data) => {
                const base64Data = data.data[0].b64_json;
                const storageRef = refStorage(storage, userPrompt + ".png");
                await uploadString(storageRef, base64Data, "base64")
                    .then(async (snapshot) => {
                        await getDownloadURL(snapshot.ref).then(async (url) => {
                            setReply(url);
                            setIsTyping(false);
                            await sendMessageHelper(
                                url,
                                "system",
                                selectedChat.id
                            );
                        });
                    })
                    .catch((err) => {
                        setIsTyping(false);
                        toast("Something went wrong, please try again later");
                    });
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
            type: "image-generation",
        };
        let tempChats = chats;
        tempChats.push(newChat);
        const createdChat = push(refDb(db, "chat/"), newChat);
        get(createdChat)
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const selectedChat = {
                        id: createdChat.key,
                        chatName: data.chatName,
                        messages: [],
                    };
                    await selectChat(selectedChat);
                    await triggerOpenAI(chatName, selectedChat);
                    await refreshChat(selectedChat);
                }
            })
            .catch((error) => {
                console.error(error);
            });
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
                // await sendMessageHelper(currMessage, "user", currentChat.id);
                await triggerOpenAI(currMessage, currentChat);
            }
        }
    };

    // ==================== useEffect ====================
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                nav("/login");
            } else {
                setCurrUserId(user.uid);
                onValue(refDb(db, "chat/"), (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        if (data) {
                            let userChats = [];
                            Object.keys(data).forEach((key) => {
                                const currRecord = data[key];
                                if (
                                    currRecord.userId == user.uid &&
                                    currRecord.type == "image-generation"
                                ) {
                                    const { chatName, createdDate } =
                                        currRecord;
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
                onValue(refDb(db, "message/"), (snapshot) => {
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
            }
        });
    }, []);

    return (
        <div>
            <Toaster />
            <Grid container>
                <Grid item xs={6} md={3}>
                    <Assistant
                        isChatMode={false}
                        reply={reply}
                        isTyping={isTyping}
                        currentChatId={currentChat ? currentChat.id : null}
                    />
                    <ChatSide
                        chats={chats}
                        selectChat={selectChat}
                        createNewChat={createNewChat}
                        selectedChat={currentChat}
                    />
                </Grid>
                <Grid item xs={6} md={9}>
                    <ChatComponent
                        sendMessage={sendMessage}
                        currMessage={currMessage}
                        setCurrMessage={setCurrMessage}
                        currentChat={currentChat}
                        loading={isTyping}
                        isImageGenerator={true}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default ImageGenerationPage;
