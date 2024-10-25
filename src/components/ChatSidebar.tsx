"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/api/auth";
import { getAllChats, getChats } from "@/api/chat";
import { Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Chat {
  id: string;
  title: string;
}

const ChatSidebar = () => {
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const user = getCurrentUser();
  //     if (!user) {
  //       return;
  //     }

  //     const chatsData = await getChats("ygo6rrkvai3adw5");

  //     const formattedChats = chatsData.map((chat: any) => ({
  //       id: chat.id,
  //       title: chat.title || "Untitled Chat",
  //     }));

  //     setChats(formattedChats);
  //   };

  //   fetchData();
  // }, []);

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

  const filteredConversations = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openChat = (chadId: string) => {
    router.push(`/chat/${chadId}`);
  };
  return (
    <div className="flex flex-col w-1/6 h-full bg-background border-r">
      <div className="p-4 border-b flex bg-orange-500 text-white">
        <div className="flex items-center justify-between">
          {/* <h2 className="text-xl font-semibold">Chats</h2> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            <path d="M8 12h.01" />
            <path d="M12 12h.01" />
            <path d="M16 12h.01" />
          </svg>
          {/* <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button> */}
        </div>
        <div className="relative w-full ml-2">
          <Input
            type="text"
            placeholder="Search conversations..."
            className="pl-4 rounded-xl text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {filteredConversations.map((chat) => (
          <div
            key={chat.id}
            className="p-4 hover:bg-accent cursor-pointer transition-colors border-b hover:bg-slate-100"
            onClick={() => openChat(chat.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium truncate">{chat.title}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
