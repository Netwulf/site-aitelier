# V3 Brutalista Tech - Plano de Refatoracao Visual

## Diagnostico

### Problemas Identificados

| Categoria | Problema | Quantidade | Severidade |
|-----------|----------|------------|------------|
| Cores inline | `#666666`, `#a0a0a0` hardcoded | 40+ ocorrencias | Alta |
| Paleta colorida | electric-cyan, sunset-pink, fire-orange, etc. | 6 cores extras | Alta |
| Glows decorativos | matrix-glow, organic-glow | 25+ usos | Alta |
| Gradientes decorativos | via-deep-blue, mesh-gradient | 10+ usos | Media |
| Cores fora do brand | bg-gray-50 | 3 usos | Alta |
| Backdrop blur | backdrop-blur-sm/xl decorativo | 15+ usos | Baixa |

---

## Especificacao V3 Brutalista Tech

### Paleta de Cores DEFINITIVA

```css
/* CORES PRIMARIAS */
--void-black: #0a0a0a;        /* Background principal */
--warm-ivory: #f5f5f0;        /* Texto principal, contraste */
--tech-olive: #8dc75e;        /* UNICO accent - verde tech */

/* TONS DE CINZA (hierarquia de texto) */
--text-primary: #f5f5f0;      /* Titulos, texto principal */
--text-secondary: #a0a0a0;    /* Subtitulos, descricoes */
--text-muted: #666666;        /* Labels, metadata, hints */

/* BORDAS E SUPERFICIES */
--border-subtle: #333333;     /* Bordas sutis */
--border-strong: #666666;     /* Bordas visiveis */
--surface-elevated: #1a1a1a;  /* Cards, overlays */
```

### Tipografia

```css
/* FONTES */
--font-display: 'Space Grotesk', -apple-system, sans-serif;
--font-body: 'Inter', -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

### Principios Visuais

1. **SEM GLOW** - Nenhum text-shadow brilhante, nenhum box-shadow colorido
2. **SEM CORES NEON** - Apenas tech-olive como unico destaque
3. **SEM GRADIENTES DECORATIVOS** - Gradientes apenas para overlays funcionais (legibilidade)
4. **BORDAS RETAS** - radius: 0 (brutalista)
5. **CONTRASTE ALTO** - Preto/branco/verde apenas

---

## Plano de Execucao

### FASE 1: CSS Foundation (index.css)

**Adicionar variaveis semanticas:**
```css
:root {
  /* Text hierarchy */
  --text-primary: 0 0% 96%;      /* #f5f5f0 em HSL */
  --text-secondary: 0 0% 63%;    /* #a0a0a0 */
  --text-muted: 0 0% 40%;        /* #666666 */

  /* Accent */
  --accent-olive: 90 50% 57%;    /* #8dc75e */
}
```

**Remover classes:**
- `.matrix-glow` - remover animacao e text-shadow
- `.organic-glow` - remover completamente
- `.mesh-gradient-1`, `.mesh-gradient-2` - remover

### FASE 2: Componentes - Paleta Colorida

**Arquivos afetados:**
- `Tools.tsx` - Remover colorHex map, usar tech-olive
- `Gallery.tsx` - Remover colorHex map, usar tech-olive
- `Masterclasses.tsx` - Remover colorHex map, usar tech-olive

**Estrategia:** Hover overlay usa tech-olive ao inves de cores variadas

### FASE 3: Componentes - Cores Inline

**Substituicoes globais:**
- `text-[#666666]` → `text-muted-foreground`
- `text-[#a0a0a0]` → `text-secondary`
- `border-[#666666]` → `border-border`
- `bg-gray-50` → `bg-warm-ivory` ou `bg-stone-light`

### FASE 4: Remocao de Glows

**Componentes a limpar:**
- Hero.tsx - remover `matrix-glow` da linha separadora
- Pillars.tsx - remover blur-xl decorativo
- ManifestoSection.tsx - remover organic-glow
- FinalCTA.tsx - remover organic-glow
- ArtGallery.tsx - remover organic-glow
- (+ outros 10 componentes)

### FASE 5: Gradientes

**MANTER (funcionais):**
- Overlays de imagem para legibilidade (`from-brutal-black/70`)
- Fade para preto em bordas de secao

**REMOVER (decorativos):**
- `via-deep-blue/20` em Tools.tsx
- `mesh-gradient-*` backgrounds
- Gradientes coloridos em hover states

---

## Checklist de Validacao

- [ ] Nenhuma cor hex inline nos componentes
- [ ] Apenas tech-olive como cor de destaque
- [ ] Zero glows/shadows decorativos
- [ ] Tipografia consistente (Space Grotesk/Inter/JetBrains Mono)
- [ ] Bordas retas (radius: 0)
- [ ] Paleta limitada a 6 cores max

---

## Arquivos a Modificar

### Alta Prioridade
1. `src/index.css` - Foundation
2. `src/components/Tools.tsx` - Paleta colorida
3. `src/components/Gallery.tsx` - Paleta colorida + bg-gray
4. `src/components/Masterclasses.tsx` - Paleta colorida
5. `src/components/Hero.tsx` - matrix-glow

### Media Prioridade
6. `src/components/ManifestoSection.tsx` - organic-glow
7. `src/components/FinalCTA.tsx` - organic-glow
8. `src/components/ArtGallery.tsx` - organic-glow
9. `src/components/OnePersonBrand.tsx` - organic-glow + mesh
10. `src/components/Pillars.tsx` - blur-xl

### Baixa Prioridade (cores inline)
- 30+ arquivos com `text-[#666666]` e `text-[#a0a0a0]`
- Pode ser feito com search/replace global

---

*Documento criado: 2024-12-28*
*Status: PRONTO PARA EXECUCAO*
