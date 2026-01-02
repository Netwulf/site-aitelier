# Brutalista Tech Ancestral - Guia de Migração

## Design System v3

### Paleta de Cores

| Antes | Depois |
|-------|--------|
| `emerald-*` | `olive-*` |
| `teal-*` | `olive-*` |
| `green-*` | `olive-*` |
| `black-*` | `neutral-*` |

**Cor primária:** `olive` (#8dc75e)
**Accent raro:** `violet` (#7C3AED) - usar pontualmente

### Classes de Substituição

```
# Backgrounds
bg-gradient-to-br from-black-950 via-black-900 to-black-800  →  bg-neutral-0
bg-gradient-to-* from-emerald-* to-teal-*  →  bg-olive
bg-emerald-*  →  bg-olive-*
bg-teal-*  →  bg-olive-*

# Textos
text-gradient  →  text-olive (ou remover gradient)
text-emerald-*  →  text-olive-*
text-teal-*  →  text-olive-*

# Bordas
rounded-xl  →  (remover - agora é 0)
rounded-2xl  →  (remover)
rounded-lg  →  (remover)
rounded-md  →  (remover)

# Efeitos Glass - REMOVER
glass  →  bg-neutral-100 border border-neutral-200
glass-strong  →  bg-neutral-100 border-2 border-neutral-200

# Sombras/Glows - SUBSTITUIR
shadow-glow-green  →  shadow-hard ou shadow-none
shadow-glow-green-strong  →  shadow-hard-lg
hover:shadow-glow-*  →  hover:shadow-hard-lg

# Botões
btn-premium  →  btn-brutal
bg-gradient-to-r from-emerald-500 to-teal-600  →  bg-olive
```

### Novas Classes Disponíveis

**Botões:**
- `btn-brutal` - Fundo olive, borda preta, shadow hard
- `btn-brutal-dark` - Fundo preto, borda olive
- `btn-brutal-outline` - Transparente com borda

**Cards:**
- `card-brutal` - Fundo dark, borda sutil
- `card-brutal-outline` - Só borda, hover olive
- `card-brutal-light` - Para seções claras

**Seções:**
- `section-dark` - Fundo preto
- `section-light` - Fundo cream (#F5F5F0)
- `section-cream` - Fundo cream mais quente

**Badges:**
- `badge-brutal` - Fundo olive
- `badge-brutal-outline` - Borda olive
- `badge-brutal-violet` - Accent raro

**Inputs:**
- `input-brutal` - Para fundos escuros
- `input-brutal-light` - Para fundos claros

**Typography:**
- `font-display` / `font-heading` - Space Grotesk
- `font-body` / `font-sans` - Inter
- `font-code` / `font-mono` - IBM Plex Mono

**Utilities:**
- `accent-bar` - Barra olive 48px
- `accent-bar-lg` - Barra olive 96px
- `divider` - Linha separadora
- `noise-overlay` - Film grain
- `grid-brutal` - Grid pattern sutil

### Fontes

```html
<!-- Já importadas no index.css -->
Space Grotesk - Títulos (h1-h6, .font-display)
Inter - Body text (padrão)
IBM Plex Mono - Código (.font-mono)
```

### Filosofia Brutalista

1. **Border radius = 0** em tudo (exceto avatares)
2. **Sem gradients suaves** - cores sólidas
3. **Sem glassmorphism** - fundos opacos
4. **Sem glows** - shadows hard ou nada
5. **Alto contraste** - preto/branco/olive
6. **Tipografia bold** - Space Grotesk pesado

### Seções Claras (Novo!)

Alternar entre `section-dark` e `section-light` para criar respiro visual:

```jsx
<section className="section-dark">
  {/* Conteúdo em fundo preto */}
</section>

<section className="section-light">
  {/* Conteúdo em fundo cream */}
</section>
```

### Violet (Accent Raro)

Usar apenas para:
- Badges especiais (`badge-brutal-violet`)
- Links de destaque pontual
- Elementos de UI que precisam chamar atenção extra

```jsx
<span className="text-violet">Destaque raro</span>
<div className="border-2 border-violet">Box especial</div>
```

---

## Arquivos Modificados

1. `tailwind.config.ts` - Nova paleta, fonts, border-radius 0
2. `src/index.css` - Novas classes brutalistas
3. `src/components/HeroSection.tsx` - Exemplo de migração
4. `src/components/Header.tsx` - Exemplo de migração
5. `src/components/FinalCTASection.tsx` - Exemplo com section-light

## Próximos Passos

Migrar os seguintes componentes (buscar por emerald, teal, glass, glow):

- [ ] ApplicationForm.tsx
- [ ] CasesCarousel.tsx
- [ ] DeliverableSection.tsx
- [ ] FAQSection.tsx
- [ ] IdealForSection.tsx
- [ ] InvestmentOptionsSection.tsx
- [ ] MethodologySection.tsx
- [ ] OpeningNarrativeSection.tsx
- [ ] ProblemSection.tsx
- [ ] ProcessoSeletivoSection.tsx
- [ ] WhyNowSection.tsx
- [ ] WorkshopScheduleSection.tsx
- [ ] Modal components (modal/*.tsx)
