"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, X, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function AIChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Hi! I'm Prakash's AI assistant. Ask me anything about his skills, projects, or background!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: userMessage }] }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "model", content: data.reply }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: "model", content: "Oops! Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center cursor-pointer"
        >
          <Bot className="h-7 w-7" />
        </Button>
      ) : (
        <div className="w-[90vw] sm:w-[380px] h-[500px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-zinc-800/50 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-indigo-400" />
              <span className="font-semibold text-sm text-white">Ask AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3.5 py-2.5 rounded-xl ${msg.role === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-zinc-800 text-zinc-200 rounded-bl-none"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 text-zinc-400 px-3 py-2 rounded-xl rounded-bl-none flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-xs">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-zinc-800 bg-zinc-900/50 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my projects, skills..."
              className="flex-1 bg-zinc-800 border border-zinc-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
            <Button type="submit" size="icon" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}