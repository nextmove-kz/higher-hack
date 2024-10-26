"use client";
import ChatSidebar from "@/components/ChatSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
