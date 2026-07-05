# Integração Dataprev — Plataforma Multi-Concurso

## Visão Geral

O Dataprev 2026 foi integrado na mesma aplicação React/Vite/TypeScript do PRODERJ, transformando o projeto em uma **plataforma de simulados para múltiplos concursos**.

## O que foi migrado do projeto Streamlit

- **300 questões autorais** (IDs 1-300) cobrindo todas as 6 disciplinas do edital Dataprev 2026
- **Configuração oficial da prova**: 70 questões, pesos 1 e 2,5, nota máxima 115, aprovação mínima 57,5
- **Regra de não zerar disciplina**: reprovação automática se zerar qualquer disciplina
- **Estilo FGV**: questões interpretativas, baseadas em cenários, com 5 alternativas (A-E)
- **Explicações detalhadas** para cada questão
- **Documentação**: edital resumido, metodologia, fontes pesquisadas, plano de estudos

## O que foi descartado

- `app.py` (Streamlit)
- `pages/` (navegação Streamlit)
- `database/db.py` (SQLite — substituído por LocalStorage)
- `services/` Python (substituídos por serviços TypeScript)
- Sidebar do Streamlit
- Layout branco/preto genérico

## Arquitetura Multi-Concurso

```
src/
├── types/
│   ├── contest.ts      # Interface Contest
│   ├── career.ts       # Interface Career (com passingScore, requireNoZeroedSubject)
│   └── question.ts     # Interface Question (suporta 4 ou 5 alternativas)
├── data/
│   ├── contests.ts     # Define PRODERJ 2026 e Dataprev 2026
│   ├── questions.ts    # Questões PRODERJ Analista (existentes)
│   ├── questionsTecnico.ts  # Questões PRODERJ Técnico (existentes)
│   └── questionsDataprevDev.ts  # 300 questões Dataprev (migradas)
├── services/
│   ├── examService.ts      # Seleção de questões por concurso/cargo
│   ├── scoringService.ts   # Cálculo de pontuação com regras variáveis
│   └── storageService.ts   # LocalStorage com histórico separado por concurso
├── App.tsx             # Fluxo: Concurso → Cargo → Simulado → Resultado
├── App.css             # Tema visual escuro (compartilhado)
└── main.tsx
```

## Regras Específicas do Dataprev

| Propriedade | PRODERJ | Dataprev |
|---|---|---|
| Banca | IBFC | FGV |
| Total de questões | 60 | 70 |
| Alternativas por questão | 4 (A-D) | 5 (A-E) |
| Pontuação máxima | 150 | 115 |
| Nota de aprovação | 75 (50%) | 57,5 |
| Zerar disciplina | Sem regra adicional | Reprova |
| Pesos | 2 e 3 | 1 e 2,5 |

## Fluxo da Aplicação

1. **Tela inicial**: "Escolha o Concurso" — cards para PRODERJ e Dataprev
2. **Seleção de cargo**: filtra apenas cargos do concurso selecionado
3. **Tela de início**: mostra disciplinas, pesos, regras específicas
4. **Simulado**: questões com cronômetro, navegação, confirmação de resposta
5. **Resultado**: pontuação, desempenho por disciplina, disciplinas zeradas
6. **Histórico**: tentativas separadas por concurso/cargo

## Histórico no LocalStorage

Cada tentativa salva:
- `contestId` e `contestName`
- `careerId` e `careerName`
- Pontuação, acertos, percentual, aprovação
- Respostas detalhadas
- Scores por disciplina

## Como Adicionar Novo Concurso

1. Adicionar careers em `src/data/contests.ts`
2. Criar arquivo de questões em `src/data/questionsNovoConcurso.ts`
3. Adicionar lógica de seleção em `src/services/examService.ts`
4. Adicionar entrada no array `contests`

## Próximos Passos

- Modo treino por disciplina
- Questões favoritas
- Revisão de erros
- Estatísticas avançadas com gráficos
- Suporte a mais concursos
