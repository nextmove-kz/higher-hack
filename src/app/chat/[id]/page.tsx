"use client";

import React from "react";
import { useEffect, useState } from "react";
import { getCurrentUser, getUser } from "@/api/auth";
import { getMessages, getMessagesTest, sendMessage } from "@/api/chat";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  user: {
    username: string;
  };
}

const chatPage = () => {
  const id = useParams<{ id: string }>().id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const user = getCurrentUser();

  console.log("Current user:", user);
  if (!user) {
    console.error("User is not authenticated!");
    return [];
  }

  console.log("Chat ID:", id);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (id) {
          const messagesData = await getMessagesTest();
          console.log("Messages data:", messagesData);

          const formattedMessages = messagesData.map((message: any) => ({
            id: message.id,
            text: message.text,
            user: message.expand?.user || { username: "Unknown" },
          }));

          setMessages(formattedMessages);
        } else {
          console.error("No chat ID found.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await sendMessage(id as string, newMessage, "hpb4obejqv4olxh");
      setNewMessage("");

      // const updatedMessages = await getMessages(id as string);
      const updatedMessages = await getMessagesTest();

      const formattedMessages = updatedMessages.map((message: any) => ({
        id: message.id,
        text: message.text,
        user: message.expand?.user || { username: "Unknown" },
      }));
      console.log(formattedMessages);

      setMessages(formattedMessages);
    }
  };

  //   useEffect(() => {
  //     if (!id) return;

  //     const fetchMessages = async () => {
  //       try {
  //         const chatMessages = await pocketbase
  //           .collection("messages")
  //           .getFullList({
  //             filter: `chat = '${id}'`,
  //             expand: "user",
  //             sort: "created_at",
  //           });
  //         const formattedMessages = ;
  //         console.log(formattedMessages);
  //         setMessages(formattedMessages);
  //       } catch (error) {
  //         console.error("Failed to fetch messages:", error);
  //       }
  //     };

  //     fetchMessages();
  //   }, [id]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (newMessage.trim() && user) {
  //     await sendMessage(id as string, newMessage, user.id);
  //     setNewMessage("");

  //     const updatedMessages = await getMessages(id as string);

  //     const formattedMessages = updatedMessages.map((message: any) => ({
  //       id: message.id,
  //       text: message.text,
  //       user: message.expand?.user || { username: "Unknown" },
  //     }));
  //     console.log(formattedMessages);
  //     setMessages(formattedMessages);
  //   }
  // };

  const handleCopyId = () => {
    if (id) {
      navigator.clipboard
        .writeText(id)
        .then(() => {
          console.log("ID скопирован!");
        })
        .catch((err) => {
          console.error("Не удалось скопировать ID:", err);
        });
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="flex flex-col p-4 mb-4 border-b ">
        <h1 className="text-2xl">Chat</h1>
        <div className="flex gap-2">
          <p>Chat ID:</p>
          <Badge onClick={handleCopyId} className="cursor-pointer">
            {id ? <p>{id}</p> : <p>No Chat ID available</p>}
          </Badge>
        </div>
      </div>
      <div className="space-y-4 p-4">
        {messages.length === 0 ? (
          <p>Loading messages or no messages available...</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className="flex flex-col rounded-xl bg-slate-100 p-4 w-auto min-w-[350px] max-w-[650px]"
            >
              <strong>{message.user.username}:</strong>
              <p className="break-words max-w-[650px] w-full">{message.text}</p>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="sticky bottom-2 m-4 pr-8 w-full">
        <div className="flex relative">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message"
            className="border p-2 w-full rounded-xl"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              color="orange"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
              <path d="M6 12h16" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default chatPage;
