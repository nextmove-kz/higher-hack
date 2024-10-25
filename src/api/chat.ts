import pocketbase from "./pocketbase";

export const getChats = async (userId: any) => {
    return await pocketbase.collection('chats').getFullList({
        filter: `users ? '${userId}'`,
        expand: "users"
    });
};

export const getAllChats = async () => {
    return await pocketbase.collection("chats").getFullList(200, { expand: "users" });
};

export const getMessagesTest = async () => {
    return await pocketbase.collection("messages").getFullList(200, { expand: "user" });
};

export const getMessages = async (chatId: string) => {
    return await pocketbase.collection('messages').getFullList({
        filter: `chat = '${chatId}'`,
        expand: 'user',
        sort: 'created_at'
      });
};

export const sendMessage = async (chatId: string, text: string, userId: string) => {
    try {
      console.log("Sending message:", { chatId, text, userId });
      const response = await pocketbase.collection("messages").create({
        text: text,
        user: userId,
        chat: chatId,
      });
      console.log("Message sent successfully:", response);
      return response;
    } catch (error) {
      console.error("Error in sendMessage:", error);
      throw error;
    }
};



