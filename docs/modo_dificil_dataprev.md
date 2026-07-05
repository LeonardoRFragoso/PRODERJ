# Modo Difícil Dataprev

## Visão Geral

O Modo Difícil é uma variação do simulado Dataprev que prioriza questões com maior nível de dificuldade, mantendo todas as regras oficiais de pontuação e distribuição.

## Diferença entre Modos

| Modo | Descrição | Questões | Distribuição |
|------|-----------|----------|--------------|
| **Simulado Completo** | Prova no padrão oficial | 70 | Aleatória |
| **Simulado Difícil** | Prioriza questões difíceis | 70 | Oficial + dificuldade alta |
| **Treino por Disciplina** | Foca em uma disciplina | Variável | Uma disciplina |
| **Reforço por Pontos Fracos** | Questões sobre tópicos fracos | 70 | Oficial + tópicos fracos |

## Como o Modo Difícil Funciona

1. Para cada disciplina, o sistema separa as questões por dificuldade:
   - **Difícil** (`dificil` ou `alto`): prioridade máxima
   - **Médio** (`medio`): usados se não houver difíceis suficientes
   - **Fácil** (`facil` ou `baixo`): evitados, usados apenas como último recurso

2. A distribuição oficial é mantida:
   - Português: 12 questões
   - Inglês: 12 questões
   - Raciocínio Lógico: 5 questões
   - Atualidades e IA: 6 questões
   - Legislação: 5 questões
   - Conhecimentos Específicos: 30 questões

3. A pontuação é mantida:
   - Máximo: 115 pontos
   - Aprovação: 57,5 pontos
   - Reprovação se zerar qualquer disciplina

4. Questões aprovadas geradas por IA podem ser incluídas no pool

## Questões Geradas por IA no Modo Difícil

- Apenas questões **aprovadas** pelo usuário no painel de geração IA são incluídas
- Questões em rascunho ou rejeitadas **nunca** entram no simulado
- As questões IA recebem um badge "🤖 IA Revisada" na tela do simulado
- O sistema evita duplicação entre questões oficiais e IA no mesmo simulado

## Reforço por Pontos Fracos

1. O sistema lê o histórico de tentativas do LocalStorage
2. Identifica as disciplinas com maior taxa de erro
3. Mostra um ranking visual dos pontos fracos
4. Oferece botão "Gerar novas questões difíceis sobre meus pontos fracos"
5. Ao clicar, chama a API `/api/generate-questions` com os tópicos fracos
6. As questões geradas entram como **rascunho**
7. O usuário revisa e aprova antes de usar
8. Depois de aprovadas, entram no modo de reforço

**Importante:** A geração nunca é automática — sempre requer confirmação do usuário.

## Como Ativar

1. Selecione o concurso Dataprev 2026
2. Selecione o cargo Analista de TI — Perfil 3
3. Na tela de início, escolha o modo no seletor "Modo de Simulado"
4. Clique em "Iniciar Simulado"
