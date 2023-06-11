import { db } from "../configurations/firebaseConfig";
import { ref, child, get } from "firebase/database";
// retrieve chat info
// title, etc and date
export const getChatInfo = async (selectedChatId) => {
    // check if chat exists
    const dbRef = ref(db);
    const chat = await get(child(dbRef, `chat/${selectedChatId}`));
    if (chat.exists()) {
        return chat.val();
    }
    return null;
};

// retrieve chat messages of specific chat
export const getChatMessages = async (selectedChatId) => {
    const chatsRef = ref(db, "message/");
    let messages = [];
    await get(chatsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            
            Object.keys(data).forEach((key) => {
                const { chatId, content, role, sentDate } = data[key];
                if (selectedChatId === chatId) {
                    messages.push({ content, role, sentDate });
                }
            });
        }
    });
    return messages;
};
