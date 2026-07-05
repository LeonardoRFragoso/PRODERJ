# Plataforma de Simulados — PRODERJ & Dataprev 2026

**🔗 Acesse: [https://proderj.vercel.app](https://proderj.vercel.app)**

Sistema de simulados para preparação de Concursos Públicos, suportando múltiplos concursos com regras, cargos e questões específicas.

Atualmente disponível:
- **PRODERJ 2026** — Centro de Tecnologia da Informação e Comunicação do Estado do Rio de Janeiro (Banca: IBFC)
- **Dataprev 2026** — Empresa de Tecnologia e Informações da Previdência (Banca: FGV)

---

## Objetivo do Projeto

Este projeto foi desenvolvido como ferramenta de estudo pessoal para concursos públicos, permitindo simular a experiência real de prova com:

- **Múltiplos concursos** na mesma plataforma
- **Correção automática** com explicações detalhadas
- **Cronômetro** com tempo oficial de cada prova
- **Histórico de tentativas** separado por concurso/cargo
- **Identificação de pontos fracos** (questões mais erradas)
- **Regras específicas** por concurso (pesos, nota de aprovação, zerar disciplina)

### Concursos e Cargos Disponíveis

| Concurso | Cargo | Nível | Questões | Banca |
|----------|-------|-------|----------|-------|
| PRODERJ 2026 | Analista de Sistemas e Métodos | Superior | 60 | IBFC |
| PRODERJ 2026 | Técnico de Suporte, Computação e Processamento | Técnico | 60 | IBFC |
| Dataprev 2026 | Analista de TI — Perfil 3: Desenvolvimento de Software | Superior | 70 | FGV |

---

## Estrutura das Provas

Seguindo o padrão do edital PRODERJ e da banca IBDO:

| Disciplina | Questões | Peso | Pontuação Máxima |
|------------|----------|------|------------------|
| Língua Portuguesa | 10 | 2 | 20 pontos |
| Raciocínio Lógico-Matemático | 10 | 2 | 20 pontos |
| Direito Administrativo e Constitucional | 10 | 2 | 20 pontos |
| Conhecimentos Específicos | 30 | 3 | 90 pontos |
| **TOTAL** | **60** | - | **150 pontos** |

**Aprovação**: Mínimo de 50% (75 pontos)

### Dataprev 2026 — Analista de TI (Perfil 3: Desenvolvimento de Software)

Seguindo o padrão do edital Dataprev e da banca FGV:

| Disciplina | Questões | Peso | Pontuação Máxima |
|------------|----------|------|------------------|
| Língua Portuguesa | 12 | 1 | 12 pontos |
| Língua Inglesa | 12 | 1 | 12 pontos |
| Raciocínio Lógico Matemático | 5 | 1 | 5 pontos |
| Atualidades e Inteligência Artificial | 6 | 1 | 6 pontos |
| Legislação (Segurança e Proteção de Dados) | 5 | 1 | 5 pontos |
| Conhecimentos Específicos - Desenvolvimento de Software | 30 | 2,5 | 75 pontos |
| **TOTAL** | **70** | - | **115 pontos** |

**Aprovação**: Mínimo de 57,5 pontos E não zerar nenhuma disciplina

**Questões**: 5 alternativas (A, B, C, D, E) — estilo FGV

---

## Como as Questões São Geradas

### Metodologia de Elaboração

As questões foram elaboradas seguindo uma metodologia estruturada:

1. **Análise do Edital Oficial**
   - Leitura completa do edital PRODERJ 2026
   - Mapeamento de todos os tópicos do conteúdo programático
   - Identificação de pesos e distribuição de questões

2. **Estudo da Banca IBDO**
   - Análise de provas anteriores da banca IBDO para outros concursos
   - Identificação de padrões de questões (formatos mais utilizados)
   - Mapeamento do estilo de redação e nível de dificuldade

3. **Elaboração Assistida por IA**
   - Questões geradas com auxílio de inteligência artificial (Claude/Cascade)
   - Baseadas no conteúdo programático oficial
   - Seguindo os padrões identificados da banca IBDO

4. **Validação e Refinamento**
   - Revisão manual de cada questão
   - Verificação de gabaritos e explicações
   - Ajuste de nível de dificuldade

### Formatos de Questão (Padrão IBDO)

A banca IBDO utiliza predominantemente os seguintes formatos:

- **"Avalie as afirmativas I, II, III..."** - Mais frequente
- **"Todas corretas, EXCETO..."** - Muito comum
- **"Associe a coluna A com a coluna B"** - Frequente
- **"Julgue V ou F"** - Presente, mas com 4 alternativas
- **Questões de Interpretação de Texto** - Obrigatório em Português

### Classificação das Questões

Cada questão possui metadados para melhor organização:

```typescript
interface Question {
  id: number;
  subject: string;           // Disciplina
  subjectName: string;       // Nome da disciplina
  subtopic?: string;         // Subtema (ex: "UML", "Concordância")
  difficulty?: Difficulty;   // 'baixo' | 'medio' | 'alto'
  weight: number;            // Peso da questão
  text: string;              // Enunciado
  options: Option[];         // 4 alternativas (A, B, C, D)
  correctAnswer: string;     // Gabarito
  explanation?: string;      // Explicação da resposta
  tags?: string[];           // Tags para busca
  source?: string;           // Fonte/origem
}
```

---

## Base de Conhecimento

### Fontes Primárias

1. **Edital PRODERJ 2026**
   - Documento oficial com conteúdo programático
   - Disponível em: [Site oficial do concurso]

2. **Provas Anteriores da Banca IBDO**
   - 23 provas analisadas de diversos cargos e níveis
   - Utilizadas para identificar padrões e estilo da banca
   - Arquivos disponíveis na pasta `/IBDO/`

3. **Legislação e Normas Técnicas**
   - Constituição Federal de 1988
   - Lei 8.112/90 (Servidores Públicos)
   - Lei 14.133/21 (Licitações)
   - Lei 12.527/11 (Acesso à Informação)
   - LGPD - Lei 13.709/18

4. **Referências Técnicas**
   - UML 2.5 - Especificação OMG
   - BPMN 2.0 - Notação oficial
   - Padrões de Projeto GoF
   - Metodologias Ágeis (Scrum, Kanban, XP)

### Distribuição de Questões por Tema

#### Língua Portuguesa (10 questões)
- Interpretação de Texto (com texto-base)
- Ortografia e Acentuação
- Classes de Palavras
- Concordância Verbal e Nominal
- Regência e Crase
- Colocação Pronominal

#### Raciocínio Lógico (10 questões)
- Proposições e Conectivos
- Tabela-Verdade
- Equivalências Lógicas
- Negação de Proposições
- Sequências Numéricas

#### Direito Administrativo (10 questões)
- Princípios da Administração Pública
- Organização do Estado
- Direitos e Garantias Fundamentais
- Lei de Acesso à Informação
- Atos Administrativos

#### Conhecimentos Específicos - Analista (30 questões)
- Engenharia de Software e Metodologias Ágeis
- UML 2.5 (Diagramas e Relacionamentos)
- BPMN 2.0 (Modelagem de Processos)
- Banco de Dados e SQL
- Arquitetura de Software (MVC, SOA, REST, Microsserviços)
- Padrões de Projeto (GoF)
- DevOps e CI/CD
- Segurança da Informação
- LGPD

---

## Tecnologias Utilizadas

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **CSS3** - Estilização (sem frameworks)
- **LocalStorage** - Persistência de histórico

---

## Instalação e Execução

### Requisitos
- Node.js 18+ 
- npm ou yarn

### Desenvolvimento Local

```bash
# Clonar repositório
git clone [url-do-repositorio]
cd questionario-proderj

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Acessar
http://localhost:5173
```

### Build de Produção

```bash
# Gerar build otimizado
npm run build

# Testar build localmente
npm run preview
```

---

## Deploy

### Vercel (Recomendado)

O projeto é uma SPA React/Vite e pode ser deployada diretamente na Vercel:

1. Conectar o repositório GitHub na Vercel
2. Configurações automáticas:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Deploy automático a cada push para `main`

Ou via CLI:

```bash
npm i -g vercel
vercel --prod
```

### Servidor VM (Alternativo)

O projeto também está configurado para deploy em VM Linux com systemd.

### Dados do Servidor
- **IP**: 192.168.0.45
- **Porta**: 8577
- **URL**: http://192.168.0.45:8577

### Comandos de Deploy

```bash
# 1. Build local
npm run build

# 2. Enviar para VM
scp -r dist lfragoso@192.168.0.45:/home/lfragoso/

# 3. Na VM, executar:
sudo rm -rf /opt/questionario-proderj/dist
sudo mv /home/lfragoso/dist /opt/questionario-proderj/
sudo chown -R proderj:proderj /opt/questionario-proderj/dist
sudo systemctl restart questionario-proderj
```

Ver arquivo `INSTRUCOES-DEPLOY.md` para instruções detalhadas.

---

## Estrutura do Projeto

```
questionario-proderj/
├── src/
│   ├── types/
│   │   ├── contest.ts          # Interface Contest
│   │   ├── career.ts           # Interface Career
│   │   └── question.ts         # Interface Question
│   ├── data/
│   │   ├── contests.ts         # Define PRODERJ e Dataprev
│   │   ├── careers.ts          # Re-export para compat
│   │   ├── questions.ts        # Questões PRODERJ Analista
│   │   ├── questionsTecnico.ts # Questões PRODERJ Técnico
│   │   └── questionsDataprevDev.ts  # 300 questões Dataprev
│   ├── services/
│   │   ├── examService.ts      # Seleção de questões por concurso
│   │   ├── scoringService.ts   # Pontuação com regras variáveis
│   │   └── storageService.ts   # LocalStorage com histórico por concurso
│   ├── App.tsx                 # Componente principal (multi-concurso)
│   ├── App.css                 # Estilos (tema escuro compartilhado)
│   └── main.tsx                # Entry point
├── docs/
│   └── integracao_dataprev.md  # Doc da integração Dataprev
├── public/
├── dist/                       # Build de produção
└── README.md                   # Este arquivo
```

---

## Estatísticas do Banco de Questões

| Métrica | PRODERJ | Dataprev |
|---------|---------|----------|
| Total de questões (Analista) | 183 | 300 |
| Total de questões (Técnico) | ~150 | — |
| Alternativas por questão | 4 (A-D) | 5 (A-E) |
| Disciplinas | 4 | 6 |

---

## Como Adicionar um Novo Concurso

1. Criar arquivo de questões em `src/data/questionsNovoConcurso.ts` seguindo a interface `Question`
2. Adicionar careers e contest em `src/data/contests.ts`:
   - Definir `id`, `name`, `shortName`, `year`, `board`, `description`, `icon`
   - Adicionar cargos com disciplinas, pesos, `passingScore` e `requireNoZeroedSubject` se aplicável
3. Adicionar lógica de seleção em `src/services/examService.ts` (switch por `contestId` + `careerId`)
4. O sistema detecta automaticamente o novo concurso na tela inicial

## Como Adicionar um Novo Cargo

1. Adicionar o cargo no array `careers` do concurso correspondente em `src/data/contests.ts`
2. Criar arquivo de questões em `src/data/questionsNovoCargo.ts` (ou reutilizar existente)
3. Adicionar lógica de seleção em `src/services/examService.ts`

## Como Adicionar Novas Questões

1. Adicionar questões no arquivo TypeScript correspondente (`src/data/questions*.ts`)
2. Seguir a interface `Question` com todos os campos obrigatórios
3. Usar IDs sequenciais únicos
4. Executar `npm run validate` para auditar a base

Ver `docs/integracao_dataprev.md` para um exemplo completo de integração.

---

## Limitações e Avisos

> **IMPORTANTE**: Este é um projeto de estudo pessoal e NÃO possui vínculo oficial com o PRODERJ, Dataprev, as bancas IBDO/FGV ou qualquer órgão público.

- As questões são **elaboradas** e **não são reproduções** de provas anteriores
- O conteúdo pode conter imprecisões - sempre consulte fontes oficiais
- Utilize como **complemento** aos estudos, não como fonte única
- Provas reais podem ter formato e dificuldade diferentes

---

## Contribuições e Melhorias Futuras

- [ ] Adicionar mais questões de interpretação de texto
- [ ] Implementar modo de estudo por matéria
- [ ] Adicionar filtro por dificuldade
- [ ] Criar relatório de desempenho em PDF
- [ ] Implementar revisão de questões erradas

---

## Autor

Desenvolvido para fins de estudo pessoal.

---

## Licença

Projeto de uso pessoal - Não destinado à distribuição comercial.
