import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { ChatMessage } from "../data/mockData";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage?: (message: string, files?: File[]) => void;
  placeholder?: string;
}

export default function ChatInterface({ 
  messages, 
  onSendMessage,
  placeholder = "Type your message..."
}: ChatInterfaceProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className={msg.sender === "user" ? "bg-blue-100" : "bg-slate-100"}>
                  {msg.senderName?.[0] || (msg.sender === "user" ? "U" : "F")}
                </AvatarFallback>
              </Avatar>
              <div className={`flex flex-col gap-1 max-w-[70%] ${msg.sender === "user" ? "items-end" : ""}`}>
                <span className="text-xs text-slate-500">{msg.senderName || msg.sender}</span>
                <div
                  className={`rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {msg.attachments.map((file, idx) => (
                      <div
                        key={idx}
                        className="text-xs bg-slate-100 rounded px-2 py-1 flex items-center gap-1"
                      >
                        <Paperclip className="h-3 w-3" />
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
                <span className="text-xs text-slate-400">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t p-4 bg-white">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            className="resize-none min-h-[44px] max-h-32"
            rows={1}
          />
          <Button onClick={handleSend} size="icon" className="shrink-0 bg-blue-600 hover:bg-blue-700">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
