# Plano: Experiência de Visualização de Galeria AI.TELIER

## Problema Atual
O modal atual não entrega uma experiência focada na imagem. Tem scroll, a imagem não fica centralizada de forma impactante, e a navegação não é intuitiva.

---

## Referências Estudadas

### Padrões de Sucesso (Unsplash, 500px, Pinterest)
- **Unsplash**: Imagem ocupa 100% do viewport, fundo escuro, informações discretas embaixo
- **500px**: Foco total na qualidade da imagem, navegação minimalista
- **Pinterest**: Lightbox com scroll interno apenas quando necessário, close fácil

### Princípios de UX para Lightbox
1. **Fundo escuro (90-98% opacidade)** - Elimina distrações, destaca a obra
2. **Imagem centralizada e maximizada** - A arte é o protagonista
3. **Navegação invisível até hover** - Não compete com a obra
4. **Fechar intuitivo** - ESC, click fora, botão X
5. **Zero scroll** - Tudo visível sem rolar

---

## Design Proposto: "Gallery Theatre Mode"

### Conceito
Transformar a visualização em uma **experiência teatral** - como entrar em uma galeria escura onde só a obra existe.

### Estrutura Visual

```
┌─────────────────────────────────────────────────────────────┐
│  [X]                                          1/41          │ ← Header minimal
│                                                             │
│                                                             │
│     ←                    [IMAGEM]                    →      │ ← Setas aparecem no hover
│                                                             │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Crianças do Futuro #01          ♡ 23     Futuro Ancestral  │ ← Info bar (fixed bottom)
└─────────────────────────────────────────────────────────────┘
```

### Comportamentos

#### 1. Abertura
- **Click na thumb** → Modal abre com fade suave (200ms)
- **Imagem aparece** com escala de 0.95 → 1.0 (sensação de aproximação)
- **Body scroll locked** - Página por trás não se move

#### 2. Imagem
- **Centralizada vertical e horizontal**
- **Ocupa máximo possível** sem cortar (object-fit: contain)
- **Altura máxima**: `calc(100vh - 120px)` para deixar espaço para info
- **Largura máxima**: `calc(100vw - 80px)` para respiro nas laterais

#### 3. Navegação
- **Setas laterais**: Aparecem só no hover (desktop)
- **Keyboard**: ← → para navegar, ESC para fechar
- **Swipe**: Gestos touch para mobile
- **Click na imagem**: NÃO fecha (diferente do atual) - só click no backdrop

#### 4. Barra de Info (Bottom)
- **Altura fixa**: 60px
- **Sempre visível**: Não some
- **Conteúdo**:
  - Título da obra/projeto
  - Botão de like com contador
  - Categoria/ano (discreto)
  - Contador de posição (1/41)

#### 5. Fechar
- **[X] no canto** - Sempre visível
- **ESC** - Keyboard
- **Click no backdrop escuro** - Fora da imagem
- **Swipe down** (mobile) - Gesto natural de "dispensar"

---

## Diferenças do Atual

| Aspecto | Atual | Proposto |
|---------|-------|----------|
| Imagem | Pode ser pequena | Maximizada sempre |
| Scroll | Tem scroll | Zero scroll |
| Info | Misturada com imagem | Barra fixa separada |
| Setas | Sempre visíveis | Aparecem no hover |
| Thumbnails | Strip no desktop | Removido (simplifica) |
| Click na imagem | Fecha modal | Não faz nada |
| Backdrop click | Fecha | Fecha |
| Loading | Spinner no centro | Skeleton/blur placeholder |

---

## Especificações Técnicas

### CSS Key Points
```css
/* Container da imagem - centralização perfeita */
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 120px);
  padding: 20px 40px;
}

/* Imagem - maximizada mas nunca corta */
.gallery-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
}

/* Info bar - fixa no bottom */
.info-bar {
  position: fixed;
  bottom: 0;
  height: 60px;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
}
```

### Animações
- **Entrada**: Fade 200ms + scale de 0.95 para 1
- **Troca de imagem**: Crossfade 150ms (sem slide)
- **Saída**: Fade out 150ms

### Mobile Específico
- **Pinch to zoom**: Habilitado na imagem
- **Swipe horizontal**: Navega entre imagens
- **Swipe down**: Fecha o modal
- **Tap**: Mostra/esconde controles

---

## Implementação em Fases

### Fase 1: Core (Prioridade)
- [x] Modal fullscreen com backdrop escuro
- [ ] Imagem centralizada e maximizada
- [ ] Navegação keyboard (ESC, ←, →)
- [ ] Setas laterais com hover
- [ ] Barra de info fixa no bottom

### Fase 2: Polish
- [ ] Animações suaves de entrada/saída
- [ ] Preload da próxima imagem
- [ ] Like funcional
- [ ] Swipe gestures (mobile)

### Fase 3: Enhancement
- [ ] Pinch to zoom
- [ ] Skeleton loading
- [ ] Atalhos adicionais (L para like, I para info)

---

## Decisões de Design

### Por que remover thumbnails strip?
- Distrai da imagem principal
- Ocupa espaço precioso
- Contador (1/41) já indica posição
- Navegação por setas é suficiente

### Por que info bar fixa no bottom?
- Não compete com a imagem
- Sempre acessível sem hover
- Padrão estabelecido (Unsplash, Google Photos)

### Por que click na imagem não fecha?
- Evita fechamento acidental
- Usuário quer focar na imagem, não sair
- Tem opções claras para fechar (X, ESC, backdrop)

---

## Próximos Passos

1. **Aprovação** deste plano
2. **Refatorar** o ImageModal.tsx com novo layout
3. **Testar** em desktop e mobile
4. **Iterar** baseado em feedback

---

*Plano criado em 2024-12-29*
*Fontes: [Mobbin Gallery UI](https://mobbin.com/glossary/gallery), [Dribbble](https://dribbble.com/search/modal-with-image), [MotoCMS](https://www.motocms.com/blog/en/lightbox-design-for-ux/)*
