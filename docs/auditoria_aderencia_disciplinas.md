# Auditoria de Aderência por Disciplina

**Data:** Julho 2026  
**Arquivo auditado:** `src/data/questionsDataprevDev.ts`

---

## Resumo

| Disciplina | Total auditadas | OK | Corrigidas | Problemas remanescentes |
|------------|----------------|-----|------------|------------------------|
| Língua Portuguesa | 45 | 39 | 6 | 0 |
| Língua Inglesa | 35 | 29 | 6 | 0 |
| **Total** | **80** | **68** | **12** | **0** |

---

## Critérios de auditoria

### Português — válido quando cobra habilidade linguística

- Interpretação de Texto
- Coesão e Coerência
- Concordância Verbal e Nominal
- Regência
- Crase
- Pontuação
- Reescrita de Frases
- Valor Semântico dos Conectivos
- Inferência Textual
- Classes de Palavras
- Sintaxe
- Semântica e Vocabulário
- Tipologia Textual
- Funções da Linguagem
- Colocação Pronominal
- Vozes do Verbo
- Polissemia e Ambiguidade
- Função Sintática

### Português — problema quando cobra

- Conceitos de administração pública
- Princípios jurídicos
- Legislação (LGPD, Marco Civil, etc.)
- Conhecimento técnico de TI
- Definição de termos técnicos (refatoração, escalabilidade, débito técnico, latência)

### Inglês — válido quando cobra

- Reading Comprehension
- Vocabulary in Context
- Grammar (verb tenses, conditionals, passive voice, articles, relative clauses, modal verbs, conjunctions, prepositions, linking words)
- Vocabulary (synonyms, phrasal verbs, word formation)

### Inglês — problema quando cobra

- Definição direta de termos técnicos (refactoring, technical debt, merge conflict, velocity)
- Acrônimos técnicos (CI/CD)
- Conhecimento de TI sem contexto textual em inglês

---

## Questões de Português corrigidas (6)

### ID 80 — Antes: Vocabulário Técnico → Depois: Coesão e Coerência

**Antes:**
> No contexto de desenvolvimento de software, o termo 'refatoração' refere-se a:
> A) reescrever completamente um sistema do zero.
> B) reestruturar o código existente sem alterar seu comportamento externo...

**Problema:** Cobrava conhecimento de TI (definição de refatoração), não Português.

**Depois:**
> Considere o trecho: 'A refatoração do código foi necessária, pois a manutenção havia se tornado custosa demais.' A conjunção 'pois' estabelece entre as orações uma relação de:
> A) oposição. B) finalidade. C) explicação causal. D) conclusão. E) alternância.
> Gabarito: C

**Motivo:** Agora cobra valor semântico de conectivo (habilidade linguística).

---

### ID 83 — Antes: Sinônimos no Contexto Técnico → Depois: Semântica e Vocabulário

**Antes:**
> No contexto de TI, o termo 'escalabilidade' pode ser definido como:
> A) a capacidade de um sistema reduzir seu uso de recursos...

**Problema:** Cobrava conhecimento de TI (definição de escalabilidade).

**Depois:**
> Na frase 'O sistema foi projetado para ser escalável, de modo que suporte o crescimento do número de usuários sem perda de desempenho', o termo 'escalável' pode ser substituído, sem alteração de sentido, por:
> A) rígido. B) adaptável a variações de demanda. C) imutável...
> Gabarito: B

**Motivo:** Agora cobra sinônimos no contexto da frase (habilidade linguística).

---

### ID 84 — Antes: Interpretação de Texto (LGPD) → Depois: Interpretação de Texto (função sintática)

**Antes:**
> Considere o trecho: 'A LGPD estabelece que o tratamento de dados pessoais deve observar a finalidade...' Sobre os princípios citados, pode-se afirmar que:
> B) restringem o uso de dados à finalidade originalmente comunicada...

**Problema:** A resposta dependia de conhecimento sobre princípios da LGPD, não de análise linguística.

**Depois:**
> No trecho, a expressão 'princípios que limitam o uso de dados' exerce a função sintática de:
> A) sujeito. B) objeto direto. C) aposto explicativo. D) predicativo. E) adjunto adverbial.
> Gabarito: C

**Motivo:** Agora cobra função sintática (habilidade linguística), usando o mesmo texto-base.

---

### ID 87 — Antes: Vocabulário Técnico → Depois: Reescrita de Frases

**Antes:**
> No contexto de desenvolvimento de software, 'débito técnico' refere-se a:
> B) custos de retrabalho ou manutenção decorrentes de escolhas de implementação subótimas...

**Problema:** Cobrava conhecimento de TI (definição de débito técnico).

**Depois:**
> Considere a frase: 'O débito técnico acumulado pela equipe exigiu refatoração imediata do módulo.' Assinale a alternativa que reescreve a frase mantendo o mesmo sentido, com correção gramatical:
> Gabarito: B

**Motivo:** Agora cobra reescrita com equivalência semântica (habilidade linguística).

---

### ID 95 — Antes: Interpretação de Texto (administração pública) → Depois: Valor Semântico dos Conectivos

**Antes:**
> 'A transparência nos processos de contratação de serviços de TI no setor público é essencial para garantir a competitividade e a economicidade...' Sobre o texto, é correto afirmar que:
> C) A transparência em contratações de TI no setor público contribui para a economicidade e a competitividade.

**Problema:** A resposta dependia de conhecimento sobre princípios da administração pública.

**Depois:**
> No trecho, a expressão 'para garantir a competitividade e a economicidade' expressa ideia de:
> A) causa. B) finalidade. C) oposição. D) consequência inevitável. E) comparação.
> Gabarito: B

**Motivo:** Agora cobra valor semântico de preposição (habilidade linguística), usando o mesmo texto-base.

---

### ID 98 — Antes: Vocabulário Técnico → Depois: Concordância Verbal

**Antes:**
> No contexto de TI, 'latência' refere-se a:
> B) tempo decorrido entre uma requisição e a resposta correspondente.

**Problema:** Cobrava conhecimento de TI (definição de latência).

**Depois:**
> Assinale a alternativa em que a concordância verbal está correta no contexto de sistemas de TI:
> B) Existem muitos fatores que contribuem para a latência do sistema.
> Gabarito: B

**Motivo:** Agora cobra concordância verbal (habilidade linguística), usando "latência" apenas como contexto.

---

## Questões de Inglês corrigidas (6)

### ID 14 — Antes: Technical Vocabulary → Depois: Reading Comprehension

**Antes:** "In software development, the term 'refactoring' refers to:" (definição técnica direta)

**Depois:** Texto-base sobre refatoração + pergunta de compreensão ("According to the text, which of the following is true about refactoring?")

---

### ID 17 — Antes: Technical Vocabulary → Depois: Vocabulary in Context

**Antes:** "The term 'technical debt' in software engineering refers to:" (definição técnica direta)

**Depois:** Frase contextual sobre technical debt + pergunta de vocabulário no contexto ("In this context, 'technical debt' most closely means:")

---

### ID 21 — Antes: Technical Vocabulary → Depois: Reading Comprehension

**Antes:** "In the context of version control with Git, what does 'merge conflict' mean?" (definição técnica direta)

**Depois:** Texto-base explicando merge conflict + pergunta de compreensão ("According to the text, a merge conflict occurs when:")

---

### ID 24 — Antes: Technical Vocabulary → Depois: Reading Comprehension

**Antes:** "In the context of agile methodologies, what does 'velocity' refer to?" (definição técnica direta)

**Depois:** Texto-base sobre velocity + pergunta de compreensão ("According to the text, velocity in agile refers to:")

---

### ID 112 — Antes: Vocabulary - Technical Terms → Depois: Reading Comprehension

**Antes:** "In software development, 'refactoring' refers to:" (definição técnica direta)

**Depois:** Texto-base sobre refatoração + pergunta de compreensão ("According to the text, refactoring:")

---

### ID 121 — Antes: Vocabulary - Technical Acronyms → Depois: Reading Comprehension

**Antes:** "In the context of software development, 'CI/CD' stands for:" (pergunta de acrônimo)

**Depois:** Texto-base sobre CI e CD + pergunta de compreensão ("According to the text, the main difference between CI and CD is that:")

---

## Separação entre disciplinas

| Disciplina | Cobre | Não cobra |
|------------|-------|-----------|
| Língua Portuguesa | Interpretação, gramática, coesão, sintaxe, semântica | TI, legislação, administração pública, LGPD |
| Língua Inglesa | Compreensão de texto, vocabulário em contexto, gramática aplicada | Definições técnicas diretas, acrônimos sem contexto |
| Legislação | LAI, LGPD, Marco Civil, segurança da informação, proteção de dados | Gramática, interpretação textual, TI técnica |
| Conhecimentos Específicos | Arquitetura, APIs, Java, Spring, DevOps, segurança, banco de dados, testes, microsserviços | Gramática, interpretação textual |

---

## Atualizações no sistema

### Prompt de geração IA (`api/generate-questions.ts`)

Adicionado bloco "Regras por disciplina":
- Português: deve cobrar habilidade linguística, contexto de TI permitido mas resposta não pode depender de conhecimento externo
- Inglês: deve cobrar compreensão linguística, não apenas conhecimento técnico traduzido
- Legislação: cobrar temas legais
- Conhecimentos Específicos: cobrar conteúdo técnico

### Revisão IA (`api/review-question.ts`)

Adicionado:
- Item 11: verifica aderência à disciplina
- Novo score: `disciplineAdherenceScore` (0-10)
- Se Português cobrar conhecimento jurídico/técnico → score baixo ou reprovação

### Validação (`scripts/validate-multicontest.ts`)

Nova seção 18: "ADERÊNCIA POR DISCIPLINA"
- Verifica subtopics de Português (26 válidos, 4 proibidos)
- Verifica subtopics de Inglês (15 válidos, 3 proibidos)
- Verifica tags de Português (proíbe lgpd, administração pública, legislação, segurança)
- Verifica `disciplineAdherenceScore` no review
- Verifica regras de disciplina no prompt

---

## Resultado final

```
npm run validate: 172/172 ✅
npm run build: Build limpo ✅
Subtopics proibidos removidos: 100% ✅
Questões de Português com subtopic linguístico: 45/45 ✅
Questões de Inglês com subtopic linguístico: 35/35 ✅
```
