# Briefing: Navegação Horizontal entre Heros - ai.telier v3

**Data:** 2024-12-29
**Status:** Discovery completo, pronto para stories

---

## Conceito Central

O site ai.telier terá **navegação em dois eixos**:

- **Vertical (↓):** Aprofunda no tema da seção atual
- **Horizontal (←→):** Navega entre as 4 frentes do ai.telier

```
                    ↑
         [ai.telier] ←→ [Escola] ←→ [Studio] ←→ [Galeria]
                    ↓
              (conteúdo)
```

---

## As 4 Frentes (Frames)

### Frame 1: ai.telier (institucional)
- **Título:** O FUTURO É ANCESTRAL.
- **Subtítulo:** Usamos tecnologia do futuro para revelar verdades que sempre existiram.
- **Código:** // ai.telier
- **Background:** Vídeo ou imagem institucional/filosófica
- **Scroll down:** Manifesto, Futuro Ancestral, Conselheiros

### Frame 2: Escola
- **Título:** ESCOLA
- **Subtítulo:** A escola de cinema sem câmeras.
- **Código:** // onde se forma a linguagem
- **Background:** Vídeo ou imagem cinematográfica/formação
- **Scroll down:** Cursos, metodologia, lista de espera

### Frame 3: Studio
- **Título:** STUDIO
- **Subtítulo:** Não construímos marcas. Marcamos histórias.
- **Código:** // onde identidade vira obra
- **Background:** Vídeo ou imagem de criação/estúdio
- **Scroll down:** Processo, cases, contato

### Frame 4: Galeria
- **Título:** GALERIA
- **Subtítulo:** A memória viva do que construímos.
- **Código:** // onde o trabalho permanece
- **Background:** Vídeo ou imagem de obras/exposição
- **Scroll down:** Obras, visual archive, journal

---

## Comportamento de Navegação

### Desktop
- **Scroll vertical:** Comportamento padrão, aprofunda na seção
- **Navegação horizontal:** Arrows (← →) visíveis nas laterais
- **Keyboard:** Setas esquerda/direita navegam entre frames
- **Indicador:** Dots ou labels mostrando posição atual

### Mobile
- **Mantém vertical:** Scroll down normal
- **Swipe horizontal:** Opcional nas heros para trocar de seção
- **Ou:** Menu/tabs para acessar outras seções

---

## Requisitos Visuais

1. **Impacto:** Cada hero deve ser visualmente impactante (fullscreen, cinematográfico)
2. **Coerência:** Mesma linguagem visual (tipografia, cores, grid)
3. **Distinção:** Cada frame tem identidade própria (background, tom)
4. **Transição:** Animação suave entre frames horizontais

---

## Hierarquia de Copy (já definida)

```
ai.telier (filosofia/instituição)
│
│  "O Futuro é Ancestral."
│  "Usamos tecnologia do futuro
│   para revelar verdades que sempre existiram."
│
├── ESCOLA
│   "A escola de cinema sem câmeras"
│   "Formamos linguagem, não técnica."
│
├── STUDIO
│   "Onde identidade vira obra"
│   "Não construímos marcas. Marcamos histórias."
│
└── GALERIA
    "A memória viva do que construímos"
    "Obras, processos, ensaios."
```

---

## Referências Técnicas

- CSS Scroll Snap para navegação horizontal
- Framer Motion para transições
- Vídeo background com lazy loading
- Intersection Observer para ativar animações

---

## Próximos Passos

1. Criar stories para implementação
2. Definir assets (vídeos/imagens para cada frame)
3. Prototipar navegação horizontal
4. Implementar e testar

---

## Como Continuar

Chamar o agente PO (@po ou /AIOS:agents:po) com:

```
Contexto: Leia o briefing em docs/briefing-navegacao-horizontal-v3.md
Tarefa: Criar stories para implementar a navegação horizontal entre heros
```

---

*Briefing criado durante sessão de refinamento de copy e UX do ai.telier v3*
