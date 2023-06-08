import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import Assistant from "../components/Main/Assistant";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Grid, Box } from "@mui/material";
import ChatSide from "../components/Chats/ChatSide";
import { ref, onValue, push } from "firebase/database";
import { db } from "../firebaseConfig";
import toast, { Toaster } from "react-hot-toast";

function AMAPage() {
    const nav = useNavigate();
    const [currUserId, setCurrUserId] = useState(null);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const selectChat = (chatId) => {
        if (currentChat == chatId) {
            setCurrentChat(null);
        } else {
            setCurrentChat(chatId);
        }
    };

    const createNewChat = () => {
        let newChat = {
            chatName: "testing",
            userId: currUserId,
            createdDate: new Date().toISOString(),
            type: "ama",
        };
        let tempChats = chats;
        tempChats.push(newChat);
        push(ref(db, "chat/"), newChat);
        toast("Created");
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                nav("/login");
            }
            setCurrUserId(user.uid);
            const chatRef = ref(db, "/chat");
            onValue(chatRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    let userChats = [];
                    Object.keys(data).forEach((key) => {
                        const currRecord = data[key];
                        if (
                            currRecord.userId == user.uid &&
                            currRecord.type == "ama"
                        ) {
                            const { chatName, createdDate } = data[key];
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
            });
        });
    }, []);
    return (
        <div>
            <Toaster />
            <Grid container>
                <Grid item xs={12} sm={12} md={3} lg={6}>
                    <Assistant isChatMode={true} />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={2}>
                    <ChatSide
                        chats={chats}
                        selectChat={selectChat}
                        createNewChat={createNewChat}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Box sx={{ margin: "10px" }}></Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default AMAPage;
