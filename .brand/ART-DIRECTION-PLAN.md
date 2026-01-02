# AI.TELIER Art Direction Plan

## Creative Direction Analysis
**Date:** 2025-12-28
**Status:** Professional Review Complete

---

## Executive Summary

O site atual tem uma estética "brutal-poetry" bem definida, mas sofre de **visual monotony** - excesso de texto sobre fundos escuros sem respiro visual suficiente. O uso de imagens está concentrado apenas no Hero e nos Cases.

**Diagnóstico:** O site precisa de **imagens estratégicas** para criar ritmo visual, humanizar a marca, e elevar o nível artístico sem perder a elegância minimalista.

---

## Current State Analysis

### Seções Atuais (Home)

| Seção | Imagens Atuais | Problema |
|-------|---------------|----------|
| Hero | 1 (portal) | OK, mas genérica |
| ManifestoSection | 0 | Texto sobre fundo escuro |
| InstagramDiagnostic | ? | Verificar |
| SelectedWork | 5 cases | OK, forte |
| BriefAbout | 0 | Muito textual |
| CommunityHub | 0 | Denso, sem respiro |
| Partners | 0 | Tipografia only (ok) |
| FinalCTA | 0 | Minimalista (ok) |

### Páginas Secundárias

| Página | Estado | Necessidade |
|--------|--------|-------------|
| Studio | Placeholder foto | URGENTE: Foto do founder |
| Contact | Sem imagem | Opcional |
| Journal | Feed RSS | OK |
| Manifesto | Verificar | Pode ter imagem atmosférica |

---

## Image Strategy: "Breathe & Impact"

### Princípio Guia
> "Cada imagem deve criar uma PAUSA poética no scroll, nunca competir com o texto."

### Quantidade Ideal
- **Home:** 8-10 imagens estratégicas
- **Studio:** 2-3 imagens
- **Total site:** ~12-15 imagens únicas

### Tipos de Imagem por Função

1. **Hero Image** - Full-bleed, atmosférica, define o mood
2. **Breathe Images** - Respiros visuais entre seções de texto
3. **Portrait Images** - Humanização (Taynã, talvez clientes)
4. **Mood Images** - Atmosfera, processo, bastidores
5. **Case Images** - Já existem, são fortes

---

## Detailed Recommendations by Section

### 1. HERO (Atual: hero-portal.png)

**Status:** Funciona, mas é genérica demais.

**Opção A - Manter atual:** OK se budget limitado
**Opção B - Gerar nova (Recomendado):**

```
STYLE: urban-brutalist
SUBJECT: Abstract architectural void with figure silhouette,
         green digital overlays fragmenting reality
MOOD: Mysterious, powerful, anti-establishment
ASPECT: 16:9 ultra-wide for cinematic feel
```

**Specs:**
- Full viewport height
- Dark overlay para legibilidade do texto
- Motion: Subtle parallax no scroll

---

### 2. MANIFESTO SECTION (Atual: 0 imagens)

**Problema:** Wall of text, mesmo sendo curto
**Solução:** Adicionar SIDE IMAGE ou BACKGROUND SUBTLE

**Opção A - Side Image (50/50 split):**
```
STYLE: full-rotoscope
SUBJECT: Person at threshold of realization,
         Waking Life style, moment of clarity
MOOD: Contemplative, curious, awakening
```

**Opção B - Subtle Background:**
```
STYLE: liminal-hybrid
SUBJECT: Abstract hands creating, organic forms emerging
OPACITY: 10-15% como textura sutil
```

**Placement:** Lado esquerdo da seção, texto à direita
**Size:** 400-500px largura, altura proporcional

---

### 3. BETWEEN MANIFESTO → SELECTED WORK

**Problema:** Transição abrupta entre seções
**Solução:** BREATHER IMAGE (full-width, 40vh height)

```
STYLE: shamanic-cinematic
SUBJECT: Bioluminescent forest path,
         threshold between worlds,
         mysterious but inviting
MOOD: Transition, possibility, depth
ASPECT: 21:9 ultra-wide cinematic
```

**Specs:**
- Height: 40-50vh (respiro visual)
- Subtle zoom on scroll
- Nenhum texto sobre a imagem

---

### 4. SELECTED WORK (Atual: 5 fotos de cases)

**Status:** FORTE. Manter como está.

**Melhoria Opcional:**
- Adicionar hover effect mais dramático
- Considerar versões B&W com green accent overlay
- Garantir que todas as fotos tenham mesmo tratamento

---

### 5. BRIEF ABOUT (Atual: 0 imagens)

**Problema:** Seção "Para quem é / Não é" é puro texto
**Solução:** MOOD IMAGE como background ou side element

```
STYLE: urban-brutalist
SUBJECT: Solitary figure at crossroads,
         concrete geometry,
         choice moment visualization
MOOD: Decisional, filtered, clear boundaries
ASPECT: Vertical 3:4 or 4:5
```

**Placement:** Background com opacity 8-10%
**Alternativa:** Remove a seção (já está no Studio)

---

### 6. COMMUNITY HUB (Atual: 0 imagens)

**Problema:** Seção densa com Journal + Events
**Solução:** THUMBNAIL IMAGES para artigos (optional)

**Recomendação:** NÃO adicionar imagens aqui.
- O design atual com borders/cards funciona
- Imagens competiriam com os titles dos posts
- Manter clean e funcional

---

### 7. PARTNERS (Atual: Typography only)

**Status:** PERFEITO. Manter sem imagens.
- O scroll de nomes é elegante
- Background claro já quebra a monotonia
- Geometria bauhaus sutil funciona

---

### 8. FINAL CTA (Atual: 0 imagens)

**Status:** Minimalista e elegante. Manter.
**Melhoria Sutil:** Considerar particle effect ou organic glow mais forte

---

### 9. STUDIO PAGE (Atual: Placeholder foto)

**URGENTE:** Foto real de Taynã Puri

**Opções disponíveis (.brand/assets/expert-photos/):**
- `Tay_AI11.jpg` - Professional headshot
- `Tay_AI25.jpg` - Professional portrait
- `taypuri_pic1.jpg` - Casual authentic

**Recomendação:**
```
USE: Tay_AI11.jpg ou Tay_AI25.jpg (professional)
TREATMENT:
  - Crop 3:4 aspect ratio
  - Subtle desaturação (match site aesthetic)
  - Slight green tint overlay (#8dc75e @ 5%)
  - Border: 2px solid #8dc75e (accent)
```

**Adicional para Studio:**
- Considerar imagem atmosférica no Philosophy section
- Ou manter minimal (preferível)

---

### 10. CONTACT PAGE

**Status:** Funcional
**Recomendação:** SEM imagem adicional
- Formulário deve ser o foco
- Simplicidade = profissionalismo

---

## Image Generation Priority

### Fase 1: Imediato (Essencial)

1. **Studio Portrait** - Usar foto real de Taynã
2. **Hero Upgrade** - Gerar nova com urban-brutalist style

### Fase 2: Refinamento

3. **Breather Image** - Entre Manifesto e SelectedWork
4. **ManifestoSection Side Image** - Rotoscope style

### Fase 3: Polish

5. **Background textures** - Para BriefAbout
6. **Atmospheric elements** - Para outras páginas

---

## Visual Style Guide for Generated Images

### Color Treatment (All images)

```css
/* Post-processing for site consistency */
filter:
  saturate(0.85)
  contrast(1.1)
  brightness(0.95);

/* Green accent overlay where appropriate */
mix-blend-mode: screen;
background: linear-gradient(
  45deg,
  transparent 60%,
  rgba(141, 199, 94, 0.08)
);
```

### Aspect Ratios

| Use Case | Ratio | Reason |
|----------|-------|--------|
| Hero | 16:9 or 21:9 | Cinematic impact |
| Side images | 3:4 or 4:5 | Portrait, intimate |
| Breathers | 21:9 | Panoramic respiro |
| Backgrounds | 16:9 | Standard coverage |

### Forbidden Elements

- NO visible text in images
- NO people smiling/posing
- NO stock photo aesthetic
- NO bright saturated colors
- NO clean/corporate look
- NO symmetrical compositions

### Required Aesthetic Qualities

- Film grain texture (organic)
- High contrast (6:1 minimum)
- Asymmetric compositions
- Negative space intentional
- Muted color palette + green accent
- Editorial/documentary feel

---

## Implementation Checklist

### Week 1
- [ ] Replace Studio placeholder with real Tay photo
- [ ] Test current hero with new overlay treatment

### Week 2
- [ ] Generate 2-3 hero alternatives
- [ ] Generate breather image
- [ ] A/B test with users

### Week 3
- [ ] Generate ManifestoSection side image
- [ ] Fine-tune all color treatments
- [ ] Optimize image loading (lazy load, WebP)

---

## Summary: Less is More

**Total Images Recommended:**
- Home: 7-8 images (Hero + 5 cases + 1-2 new)
- Studio: 1-2 images (Portrait + optional atmosphere)
- Other pages: 0-1 each

**The Rule:**
> "Every image earns its place. If it doesn't create pause or prove work, remove it."

---

## Prompts Ready to Generate

### 1. New Hero Alternative
```
[urban-brutalist base prompt]

SUBJECT: Concrete tunnel perspective, solitary hooded figure
walking toward light, geometric green (#8dc75e) overlay
bars cutting through frame, fog/mist in air

CONTEXT: Website hero for AI consulting studio
MOOD: Mysterious, powerful, inviting challenge
TECHNICAL: 1920x1080, ultra-wide crop ready
```

### 2. Breather Image
```
[shamanic-cinematic base prompt]

SUBJECT: Bioluminescent forest corridor,
no visible figures, path leads toward soft glow,
organic tech integrated into tree bark

CONTEXT: Full-width breathing space between sections
MOOD: Transition, depth, infinite possibility
TECHNICAL: 2560x600 (21:9 ultra-wide)
```

### 3. Manifesto Side Image
```
[full-rotoscope base prompt]

SUBJECT: Single person at window,
contemplative pose, looking outward,
environment dissolving into sketch at edges,
moment before decision

CONTEXT: Side image for text section
MOOD: Introspective, hopeful, threshold moment
TECHNICAL: 800x1000 (4:5 vertical)
```

---

*Art Direction by AI.TELIER Brand System*
*Based on Taypuri Visual Style v4.2*
