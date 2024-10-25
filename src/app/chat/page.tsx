"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../api/auth";
import { getAllChats, getChats } from "../../api/chat";
import Link from "next/link";

interface Chat {
  id: string;
  title: string;
}

const Chats = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = getCurrentUser();
      console.log("user", user);

      const chatsData = await getAllChats();

      const formattedChats = chatsData.map((chat: any) => ({
        id: chat.id,
        title: chat.title || "Untitled Chat",
      }));
      console.log(formattedChats);

      setChats(formattedChats);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">Chats</h1>
    </div>
  );
};

export default Chats;