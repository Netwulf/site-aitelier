// Clone Chat Types
// Reusable system for AI clone conversations

export interface CloneConfig {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  avatar: {
    type: "icon" | "image";
    icon?: string; // Lucide icon name
    imageUrl?: string;
  };
  api: {
    endpoint: string;
    method?: "POST" | "GET";
    headers?: Record<string, string>;
  };
  fallbackResponses?: Record<string, string>;
  suggestedPrompts?: string[];
  placeholder?: string;
  theme?: {
    accentColor?: string;
    avatarBg?: string;
  };
  status: "active" | "coming_soon" | "offline";
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: "sending" | "sent" | "error";
}

export interface CloneChatProps {
  clone: CloneConfig;
  onBack?: () => void;
  fullscreen?: boolean;
}

export interface APIResponse {
  response: string;
  error?: string;
}
