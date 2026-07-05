# Resumo Técnico das Últimas Implementações

**Projeto:** questionario-concursos / PRODERJ + Dataprev  
**Repositório:** https://github.com/LeonardoRFragoso/PRODERJ  
**Produção:** https://questionarioconcursos.vercel.app  
**Data:** Julho 2026

---

## 1. Visão Geral

O projeto deixou de ser apenas um simulado do PRODERJ e passou a ser uma **plataforma multi-concurso**, capaz de suportar diferentes concursos, cargos, bancas, formatos de prova e critérios de aprovação — tudo na mesma aplicação React + Vite.

Concursos atualmente disponíveis:

| Concurso | Banca | Cargos | Ícone |
|----------|-------|--------|-------|
| PRODERJ 2026 | IBFC | Analista de Sistemas e Métodos, Técnico de Suporte | 🏛️ |
| Dataprev 2026 | FGV | Analista de TI — Perfil 3: Desenvolvimento de Software | 💻 |

---

## 2. Integração Dataprev

A integração do concurso Dataprev 2026 foi realizada dentro da mesma aplicação React/Vite, mantendo o layout escuro original do PRODERJ.

**Características do cargo Dataprev — Analista de TI (Perfil 3):**

- **Banca:** FGV
- **Total de questões:** 70
- **Duração:** 4 horas
- **Alternativas:** 5 (A, B, C, D, E)
- **Pontuação máxima:** 115 pontos
- **Nota de aprovação:** 57,5 pontos
- **Regra especial:** Reprova ao zerar qualquer disciplina

**Distribuição de disciplinas e pesos:**

| Disciplina | Questões | Peso | Pontos máx. |
|------------|----------|------|-------------|
| Língua Portuguesa | 12 | 1 | 12 |
| Língua Inglesa | 12 | 1 | 12 |
| Raciocínio Lógico Matemático | 5 | 1 | 5 |
| Atualidades e Inteligência Artificial | 6 | 1 | 6 |
| Legislação — Segurança da Informação e Proteção de Dados | 5 | 1 | 5 |
| Conhecimentos Específicos — Desenvolvimento de Software | 30 | 2,5 | 75 |
| **Total** | **70** | — | **115** |

A tela inicial agora apresenta seleção de concurso → seleção de cargo → tela de simulado.

---

## 3. Arquitetura Multi-Concurso

### Arquivos principais criados/alterados

| Arquivo | Responsabilidade |
|---------|-----------------|
| `src/types/contest.ts` | Interface `Contest` (id, name, board, careers, etc.) |
| `src/types/career.ts` | Interface `Career` (subjects, passingScore, requireNoZeroedSubject) |
| `src/types/question.ts` | Interface `Question` (options, difficulty, weight, source) |
| `src/types/examMode.ts` | Tipo `ExamMode` ('full', 'hard', 'training', 'weak-topics') |
| `src/data/contests.ts` | Definição dos concursos, cargos, disciplinas e pesos |
| `src/data/questionsDataprevDev.ts` | Banco de 300 questões Dataprev |
| `src/data/questionsTecnico.ts` | Banco de 181 questões PRODERJ Técnico |
| `src/data/questions.ts` | Banco de 208 questões PRODERJ Analista |
| `src/services/examService.ts` | Seleção de questões por concurso/cargo/modo |
| `src/services/scoringService.ts` | Cálculo de pontuação, zerados, aprovação |
| `src/services/storageService.ts` | Histórico separado por concurso/cargo |
| `src/App.tsx` | Fluxo de telas: concurso → cargo → simulado → resultado |
| `README.md` | Documentação geral atualizada |

### Capacidades da arquitetura

A aplicação agora suporta:

- **Concursos diferentes** com configuração independente
- **Cargos diferentes** dentro de cada concurso
- **Quantidades diferentes de questões** por cargo (60, 70, etc.)
- **Alternativas A-D ou A-E** conforme o concurso
- **Pesos diferentes** por disciplina (1, 2, 2,5, 3, etc.)
- **Critérios de aprovação diferentes** (50% padrão, 57,5 pontos Dataprev)
- **Regras especiais** como reprovação ao zerar disciplina
- **Histórico separado** por concurso e cargo (campo `contestId` e `careerId` em cada tentativa)

---

## 4. Banco de Questões Dataprev

### Quantidade e distribuição

| Disciplina | Questões |
|------------|----------|
| Língua Portuguesa | 45 |
| Língua Inglesa | 35 |
| Raciocínio Lógico Matemático | 30 |
| Atualidades e IA | 30 |
| Legislação e Segurança | 30 |
| Conhecimentos Específicos — Desenvolvimento de Software | 130 |
| **Total** | **300** |

### Por dificuldade

| Dificuldade | Quantidade |
|-------------|-----------|
| Fácil | 22 |
| Médio | 180 |
| Difícil | 98 |

### Características

- **Questões autorais**, desenvolvidas especificamente para a plataforma
- **Estilo FGV**: enunciados interpretativos, alternativas semanticamente próximas, cenários práticos
- **Aderência ao edital** Dataprev 2026 — Perfil 3: Desenvolvimento de Software
- **Conteúdo específico**: arquitetura de software, APIs, microsserviços, segurança, DevOps, IA, governança, legislação
- **Suporte a 3 níveis de dificuldade**: fácil, médio e difícil

---

## 5. Validações e Testes

O script `scripts/validate-multicontest.ts` executa **158 validações automatizadas**:

### Categorias validadas

- **Estrutura dos concursos**: cada concurso tem id, nome, banca, cargos
- **Quantidade de questões**: cada disciplina tem questões suficientes para o simulado
- **Alternativas**: 4 alternativas (A-D) para PRODERJ, 5 alternativas (A-E) para Dataprev
- **Gabarito**: toda questão tem exactly uma resposta correta válida
- **Pontuação**: soma dos pesos bate com maxPoints de cada disciplina
- **Histórico**: tentativas têm contestId, careerId, pontuação e respostas
- **Modo difícil**: prioriza questões difíceis, fallback para médias
- **Endpoints de IA**: auth, rate limit, free mode, fallback, scores
- **Segurança**: health check não expõe segredos, token obrigatório

### Status atual

```
npm run validate → 158/158 passaram ✅
npm run build    → build limpo ✅
```

---

## 6. Deploy

- **Plataforma:** Vercel
- **Build:** Vite + React, sem erros nem warnings críticos
- **Ambiente:** Production
- **URLs publicadas:**
  - https://questionarioconcursos.vercel.app
  - https://proderj.vercel.app (alias)
- **Documentação de deploy:** `docs/deploy_vercel.md`
- **Variáveis de ambiente:** configuradas via Vercel Dashboard (server-side only para segredos)
- **vercel.json:** configura `maxDuration` de 60s para `generate-questions` e 30s para `review-question`

---

## 7. Integração com Z.ai

A plataforma integra a **Z.ai Model API** para geração assistida de questões via endpoints serverless.

### Endpoints criados

| Endpoint | Função |
|----------|--------|
| `/api/generate-questions` | Gera questões autorais via Z.ai |
| `/api/review-question` | Revisa questão com scores de aderência |
| `/api/health-zai` | Health check da configuração (sem expor segredos) |

### Arquitetura

```
Frontend (React)          Serverless (Vercel)         Z.ai API
     │                          │                        │
     │── POST /api/generate ──→│                        │
     │   (x-ai-admin-token)     │── chamada com key ──→│
     │                          │←── JSON com questões ──│
     │←── JSON padronizado ─────│                        │
```

- A **chave da API** (ZAI_API_KEY) existe apenas no ambiente serverless
- O **frontend** nunca acessa ZAI_API_KEY diretamente
- O **token administrativo** é enviado via header `x-ai-admin-token`

### Variáveis de ambiente esperadas

| Variável | Ambiente | Descrição |
|----------|----------|-----------|
| `ZAI_API_KEY` | Server-side only | Chave da API Z.ai (secreta) |
| `ZAI_BASE_URL` | Server-side | URL base da API |
| `ZAI_MODEL` | Server-side | Modelo primário (free tier) |
| `ZAI_FALLBACK_MODEL` | Server-side | Modelo fallback (free tier) |
| `AI_FREE_MODEL_MODE` | Server-side | Ativa limites do modo econômico |
| `AI_ADMIN_TOKEN` | Server-side only | Token de autenticação admin (secreto) |
| `VITE_ENABLE_AI_GENERATOR` | Client-side | Exibe painel de IA no frontend |

> **Nenhum valor real de chave ou token é exposto neste documento.**

### Modelos utilizados (free tier)

| Papel | Modelo |
|-------|--------|
| Primário | `glm-4.7-flash` |
| Fallback | `glm-4.5-flash` |

Nenhum modelo pago é usado como padrão ou fallback.

---

## 8. Segurança da Geração por IA

| Medida | Implementação |
|--------|---------------|
| ZAI_API_KEY | Apenas server-side, nunca exposta ao frontend |
| AI_ADMIN_TOKEN | Obrigatório em todos os endpoints de IA |
| Token no header | Enviado via `x-ai-admin-token` |
| Token no frontend | Salvo em `sessionStorage`, nunca em `localStorage` |
| Sem token | Endpoint retorna `401 Unauthorized` |
| Token inválido | Endpoint retorna `401 Unauthorized` |
| Health check | Retorna flags booleanas, nunca valores de chaves |
| Painel administrativo | Bloqueado até desbloqueio com token |
| Rate limit | Limite por IP (20/h, 50/d) e por token (30/h, 100/d) |
| Limite de quantidade | Máx 5 questões/request em modo econômico |
| Questões geradas | Entram como **rascunho** (draft) |
| Aprovação manual | Obrigatória antes de usar em simulados |

### Arquivos de segurança

| Arquivo | Função |
|---------|--------|
| `api/_lib/rateLimiter.ts` | Rate limiting, secure logging, free mode config |
| `api/_lib/profiles.ts` | Perfis de banca e concurso (server-side) |

---

## 9. Modelo Gratuito / Econômico

O sistema usa preferencialmente modelos gratuitos da Z.ai:

- **Modelo primário:** `glm-4.7-flash` (free tier)
- **Fallback:** `glm-4.5-flash` (free tier) — ativado quando primário falha com 429 ou saldo insuficiente
- **Fallback não ativado** para timeout ou erros temporários

### Modo econômico (`AI_FREE_MODEL_MODE=true`)

| Configuração | Modo econômico | Modo normal |
|--------------|---------------|-------------|
| Máx questões/request | 5 | 10 |
| Quantidade padrão | 3 | 5 |
| Temperature | 0,5 | 0,7 |

### Tratamento de erros

- **429 (rate limit):** tenta fallback, depois mensagem amigável
- **Saldo insuficiente:** tenta fallback, depois erro 503 "Saldo insuficiente"
- **Modelo indisponível:** erro 503 com mensagem clara
- **Timeout:** não tenta fallback (erro temporário)

---

## 10. Padrão da Banca e Provas Anteriores

O sistema usa perfis de banca e concurso para garantir que toda questão gerada siga o padrão correto.

### Hierarquia de geração

1. **Edital atual** define o **conteúdo**
2. **Banca atual** define o **estilo**
3. **Provas anteriores da banca** calibram **dificuldade e padrão**
4. **Provas anteriores do órgão** servem como **referência temática** apenas
5. **Questões oficiais não são copiadas** — toda questão é autoral e inédita

### Arquivos de configuração

| Arquivo | Conteúdo |
|---------|----------|
| `src/data/boardStyleProfiles.ts` | Perfis de banca (FGV, IBFC) com questionStyle, avoid, difficultyCalibration |
| `src/data/contestReferenceProfiles.ts` | Perfil do concurso Dataprev 2026 com banca, conteúdo e estilo |
| `api/_lib/profiles.ts` | Versão server-side dos perfis para endpoints |

### Para Dataprev 2026

- **Conteúdo:** edital Dataprev 2026, Perfil 3 — Desenvolvimento de Software
- **Banca:** FGV
- **Estilo principal:** provas anteriores da FGV para TI, sistemas, analista e concursos federais
- **Referência secundária:** provas anteriores da Dataprev (apenas temas recorrentes)
- **Proibição:** copiar, adaptar ou reproduzir questões oficiais

### Prompt v2.0

O prompt enviado à Z.ai contém obrigatoriamente:

- Referência ao edital atual
- Nome da banca e regras de estilo
- Prioridade de geração em 5 níveis
- Calibração de dificuldade específica da banca
- Proibição explícita de copiar questões
- Source da questão: "inspirada no padrão da banca FGV"

### Revisão com scores

O endpoint `/api/review-question` retorna:

```json
{
  "approved": true,
  "score": 8,
  "boardStyleScore": 7,
  "difficultyScore": 8,
  "editalAdherenceScore": 9,
  "warnings": [],
  "suggestions": []
}
```

---

## 11. Modo Difícil Dataprev

O modo **"Simulado Difícil"** foi criado como uma opção de simulado para Dataprev:

- **Priorização de questões difíceis:** seleciona primeiro questões com `difficulty: 'dificil'` ou `'alto'`
- **Fallback para médias:** se não houver difíceis suficientes, completa com médias
- **Fallback para fáceis:** último recurso para manter o total de questões
- **Distribuição oficial mantida:** respeita a quantidade de questões por disciplina do edital
- **Questões aprovadas por IA:** inclui questões geradas por IA que foram aprovadas manualmente
- **Regras de pontuação preservadas:** pesos, nota de aprovação e regra de zerar disciplina

### Arquivos relacionados

| Arquivo | Função |
|---------|--------|
| `src/components/DifficultModeSelector.tsx` | Seletor de modo (completo, difícil, treino, reforço) |
| `src/services/examService.ts` | Função `selectHardQuestions()` |
| `docs/modo_dificil_dataprev.md` | Documentação do modo difícil |

---

## 12. Reforço por Pontos Fracos

O modo **"Reforço por Pontos Fracos"** analisa o histórico do usuário e gera questões focadas:

- **Leitura do histórico:** analisa tentativas anteriores no `localStorage`
- **Identificação de erros:** detecta disciplinas/tópicos com maior taxa de erro
- **Geração focada:** envia tópicos fracos no prompt da Z.ai para gerar questões direcionadas
- **Uso sob demanda:** disponível apenas para Dataprev
- **Revisão obrigatória:** questões geradas entram como rascunho, precisam aprovação

### Arquivos relacionados

| Arquivo | Função |
|---------|--------|
| `src/components/WeakTopicsPanel.tsx` | Painel de identificação de pontos fracos |
| `src/services/aiQuestionService.ts` | Integração com histórico para identificar erros |

---

## 13. Painel "Gerar novas questões com IA"

### Tela de seleção de modo

- **Botão renomeado:** "🤖 Gerar novas questões com IA" (antes: "Gerador de Questões IA")
- **Descrição abaixo do botão:** "Área administrativa para expandir a base de questões..."
- **Modal "Quando usar?":** explica cenários de uso e avisa que questões não entram automaticamente no simulado

### Painel de IA (`AIQuestionGeneratorPanel`)

Contém 4 blocos informativos:

1. **Aviso amarelo:** "Este painel não substitui o simulado..."
2. **Passo a passo (5 passos):**
   1. Escolha disciplina, tópico e dificuldade
   2. Gere poucas questões por vez
   3. Revise enunciado, alternativas, gabarito e explicação
   4. Aprove apenas questões boas
   5. Use as questões aprovadas no modo difícil ou no reforço por pontos fracos
3. **Alerta de qualidade (vermelho):** "Não aprove questões sem revisar..."
4. **Nota de padrão da banca:** "As questões devem seguir o edital atual, o padrão da banca FGV..."

### Informações exibidas no painel

- Concurso (ex: Dataprev 2026)
- Banca (ex: Fundação Getulio Vargas)
- Estilo usado (ex: enunciados interpretativos, alternativas próximas...)
- Cargo
- Tópico e dificuldade selecionados
- Status: rascunho, aprovada ou rejeitada

---

## 14. Scripts Offline

Scripts para geração, validação e importação de questões fora da aplicação:

| Script | Função |
|--------|--------|
| `scripts/generate-dataprev-questions.ts` | Gera questões offline via Z.ai CLI |
| `scripts/validate-generated-questions.ts` | Valida estrutura de questões geradas |
| `scripts/check-duplicates.ts` | Checa duplicidade contra base existente |
| `scripts/import-generated-questions.ts` | Importa questões validadas para a base oficial |
| `scripts/validate-multicontest.ts` | Validação completa (158 testes) |

### Fluxo recomendado

1. Gerar questões offline com `generate-dataprev-questions.ts`
2. Validar estrutura com `validate-generated-questions.ts`
3. Checar duplicidade com `check-duplicates.ts`
4. Importar com `import-generated-questions.ts`
5. Versionar no repositório

---

## 15. Documentações Criadas/Atualizadas

| Documento | Conteúdo |
|-----------|----------|
| `README.md` | Visão geral, features, configuração, deploy |
| `docs/integracao_dataprev.md` | Detalhes da integração Dataprev |
| `docs/deploy_vercel.md` | Guia de deploy na Vercel |
| `docs/validacao_final_multiconcurso.md` | Resultado da validação multi-concurso |
| `docs/geracao_questoes_zai.md` | Documentação completa da geração por IA |
| `docs/modo_dificil_dataprev.md` | Documentação do modo difícil |
| `docs/resumo_ultimas_implementacoes.md` | Este documento |

---

## 16. Estado Atual do Projeto

| Item | Status |
|------|--------|
| PRODERJ 2026 funcionando | ✅ |
| Dataprev 2026 funcionando | ✅ |
| Modo difícil Dataprev | ✅ |
| Reforço por pontos fracos | ✅ |
| Geração IA protegida | ✅ |
| Endpoints protegidos (401 sem token) | ✅ |
| Health check sem expor segredos | ✅ |
| Modo econômico (free tier) | ✅ |
| Fallback de modelo gratuito | ✅ |
| Padrão da banca no prompt | ✅ |
| Scores de revisão (boardStyle, difficulty, edital) | ✅ |
| Painel com explicação e fluxo correto | ✅ |
| `npm run validate` | 158/158 ✅ |
| `npm run build` | Build limpo ✅ |
| Deploy Vercel | Ativo ✅ |
| Projeto pronto para uso real | ✅ |

---

## 17. Próximos Passos Recomendados

- **Criar mais questões difíceis revisadas** — expandir o banco de questões difíceis para Dataprev
- **Melhorar estatísticas por tópico** — granularidade de acertos/erros por subtopic
- **Criar exportação de desempenho** — permitir exportar histórico em CSV/PDF
- **Criar ranking pessoal de evolução** — gráfico de progresso ao longo do tempo
- **Melhorar filtros de treino** — permitir filtrar por dificuldade e tópico no modo treino
- **Criar rotina de revisão espaçada** — sugerir revisão de questões erradas em intervalos
- **Adicionar novos concursos** — a arquitetura já suporta; basta adicionar dados
- **Aumentar base de questões IA aprovadas** — usar o painel para gerar e aprovar mais questões
- **Implementar gamificação** — badges, streaks e metas de estudo
- **Adicionar modo simulado cronometrado por questão** — timer individual opcional

---

*Este documento não contém chaves, tokens ou segredos. Todas as variáveis sensíveis são gerenciadas exclusivamente no ambiente serverless da Vercel.*
