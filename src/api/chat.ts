import clientPocketBase from "./client_pb";

export const getChats = async (userId: any) => {
  return await clientPocketBase.collection("chats").getFullList({
    filter: `users ?~ '${userId}'`,
    expand: "users",
  });
};

export const getAllChats = async () => {
  return await clientPocketBase
    .collection("chats")
    .getFullList(200, { expand: "users" });
};

export const getMessagesTest = async () => {
  return await clientPocketBase
    .collection("messages")
    .getFullList(200, { expand: "user" });
};

export const getMessages = async (chatId: string) => {
  return await clientPocketBase.collection("messages").getFullList({
    filter: `chat = '${chatId}'`,
    expand: "user, chat",

    // sort: 'created_at'
  });
};

export const sendMessage = async (
  chatId: string,
  text: string,
  userId: string
) => {
  try {
    const response = await clientPocketBase.collection("messages").create({
      text: text,
      user: userId,
      chat: chatId,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getChat = async (chatId: string) => {
  return await clientPocketBase
    .collection("chats")
    .getFirstListItem(`id = "${chatId}"`);
};

export const getLatestMessages = async (chatIds: string[]) => {
  try {
    const latestMessages = await Promise.all(
      chatIds.map(async (chatId) => {
        const latestMessage = await clientPocketBase
          .collection("messages")
          .getList(1, 1, {
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
