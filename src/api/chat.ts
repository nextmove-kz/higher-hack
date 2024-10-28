import pocketbase from "./pocketbase";

export const getChats = async (userId: any) => {
    return await pocketbase.collection('chats').getFullList({
        filter: `users ?~ '${userId}'`,
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
        expand: 'user, chat',

        // sort: 'created_at'
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
      return error;
    }
};

export const getChat = async (chatId: string) => {
    return await pocketbase.collection('chats').getFirstListItem(`id = "${chatId}"`);
};

export const getLatestMessages = async (chatIds: string[]) => {
  try {
    const latestMessages = await Promise.all(
      chatIds.map(async (chatId) => {
        const latestMessage = await pocketbase.collection("messages").getList(1, 1, {
          filter: `chat = "${chatId}"`,
          sort: "-created_at",
          expand: "user, chat",
        });
        if (latestMessage?.items?.[0]) {
          return {
            ...latestMessage.items[0],
            chatId,
          };
        }
        return null;
      })
    );
    return latestMessages.filter(Boolean);
  } catch (error) {
    console.error("Error fetching latest messages:", error);
    return [];
  }
};

