// LORE Demo Page - Test AI Core Features
// LORE-3.8: Image Generation
// LORE-3.9: AI Connection Suggestions
// LORE-3.10: Data Export

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ImageGenerationModal,
  ConnectionSuggestionsSidebar,
  DataExportSettings
} from '@/features/lore';
import type { LorePage } from '@/features/lore';
import { useAuth } from '@/contexts/AuthContext';
import {
  Image as ImageIcon,
  Link2,
  Download,
  Sparkles,
  FileText,
  Plus,
  LogOut
} from 'lucide-react';

// Mock pages for demo
const MOCK_PAGES: LorePage[] = [
  {
    id: '1',
    userId: 'demo-user',
    title: 'React Performance Tips',
    content: [
      { id: 'p1', type: 'paragraph', props: {}, content: [{ type: 'text', text: 'Key strategies for optimizing React applications including memoization, code splitting, and virtual DOM optimization.' }] }
    ],
    tags: ['react', 'performance'],
    createdAt: '2025-12-28T10:00:00Z',
    updatedAt: '2025-12-29T14:00:00Z',
    embedding: Array(1536).fill(0.1), // Mock embedding
  },
  {
    id: '2',
    userId: 'demo-user',
    title: 'State Management Patterns',
    content: [
      { id: 'p2', type: 'paragraph', props: {}, content: [{ type: 'text', text: 'Comparing Redux, Zustand, and React Context for state management in modern applications.' }] }
    ],
    tags: ['react', 'state'],
    createdAt: '2025-12-27T08:00:00Z',
    updatedAt: '2025-12-28T12:00:00Z',
    embedding: Array(1536).fill(0.15),
  },
  {
    id: '3',
    userId: 'demo-user',
    title: 'AI Integration Ideas',
    content: [
      { id: 'p3', type: 'paragraph', props: {}, content: [{ type: 'text', text: 'Exploring ways to integrate AI into knowledge management: semantic search, auto-linking, summarization.' }] }
    ],
    tags: ['ai', 'ideas'],
    createdAt: '2025-12-26T15:00:00Z',
    updatedAt: '2025-12-29T09:00:00Z',
    embedding: Array(1536).fill(0.2),
  },
];

export default function LoreDemo() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<LorePage | null>(MOCK_PAGES[0]);
  const [pages, setPages] = useState<LorePage[]>(MOCK_PAGES);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageContent, setNewPageContent] = useState('');

  // Use real user ID from auth
  const userId = user?.id || 'demo-user';

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const handleInsertImage = (imageUrl: string) => {
    setGeneratedImages(prev => [...prev, imageUrl]);
  };

  const handleAddPage = () => {
    if (!newPageTitle.trim()) return;

    const newPage: LorePage = {
      id: `page-${Date.now()}`,
      userId: 'demo-user',
      title: newPageTitle,
      content: [
        {
          id: `p-${Date.now()}`,
          type: 'paragraph',
          props: {},
          content: [{ type: 'text', text: newPageContent || 'New page content...' }]
        }
      ],
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      embedding: Array(1536).fill(Math.random() * 0.3),
    };

    setPages(prev => [...prev, newPage]);
    setNewPageTitle('');
    setNewPageContent('');
  };

  return (
    <div className="min-h-screen bg-void-black text-warm-ivory">
      {/* Header */}
      <header className="border-b border-warm-ivory/10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tech-olive flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-void-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-space-grotesk">LORE</h1>
              <p className="text-sm text-warm-ivory/60">AI-First Knowledge Base</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-warm-ivory/60">{user?.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-warm-ivory/60 hover:text-warm-ivory hover:bg-warm-ivory/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="features" className="space-y-6">
          <TabsList className="bg-warm-ivory/5 border border-warm-ivory/10">
            <TabsTrigger value="features" className="data-[state=active]:bg-tech-olive data-[state=active]:text-void-black">
              Features Demo
            </TabsTrigger>
            <TabsTrigger value="pages" className="data-[state=active]:bg-tech-olive data-[state=active]:text-void-black">
              Pages
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-tech-olive data-[state=active]:text-void-black">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* LORE-3.8: Image Generation */}
              <Card className="bg-void-black border-warm-ivory/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-warm-ivory">
                    <ImageIcon className="w-5 h-5 text-tech-olive" />
                    LORE-3.8: Image Generation
                  </CardTitle>
                  <CardDescription className="text-warm-ivory/60">
                    Generate images via AI to illustrate your notes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => setIsImageModalOpen(true)}
                    className="w-full bg-tech-olive text-void-black hover:bg-tech-olive/90"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    /image - Generate Image
                  </Button>

                  {generatedImages.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-warm-ivory/60">Generated Images:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {generatedImages.map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt={`Generated ${i + 1}`}
                            className="w-full aspect-square object-cover border border-warm-ivory/10"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-warm-ivory/40 space-y-1">
                    <p>Providers: DALL-E 3, Replicate SDXL</p>
                    <p>Features: Preview, Regenerate, Insert to Editor</p>
                  </div>
                </CardContent>
              </Card>

              {/* LORE-3.9: Connection Suggestions */}
              <Card className="bg-void-black border-warm-ivory/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-warm-ivory">
                    <Link2 className="w-5 h-5 text-tech-olive" />
                    LORE-3.9: AI Connections
                  </CardTitle>
                  <CardDescription className="text-warm-ivory/60">
                    Discover semantic connections between pages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-warm-ivory/80">
                    Selected: <span className="text-tech-olive">{selectedPage?.title || 'None'}</span>
                  </div>

                  <div className="space-y-2">
                    {pages.filter(p => p.id !== selectedPage?.id).slice(0, 3).map(page => (
                      <div
                        key={page.id}
                        className="p-3 border border-warm-ivory/10 hover:border-tech-olive/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedPage(page)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{page.title}</span>
                          <span className="text-xs text-tech-olive">
                            {Math.round(Math.random() * 20 + 80)}% similar
                          </span>
                        </div>
                        <p className="text-xs text-warm-ivory/40 mt-1">
                          Both discuss related concepts...
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-warm-ivory/40 space-y-1">
                    <p>Uses pgvector for semantic similarity</p>
                    <p>LLM-generated explanations</p>
                  </div>
                </CardContent>
              </Card>

              {/* LORE-3.10: Data Export */}
              <Card className="bg-void-black border-warm-ivory/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-warm-ivory">
                    <Download className="w-5 h-5 text-tech-olive" />
                    LORE-3.10: Data Export
                  </CardTitle>
                  <CardDescription className="text-warm-ivory/60">
                    Export your pages as Markdown or JSON
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full border-warm-ivory/20 text-warm-ivory hover:bg-warm-ivory/10"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Export as Markdown
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-warm-ivory/20 text-warm-ivory hover:bg-warm-ivory/10"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Export as JSON
                    </Button>
                  </div>

                  <div className="p-3 bg-warm-ivory/5 border border-warm-ivory/10 text-xs text-warm-ivory/60">
                    <p className="font-medium text-warm-ivory/80 mb-2">Export includes:</p>
                    <ul className="space-y-1">
                      <li>• All pages with hierarchy</li>
                      <li>• YAML frontmatter</li>
                      <li>• Images in /images folder</li>
                      <li>• metadata.json + README</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pages Tab */}
          <TabsContent value="pages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Page List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                    placeholder="New page title..."
                    className="flex-1 bg-void-black border-warm-ivory/20 text-warm-ivory"
                  />
                  <Button
                    onClick={handleAddPage}
                    className="bg-tech-olive text-void-black hover:bg-tech-olive/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Page
                  </Button>
                </div>

                <div className="space-y-2">
                  {pages.map(page => (
                    <div
                      key={page.id}
                      className={`p-4 border cursor-pointer transition-colors ${
                        selectedPage?.id === page.id
                          ? 'border-tech-olive bg-tech-olive/10'
                          : 'border-warm-ivory/10 hover:border-warm-ivory/30'
                      }`}
                      onClick={() => setSelectedPage(page)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{page.title}</h3>
                        <div className="flex items-center gap-2">
                          {page.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-warm-ivory/10 text-warm-ivory/60">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-warm-ivory/60 mt-1">
                        {page.content[0]?.content[0]?.text?.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-warm-ivory/40 mt-2">
                        Updated: {new Date(page.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar - Connection Suggestions */}
              <div className="border border-warm-ivory/10 h-fit">
                <ConnectionSuggestionsSidebar
                  page={selectedPage}
                  onNavigateToPage={(pageId) => {
                    const page = pages.find(p => p.id === pageId);
                    if (page) setSelectedPage(page);
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="max-w-xl">
              <DataExportSettings userId={userId} />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Image Generation Modal */}
      <ImageGenerationModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onInsert={handleInsertImage}
        userId={userId}
      />
    </div>
  );
}
