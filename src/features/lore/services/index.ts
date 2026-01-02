// LORE Feature Services
// Barrel export for all LORE services

// Image Generation (LORE-3.8)
export {
  generateImage,
  saveImageToStorage,
  getImageProviderSettings,
} from './imageGeneration';

// Connection Suggestions (LORE-3.9)
export {
  findSimilarPages,
  getAIConnectionSuggestions,
  checkForStrongConnections,
  createLink,
  dismissNotification,
} from './connectionSuggestions';

// Data Export (LORE-3.10)
export {
  blocksToMarkdown,
  exportPageToMarkdown,
  exportPageToJson,
  exportAllPages,
  exportSinglePage,
  downloadBlob,
} from './dataExport';
