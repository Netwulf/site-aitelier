import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RotateCcw, Feather } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: "sending" | "sent" | "error";
}

interface NeilGaimanChatProps {
  onClose?: () => void;
}

// Fallback responses when API is down - curated Neil Gaiman wisdom
const FALLBACK_RESPONSES: Record<string, string> = {
  default: `Stories are, in one way or another, mirrors. We use them to explain to ourselves how the world works or how it doesn't work. Like mirrors, stories prepare us for the day to come. They distract us from the things in the darkness.

The one thing you have that nobody else has is you. Your voice, your mind, your story, your vision. So write and draw and build and play and dance and live as only you can.`,

  writing: `Start telling the stories that only you can tell, because there'll always be better writers than you and there'll always be smarter writers than you. There will always be people who are much better at doing this or doing that — but you are the only you.

The main rule of writing is that if you do it with enough assurance and confidence, you're allowed to do whatever you like. So write your story as it needs to be written. Write it honestly, and tell it as best you can.`,

  block: `Writer's block is just a fancy way of saying "I'm afraid." Fear of the blank page, fear of not being good enough, fear of what people might think.

The solution? Start writing badly. Give yourself permission to write the worst thing ever written. You can always fix bad writing. You can't fix a blank page.

Remember: the first draft is just you telling yourself the story.`,

  stories: `Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.

We who make stories know that we tell lies for a living. But they are good lies that say true things, and we owe it to our readers to build them as best we can. Because somewhere out there is someone who needs that story.`,

  imagination: `The imagination is a muscle. The more you use it, the stronger it gets. Read widely. Dream deeply. Ask "what if?" and then follow where it leads.

A book is a dream that you hold in your hand. When you read, you're opening a door to another world. When you write, you're building that door for others.`
};

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("block") || lower.includes("stuck") || lower.includes("can't write")) {
    return FALLBACK_RESPONSES.block;
  }
  if (lower.includes("write") || lower.includes("writing") || lower.includes("draft")) {
    return FALLBACK_RESPONSES.writing;
  }
  if (lower.includes("story") || lower.includes("stories") || lower.includes("tale")) {
    return FALLBACK_RESPONSES.stories;
  }
  if (lower.includes("imagine") || lower.includes("imagination") || lower.includes("creative")) {
    return FALLBACK_RESPONSES.imagination;
  }
  return FALLBACK_RESPONSES.default;
}

// Component for rendering formatted message content
const MessageContent = ({ content, role }: { content: string; role: "user" | "assistant" }) => {
  if (role === "user") {
    return <span>{content}</span>;
  }

  return (
    <ReactMarkdown
      components={{
        // Paragraphs with nice spacing
        p: ({ children }) => (
          <p className="mb-3 last:mb-0">{children}</p>
        ),
        // Bold text
        strong: ({ children }) => (
          <strong className="font-semibold text-warm-ivory">{children}</strong>
        ),
        // Italic text
        em: ({ children }) => (
          <em className="italic text-warm-ivory/80">{children}</em>
        ),
        // Quotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-tech-olive/50 pl-3 my-3 italic text-warm-ivory/70">
            {children}
          </blockquote>
        ),
        // Lists
        ul: ({ children }) => (
          <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-warm-ivory/85">{children}</li>
        ),
        // Code inline
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

// Typing indicator with more natural animation
const TypingIndicator = () => (
  <div className="flex items-center gap-1 py-1">
    <span className="text-warm-ivory/40 text-xs italic mr-2">thinking</span>
    <span className="w-1.5 h-1.5 bg-tech-olive/60 rounded-full animate-pulse" />
    <span className="w-1.5 h-1.5 bg-tech-olive/60 rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
    <span className="w-1.5 h-1.5 bg-tech-olive/60 rounded-full animate-pulse" style={{ animationDelay: "400ms" }} />
  </div>
);

const NeilGaimanChat = ({ onClose }: NeilGaimanChatProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
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

  const simulateTyping = async (response: string, messageId: string) => {
    // Type character by character for more natural feel
    const chars = response.split("");
    let currentText = "";
    let lastUpdate = Date.now();

    for (let i = 0; i < chars.length; i++) {
      currentText += chars[i];

      // Update UI every few characters for performance
      const now = Date.now();
      if (now - lastUpdate > 20 || i === chars.length - 1) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId ? { ...msg, content: currentText } : msg
          )
        );
        lastUpdate = now;

        // Variable delay for natural rhythm
        const char = chars[i];
        let delay = 8;
        if (char === '.' || char === '!' || char === '?') delay = 150; // Pause at sentence end
        else if (char === ',') delay = 80; // Brief pause at comma
        else if (char === '\n') delay = 100; // Pause at line break
        else delay = 12 + Math.random() * 15;

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const userMsgId = generateId();
    const assistantMsgId = generateId();

    setInput("");
    setMessages(prev => [...prev, {
      id: userMsgId,
      role: "user",
      content: userMessage,
      timestamp: new Date(),
      status: "sent"
    }]);
    setIsLoading(true);

    // Add placeholder for assistant message
    setMessages(prev => [...prev, {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      status: "sending"
    }]);

    try {
      // Connect to Neil Gaiman API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch("https://neil-gaiman-api-production.up.railway.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.filter(m => m.status === "sent").map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      setIsOffline(false);
      await simulateTyping(data.response, assistantMsgId);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMsgId ? { ...msg, status: "sent" } : msg
        )
      );
    } catch {
      // Fallback to curated responses when API unavailable
      setIsOffline(true);
      const fallbackResponse = getFallbackResponse(userMessage);
      await simulateTyping(fallbackResponse, assistantMsgId);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMsgId ? { ...msg, status: "sent" } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = (messageId: string) => {
    const msgIndex = messages.findIndex(m => m.id === messageId);
    if (msgIndex > 0) {
      const userMsg = messages[msgIndex - 1];
      if (userMsg.role === "user") {
        setMessages(prev => prev.filter((_, i) => i < msgIndex));
        setInput(userMsg.content);
      }
    }
  };

  const suggestedPrompts = [
    "How do I overcome writer's block?",
    "What makes a story truly memorable?",
    "Tell me about the power of imagination",
  ];

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] bg-[#0a0a0a] rounded-lg overflow-hidden shadow-2xl border border-white/10">

      {/* Header - Fixed */}
      <header className="flex-shrink-0 flex items-center justify-between px-5 py-4 bg-[#0a0a0a] border-b border-white/10">
        <div className="flex items-center gap-4">
          {/* Avatar - SVG inline for reliability */}
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 flex items-center justify-center">
              <Feather className="w-5 h-5 text-tech-olive" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-tech-olive rounded-full border-2 border-[#0a0a0a]" />
          </div>
          <div>
            <h3 className="font-mono-v2 text-sm text-warm-ivory tracking-wide font-medium">
              Neil Gaiman
            </h3>
            <p className="text-[11px] text-warm-ivory/40 font-mono-v2 flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isOffline ? 'bg-amber-500' : 'bg-tech-olive'}`} />
              {isOffline ? "Offline mode" : "AI Clone"}
            </p>
          </div>
        </div>
      </header>

      {/* Messages - Scrollable */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{ scrollBehavior: prefersReducedMotion ? 'auto' : 'smooth' }}
      >
        <div className="px-5 py-6 space-y-5">
          {messages.length === 0 ? (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Feather className="w-7 h-7 text-tech-olive" />
              </div>
              <p className="text-warm-ivory/60 text-sm text-center mb-2 max-w-[280px] italic">
                "Stories are, in one way or another, mirrors."
              </p>
              <p className="text-warm-ivory/30 text-xs mb-8">— Neil Gaiman</p>

              <div className="w-full max-w-sm space-y-2">
                <p className="text-[10px] text-warm-ivory/40 font-mono-v2 tracking-wider mb-3 text-center">
                  SUGGESTED TOPICS
                </p>
                {suggestedPrompts.map((prompt, i) => (
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
                  <div className={`flex gap-3 max-w-[88%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    {/* Avatar for assistant */}
                    {msg.role === "assistant" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mt-1">
                        <Feather className="w-4 h-4 text-tech-olive" />
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
      <footer className="flex-shrink-0 px-4 py-4 bg-[#0a0a0a] border-t border-white/10">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about writing, stories, imagination..."
            disabled={isLoading}
            aria-label="Message input"
            className="flex-1 px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl
                     text-warm-ivory placeholder:text-warm-ivory/30 text-sm
                     focus:border-tech-olive/50 focus:bg-white/[0.05] focus:outline-none
                     transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="flex-shrink-0 w-11 h-11 bg-tech-olive text-void-black rounded-xl
                     flex items-center justify-center
                     hover:bg-tech-olive/90 active:scale-95
                     transition-all duration-150
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-warm-ivory/25 mt-3 text-center font-mono-v2 tracking-wide">
          AI clone • Curated wisdom from public interviews & writings
        </p>
      </footer>
    </div>
  );
};

export default NeilGaimanChat;
