"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../api/auth";
import { getAllChats, getChats } from "../../api/chat";

interface Chat {
  id: string;
  title: string;
}

const Chats = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = getCurrentUser();

      const chatsData = await getAllChats();

      const formattedChats = chatsData.map((chat: any) => ({
        id: chat.id,
        title: chat.title || "Untitled Chat",
      }));

      setChats(formattedChats);
    };

    fetchData();
  }, []);

  return <div></div>;
};

export default Chats;
