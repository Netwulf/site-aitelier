// CloneChat - Reusable AI Clone Conversation System
// Each clone runs its own API on Railway with prompts pre-configured

export { default as CloneChat } from "./CloneChat";
export { CLONES, getCloneById, getAllClones, getActiveClones } from "./clones.config";
export type { CloneConfig, Message, CloneChatProps } from "./types";
