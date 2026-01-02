# STORY-001: Unificar Nomenclatura dos Cursos

## Contexto
Feedback dos clones cognitivos (Steve Jobs): "Os nomes dos cursos são inconsistentes: ZERO→ONE (abstrato), STORYCRAFT (descritivo), VIBE.CODE (tech slang), CINEMA SEM CÂMERAS (literal). Escolham uma linguagem."

## Problema Atual
| Curso | Estilo Atual | Problema |
|-------|--------------|----------|
| ZERO→ONE | Abstrato/Simbólico | Não indica conteúdo |
| STORYCRAFT | Inglês descritivo | Mistura idiomas |
| SOUNDSCAPE | Inglês técnico | Inconsistente |
| VIBE.CODE | Tech slang | Diferente dos outros |
| CINEMA SEM CÂMERAS | Português literal | Único em PT |

## Objetivo
Criar sistema de nomenclatura unificado que:
- Mantenha identidade premium
- Seja memorável
- Tenha coerência interna
- Reflita a filosofia AI.TELIER

---

## Opções de Direção

### Opção A: Todos Abstratos/Simbólicos (Estilo Jobs)
```
ZERO→ONE      → Fundação
FIELD→FORM   → Narrativa
WAVE→WORLD   → Áudio
CODE→CANVAS  → Programação Criativa
LENS→LIGHT   → Cinema IA
```
**Pros:** Elegante, memorável, sistema claro
**Cons:** Menos descritivo, curva de aprendizado

### Opção B: Todos em Português Poético
```
FUNDAÇÃO     → O curso base
NARRATIVA    → Storytelling
FREQUÊNCIA   → Música & Trilha
CÓDIGO VIVO  → Programação Criativa
CINEMA INVISÍVEL → Filme 100% IA
```
**Pros:** Acessível, claro, alinhado com copy do site
**Cons:** Menos distintivo internacionalmente

### Opção C: Sistema Híbrido (Categoria + Nome)
```
BASE // ZERO→ONE
NARRATIVA // STORYCRAFT
ÁUDIO // SOUNDSCAPE
CÓDIGO // VIBE.CODE
CINEMA // FRAMELESS
```
**Pros:** Clareza + distinção
**Cons:** Mais complexo visualmente

### Opção D: Nomenclatura por Camadas (Recomendada)
```
Camada 0: FUNDAÇÃO (Zero→One)
Camada 1: VOZ (Storycraft)
Camada 2: SOM (Soundscape)
Camada 3: CÓDIGO (Vibe.Code)
Camada 4: IMAGEM (Cinema sem Câmeras)
```
**Pros:** Hierarquia clara, progressão lógica, sistema escalável
**Cons:** Precisa explicar o sistema

---

## Recomendação

**Opção D com refinamento:**

| Camada | Nome Interno | Subtítulo | Descrição |
|--------|--------------|-----------|-----------|
| **CAMADA 0** | FUNDAÇÃO | Matéria e Forma | O curso base. Pensamento de arte, storytelling fundamental. |
| **CAMADA 1** | VOZ | Narrativa como Arma | Storytelling e estrutura narrativa. |
| **CAMADA 2** | FREQUÊNCIA | Som e Silêncio | Música, trilha e design sonoro com IA. |
| **CAMADA 3** | CÓDIGO | Criação Programática | Programação criativa e arte generativa. |
| **CAMADA 4** | VISÃO | Cinema Invisível | Filme 100% gerado por IA. |

### Sistema Visual
```
CAMADA 0 ─────────────────────────────
F U N D A Ç Ã O
Matéria e Forma
─────────────────────────────────────

CAMADA 1 ─────────────────────────────
V O Z
Narrativa como Arma
─────────────────────────────────────
```

---

## Acceptance Criteria

- [ ] Definir nomenclatura final (decisão com Taynã)
- [ ] Atualizar página /escola com novos nomes
- [ ] Manter subtítulos descritivos para clareza
- [ ] Criar hierarquia visual que indique progressão
- [ ] Atualizar navegação se necessário
- [ ] Garantir consistência em todo o site

---

## Arquivos a Modificar

```
src/pages/Estudos.tsx        # Página principal da escola
src/components/CourseCard.tsx # Cards de curso (se existir)
```

---

## Notas Adicionais

**Jobs Test antes de implementar:**
1. É insanely great, ou just good?
2. Um first-time user entende em 3 segundos?
3. Tem algo que ainda podemos remover?
4. Cada palavra serve um propósito?

---

*Story criada em: 2024-12-29*
*Prioridade: Alta*
*Estimativa: 2-4 horas de decisão + 1-2 horas de implementação*
