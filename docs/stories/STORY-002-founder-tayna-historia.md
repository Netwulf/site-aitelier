# STORY-002: Evidenciar Founder Taynã Puri com História

## Contexto
Feedback: O site tem filosofia forte mas falta a PESSOA por trás. Escolas de referência (Bauhaus, altMBA) têm fundadores icônicos visíveis. A história pessoal cria conexão e credibilidade.

## Problema Atual
- Taynã mencionada brevemente em /studio (v1)
- Na v3 atual, founder quase invisível
- Sem jornada pessoal visível
- Sem "origin story" que conecte filosofia à experiência

## Objetivo
Criar presença de founder que:
- Humanize a marca
- Conte a origin story do AI.TELIER
- Conecte filosofia à jornada real
- Gere identificação com o público-alvo

---

## Benchmarks de Referência

| Escola/Studio | Founder | Como aparece |
|---------------|---------|--------------|
| altMBA | Seth Godin | Foto + manifesto + vídeos |
| IDEO | David Kelley | História de origem em destaque |
| The Futur | Chris Do | Presença constante, YouTube |
| Acquisition.com | Alex Hormozi | História de $1.036 é central |

**Padrão:** A história do founder É a prova da metodologia.

---

## Elementos da História Taynã

### Origin Story (a desenvolver com Taynã)

**Perguntas para extrair:**
1. Qual foi o momento de "crise" que levou ao AI.TELIER?
2. O que você tentou antes que não funcionou?
3. Qual foi a revelação/insight central?
4. Quem foi a primeira pessoa que você ajudou? O que aconteceu?
5. Por que "atelier" e não "agência"?
6. Qual é a conexão pessoal com cinema/storytelling?

### Estrutura Narrativa Sugerida

```
ACT 1: O PROBLEMA PESSOAL
"Eu era [descrição]. Tinha [competência] mas não conseguia [expressão]."

ACT 2: A BUSCA
"Tentei [abordagens convencionais]. Nenhuma funcionou porque [insight]."

ACT 3: A REVELAÇÃO
"Então percebi que [princípio central]. Não era sobre [X], era sobre [Y]."

ACT 4: A VALIDAÇÃO
"Testei com [primeiros clientes]. [Resultado específico]."

ACT 5: A MISSÃO
"Hoje o AI.TELIER existe para [transformação]. Porque [convicção]."
```

---

## Implementação Proposta

### Opção A: Seção dedicada no /atelier
Adicionar seção "A FUNDADORA" após o manifesto:
- Foto profissional (estilo cinematográfico)
- História em 3-5 parágrafos
- Quote signature
- Link para conversa

### Opção B: Página própria /tayna
- História completa
- Jornada visual (timeline)
- Trabalhos anteriores
- Filosofia pessoal

### Opção C: Integrada na HOME (Recomendada)
- Seção após as 3 verticais
- "QUEM CRIOU ISSO"
- Foto + quote + 2 parágrafos
- CTA: "Conhecer a história completa"

---

## Wireframe Sugerido

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  QUEM CRIOU ISSO                                   │
│  ─────────────────                                 │
│                                                     │
│  ┌──────────┐                                      │
│  │          │  TAYNÃ PURI                          │
│  │  [FOTO]  │  Fundadora do AI.TELIER              │
│  │          │                                      │
│  └──────────┘  "A alma já existe antes do          │
│                 logotipo. Meu trabalho é revelá-la."│
│                                                     │
│  [História em 2-3 parágrafos]                      │
│                                                     │
│  Background: Branding • Cinema • Tecnologia        │
│  Bases: Florianópolis • Curitiba • Brasília        │
│                                                     │
│  [CONHECER A HISTÓRIA] →                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Acceptance Criteria

- [ ] Sessão de extração de história com Taynã (30-60 min)
- [ ] Redigir origin story em formato narrativo
- [ ] Foto profissional de alta qualidade
- [ ] Implementar seção na HOME ou página dedicada
- [ ] Quote signature definida
- [ ] Links para contato/conversa

---

## Copy Draft (a refinar com Taynã)

```markdown
## QUEM CRIOU ISSO

**TAYNÃ PURI**
*Fundadora do AI.TELIER*

"Eu trabalhava com branding há [X] anos quando percebi que a maioria
dos profissionais brilhantes não conseguia se expressar. Não era falta
de conteúdo - era excesso de complexidade sem tradução.

Tentei o caminho das agências. Templates. Fórmulas. Nada funcionava
para pessoas que pensavam diferente. Então entendi: não era sobre
criar uma imagem. Era sobre revelar uma essência.

O AI.TELIER nasceu dessa convicção. Um lugar onde arte, tecnologia
e identidade se encontram. Onde a IA amplifica o humano em vez de
substituí-lo. Onde cada marca é tratada como obra, não como produto."

─────────────────────────────────

Background em branding, cinema e tecnologia.
Metodologia própria: identidade humana + inteligência artificial + autonomia criativa.

[VER TRABALHOS] →  [INICIAR CONVERSA] →
```

---

## Arquivos a Criar/Modificar

```
src/pages/IndexV3.tsx          # Adicionar seção founder
src/pages/Founder.tsx          # Nova página (opcional)
src/components/FounderSection.tsx  # Componente reutilizável
public/images/tayna-founder.jpg    # Foto profissional
```

---

## Notas dos Clones

**Hormozi:** "A história do crisol emocional (quase-falência) é o que gera convicção. Qual é o equivalente da Taynã?"

**Disney:** "A jornada do herói começa com o mundo ordinário. Mostre de onde ela veio."

**Godin:** "Pick yourself. A história de quem se escolheu é poderosa para quem ainda não se escolheu."

---

*Story criada em: 2024-12-29*
*Prioridade: Alta*
*Estimativa: 2-3 horas de extração + 2-4 horas de implementação*
*Dependência: Sessão com Taynã para história*
