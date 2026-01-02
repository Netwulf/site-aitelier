# AI.TELIER Site - Architecture & Configuration Guide

> Documentação para IAs e desenvolvedores sobre a estrutura e configuração do site.

## Navegação Principal

```
ai.telier (logo) → Home
├── ai.telier    → /atelier   (Manifesto, filosofia)
├── Escola       → /escola    (Formação, cursos)
├── Studio       → /studio    (Trabalho aplicado, clientes)
└── Galeria      → /galeria   (Obras, Journal, Visual, Ferramentas)
```

**Arquivo:** `src/components/NavigationV2.tsx`

---

## Páginas

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `IndexV3.tsx` | Home com hero, triptych, galeria preview |
| `/atelier` | `Campo.tsx` | Manifesto e filosofia do ai.telier |
| `/escola` | `Estudos.tsx` | Formação: Opening, Fundamentos, Labs, Cursos, Residências |
| `/studio` | `StudioV2.tsx` | Trabalho aplicado: Opening, Processo, Cases, Entry |
| `/galeria` | `Archive.tsx` | Obras, Journal (Substack), Visual, Ferramentas |
| `/contato` | `ContactV2.tsx` | Formulário de contato multi-porta |

---

## Seções Configuráveis

### 1. Imagens da Home (Galeria Preview)

**Arquivo:** `src/data/galleryData.ts`

As 6 imagens que aparecem na home são as marcadas com `featured: true`:

```typescript
export const galleryImages: GalleryImage[] = [
  {
    id: "criancas-futuro-featured",
    src: "/assets/archive/portfolio/01-criancas-futuro/criancas-futuro-01.png",
    featured: true,  // ← Aparece na home
    // ...
  },
  // ...
];
```

**Para trocar imagens da home:**
1. Mudar `featured: false` nas que quer remover
2. Mudar `featured: true` nas que quer adicionar
3. Pode usar imagens do portfolio: `/assets/archive/portfolio/{pasta}/{arquivo}`

---

### 2. Eventos (Seção CONEXÕES)

**Arquivo:** `src/components/CommunityHub.tsx`

```typescript
const upcomingEvents = [
  {
    date: "Fevereiro 2025",           // Data do evento
    title: "Encontro Curitiba",        // Título
    description: "Imersão presencial...", // Descrição curta
    type: "Presencial · Curitiba",     // Tipo e local
    link: null,                         // Link de inscrição (ou null)
  },
  // Adicione mais eventos aqui...
];
```

**Para adicionar evento com link de inscrição:**
```typescript
{
  date: "25 Fev 2025 · 19h",
  title: "Workshop Storytelling",
  description: "Como contar sua história com autenticidade.",
  type: "Online",
  link: "https://link-inscricao.com",
}
```

---

### 3. Bases de Atuação (Footer)

**Arquivo:** `src/components/FooterV2.tsx`

```tsx
<p className="text-sm text-text-muted/70 text-center">
  Florianópolis · Curitiba · São José dos Campos · Brasília
  <span className="text-matrix-green/60 ml-2">e crescendo</span>
</p>
```

---

### 4. Tabs da Galeria

**Arquivo:** `src/pages/Archive.tsx`

Ordem atual: **Obras → Journal → Visual → Ferramentas**

```typescript
const [activeTab, setActiveTab] = useState<ArchiveTab>("obras"); // Tab inicial
```

---

### 5. Triptych (Home)

**Arquivo:** `src/pages/IndexV3.tsx`

```typescript
const triptychItems = [
  {
    title: "ESCOLA",
    subtitle: "A escola de cinema sem câmeras",
    href: "/escola",
  },
  {
    title: "STUDIO",
    subtitle: "Onde identidade vira obra",
    href: "/studio",
  },
  {
    title: "GALERIA",
    subtitle: "A memória viva do que construímos",
    href: "/galeria",
  },
];
```

---

## Portfolio de Obras

**Arquivo:** `src/data/galleryData.ts` → `portfolioProjects[]`

Cada projeto tem:
- `id`: Identificador único
- `title`: Nome do projeto
- `category`: "artes-visuais" | "historias"
- `coverImage`: Imagem de capa
- `images`: Array de todas as imagens
- `year`, `description`, `type`, `location`

**Pasta de assets:** `public/assets/archive/portfolio/`

```
01-criancas-futuro/   (41 imagens)
02-velocidades/       (12 imagens)
03-raizes/            (10 imagens)
04-egos/              (11 imagens)
05-aguas/             (8 imagens)
06-criaturas/         (8 imagens)
07-guerreiras/        (8 imagens)
08-colagens/          (8 imagens)
09-tech-shaman/       (10 imagens)
10-origens/           (8 imagens)
11-futures/           (7 imagens)
```

---

## Journal (Substack Integration)

**Arquivo:** `src/components/CommunityHub.tsx` e `src/components/JournalList.tsx`

Puxa automaticamente do feed RSS:
```typescript
const SUBSTACK_URL = "taynapuri.substack.com";
```

---

## Design Tokens

**Cores principais:**
- `ancestral-black`: Background principal
- `ancestral-white`: Texto principal
- `ancestral-amber`: Destaques, links ativos
- `matrix-green`: Código, labels técnicos
- `text-muted`: Texto secundário
- `concrete-border`: Bordas sutis

**Tipografia:**
- `font-display`: Títulos hero
- `font-mono-v2`: Labels, código, navegação
- Corpo: Sistema padrão

---

## Comandos

```bash
npm run dev      # Desenvolvimento (localhost:8080)
npm run build    # Build de produção
npm run preview  # Preview do build
```

---

## Filosofia do Site

- **"O futuro é ancestral"**: Tecnologia a serviço do humano
- **Brutalist design**: Clean, direto, sem firulas
- **Cinematográfico**: Imagens com grain, contraste, ratio 16:9
- **Lugares**: Atelier, Escola, Studio, Galeria (como um complexo físico)

---

*Última atualização: Dezembro 2024*
