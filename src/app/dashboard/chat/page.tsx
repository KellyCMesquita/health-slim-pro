"use client";

import { useEffect, useState, useRef } from "react";
import { supabaseClient } from "@/lib/supabase-client";
import { MessageCircle, Send, Bot, User as UserIcon } from "lucide-react";

interface Message {
  id: string;
  mensagem: string;
  resposta: string;
  created_at: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMessages = async () => {
    try {
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) return;

      const { data, error } = await supabaseClient
        .from("chat")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Erro ao carregar mensagens:", error);
      } else {
        setMessages(data || []);
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    const messageText = newMessage;
    setNewMessage("");

    try {
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) return;

      // Simular resposta do bot (você pode integrar com uma API de IA aqui)
      const botResponse = "Obrigado pela sua mensagem! Esta é uma resposta automática. Em breve, integraremos com IA para respostas personalizadas.";

      const { data, error } = await supabaseClient
        .from("chat")
        .insert({
          user_id: user.id,
          mensagem: messageText,
          resposta: botResponse,
        })
        .select()
        .single();

      if (error) {
        console.error("Erro ao enviar mensagem:", error);
      } else if (data) {
        setMessages([...messages, data]);
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Chat de Suporte
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Converse com nosso assistente virtual
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col h-[600px]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Nenhuma mensagem ainda
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comece uma conversa enviando uma mensagem
              </p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  {/* User Message */}
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[70%]">
                      <p className="text-sm">{message.mensagem}</p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full flex-shrink-0">
                      <UserIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>

                  {/* Bot Response */}
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-full flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-[70%]">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {message.resposta}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSendMessage}
          className="border-t border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              disabled={sending}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
