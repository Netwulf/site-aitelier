# AI.Telier Brand System

Sistema completo de identidade visual e geração de imagens para o site AI.Telier, baseado na estética Taypuri.

---

## Quick Start

### 1. Gerar Imagem com DALL-E/Midjourney

1. Abra `prompts/visual-styles.md`
2. Escolha um dos 4 estilos visuais
3. Copie o base prompt
4. Adicione seu SUBJECT e CONTEXT
5. Gere a imagem

### 2. Aplicar Cores no Código

```typescript
const brandColors = {
  primary: '#000000',    // Black
  secondary: '#FFFFFF',  // White
  accent: '#8dc75e',     // Olive Green
  cream: '#F5F5F0',      // Light variation
  cardDark: '#1A1A1A'    // Card backgrounds
}
```

---

## Estrutura

```
.brand/
├── README.md              # Este arquivo
├── config/
│   ├── taypuri.json       # Config completo da marca (v4.2)
│   └── brand-schema.json  # Schema JSON para validação
├── prompts/
│   └── visual-styles.md   # 4 estilos visuais com prompts prontos
└── assets/
    └── (imagens geradas)
```

---

## 4 Estilos Visuais

| Style ID | Nome | Melhor Para |
|----------|------|-------------|
| `shamanic-cinematic` | Shamanic Futurism Cinema | Covers, visionary, nature-tech |
| `urban-brutalist` | Urban Brutalist Photography | Manifestos, systemic, confrontational |
| `full-rotoscope` | Waking Life Rotoscope | Narrativas, jornadas, pessoal |
| `liminal-hybrid` | Liminal Hybrid Rotoscope | Transições, CTAs, insights |

---

## Brand Voice

### Tom
- Jornalístico-questionador
- Direto, sem rodeios
- Rebelde pragmático

### Personality
- Escritor direto
- Jornalista investigativo
- Questionador incisivo

### Writing Principles
1. Verdade sem filtro > conforto do leitor
2. Simplicidade eloquente > complexidade forçada
3. Conversa real > pose de guru
4. Confronta ideias, não pessoas
5. Escreve como fala: direto, sem rodeios

### Termos a EVITAR
- "talvez", "pode ser", "tipo assim"
- "portal", "manifeste", "transcenda", "sagrado", "cósmico"
- "desperte", "ative", "integre", "atravesse"
- Palavrões e linguagem vulgar

### CTAs Preferidos
Faz, Para, Cria, Muda, Testa, Começa, Decide, Escolhe, Experimenta, Constrói

---

## Typography

### Fontes Google
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet">
```

### Uso
| Font | Usage |
|------|-------|
| Space Grotesk | Títulos, capas, headlines |
| Inter | Body text principal |
| IBM Plex Mono | Elementos técnicos, código |

### Scale
```css
--hero: 72px;
--h1: 48px;
--h2: 36px;
--body: 28px;
--caption: 18px;
```

---

## Design System

### Visual Style
- **Image Treatment:** Editorial-brutalism
- **Border Radius:** 0px (brutal)
- **Shadow:** None
- **Overlay Opacity:** 0.3

### Slide Variations

**Default (Dark)**
```css
background: #000000;
text-primary: #FFFFFF;
text-secondary: #CCCCCC;
accent: #8dc75e;
```

**Light (1-2 slides para quebrar monotonia)**
```css
background: #F5F5F0;
text-primary: #000000;
text-secondary: #333333;
accent: #8dc75e;
```

**Cream (transições)**
```css
background: #FAF8F5;
text-primary: #1A1A1A;
text-secondary: #444444;
accent: #6B8E4E;
```

---

## Uso no Site

### Importar Config no React

```typescript
import brandConfig from '../.brand/config/taypuri.json';

// Acessar cores
const { primary, secondary, accent } = brandConfig.design.colors;

// Acessar prompts visuais
const visualStyles = brandConfig.content.visual_system_prompts;
const shamanicStyle = visualStyles.find(s => s.id === 'shamanic-cinematic');
```

### Exemplo: Gerar Imagem Hero

```typescript
const heroPrompt = `
${shamanicStyle.base_prompt}

SUBJECT: Abstract representation of human-AI collaboration in creative process
CONTEXT: Hero section for AI consulting studio website
MOOD: Mysterious, powerful, transformational

1920x1080 resolution, ultra-wide cinematic crop
`;

// Usar com OpenAI DALL-E ou outro serviço
```

---

## Workflow de Geração

1. **Defina o Contexto**
   - Onde a imagem será usada? (Hero, card, background)
   - Qual o mood desejado?
   - Qual a mensagem central?

2. **Escolha o Estilo**
   - Para impacto visual: `shamanic-cinematic`
   - Para tom crítico/manifesto: `urban-brutalist`
   - Para narrativa pessoal: `full-rotoscope`
   - Para CTAs e transições: `liminal-hybrid`

3. **Construa o Prompt**
   ```
   [BASE PROMPT do estilo escolhido]

   SUBJECT: [Sua descrição específica]
   CONTEXT: [Onde será usado]
   MOOD: [Mood desejado]
   ```

4. **Gere e Itere**
   - Use DALL-E 3 para melhor qualidade
   - Ajuste o prompt conforme resultados
   - Salve as melhores em `.brand/assets/`

---

## Referências Visuais

- **Blade Runner 2049** - Cinematografia, luz, atmosfera
- **Annihilation** - Natureza alienada, bioluminescência
- **Waking Life** - Estilo rotoscope, realidade fluida
- **A Scanner Darkly** - Técnica de animação sobre live-action
- **Brutalist Architecture** - Concreto, geometria harsh

---

## Changelog

### v4.2 (2025-12-03)
- 21 fotos expert indexadas
- 4 visual system prompts definidos
- Configuração de typography completa
- Slide variations para carousels

---

*Baseado no Instagram Content Creator System - aitelier-insta*
