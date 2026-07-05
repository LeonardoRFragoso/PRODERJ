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
- **`AI_ADMIN_TOKEN`** protege o uso dos endpoints de geração — sem token válido, retorna 401
- O token admin é armazenado apenas em `sessionStorage` (não `localStorage`)
- `VITE_ENABLE_AI_GENERATOR` apenas controla visibilidade do painel — não concede acesso

## Configuração

### Variáveis de Ambiente (Servidor)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `ZAI_API_KEY` | Chave da API Z.ai | (não commitar) |
| `ZAI_BASE_URL` | URL base da API | `https://api.z.ai/api/paas/v4` |
| `ZAI_MODEL` | Modelo a usar | `glm-4.5-flash` (free tier) |
| `AI_ADMIN_TOKEN` | Token admin para autorizar geração | (não commitar) |

### Variáveis de Ambiente (Frontend)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_ENABLE_AI_GENERATOR` | Habilita painel de geração IA | `true` |

Esta flag **não contém segredos** — apenas controla a visibilidade do painel.

### Configuração Local

1. Copie `.env.example` para `.env.local`
2. Preencha `ZAI_API_KEY` com sua chave real
3. Defina `AI_ADMIN_TOKEN` com um token seguro de sua escolha
4. Defina `VITE_ENABLE_AI_GENERATOR=true` para ver o painel

### Configuração na Vercel

1. Acesse o painel da Vercel → Settings → Environment Variables
2. Adicione:
   - `ZAI_API_KEY` = sua chave
   - `ZAI_BASE_URL` = `https://api.z.ai/api/paas/v4`
   - `ZAI_MODEL` = `glm-4.5-flash` (free tier) ou `glm-5.1` (pago)
   - `AI_ADMIN_TOKEN` = token admin seguro (obrigatório para geração)
   - `VITE_ENABLE_AI_GENERATOR` = `true` (opcional, para habilitar em produção)
3. Faça redeploy

## Proteção Administrativa

### Como funciona

1. `VITE_ENABLE_AI_GENERATOR=true` apenas **mostra** o botão "Gerador de Questões IA" na UI
2. Ao clicar, o usuário vê uma tela de desbloqueio pedindo o token admin
3. O token é salvo em `sessionStorage` (não `localStorage`) — some ao fechar a aba
4. Toda chamada para `/api/generate-questions` envia o header `x-ai-admin-token`
5. O endpoint valida o header contra `process.env.AI_ADMIN_TOKEN`
6. Se inválido ou ausente: retorna **401 Unauthorized**
7. Se 401: frontend limpa o token e pede novamente

### Por que sessionStorage e não localStorage?

- `sessionStorage` é limpo ao fechar a aba/navegador
- Reduz janela de exposição do token
- Não persiste entre sessões

### Rate Limit e Controle de Custo

O sistema tem múltiplas camadas de limite para evitar consumo excessivo de créditos:

**Por request:**
- Máximo 10 questões por request
- Timeout de 60s
- Máximo 1 retry para erros temporários
- Máximo 1 request em andamento por sessão (bloqueio de 65s)

**Por IP:**
- Máximo 20 requests por hora
- Máximo 50 requests por dia

**Por token admin:**
- Máximo 30 requests por hora
- Máximo 100 requests por dia

**Comportamento ao exceder:**
- Retorna HTTP 429
- Mensagem: "Limite de geração atingido. Tente novamente mais tarde."
- A Z.ai **não é chamada** quando o limite já foi atingido — economiza créditos

**Logging seguro:**
Cada request registra apenas:
- Timestamp
- Endpoint
- Status HTTP
- Quantidade solicitada
- IP mascarado (hash SHA-256, primeiros 16 chars)
- Modelo usado
- Sucesso/erro

**Nunca** é registrado:
- `ZAI_API_KEY` ou `AI_ADMIN_TOKEN`
- Prompt completo
- Resposta completa da IA
- IP original

### Por que existe rate limit?

1. **Proteção de custo:** A Z.ai cobra por token. Sem limite, um único usuário poderia consumir todo o saldo
2. **Proteção contra abuso:** Mesmo com `AI_ADMIN_TOKEN`, um token vazado poderia gerar centenas de questões
3. **Fair use:** O free tier da Z.ai tem 1000 req/dia — o limite de 100/dia por token mantém uso sustentável
4. **Estabilidade:** Evita sobrecarga da API Z.ai durante picos

### O que fazer ao receber 429

- **Limite por hora:** Aguarde 1 hora e tente novamente
- **Limite por dia:** Aguarde até o próximo dia (meia-noite UTC)
- **Sessão ocupada:** Aguarde 65 segundos (há uma geração em andamento)
- Se persistir, verifique se não há outra aba/usuário usando o mesmo token

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
