# Simulado PRODERJ 2026

Sistema de simulados para preparação do Concurso Público PRODERJ 2026 - Centro de Tecnologia da Informação e Comunicação do Estado do Rio de Janeiro.

---

## Objetivo do Projeto

Este projeto foi desenvolvido como ferramenta de estudo pessoal para o concurso PRODERJ 2026, permitindo simular a experiência real de prova com:

- **60 questões** por simulado (conforme edital oficial)
- **4 horas de duração** cronometradas
- **Correção automática** com explicações detalhadas
- **Histórico de tentativas** para acompanhar evolução
- **Identificação de pontos fracos** (questões mais erradas)

### Cargos Disponíveis

| Cargo | Nível | Questões Específicas |
|-------|-------|---------------------|
| Analista de Sistemas e Métodos | Superior | Desenvolvimento, UML, BPMN, Banco de Dados |
| Técnico de Sistemas e Métodos | Médio | Suporte, Infraestrutura, Redes |

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

## Deploy em Servidor

O projeto está configurado para deploy em VM Linux com systemd.

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
│   ├── data/
│   │   ├── questions.ts       # Questões do Analista (183 questões)
│   │   ├── questionsTecnico.ts # Questões do Técnico
│   │   └── careers.ts         # Configuração dos cargos
│   ├── App.tsx                # Componente principal
│   ├── App.css                # Estilos
│   └── main.tsx               # Entry point
├── public/
├── dist/                      # Build de produção
├── deploy-vm.sh               # Script de deploy
├── INSTRUCOES-DEPLOY.md       # Guia de deploy
├── ANALISE-QUESTIONARIO-PRODERJ.md  # Análise de gaps
└── README.md                  # Este arquivo
```

---

## Estatísticas do Banco de Questões

| Métrica | Valor |
|---------|-------|
| Total de questões (Analista) | 183 |
| Questões de Interpretação de Texto | 8 |
| Questões de UML | 11 |
| Questões de BPMN | 8 |
| Questões de SQL | 11 |
| Questões com dificuldade classificada | ~50 |

---

## Limitações e Avisos

> **IMPORTANTE**: Este é um projeto de estudo pessoal e NÃO possui vínculo oficial com o PRODERJ, a banca IBDO ou qualquer órgão público.

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
