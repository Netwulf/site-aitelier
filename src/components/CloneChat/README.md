# CloneChat - Sistema de Clones de IA

Sistema reutilizável para conversas com clones de IA. Cada clone tem sua própria API rodando no Railway.

## Como Adicionar um Novo Clone

### 1. Tenha a API pronta no Railway

Cada clone precisa de uma API rodando com endpoint `/chat` que aceita:

```json
POST /chat
{
  "message": "pergunta do usuário",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

E retorna:

```json
{
  "response": "resposta do clone"
}
```

### 2. Adicione no arquivo de configuração

Edite `src/components/CloneChat/clones.config.ts`:

```typescript
"slug-do-clone": {
  id: "slug-do-clone",                    // URL: /chat/slug-do-clone
  name: "Nome do Clone",                  // Nome exibido
  title: "Nome do Clone",                 // Título no chat
  subtitle: "Tagline curta",              // Subtítulo
  category: "UPLOADED INTELLIGENCE",      // Badge de categoria
  description: "Descrição para o card.",  // Texto no PlaygroundTools
  avatar: {
    type: "icon",                         // "icon" ou "image"
    icon: "Brain",                        // Nome do ícone Lucide
    // imageUrl: "https://...",           // Se type: "image"
  },
  api: {
    endpoint: "https://NOME-api-production.up.railway.app/chat",
  },
  suggestedPrompts: [
    "Primeira pergunta sugerida?",
    "Segunda pergunta sugerida?",
    "Terceira pergunta sugerida?",
  ],
  placeholder: "Pergunte sobre...",
  status: "active",                       // "active" ou "coming_soon"
},
```

### 3. Adicione o ícone (se necessário)

Se usar um ícone novo, adicione nos dois arquivos:

**CloneChat.tsx:**
```typescript
import { ..., NovoIcone } from "lucide-react";

const ICONS = {
  ...,
  NovoIcone,
};
```

**PlaygroundTools.tsx:**
```typescript
import { ..., NovoIcone } from "lucide-react";

const CLONE_ICONS = {
  ...,
  NovoIcone: <NovoIcone className="w-6 h-6" />,
};
```

### 4. Pronto!

O clone aparece automaticamente em:
- `/playground` - Card clicável
- `/chat/slug-do-clone` - Chat fullscreen

---

## Ícones Disponíveis

Já configurados e prontos para usar:

| Ícone | Uso sugerido |
|-------|--------------|
| `Feather` | Escritores |
| `Globe` | Worldbuilding, SciFi |
| `Brain` | Pensadores, Filósofos |
| `User` | Genérico |
| `Sparkles` | Criativos |
| `BookOpen` | Educadores |

Mais ícones: https://lucide.dev/icons

---

## Estrutura de Arquivos

```
src/components/CloneChat/
├── README.md           # Esta documentação
├── types.ts            # Interfaces TypeScript
├── clones.config.ts    # CONFIGURAÇÃO DOS CLONES
├── CloneChat.tsx       # Componente de chat fullscreen
└── index.ts            # Exports
```

---

## Clones Ativos

| Clone | URL | API |
|-------|-----|-----|
| Neil Gaiman | `/chat/neil-gaiman` | Railway |
| Ursula K. Le Guin | `/chat/ursula-le-guin` | Railway |
| Tayna Puri | `/chat/tayna-puri` | Railway |
| David Lynch | `/chat/david-lynch` | Railway |

## Clones Coming Soon

| Clone | URL | Status |
|-------|-----|--------|
| Dan Koe | `/chat/dan-koe` | Sem RAG |
| Steve Jobs | `/chat/steve-jobs` | Sem RAG |

---

## Troubleshooting

**Clone não aparece no Playground?**
- Verifique se `status: "active"` está setado

**Erro de ícone?**
- Confirme que o ícone está importado nos dois arquivos

**API não responde?**
- Teste a URL diretamente: `curl -X POST URL/chat -d '{"message":"test"}'`
- Verifique se a API key está configurada no Railway

---

*Última atualização: Dezembro 2024*
