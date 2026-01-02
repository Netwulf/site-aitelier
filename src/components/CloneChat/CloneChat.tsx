import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RotateCcw, ArrowLeft, Feather, User, Brain, Sparkles, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import ReactMarkdown from "react-markdown";
import { CloneChatProps, Message, CloneConfig } from "./types";

// Icon mapping for dynamic icon rendering
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Feather,
  User,
  Brain,
  Sparkles,
  Globe,
};

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getFallbackResponse(message: string, fallbacks?: Record<string, string>): string {
  if (!fallbacks) return "I'm currently offline. Please try again later.";

  const lower = message.toLowerCase();

  // Check for keyword matches
  for (const [key, response] of Object.entries(fallbacks)) {
    if (key !== "default" && lower.includes(key)) {
      return response;
    }
  }

  // Special cases for Neil Gaiman style fallbacks
  if (lower.includes("block") || lower.includes("stuck") || lower.includes("can't write")) {
    return fallbacks.block || fallbacks.default || "";
  }
  if (lower.includes("write") || lower.includes("writing") || lower.includes("draft")) {
    return fallbacks.writing || fallbacks.default || "";
  }
  if (lower.includes("story") || lower.includes("stories") || lower.includes("tale")) {
    return fallbacks.stories || fallbacks.default || "";
  }
  if (lower.includes("imagine") || lower.includes("imagination") || lower.includes("creative")) {
    return fallbacks.imagination || fallbacks.default || "";
  }

  return fallbacks.default || "I'm currently unavailable. Please try again later.";
}

// Markdown renderer for assistant messages
const MessageContent = ({ content, role }: { content: string; role: "user" | "assistant" }) => {
  if (role === "user") {
    return <span>{content}</span>;
  }

  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold text-warm-ivory">{children}</strong>,
        em: ({ children }) => <em className="italic text-warm-ivory/80">{children}</em>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-tech-olive/50 pl-3 my-3 italic text-warm-ivory/70">
            {children}
          </blockquote>
        ),
        ul: ({ children }) => <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="text-warm-ivory/85">{children}</li>,
        code: ({ children }) => (
          <code className="bg-white/10 px-1.5 py-0.5 rounded text-tech-olive text-[13px]">
            {children}
          </code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

// Typing indicator
const TypingIndicator = () => (
  <div className="flex items-center gap-1 py-1">
    <span className="text-warm-ivory/40 text-xs italic mr-2">thinking</span>
    <span className="w-1.5 h-1.5 bg-tech-olive/60 rounded-full animate-pulse" />
    <span className="w-1.5 h-1.5 bg-tech-olive/60 rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
    <span className="w-1.5 h-1.5 bg-tech-olive/60 rounded-full animate-pulse" style={{ animationDelay: "400ms" }} />
  </div>
);

// Avatar component
const CloneAvatar = ({ clone, size = "md" }: { clone: CloneConfig; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-16 h-16",
  };
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  if (clone.avatar.type === "image" && clone.avatar.imageUrl) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden border border-white/10`}>
        <img src={clone.avatar.imageUrl} alt={clone.name} className="w-full h-full object-cover" />
      </div>
    );
  }

  const IconComponent = ICONS[clone.avatar.icon || "User"] || User;
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 flex items-center justify-center`}>
      <IconComponent className={`${iconSizes[size]} text-tech-olive`} />
    </div>
  );
};

const CloneChat = ({ clone, onBack, fullscreen = true }: CloneChatProps) => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Disable body scroll when in fullscreen mode
  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [fullscreen]);

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Reset height to auto to get the correct scrollHeight
    e.target.style.height = "auto";
    // Set new height (max 200px)
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + "px";
  };

  // Typing animation
  const simulateTyping = async (response: string, messageId: string) => {
    const chars = response.split("");
    let currentText = "";
    let lastUpdate = Date.now();

    for (let i = 0; i < chars.length; i++) {
      currentText += chars[i];

      const now = Date.now();
      if (now - lastUpdate > 20 || i === chars.length - 1) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === messageId ? { ...msg, content: currentText } : msg))
        );
        lastUpdate = now;

        const char = chars[i];
        let delay = 8;
        if (char === "." || char === "!" || char === "?") delay = 150;
        else if (char === ",") delay = 80;
        else if (char === "\n") delay = 100;
        else delay = 12 + Math.random() * 15;

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const userMsgId = generateId();
    const assistantMsgId = generateId();

    setInput("");
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        role: "user",
        content: userMessage,
        timestamp: new Date(),
        status: "sent",
      },
    ]);
    setIsLoading(true);

    // Add placeholder for assistant message
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMsgId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        status: "sending",
      },
    ]);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(clone.api.endpoint, {
        method: clone.api.method || "POST",
        headers: {
          "Content-Type": "application/json",
          ...clone.api.headers,
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages
            .filter((m) => m.status === "sent")
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      setIsOffline(false);
      await simulateTyping(data.response, assistantMsgId);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === assistantMsgId ? { ...msg, status: "sent" } : msg))
      );
    } catch {
      setIsOffline(true);
      const fallbackResponse = getFallbackResponse(userMessage, clone.fallbackResponses);
      await simulateTyping(fallbackResponse, assistantMsgId);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === assistantMsgId ? { ...msg, status: "sent" } : msg))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = (messageId: string) => {
    const msgIndex = messages.findIndex((m) => m.id === messageId);
    if (msgIndex > 0) {
      const userMsg = messages[msgIndex - 1];
      if (userMsg.role === "user") {
        setMessages((prev) => prev.filter((_, i) => i < msgIndex));
        setInput(userMsg.content);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/playground");
    }
  };

  const containerClass = fullscreen
    ? "fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col"
    : "flex flex-col h-[600px] max-h-[80vh] bg-[#0a0a0a] rounded-lg overflow-hidden shadow-2xl border border-white/10";

  return (
    <div className={containerClass}>
      {/* Header - Fixed */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 md:px-6 py-4 bg-[#0a0a0a] border-b border-white/10">
        <div className="flex items-center gap-4">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/10
                     text-warm-ivory/50 hover:text-tech-olive hover:border-tech-olive/50
                     transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Avatar + Info */}
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <CloneAvatar clone={clone} size="md" />
              <div
                className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0a0a0a] ${
                  isOffline ? "bg-amber-500" : "bg-tech-olive"
                }`}
              />
            </div>
            <div>
              <h3 className="font-mono-v2 text-sm text-warm-ivory tracking-wide font-medium">
                {clone.name}
              </h3>
              <p className="text-[11px] text-warm-ivory/40 font-mono-v2 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isOffline ? "bg-amber-500" : "bg-tech-olive"}`} />
                {isOffline ? "Offline mode" : clone.subtitle || "AI Clone"}
              </p>
            </div>
          </div>
        </div>

        {/* Category badge */}
        <div className="hidden md:flex items-center gap-2">
          <span className="px-3 py-1.5 bg-tech-olive/10 text-tech-olive text-[10px] font-mono-v2 tracking-wider border border-tech-olive/20 rounded">
            {clone.category}
          </span>
        </div>
      </header>

      {/* Messages - Scrollable, takes remaining space */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{ scrollBehavior: prefersReducedMotion ? "auto" : "smooth" }}
      >
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-5">
          {messages.length === 0 ? (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-12 md:py-20"
            >
              <CloneAvatar clone={clone} size="lg" />
              <h2 className="text-xl md:text-2xl font-display text-warm-ivory mt-6 mb-2">
                {clone.title}
              </h2>
              {clone.subtitle && (
                <p className="text-warm-ivory/50 text-sm mb-8">{clone.subtitle}</p>
              )}

              {clone.suggestedPrompts && clone.suggestedPrompts.length > 0 && (
                <div className="w-full max-w-md space-y-2">
                  <p className="text-[10px] text-warm-ivory/40 font-mono-v2 tracking-wider mb-3 text-center">
                    SUGGESTED TOPICS
                  </p>
                  {clone.suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(prompt)}
                      className="w-full text-left px-4 py-3 text-sm text-warm-ivory/70
                               bg-white/[0.02] border border-white/5 rounded-lg
                               hover:bg-white/[0.05] hover:border-tech-olive/30 hover:text-warm-ivory
                               transition-all duration-200 font-mono-v2"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Avatar for assistant */}
                    {msg.role === "assistant" && (
                      <div className="flex-shrink-0 mt-1">
                        <CloneAvatar clone={clone} size="sm" />
                      </div>
                    )}

                    <div className="flex flex-col gap-1">
                      <div
                        className={`px-4 py-3 ${
                          msg.role === "user"
                            ? "bg-tech-olive text-void-black rounded-2xl rounded-br-md text-sm"
                            : "bg-white/[0.03] text-warm-ivory/90 rounded-2xl rounded-bl-md border border-white/5 text-[15px] leading-[1.7]"
                        }`}
                      >
                        {msg.content ? (
                          <MessageContent content={msg.content} role={msg.role} />
                        ) : (
                          <TypingIndicator />
                        )}
                      </div>

                      {/* Error state with retry */}
                      {msg.status === "error" && (
                        <button
                          onClick={() => handleRetry(msg.id)}
                          className="flex items-center gap-1.5 text-[11px] text-red-400 hover:text-red-300 transition-colors self-start ml-11"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Failed to send. Retry?
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Input - Fixed at bottom */}
      <footer className="flex-shrink-0 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-4">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={clone.placeholder || "Type your message..."}
              disabled={isLoading}
              rows={1}
              aria-label="Message input"
              className="flex-1 px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl
                       text-warm-ivory placeholder:text-warm-ivory/30 text-sm
                       focus:border-tech-olive/50 focus:bg-white/[0.05] focus:outline-none
                       transition-all duration-200 resize-none min-h-[48px] max-h-[200px]
                       disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="flex-shrink-0 w-12 h-12 bg-tech-olive text-void-black rounded-xl
                       flex items-center justify-center
                       hover:bg-tech-olive/90 active:scale-95
                       transition-all duration-150
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          <p className="text-[10px] text-warm-ivory/25 mt-3 text-center font-mono-v2 tracking-wide">
            AI clone powered by cognitive modeling
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CloneChat;
