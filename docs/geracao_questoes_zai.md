# Geração Assistida de Questões com Z.ai

## Visão Geral

O sistema permite gerar novas questões difíceis usando a API da Z.ai (modelo GLM-5.2), com arquitetura segura que **nunca expõe a chave da API no frontend**.

## Arquitetura de Segurança

```
Frontend (React)          Serverless (Vercel)         Z.ai API
     │                          │                        │
     │── POST /api/generate-questions ──→│               │
     │                          │── chamada com ZAI_API_KEY ──→│
     │                          │←── JSON com questões ────│
     │←── JSON padronizado ─────│                        │
```

### Regras obrigatórias

- **NUNCA** colocar `ZAI_API_KEY` no frontend ou em variáveis `VITE_`
- A chave fica apenas nas variáveis de ambiente do servidor (Vercel ou `.env.local`)
- O frontend chama apenas a API interna `/api/generate-questions`
- A API interna valida a entrada e chama a Z.ai com a chave do servidor

## Configuração

### Variáveis de Ambiente (Servidor)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `ZAI_API_KEY` | Chave da API Z.ai | (não commitar) |
| `ZAI_BASE_URL` | URL base da API | `https://api.z.ai/api/paas/v4` |
| `ZAI_MODEL` | Modelo a usar | `glm-5.2` |

### Variáveis de Ambiente (Frontend)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_ENABLE_AI_GENERATOR` | Habilita painel de geração IA | `true` |

Esta flag **não contém segredos** — apenas controla a visibilidade do painel.

### Configuração Local

1. Copie `.env.example` para `.env.local`
2. Preencha `ZAI_API_KEY` com sua chave real
3. Defina `VITE_ENABLE_AI_GENERATOR=true` para ver o painel

### Configuração na Vercel

1. Acesse o painel da Vercel → Settings → Environment Variables
2. Adicione:
   - `ZAI_API_KEY` = sua chave
   - `ZAI_BASE_URL` = `https://api.z.ai/api/paas/v4`
   - `ZAI_MODEL` = `glm-5.2`
   - `VITE_ENABLE_AI_GENERATOR` = `true` (opcional, para habilitar em produção)
3. Faça redeploy

## Fluxo de Geração

1. Usuário acessa o painel "Gerador de Questões IA"
2. Seleciona disciplina, tópico, dificuldade e quantidade (máx 10)
3. Clica em "Gerar questões com IA"
4. Frontend envia POST para `/api/generate-questions`
5. Serverless function chama Z.ai com prompt restritivo
6. Questões retornam como **rascunho** (draft)
7. Usuário revisa cada questão
8. Usuário **aprova** ou **rejeita** cada questão
9. Apenas questões aprovadas entram nos simulados difíceis e treinos

## Validação Automática

Toda questão gerada passa por validação antes de entrar como rascunho:

- subject e subjectName preenchidos
- subtopic preenchido
- difficulty válido
- weight correto
- text com mínimo 20 caracteres
- exatamente 5 alternativas (A-E) para Dataprev
- alternativas não duplicadas
- correctAnswer existe nas alternativas
- explanation com mínimo 20 caracteres
- tags não vazio
- source preenchido

### Detecção de Similaridade

O sistema compara o texto de cada questão gerada com todas as questões existentes usando similaridade Jaccard de tokens. Se a similaridade for > 0.82, a questão é marcada como possível duplicada.

## Storage Local

| Chave | Conteúdo |
|-------|----------|
| `generatedQuestionsDrafts` | Rascunhos aguardando revisão |
| `generatedQuestionsApproved` | Questões aprovadas pelo usuário |
| `generatedQuestionsRejected` | Questões rejeitadas |

Apenas questões aprovadas são usadas nos modos difícil, treino e reforço.

## Scripts Offline

Para expansão oficial da base do repositório (offline):

```bash
# Gerar questões (requer ZAI_API_KEY no ambiente)
npm run generate:dataprev -- --subject especificos_dev --topic "Microsserviços" --difficulty dificil --quantity 5

# Validar questões geradas
npm run validate:generated

# Verificar duplicatas contra base oficial
npm run check:duplicates

# Importar questões aprovadas (gera relatório)
npm run import:generated
```

Os scripts geram arquivos JSON em `generated/dataprev/drafts/`.

## Endpoints da API

### POST /api/generate-questions

**Request:**
```json
{
  "contestId": "dataprev-2026",
  "careerId": "dataprev-dev",
  "subject": "especificos_dev",
  "subjectName": "Conhecimentos Específicos",
  "topic": "Microsserviços",
  "difficulty": "dificil",
  "quantity": 5,
  "mode": "hard"
}
```

**Response:**
```json
{
  "success": true,
  "questions": [...],
  "metadata": {
    "provider": "zai",
    "model": "glm-5.2",
    "generatedAt": "2026-07-04T...",
    "count": 5
  }
}
```

### GET /api/health-zai

Verifica se as variáveis de ambiente estão configuradas (não retorna a chave).

### POST /api/review-question

Envia uma questão para revisão técnica pela IA.

## Limites e Controle de Custos

- Máximo 10 questões por chamada
- Timeout de 30 segundos
- Máximo 1 retry para erros temporários
- Tratamento de erros 401, 429, 500
- Mensagens amigáveis para cada tipo de erro
