import type { Question, SubjectInfo } from './questions';

export const subjectsTecnico: SubjectInfo[] = [
  { id: 'portugues', name: 'Língua Portuguesa', questionCount: 10, weight: 2, maxPoints: 20 },
  { id: 'logica', name: 'Raciocínio Lógico-Matemático', questionCount: 10, weight: 2, maxPoints: 20 },
  { id: 'direito', name: 'Direito Administrativo e Constitucional', questionCount: 10, weight: 2, maxPoints: 20 },
  { id: 'especificos_tecnico', name: 'Conhecimentos Específicos - Técnico', questionCount: 30, weight: 3, maxPoints: 90 },
];

export const questionsTecnico: Question[] = [
  {
    id: 1001,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Qual das alternativas representa corretamente o uso da acentuação gráfica em palavras da língua portuguesa?`,
    options: [
      { letter: 'A', text: `A palavra 'saudável' é acentuada por ser uma paroxítona terminada em ditongo.` },
      { letter: 'B', text: `A palavra 'último' é acentuada por ser uma paroxítona terminada em vogal.` },
      { letter: 'C', text: `A palavra 'pássaro' é acentuada por ser uma oxítona.` },
      { letter: 'D', text: `A palavra 'fácil' é acentuada por ser uma paroxítona terminada em 'l'.` }
    ],
    correctAnswer: 'D',
    explanation: `A palavra 'fácil' é uma paroxítona que recebe acento circunflexo por ser terminada em 'l', enquanto as demais alternativas estão incorretas quanto ao motivo da acentuação.`,
  },
  {
    id: 1002,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde ao uso da ortografia oficial.`,
    options: [
      { letter: 'A', text: `A forma correta de escrever é 'exceção', com 'ç', segundo as normas do novo acordo ortográfico.` },
      { letter: 'B', text: `O termo 'ideia' deve ser escrito com acento, como 'idéia', conforme a ortografia vigente.` },
      { letter: 'C', text: `As palavras 'vôo' e 'pôde' devem ser acentuadas por serem monossílabas.` },
      { letter: 'D', text: `A forma correta de escrever é 'lingüiça', que mantém a trema, mesmo após a reforma ortográfica.` }
    ],
    correctAnswer: 'A',
    explanation: `A alternativa A está correta, pois 'exceção' é a grafia correta segundo as normas do novo acordo ortográfico. As demais alternativas apresentam erros ortográficos.`,
  },
  {
    id: 1003,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Sobre a tipologia textual, avalie:
I. O texto narrativo tem como principal objetivo contar uma história.
II. O texto dissertativo visa expor e argumentar uma ideia.
III. O texto descritivo é aquele que tem por finalidade convencer o leitor. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `I e II, apenas.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'C',
    explanation: `As alternativas I e II estão corretas em suas definições, enquanto a III está errada, pois o texto descritivo tem a função de descrever e não de convencer.`,
  },
  {
    id: 1004,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Assinale a alternativa que contém ERRO de concordância ou crase:`,
    options: [
      { letter: 'A', text: `'A gente vamos ao cinema.' - erro de concordância verbal.` },
      { letter: 'B', text: `'Ele trouxe duas maçãs.' - frase correta.` },
      { letter: 'C', text: `'Nós vamos à festa.' - uso correto da crase.` },
      { letter: 'D', text: `'Eles foram ao mercado.' - frase correta.` }
    ],
    correctAnswer: 'A',
    explanation: `'A gente' pede verbo no singular: 'A gente vai ao cinema'. A frase 'Nós vamos a festa' também está errada por faltar a crase ('à festa').`,
  },
  {
    id: 1005,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Todas as alternativas estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `A palavra 'férias' é sempre utilizada no plural.` },
      { letter: 'B', text: `O verbo 'haver' pode ser utilizado no sentido de 'existir'.` },
      { letter: 'C', text: `O advérbio 'rapidamente' é uma forma correta de expressar a velocidade.` },
      { letter: 'D', text: `A palavra 'mesmo' tem sempre o mesmo significado em todos os contextos.` }
    ],
    correctAnswer: 'D',
    explanation: `A alternativa D é a única incorreta, pois a palavra 'mesmo' pode ter diferentes significados dependendo do contexto em que é utilizada.`,
  },
  {
    id: 1006,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª de acordo com o uso das classes de palavras:`,
    options: [
      { letter: 'A', text: `1 - Artigo, 2 - Substantivo.` },
      { letter: 'B', text: `1 - Advérbio, 2 - Adjetivo.` },
      { letter: 'C', text: `1 - Preposição, 2 - Verbo.` },
      { letter: 'D', text: `1 - Conjunção, 2 - Interjeição.` }
    ],
    correctAnswer: 'A',
    explanation: `A alternativa A associa corretamente as classes de palavras, já que artigo e substantivo se complementam na formação de sintagmas nominais.`,
  },
  {
    id: 1007,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `[Nome] está enfrentando dificuldades em entender textos técnicos. Para melhorar sua compreensão, deve:`,
    options: [
      { letter: 'A', text: `Ler apenas resumos dos textos, evitando a leitura completa.` },
      { letter: 'B', text: `Consultar dicionários e glossários para aprender novos termos.` },
      { letter: 'C', text: `Evitar anotar palavras e expressões que não compreende.` },
      { letter: 'D', text: `Focar apenas na estrutura gramatical do texto.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B é a mais adequada, pois consultar dicionários e glossários ajuda a compreender melhor o vocabulário técnico, promovendo uma leitura mais eficaz.`,
  },
  {
    id: 1008,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Qual das alternativas representa corretamente um exemplo de texto dissertativo?`,
    options: [
      { letter: 'A', text: `Um conto que narra as aventuras de um herói.` },
      { letter: 'B', text: `Um artigo que discute os impactos da tecnologia na educação.` },
      { letter: 'C', text: `Um poema sobre a beleza da natureza.` },
      { letter: 'D', text: `Uma crônica que relata um acontecimento do cotidiano.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B é a única que caracteriza um texto dissertativo, que tem como objetivo discutir e argumentar sobre um tema específico.`,
  },
  {
    id: 1009,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Marque a alternativa CORRETA a respeito da acentuação das palavras proparoxítonas.`,
    options: [
      { letter: 'A', text: `Todas as proparoxítonas são acentuadas, independentemente da sua terminação.` },
      { letter: 'B', text: `Uma proparoxítona pode não ser acentuada se for uma palavra estrangeira.` },
      { letter: 'C', text: `As proparoxítonas devem ser acentuadas apenas quando são substantivos.` },
      { letter: 'D', text: `Proparoxítonas não se acentuam, pois seguem a regra das paroxítonas.` }
    ],
    correctAnswer: 'A',
    explanation: `A alternativa A está correta, pois a regra da acentuação garante que todas as palavras proparoxítonas são acentuadas, independentemente de sua terminação.`,
  },
  {
    id: 1010,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Sobre o emprego das classes de palavras, avalie:
I. Os adjetivos qualificam os substantivos.
II. Os advérbios modificam substantivos.
III. Os pronomes substituem ou acompanham os substantivos. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `I e III, apenas.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'C',
    explanation: `As alternativas I e III estão corretas, enquanto a II está errada, pois os advérbios não modificam substantivos, mas sim verbos, adjetivos e outros advérbios.`,
  },
  {
    id: 1011,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Qual das alternativas representa corretamente a colocação pronominal na frase: 'Ele me disse que você viria.'?`,
    options: [
      { letter: 'A', text: `A frase utiliza corretamente a próclise.` },
      { letter: 'B', text: `A frase apresenta erro de colocação pronominal.` },
      { letter: 'C', text: `A frase poderia ser escrita sem o pronome.` },
      { letter: 'D', text: `A frase deveria utilizar a ênclise.` }
    ],
    correctAnswer: 'A',
    explanation: `A frase 'Ele me disse que você viria.' utiliza corretamente a próclise, pois o pronome 'me' está posicionado antes do verbo, de acordo com as regras de colocação pronominal.`,
  },
  {
    id: 1012,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde à definição de sinônimo.`,
    options: [
      { letter: 'A', text: `Sinônimo é uma palavra que tem o mesmo significado de outra.` },
      { letter: 'B', text: `Sinônimo é uma palavra que tem significado oposto.` },
      { letter: 'C', text: `Sinônimo é uma palavra que possui apenas um significado.` },
      { letter: 'D', text: `Sinônimo é uma palavra que se utiliza apenas em contextos formais.` }
    ],
    correctAnswer: 'A',
    explanation: `A definição correta de sinônimo é que se trata de uma palavra que tem o mesmo significado de outra, o que é expresso na alternativa A.`,
  },
  {
    id: 1013,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Sobre interpretação e compreensão de texto, avalie as afirmativas:
I. A leitura crítica envolve a análise das intenções do autor.
II. A interpretação é subjetiva e pode variar de leitor para leitor.
III. A compreensão de texto é sempre linear e sequencial. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas III.` },
      { letter: 'C', text: `Apenas I.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'A',
    explanation: `As afirmativas I e II estão corretas, pois a leitura crítica envolve a análise das intenções do autor e a interpretação pode variar entre os leitores. A afirmativa III é incorreta, pois a compreensão de texto nem sempre é linear.`,
  },
  {
    id: 1014,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Sobre tipologia textual, assinale a alternativa INCORRETA:`,
    options: [
      { letter: 'A', text: `O texto narrativo apresenta uma história com personagens e enredo.` },
      { letter: 'B', text: `O texto expositivo tem como objetivo informar sobre um assunto.` },
      { letter: 'C', text: `Todo texto publicitário é SEMPRE persuasivo, sem exceções.` },
      { letter: 'D', text: `O texto descritivo caracteriza pessoas, lugares ou objetos.` }
    ],
    correctAnswer: 'C',
    explanation: `Nem todo texto publicitário é necessariamente persuasivo - alguns são informativos. A persuasão é comum, mas não obrigatória.`,
  },
  {
    id: 1015,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Todas as assertivas estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `O uso do 'por que' em perguntas.` },
      { letter: 'B', text: `O uso do 'porque' como explicação.` },
      { letter: 'C', text: `O uso do 'porquê' como sinônimo de 'motivo'.` },
      { letter: 'D', text: `O uso do 'por que' em orações afirmativas.` }
    ],
    correctAnswer: 'D',
    explanation: `A alternativa D está incorreta, pois o 'por que' não é utilizado em orações afirmativas, mas sim em perguntas ou em contextos específicos.`,
  },
  {
    id: 1016,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª, relacionando os tipos de palavras com suas definições:
I. Substantivo
II. Verbo
III. Adjetivo. A. Ação ou estado B. Qualidade ou característica C. Nome de seres ou objetos.`,
    options: [
      { letter: 'A', text: `I-C, II-A, III-B.` },
      { letter: 'B', text: `I-B, II-A, III-C.` },
      { letter: 'C', text: `I-A, II-C, III-B.` },
      { letter: 'D', text: `I-A, II-B, III-C.` }
    ],
    correctAnswer: 'A',
    explanation: `A associação correta é: I com C (Substantivo é nome de seres ou objetos), II com A (Verbo é ação ou estado) e III com B (Adjetivo é qualidade ou característica).`,
  },
  {
    id: 1017,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Cenário Prático: Maria está revisando um texto antes de enviá-lo para publicação. Para garantir a correta utilização da ortografia oficial, ela deve:`,
    options: [
      { letter: 'A', text: `Utilizar dicionários somente para verificar a gramática.` },
      { letter: 'B', text: `Consultar as novas regras de ortografia estabelecidas pelo Acordo Ortográfico.` },
      { letter: 'C', text: `Ignorar as regras de acentuação, pois são sempre as mesmas.` },
      { letter: 'D', text: `Revisar o texto apenas uma vez para economizar tempo.` }
    ],
    correctAnswer: 'B',
    explanation: `Para garantir a correta utilização da ortografia oficial, Maria deve consultar as novas regras estabelecidas pelo Acordo Ortográfico, como proposto na alternativa B.`,
  },
  {
    id: 1018,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Qual das alternativas apresenta um erro de ortografia oficial?`,
    options: [
      { letter: 'A', text: `Ele ficou muito feliz com a notícia.` },
      { letter: 'B', text: `A criança estava muito agitada.` },
      { letter: 'C', text: `Ela recebeu uma novíssima proposta de trabalho.` },
      { letter: 'D', text: `Os alunos se comportaram de maneira exemplar.` }
    ],
    correctAnswer: 'C',
    explanation: `A alternativa C apresenta um erro de ortografia, pois a forma correta é 'nova proposta' e não 'novíssima proposta', que é considerada excessiva no uso formal.`,
  },
  {
    id: 1019,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde ao uso do pronome relativo na frase: 'O livro que você me deu é interessante.'`,
    options: [
      { letter: 'A', text: `O pronome 'que' refere-se à pessoa.` },
      { letter: 'B', text: `O pronome 'que' é usado corretamente como pronome relativo.` },
      { letter: 'C', text: `O pronome 'que' pode ser substituído por 'o qual'.` },
      { letter: 'D', text: `O pronome 'que' não tem função na frase.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B é a correta, pois o pronome 'que' é usado corretamente como pronome relativo, referindo-se ao livro mencionado na frase.`,
  },
  {
    id: 1020,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Sobre o significado das palavras, avalie: I. 'Caminhar' e 'andar' são sinônimos. II. 'Frio' e 'calor' são antônimos. III. 'Casa' e 'lar' têm o mesmo significado. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas II e III.` },
      { letter: 'C', text: `Apenas I e III.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'A',
    explanation: `As afirmativas I e II estão corretas; 'caminhar' e 'andar' são sinônimos e 'frio' e 'calor' são antônimos. A afirmativa III é incorreta, pois embora 'casa' e 'lar' possam ter significados semelhantes, não são exatamente sinônimos.`,
  },
  {
    id: 1021,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Qual das alternativas representa corretamente a regência do verbo 'assistir' quando usado no sentido de 'ver'?`,
    options: [
      { letter: 'A', text: `Ele assistiu o filme ontem à noite.` },
      { letter: 'B', text: `Ela assistiu ao jogo de futebol.` },
      { letter: 'C', text: `Nós assistimos a palestra no auditório.` },
      { letter: 'D', text: `Você assistiu a televisão o dia todo.` }
    ],
    correctAnswer: 'B',
    explanation: `O verbo 'assistir' exige a preposição 'a' quando significa 'ver', logo a forma correta é 'assistiu ao jogo'.`,
  },
  {
    id: 1022,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde ao uso da crase na frase a seguir: 'Fui à escola para estudar.'`,
    options: [
      { letter: 'A', text: `Não se usa crase antes de palavras femininas.` },
      { letter: 'B', text: `A crase é usada antes de palavras masculinas.` },
      { letter: 'C', text: `A crase é obrigatória antes de palavras femininas que admitem artigo.` },
      { letter: 'D', text: `A crase é dispensável diante de locuções prepositivas.` }
    ],
    correctAnswer: 'C',
    explanation: `A crase é obrigatória antes de palavras femininas que admitem artigo definido, como em 'a escola'.`,
  },
  {
    id: 1023,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Sobre a colocação pronominal, avalie: I. 'Me disseram que você viria.' II. 'Não se preocupe, me avise.' III. 'Ele pediu-me para ajudá-lo.' Está correto:`,
    options: [
      { letter: 'A', text: `Apenas a I está correta.` },
      { letter: 'B', text: `Apenas a II está correta.` },
      { letter: 'C', text: `Apenas a III está correta.` },
      { letter: 'D', text: `Todas as afirmativas estão corretas.` }
    ],
    correctAnswer: 'C',
    explanation: `A afirmativa III está correta, pois a próclise é empregada após a preposição 'para'.`,
  },
  {
    id: 1024,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `A palavra 'cabo' pode ter diferentes significados. Assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `'Cabo' pode significar fio elétrico, posto militar e extremidade geográfica.` },
      { letter: 'B', text: `'Cabo' só possui um único significado na língua portuguesa.` },
      { letter: 'C', text: `'Cabo' nunca pode ser usado como substância verbal.` },
      { letter: 'D', text: `'Cabo' é uma palavra estrangeira sem uso no português.` }
    ],
    correctAnswer: 'A',
    explanation: `'Cabo' é uma palavra políssema: pode ser fio elétrico, posto militar (cabo do exército), extremidade geográfica (Cabo Frio), entre outros significados.`,
  },
  {
    id: 1025,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `O verbo 'agradecer' exige preposição ao se referir a alguém.` },
      { letter: 'B', text: `A palavra 'havia' é uma forma do verbo haver no passado.` },
      { letter: 'C', text: `O termo 'fácil' é um adjetivo que indica simplicidade.` },
      { letter: 'D', text: `A frase 'Ele disse que irá à loja.' não apresenta crase no artigo.` }
    ],
    correctAnswer: 'D',
    explanation: `A alternativa D está incorreta, pois 'à loja' exige crase por ser uma locução prepositiva.`,
  },
  {
    id: 1026,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª, considerando os verbos e suas regências:
I. 'Assistir' II. 'Agradecer' III. 'Referir'. 1. a alguém 2. a 3. a algo.`,
    options: [
      { letter: 'A', text: `I-3, II-1, III-2.` },
      { letter: 'B', text: `I-2, II-1, III-3.` },
      { letter: 'C', text: `I-1, II-3, III-2.` },
      { letter: 'D', text: `I-2, II-3, III-1.` }
    ],
    correctAnswer: 'B',
    explanation: `As associações corretas são: I-2 (assistir a), II-1 (agradecer a) e III-3 (referir a).`,
  },
  {
    id: 1027,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `João está em uma reunião de trabalho. Para entender melhor as demandas, ele deve:`,
    options: [
      { letter: 'A', text: `Fazer anotações sobre o que é dito.` },
      { letter: 'B', text: `Ignorar o que não lhe interessa.` },
      { letter: 'C', text: `Falar o tempo todo para se fazer notar.` },
      { letter: 'D', text: `Desviar a atenção para o celular.` }
    ],
    correctAnswer: 'A',
    explanation: `Fazer anotações ajuda na compreensão e retenção das informações discutidas na reunião.`,
  },
  {
    id: 1028,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `No contexto da interpretação de texto, considere a seguinte frase: 'A chuva alagou a cidade, causando transtornos aos moradores.' A palavra 'alagou' indica:`,
    options: [
      { letter: 'A', text: `Aumento da umidade no ar.` },
      { letter: 'B', text: `O ato de inundar uma área.` },
      { letter: 'C', text: `Uma simples garoa.` },
      { letter: 'D', text: `Uma mudança climática temporária.` }
    ],
    correctAnswer: 'B',
    explanation: `A palavra 'alagou' refere-se ao ato de inundar, o que é indicado pela situação descrita na frase.`,
  },
  {
    id: 1029,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Marque a alternativa CORRETA sobre o uso da crase na frase: 'Entreguei o documento à professora.'`,
    options: [
      { letter: 'A', text: `A crase é usada antes de substantivos masculinos.` },
      { letter: 'B', text: `A crase é opcional antes de substantivos femininos.` },
      { letter: 'C', text: `A crase é obrigatória antes de palavras femininas que admitem artigo.` },
      { letter: 'D', text: `A crase é sempre dispensável em locuções adverbiais.` }
    ],
    correctAnswer: 'C',
    explanation: `A crase é obrigatória antes de palavras femininas que aceitam o artigo, como em 'à professora'.`,
  },
  {
    id: 1030,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Avalie as afirmativas sobre a colocação pronominal:
I. 'Me empresta o seu livro.' II. 'Ele se feriu com a faca.' III. 'Nos ajude a resolver o problema.' Está correto:`,
    options: [
      { letter: 'A', text: `Apenas a I está correta.` },
      { letter: 'B', text: `Apenas a II está correta.` },
      { letter: 'C', text: `Apenas a III está correta.` },
      { letter: 'D', text: `Todas as afirmativas estão corretas.` }
    ],
    correctAnswer: 'C',
    explanation: `A afirmativa III é a única correta, pois 'ajude-nos' é o uso padrão da mesóclise.`,
  },
  {
    id: 1031,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Qual das alternativas representa corretamente a negação da proposição: 'Todos os alunos aprovados foram premiados'?`,
    options: [
      { letter: 'A', text: `Nenhum aluno aprovado foi premiado.` },
      { letter: 'B', text: `Alguns alunos aprovados não foram premiados.` },
      { letter: 'C', text: `Todos os alunos não aprovados foram premiados.` },
      { letter: 'D', text: `Todos os alunos premiados foram aprovados.` }
    ],
    correctAnswer: 'B',
    explanation: `A negação da proposição implica que há pelo menos um aluno aprovado que não foi premiado, o que corresponde à alternativa B.`,
  },
  {
    id: 1032,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Considere o argumento: 'Se chove, a rua está molhada. A rua não está molhada. Portanto, não chove.' Esse argumento é:`,
    options: [
      { letter: 'A', text: `Válido - é uma aplicação do Modus Tollens.` },
      { letter: 'B', text: `Inválido - a conclusão não decorre das premissas.` },
      { letter: 'C', text: `Válido - é uma aplicação do Modus Ponens.` },
      { letter: 'D', text: `Inválido - faltam premissas para a conclusão.` }
    ],
    correctAnswer: 'A',
    explanation: `Esse é o Modus Tollens: Se P→Q e ¬Q, então ¬P. Se a rua não está molhada (¬Q), então não choveu (¬P).`,
  },
  {
    id: 1033,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde à tabela-verdade da proposição (P ∧ Q) → R.`,
    options: [
      { letter: 'A', text: `A proposição é verdadeira quando P e Q são verdadeiros e R é falso.` },
      { letter: 'B', text: `A proposição é falsa somente quando P é verdadeiro, Q é verdadeiro e R é verdadeiro.` },
      { letter: 'C', text: `A proposição é verdadeira em todas as situações exceto quando P e Q são verdadeiros e R é falso.` },
      { letter: 'D', text: `A proposição é falsa quando P é falso, independentemente de Q e R.` }
    ],
    correctAnswer: 'C',
    explanation: `A proposição (P ∧ Q) → R é falsa apenas quando P e Q são verdadeiros e R é falso, o que confirma a alternativa C.`,
  },
  {
    id: 1034,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Sobre argumentos lógicos, avalie:
I. Um argumento é válido se a conclusão decorre das premissas.
II. Um argumento é sempre inválido se contém uma premissa falsa.
III. Um argumento válido pode ter premissas falsas. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `I e II apenas.` },
      { letter: 'C', text: `I e III apenas.` },
      { letter: 'D', text: `II e III apenas.` }
    ],
    correctAnswer: 'C',
    explanation: `Um argumento é válido se a conclusão é uma consequência das premissas (I). Um argumento válido pode ter premissas falsas (III), mas isso não invalida a lógica se a estrutura estiver correta.`,
  },
  {
    id: 1035,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Assinale a alternativa que apresenta a sequência correta na lógica numérica: 2, 4, 8, 16, ...?`,
    options: [
      { letter: 'A', text: `20, pois a sequência é de adição de 2.` },
      { letter: 'B', text: `24, pois a sequência é de adição de 4.` },
      { letter: 'C', text: `32, pois a sequência é de multiplicação por 2.` },
      { letter: 'D', text: `28, pois a sequência é de adição de 12.` }
    ],
    correctAnswer: 'C',
    explanation: `A sequência apresentada é uma progressão geométrica onde cada número é o dobro do anterior, portanto o próximo número é 32, alternativa C.`,
  },
  {
    id: 1036,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `A proposição 'Se a temperatura é superior a 30°C, então é verão' é FALSA quando:`,
    options: [
      { letter: 'A', text: `A temperatura é superior a 30°C e é verão.` },
      { letter: 'B', text: `A temperatura é inferior a 30°C e é inverno.` },
      { letter: 'C', text: `A temperatura é superior a 30°C e NÃO é verão.` },
      { letter: 'D', text: `A temperatura é inferior a 30°C e é verão.` }
    ],
    correctAnswer: 'C',
    explanation: `Uma condicional (Se P, então Q) só é FALSA quando o antecedente é verdadeiro (temp > 30°C) e o consequente é falso (não é verão).`,
  },
  {
    id: 1037,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Para o argumento: 'Se P então Q; P; logo Q', qual é a validade dessa estrutura?`,
    options: [
      { letter: 'A', text: `O argumento é inválido, pois não se pode concluir Q apenas com P.` },
      { letter: 'B', text: `O argumento é válido, pois a conclusão Q decorre da premissa P.` },
      { letter: 'C', text: `O argumento é inválido, pois necessita de mais informações.` },
      { letter: 'D', text: `O argumento é válido, mas apenas se Q for verdadeiro.` }
    ],
    correctAnswer: 'B',
    explanation: `A estrutura 'Se P então Q; P; logo Q' é uma forma de modus ponens, que é sempre válida.`,
  },
  {
    id: 1038,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Qual das alternativas representa corretamente a tabela-verdade da proposição P ∨ (¬Q)?`,
    options: [
      { letter: 'A', text: `A proposição é falsa somente quando P é falso e Q é verdadeiro.` },
      { letter: 'B', text: `A proposição é verdadeira sempre que P é verdadeiro ou Q é falso.` },
      { letter: 'C', text: `A proposição é verdadeira quando P é verdadeiro ou Q é verdadeiro.` },
      { letter: 'D', text: `A proposição é falsa quando P é verdadeiro e Q é falso.` }
    ],
    correctAnswer: 'A',
    explanation: `A proposição P ∨ (¬Q) é falsa apenas quando P é falso e Q é verdadeiro, o que corresponde à alternativa A.`,
  },
  {
    id: 1039,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `A proposição 'Se não chove, então vamos ao parque' é FALSA em qual situação?`,
    options: [
      { letter: 'A', text: `Quando chove e vamos ao parque.` },
      { letter: 'B', text: `Quando não chove e NÃO vamos ao parque.` },
      { letter: 'C', text: `Quando chove e não vamos ao parque.` },
      { letter: 'D', text: `Quando não chove e vamos ao parque.` }
    ],
    correctAnswer: 'B',
    explanation: `A condicional é FALSA quando o antecedente é verdadeiro (não chove) e o consequente é falso (não vamos ao parque).`,
  },
  {
    id: 1040,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Qual das alternativas representa corretamente a negação da proposição "Todos os cães são mamíferos"?`,
    options: [
      { letter: 'A', text: `Nenhum cão é mamífero.` },
      { letter: 'B', text: `Alguns cães não são mamíferos.` },
      { letter: 'C', text: `Todos os mamíferos são cães.` },
      { letter: 'D', text: `Alguns mamíferos são cães.` }
    ],
    correctAnswer: 'B',
    explanation: `A negação da proposição universal 'Todos os cães são mamíferos' é que existem pelo menos alguns cães que não são mamíferos.`,
  },
  {
    id: 1041,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde à tabela-verdade da proposição "P e Q".`,
    options: [
      { letter: 'A', text: `A proposição é verdadeira somente quando ambas P e Q são verdadeiras.` },
      { letter: 'B', text: `A proposição é verdadeira sempre que P for verdadeira.` },
      { letter: 'C', text: `A proposição é falsa quando pelo menos uma das variáveis é verdadeira.` },
      { letter: 'D', text: `A proposição é verdadeira quando P é falsa e Q é verdadeira.` }
    ],
    correctAnswer: 'A',
    explanation: `A conjunção 'P e Q' é verdadeira apenas quando ambas as proposições P e Q são verdadeiras.`,
  },
  {
    id: 1042,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Sobre equivalências lógicas, avalie:
I. A proposição "P implica Q" é equivalente a "não P ou Q".
II. A proposição "P e Q" é equivalente a "Q e P".
III. A proposição "não (P e Q)" é equivalente a "não P ou não Q". Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas II e III.` },
      { letter: 'C', text: `Apenas I e III.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'D',
    explanation: `Todas as afirmações são verdadeiras e representam equivalências lógicas reconhecidas.`,
  },
  {
    id: 1043,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Se P é VERDADEIRA e Q é FALSA, qual é o valor lógico da proposição "P ou Q"?`,
    options: [
      { letter: 'A', text: `Verdadeiro, pois basta uma ser verdadeira na disjunção.` },
      { letter: 'B', text: `Falso, pois Q é falsa.` },
      { letter: 'C', text: `Indeterminado, pois depende do contexto.` },
      { letter: 'D', text: `Falso, pois ambas precisam ser verdadeiras.` }
    ],
    correctAnswer: 'A',
    explanation: `Na disjunção (P ou Q), basta uma das proposições ser verdadeira para o resultado ser verdadeiro. Como P é V, então P∨Q é V.`,
  },
  {
    id: 1044,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `A proposição "P implica Q" é equivalente a "não P ou Q".` },
      { letter: 'B', text: `A equivalência "P e Q" é a mesma que "Q e P".` },
      { letter: 'C', text: `A negação de "Não P" é "P".` },
      { letter: 'D', text: `A proposição "não (P e Q)" é equivalente a "não P e não Q".` }
    ],
    correctAnswer: 'D',
    explanation: `A negação de "P e Q" é equivalente a "não P ou não Q", não "não P e não Q".`,
  },
  {
    id: 1045,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª na relação entre proposições e suas negações:
I. P.
II. Q.
III. R. | A. Não P. B. Não Q. C. Não R.`,
    options: [
      { letter: 'A', text: `I-A, II-B, III-C.` },
      { letter: 'B', text: `I-B, II-A, III-C.` },
      { letter: 'C', text: `I-C, II-B, III-A.` },
      { letter: 'D', text: `I-A, II-C, III-B.` }
    ],
    correctAnswer: 'A',
    explanation: `A correspondência correta é que cada proposição se nega pela adição do 'não'.`,
  },
  {
    id: 1046,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `[Nome] está analisando uma sequência numérica: 2, 4, 8, 16, ... Para prever o próximo número da sequência, deve:`,
    options: [
      { letter: 'A', text: `Identificar que a sequência é de adição.` },
      { letter: 'B', text: `Identificar que a sequência é de multiplicação por 2.` },
      { letter: 'C', text: `Considerar a média dos números apresentados.` },
      { letter: 'D', text: `Calcular a soma de todos os números apresentados.` }
    ],
    correctAnswer: 'B',
    explanation: `A sequência é gerada pela multiplicação do número anterior por 2, logo o próximo número é 32.`,
  },
  {
    id: 1047,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Em uma sequência onde cada número é a soma dos dois anteriores: 1, 1, 2, 3, 5, ... O próximo número será:`,
    options: [
      { letter: 'A', text: `8.` },
      { letter: 'B', text: `7.` },
      { letter: 'C', text: `6.` },
      { letter: 'D', text: `9.` }
    ],
    correctAnswer: 'A',
    explanation: `O próximo número na sequência de Fibonacci é a soma de 3 e 5, que resulta em 8.`,
  },
  {
    id: 1048,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Qual das alternativas representa corretamente a validade do argumento: "Se chover, a rua estará molhada. Está chovendo. Portanto, a rua está molhada."?`,
    options: [
      { letter: 'A', text: `O argumento é inválido, pois não apresenta conclusão lógica.` },
      { letter: 'B', text: `O argumento é válido, pois segue a forma do modus ponens.` },
      { letter: 'C', text: `O argumento é válido apenas se a rua estiver realmente molhada.` },
      { letter: 'D', text: `O argumento é inválido, pois não considera outras causas.` }
    ],
    correctAnswer: 'B',
    explanation: `O argumento é um exemplo de modus ponens, onde a conclusão decorre logicamente das premissas.`,
  },
  {
    id: 1049,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Qual das alternativas representa corretamente a negação da proposição "Todos os alunos passaram no exame"?`,
    options: [
      { letter: 'A', text: `Todos os alunos não passaram no exame.` },
      { letter: 'B', text: `Alguns alunos não passaram no exame.` },
      { letter: 'C', text: `Nenhum aluno passou no exame.` },
      { letter: 'D', text: `A maioria dos alunos passou no exame.` }
    ],
    correctAnswer: 'B',
    explanation: `A negação da proposição "Todos os alunos passaram no exame" é "Alguns alunos não passaram no exame", pois é suficiente que pelo menos um aluno não tenha passado para que a proposição original seja falsa.`,
  },
  {
    id: 1050,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde ao valor da proposição lógica 'P ∧ Q', se P é verdadeira e Q é falsa.`,
    options: [
      { letter: 'A', text: `A proposição é verdadeira.` },
      { letter: 'B', text: `A proposição é falsa.` },
      { letter: 'C', text: `Não é possível determinar a verdade da proposição.` },
      { letter: 'D', text: `A proposição é indeterminada.` }
    ],
    correctAnswer: 'B',
    explanation: `A conjunção 'P ∧ Q' é verdadeira apenas se ambas as proposições P e Q forem verdadeiras. Como P é verdadeira e Q é falsa, a proposição é falsa.`,
  },
  {
    id: 1051,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Sobre equivalências lógicas, avalie:
I. A negação da disjunção é equivalente à conjunção das negações.
II. Toda contradição é uma tautologia.
III. A negação de uma tautologia é uma contradição. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas III.` },
      { letter: 'C', text: `I e III estão corretas.` },
      { letter: 'D', text: `Todas as afirmativas estão corretas.` }
    ],
    correctAnswer: 'C',
    explanation: `A afirmação I é verdadeira, a II é falsa, e a III é verdadeira. Portanto, apenas I e III estão corretas.`,
  },
  {
    id: 1052,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Sobre tabelas-verdade na lógica proposicional, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `Todas as proposições lógicas podem ser representadas em uma tabela-verdade.` },
      { letter: 'B', text: `Apenas proposições simples podem ter tabela-verdade.` },
      { letter: 'C', text: `Tabelas-verdade só funcionam para no máximo 2 variáveis.` },
      { letter: 'D', text: `Proposições compostas não podem ser representadas em tabelas-verdade.` }
    ],
    correctAnswer: 'A',
    explanation: `Todas as proposições lógicas, simples ou compostas, podem ser representadas em tabelas-verdade, independente do número de variáveis.`,
  },
  {
    id: 1053,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Todas as afirmativas sobre argumentação estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `Um argumento é válido se a conclusão decorre das premissas.` },
      { letter: 'B', text: `Um argumento inválido não garante que a conclusão é falsa.` },
      { letter: 'C', text: `Um argumento pode ter premissas verdadeiras e conclusão falsa.` },
      { letter: 'D', text: `Um argumento pode ser válido mesmo com premissas falsas.` }
    ],
    correctAnswer: 'B',
    explanation: `Um argumento inválido implica que a conclusão pode ser falsa, então a afirmativa B é a única incorreta.`,
  },
  {
    id: 1054,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª referente a diagramas lógicos:
1. Tautologia. 2. Contradição. 3. Contingência. A. É sempre verdadeira. B. É sempre falsa. C. Pode ser verdadeira ou falsa.`,
    options: [
      { letter: 'A', text: `1-A, 2-B, 3-C.` },
      { letter: 'B', text: `1-B, 2-A, 3-C.` },
      { letter: 'C', text: `1-C, 2-A, 3-B.` },
      { letter: 'D', text: `1-A, 2-C, 3-B.` }
    ],
    correctAnswer: 'A',
    explanation: `A associação correta é: Tautologia é sempre verdadeira (1-A), Contradição é sempre falsa (2-B), e Contingência pode ser verdadeira ou falsa (3-C).`,
  },
  {
    id: 1055,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `[Nome] está analisando uma sequência numérica onde os números aumentam em 5 a cada passo: 3, 8, 13, 18. Para encontrar o próximo número da sequência, deve:`,
    options: [
      { letter: 'A', text: `Adicionar 5 ao último número da sequência.` },
      { letter: 'B', text: `Multiplicar o último número por 2.` },
      { letter: 'C', text: `Subtrair 3 do último número.` },
      { letter: 'D', text: `Adicionar 10 ao último número da sequência.` }
    ],
    correctAnswer: 'A',
    explanation: `A sequência numérica apresentada aumenta em 5 a cada passo, portanto, deve-se adicionar 5 ao último número (18) para obter o próximo número, que será 23.`,
  },
  {
    id: 1056,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Qual das alternativas representa corretamente a tabela-verdade da proposição 'P ∨ Q'?`,
    options: [
      { letter: 'A', text: `Verdadeiro quando P e Q são verdadeiros.` },
      { letter: 'B', text: `Falso quando P e Q são ambos falsos.` },
      { letter: 'C', text: `Verdadeiro quando ao menos uma das proposições é verdadeira.` },
      { letter: 'D', text: `Falso quando P é verdadeiro e Q é falso.` }
    ],
    correctAnswer: 'C',
    explanation: `A disjunção 'P ∨ Q' é verdadeira quando pelo menos uma das proposições P ou Q é verdadeira. Portanto, a alternativa C é a correta.`,
  },
  {
    id: 1057,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Sobre sequências e padrões numéricos, avalie:
I. A sequência 2, 4, 6, 8 é aritmética.
II. A sequência 1, 1, 2, 3, 5 é de Fibonacci.
III. A sequência 10, 20, 30, 40 é geométrica. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `I e II estão corretas.` },
      { letter: 'C', text: `II e III estão corretas.` },
      { letter: 'D', text: `Todas as afirmativas estão corretas.` }
    ],
    correctAnswer: 'B',
    explanation: `A afirmativa I é verdadeira, a II também é verdadeira, e a III é falsa, pois a sequência 10, 20, 30, 40 é aritmética, não geométrica.`,
  },
  {
    id: 1058,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Qual das alternativas representa corretamente um dos princípios fundamentais da Constituição Federal?`,
    options: [
      { letter: 'A', text: `A igualdade entre os cidadãos é um princípio que deve ser assegurado na administração pública.` },
      { letter: 'B', text: `A dignidade da pessoa humana é um dos fundamentos da República Federativa do Brasil.` },
      { letter: 'C', text: `A liberdade de expressão é um princípio que se aplica exclusivamente ao setor privado.` },
      { letter: 'D', text: `A separação dos poderes é um princípio apenas aplicável ao Judiciário.` }
    ],
    correctAnswer: 'B',
    explanation: `A dignidade da pessoa humana é um dos fundamentos da República, conforme disposto no artigo 1º da Constituição Federal.`,
  },
  {
    id: 1059,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde aos direitos e garantias fundamentais assegurados pela Constituição Brasileira.`,
    options: [
      { letter: 'A', text: `Todo cidadão tem o direito de ser tratado de forma desigual, de acordo com suas convicções.` },
      { letter: 'B', text: `A liberdade de expressão e a liberdade de imprensa são garantias fundamentais, com restrições apenas em casos de segurança nacional.` },
      { letter: 'C', text: `Os direitos fundamentais são restritos a cidadãos brasileiros natos apenas.` },
      { letter: 'D', text: `A proteção ao trabalhador é uma garantia que se aplica somente no setor privado.` }
    ],
    correctAnswer: 'B',
    explanation: `A liberdade de expressão e de imprensa são garantias fundamentais, embora possam ter restrições legais, essas não podem ser arbitrárias.`,
  },
  {
    id: 1060,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Sobre a organização do Estado brasileiro, avalie:
I. O Brasil é uma federação composta por União, Estados, Municípios e Distrito Federal.
II. A autonomia dos Estados é limitada pela Constituição Federal.
III. O Estado brasileiro é unitário, centralizando todas as decisões na União. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `Apenas III.` },
      { letter: 'D', text: `Apenas I e II.` }
    ],
    correctAnswer: 'A',
    explanation: `A afirmativa I está correta, pois o Brasil é uma federação. A II está errada, pois a autonomia dos Estados é garantida pela Constituição, e a III é falsa, pois o Brasil é uma federação, não um Estado unitário.`,
  },
  {
    id: 1061,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Sobre os princípios constitucionais da Administração Pública, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `A Administração Pública deve atuar conforme os princípios da legalidade, impessoalidade, moralidade, publicidade e eficiência (LIMPE).` },
      { letter: 'B', text: `Os princípios da Administração Pública são apenas três: legalidade, moralidade e publicidade.` },
      { letter: 'C', text: `O princípio da eficiência não está previsto na Constituição Federal.` },
      { letter: 'D', text: `A impessoalidade permite tratamento diferenciado conforme conveniência do gestor.` }
    ],
    correctAnswer: 'A',
    explanation: `Os cinco princípios da Administração Pública (LIMPE) estão expressamente previstos no caput do artigo 37 da Constituição Federal.`,
  },
  {
    id: 1062,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Todas as alternativas estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `A Administração Pública pode promover o interesse público com base na eficiência.` },
      { letter: 'B', text: `Os atos da Administração Pública devem ser impessoais e não podem favorecer indivíduos.` },
      { letter: 'C', text: `A moralidade administrativa é um princípio que pode ser ignorado em situações de emergência.` },
      { letter: 'D', text: `A publicidade dos atos administrativos visa garantir a transparência nas ações do governo.` }
    ],
    correctAnswer: 'C',
    explanation: `A moralidade administrativa não pode ser ignorada em qualquer circunstância, conforme os princípios da Administração Pública.`,
  },
  {
    id: 1063,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª sobre os princípios da Administração Pública:
I. Legalidade
II. Impessoalidade
III. Moralidade
IV. Publicidade
V. Eficiência. 1. Necessidade de agir em conformidade com a lei. 2. Atuação sem favorecimentos pessoais. 3. Ações transparentes para controle social. 4. Busca pela melhor utilização dos recursos públicos. 5. Ato administrativo deve ser ético.`,
    options: [
      { letter: 'A', text: `I-1, II-2, III-5, IV-3, V-4.` },
      { letter: 'B', text: `I-1, II-3, III-4, IV-2, V-5.` },
      { letter: 'C', text: `I-5, II-2, III-1, IV-4, V-3.` },
      { letter: 'D', text: `I-2, II-1, III-3, IV-5, V-4.` }
    ],
    correctAnswer: 'A',
    explanation: `A associação correta é I-1, II-2, III-5, IV-3, V-4, conforme cada princípio se relaciona com sua definição.`,
  },
  {
    id: 1064,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Cenário Prático: João é um servidor público que deseja assegurar seus direitos como trabalhador. Para isso, deve:`,
    options: [
      { letter: 'A', text: `Ignorar os regulamentos internos e agir conforme sua própria interpretação das leis.` },
      { letter: 'B', text: `Procurar informações sobre os direitos trabalhistas previstos na Constituição e na legislação específica.` },
      { letter: 'C', text: `Acreditar que seus direitos não são aplicáveis devido à sua posição como servidor público.` },
      { letter: 'D', text: `Solicitar apoio apenas de colegas, sem buscar informações oficiais.` }
    ],
    correctAnswer: 'B',
    explanation: `João deve buscar informações sobre seus direitos na Constituição e legislação específica, uma vez que a Administração Pública deve respeitar os direitos dos servidores.`,
  },
  {
    id: 1065,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Qual das alternativas representa corretamente uma das características da Administração Pública indireta?`,
    options: [
      { letter: 'A', text: `É composta apenas por autarquias, que não possuem personalidade jurídica própria.` },
      { letter: 'B', text: `Inclui entidades como fundações e empresas públicas, que têm personalidade jurídica própria e autonomia administrativa.` },
      { letter: 'C', text: `Os órgãos da Administração Pública indireta são diretamente subordinados ao Poder Executivo.` },
      { letter: 'D', text: `A Administração Pública indireta é responsável apenas pela execução de serviços públicos, sem poder de decisão.` }
    ],
    correctAnswer: 'B',
    explanation: `A Administração Pública indireta compreende entidades como autarquias, fundações e empresas públicas, que possuem personalidade jurídica própria e autonomia.`,
  },
  {
    id: 1066,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde aos princípios da Administração Pública estabelecidos pela Constituição Federal.`,
    options: [
      { letter: 'A', text: `A publicidade de atos administrativos é opcional, dependendo da natureza do ato.` },
      { letter: 'B', text: `A eficiência é considerada um princípio básico da Administração Pública, devendo ser perseguida por todos os órgãos.` },
      { letter: 'C', text: `A moralidade administrativa pode ser desconsiderada em situações de urgência.` },
      { letter: 'D', text: `Os princípios da Administração Pública não se aplicam a entes privados que prestam serviços públicos.` }
    ],
    correctAnswer: 'B',
    explanation: `A eficiência é um princípio fundamental da Administração Pública, conforme estabelecido no artigo 37 da Constituição Federal.`,
  },
  {
    id: 1067,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Qual das alternativas representa corretamente o conceito de improbidade administrativa segundo a Lei nº 8.429/1992?`,
    options: [
      { letter: 'A', text: `A improbidade administrativa refere-se apenas à prática de atos ilícitos por servidores públicos.` },
      { letter: 'B', text: `A improbidade administrativa é a conduta que causa prejuízo ao erário, enriquecimento ilícito ou violação aos princípios da administração pública.` },
      { letter: 'C', text: `A improbidade administrativa é a punição aplicada a servidores que não atingem metas estabelecidas.` },
      { letter: 'D', text: `A improbidade administrativa ocorre apenas em casos de corrupção comprovada.` }
    ],
    correctAnswer: 'B',
    explanation: `A Lei nº 8.429/1992 define improbidade administrativa como ações que causam prejuízo ao erário, enriquecimento ilícito ou violação aos princípios da administração pública.`,
  },
  {
    id: 1068,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde ao objetivo da Lei de Acesso à Informação (Lei nº 12.527/2011).`,
    options: [
      { letter: 'A', text: `A lei visa restringir o acesso a informações consideradas sigilosas.` },
      { letter: 'B', text: `A lei tem como objetivo garantir o direito de acesso à informação pública, promovendo a transparência na administração pública.` },
      { letter: 'C', text: `A lei estabelece normas para o fornecimento de informações apenas em casos de denúncias.` },
      { letter: 'D', text: `A lei tem como finalidade a proteção da privacidade dos funcionários públicos.` }
    ],
    correctAnswer: 'B',
    explanation: `A Lei de Acesso à Informação garante o direito de acesso à informação pública, promovendo a transparência na administração pública.`,
  },
  {
    id: 1069,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Sobre os princípios fundamentais da Constituição Federal de 1988, avalie:
I. A dignidade da pessoa humana é um dos fundamentos do Estado.
II. A soberania é um princípio que deve ser respeitado em todas as relações internacionais.
III. A cidadania é um princípio que garante a todos os brasileiros direitos políticos. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `I e III.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'D',
    explanation: `Todos os itens estão corretos, pois a dignidade da pessoa humana, a soberania e a cidadania são princípios fundamentais da Constituição Federal de 1988.`,
  },
  {
    id: 1070,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Sobre o sigilo das comunicações na Constituição Federal, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `O sigilo das comunicações telegráficas e telefônicas é inviolável, salvo ordem judicial.` },
      { letter: 'B', text: `Não há garantia constitucional sobre sigilo de comunicações.` },
      { letter: 'C', text: `O sigilo pode ser quebrado por qualquer autoridade policial.` },
      { letter: 'D', text: `Apenas comunicações telefônicas têm proteção constitucional.` }
    ],
    correctAnswer: 'A',
    explanation: `A CF/88 (art. 5º, XII) assegura a inviolabilidade do sigilo das comunicações, permitindo quebra apenas por ordem judicial para fins de investigação criminal ou instrução processual penal.`,
  },
  {
    id: 1071,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Todas as alternativas estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `A improbidade administrativa pode ser caracterizada pelo ato de improbidade do gestor público.` },
      { letter: 'B', text: `Os princípios administrativos incluem legalidade, impessoalidade, moralidade, publicidade e eficiência.` },
      { letter: 'C', text: `A Lei de Acesso à Informação permite acesso irrestrito a todos os documentos do poder público.` },
      { letter: 'D', text: `Os direitos fundamentais são garantidos a todos, sem discriminação.` }
    ],
    correctAnswer: 'C',
    explanation: `Embora a Lei de Acesso à Informação promova o acesso a documentos públicos, existem restrições para informações que envolvem segurança nacional ou privacidade.`,
  },
  {
    id: 1072,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª, relacionando os princípios da administração pública com suas definições:
I. Legalidade A. Atuar sempre visando o interesse público
II. Impessoalidade B. Respeitar as normas e leis vigentes
III. Moralidade C. Agir com ética e honestidade`,
    options: [
      { letter: 'A', text: `I-B, II-A, III-C` },
      { letter: 'B', text: `I-A, II-B, III-C` },
      { letter: 'C', text: `I-C, II-A, III-B` },
      { letter: 'D', text: `I-B, II-C, III-A` }
    ],
    correctAnswer: 'A',
    explanation: `I-B (Legalidade: Respeitar as normas), II-A (Impessoalidade: Atuar visando o interesse público), III-C (Moralidade: Agir com ética) estão corretas.`,
  },
  {
    id: 1073,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Cenário Prático: Maria, servidora pública, foi acusada de irregularidades em sua função. Para se defender, ela deve: `,
    options: [
      { letter: 'A', text: `Recusar o acesso ao processo administrativo que investiga suas ações.` },
      { letter: 'B', text: `Apresentar uma defesa fundamentada e ter acesso aos documentos do processo.` },
      { letter: 'C', text: `Ignorar as acusações, pois não há necessidade de se defender.` },
      { letter: 'D', text: `Solicitar que o processo seja arquivado sem defesa.` }
    ],
    correctAnswer: 'B',
    explanation: `Maria deve apresentar uma defesa fundamentada e ter acesso aos documentos do processo, conforme garantias do devido processo legal.`,
  },
  {
    id: 1074,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Qual das alternativas apresenta a forma correta de organização do Estado brasileiro, segundo a Constituição Federal?`,
    options: [
      { letter: 'A', text: `O Estado brasileiro é organizado em União, Estados e Municípios, com autonomia política, administrativa e financeira.` },
      { letter: 'B', text: `O Estado brasileiro se divide apenas em União e Municípios, sem a figura dos Estados.` },
      { letter: 'C', text: `A organização do Estado brasileiro é composta por União, Estados e Distritos apenas.` },
      { letter: 'D', text: `O Estado brasileiro é dividido em regiões, que não têm autonomia.` }
    ],
    correctAnswer: 'A',
    explanation: `A Constituição Federal estabelece que o Estado brasileiro é organizado em União, Estados e Municípios, todos com autonomia.`,
  },
  {
    id: 1075,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `No que diz respeito aos direitos e garantias fundamentais, analise as afirmativas:
I. Todos têm direito à vida, à liberdade e à segurança.
II. É vedada a tortura e o tratamento desumano.
III. Os direitos sociais são considerados direitos fundamentais, mas podem ser limitados em situações de crise. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `I e II.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'C',
    explanation: `As afirmativas I e II estão corretas, enquanto a III é parcialmente verdadeira, pois os direitos sociais não podem ser limitados em situações de crise.`,
  },
  {
    id: 1076,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Qual das alternativas representa corretamente o conceito de responsabilidade civil do Estado?`,
    options: [
      { letter: 'A', text: `A responsabilidade civil do Estado é sempre objetiva, independentemente da culpa do agente.` },
      { letter: 'B', text: `A responsabilidade civil do Estado ocorre apenas quando há dolo por parte da administração pública.` },
      { letter: 'C', text: `A responsabilidade civil do Estado é subjetiva e depende da comprovação de culpa.` },
      { letter: 'D', text: `A responsabilidade civil do Estado pode ser tanto subjetiva quanto objetiva, dependendo da situação.` }
    ],
    correctAnswer: 'A',
    explanation: `A responsabilidade civil do Estado é tipicamente objetiva, ou seja, o Estado pode ser responsabilizado independentemente da culpa, desde que comprovado o dano e o nexo causal.`,
  },
  {
    id: 1077,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde ao controle da Administração Pública.`,
    options: [
      { letter: 'A', text: `O controle da Administração Pública é exercido exclusivamente pelo Poder Legislativo.` },
      { letter: 'B', text: `O controle da Administração Pública é realizado por órgãos internos e externos, incluindo o Poder Judiciário.` },
      { letter: 'C', text: `O controle da Administração Pública não permite a participação da sociedade civil.` },
      { letter: 'D', text: `O controle da Administração Pública é feito apenas após a realização dos atos administrativos.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B é correta, pois o controle da Administração Pública envolve tanto mecanismos internos quanto externos, e inclui a participação do Poder Judiciário e da sociedade civil.`,
  },
  {
    id: 1078,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Sobre improbidade administrativa, avalie:
I. A prática de improbidade administrativa pode resultar em sanções administrativas e civis.
II. Os atos de improbidade não são considerados crimes.
III. A improbidade administrativa se restringe apenas a servidores públicos. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I está correta.` },
      { letter: 'B', text: `Apenas II e III estão corretas.` },
      { letter: 'C', text: `Apenas I e II estão corretas.` },
      { letter: 'D', text: `I, II e III estão corretas.` }
    ],
    correctAnswer: 'A',
    explanation: `A alternativa A está correta, pois a prática de improbidade administrativa pode resultar em sanções, mas a afirmação II é falsa, e III também está incorreta, pois a improbidade pode afetar qualquer agente público, não apenas servidores.`,
  },
  {
    id: 1079,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Sobre a Lei de Acesso à Informação (Lei 12.527/2011), assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `Qualquer cidadão pode solicitar informações sobre atos da Administração Pública, com prazo de resposta de até 20 dias, prorrogável por mais 10.` },
      { letter: 'B', text: `Apenas servidores públicos podem solicitar informações governamentais.` },
      { letter: 'C', text: `O prazo para resposta é de 60 dias úteis.` },
      { letter: 'D', text: `A lei não se aplica aos municípios, apenas à União e Estados.` }
    ],
    correctAnswer: 'A',
    explanation: `A Lei de Acesso à Informação garante a qualquer cidadão o direito de solicitar informações, com prazo de 20 dias para resposta, prorrogável por mais 10 dias mediante justificativa.`,
  },
  {
    id: 1080,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Todas as afirmações sobre os princípios fundamentais da Constituição Federal estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `A dignidade da pessoa humana é um dos princípios fundamentais da República.` },
      { letter: 'B', text: `A soberania é um dos princípios que fundamentam a Constituição Federal.` },
      { letter: 'C', text: `Os princípios constitucionais não têm hierarquia entre si.` },
      { letter: 'D', text: `A cidadania é um dos fundamentos constitucionais que orientam a República.` }
    ],
    correctAnswer: 'C',
    explanation: `A alternativa C é a exceção correta, pois os princípios constitucionais podem ter hierarquia, sendo alguns mais fundamentais que outros, como a dignidade da pessoa humana e a soberania.`,
  },
  {
    id: 1081,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª:
I. Responsabilidade Civil do Estado 1. Controle social.
II. Controle da Administração Pública 2. Ato ilícito do agente.
III. Improbidade Administrativa 3. Ação de cidadãos. Está correto:`,
    options: [
      { letter: 'A', text: `I-2, II-1, III-3` },
      { letter: 'B', text: `I-1, II-2, III-3` },
      { letter: 'C', text: `I-3, II-2, III-1` },
      { letter: 'D', text: `I-2, II-3, III-1` }
    ],
    correctAnswer: 'A',
    explanation: `A associação correta é I-2 (A responsabilidade civil do Estado refere-se ao ato ilícito do agente), II-1 (Controle da Administração Pública inclui controle social), e III-3 (Improbidade Administrativa pode ser denunciada por cidadãos).`,
  },
  {
    id: 1082,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `[Nome] é um servidor público e cometeu um ato que gerou danos a um terceiro. Para o terceiro buscar reparação, deve:`,
    options: [
      { letter: 'A', text: `Provar que o servidor agiu com dolo.` },
      { letter: 'B', text: `Comprovar que o dano ocorreu em função de um ato administrativo.` },
      { letter: 'C', text: `Acionar diretamente o servidor perante o Judiciário.` },
      { letter: 'D', text: `Aguardar que o Estado reconheça sua responsabilidade.` }
    ],
    correctAnswer: 'B',
    explanation: `Para buscar reparação por danos causados por um servidor público, o terceiro deve comprovar que o dano foi resultado de um ato administrativo, sendo a responsabilidade civil do Estado objetiva.`,
  },
  {
    id: 1083,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Qual das alternativas a seguir está incorreta em relação à Lei de Acesso à Informação?`,
    options: [
      { letter: 'A', text: `Os órgãos e entidades públicas devem garantir a transparência das informações.` },
      { letter: 'B', text: `A lei permite o acesso a informações sigilosas sem restrições.` },
      { letter: 'C', text: `A informação solicitada deve ser fornecida em formato acessível.` },
      { letter: 'D', text: `O controle social é um dos pilares da Lei de Acesso à Informação.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B está incorreta, uma vez que a Lei de Acesso à Informação estabelece que existem informações sigilosas que não podem ser acessadas sem as devidas restrições.`,
  },
  {
    id: 1084,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Marque a alternativa CORRETA sobre os princípios fundamentais da Constituição Federal.`,
    options: [
      { letter: 'A', text: `A justiça social é considerada um dos fundamentos da República.` },
      { letter: 'B', text: `A liberdade de expressão não é um princípio fundamental.` },
      { letter: 'C', text: `O pluralismo político é um dos fundamentos da Constituição.` },
      { letter: 'D', text: `A proteção ao meio ambiente é irrelevante nos princípios fundamentais.` }
    ],
    correctAnswer: 'C',
    explanation: `A alternativa C está correta, pois o pluralismo político é realmente um dos fundamentos da Constituição Federal, assegurando a diversidade de opiniões e ideias na sociedade.`,
  },
  {
    id: 1085,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas representa corretamente um componente essencial da arquitetura de um computador responsável pela realização de cálculos e operações lógicas?`,
    options: [
      { letter: 'A', text: `A memória RAM, que armazena temporariamente os dados em uso pelo processador.` },
      { letter: 'B', text: `O processador, também conhecido como unidade central de processamento (CPU), que executa instruções.` },
      { letter: 'C', text: `O disco rígido, que é responsável por armazenar permanentemente os dados.` },
      { letter: 'D', text: `A placa-mãe, que conecta todos os componentes do computador.` }
    ],
    correctAnswer: 'B',
    explanation: `O processador (CPU) é o componente que executa as instruções e realiza cálculos e operações lógicas, sendo essencial para o funcionamento do computador.`,
  },
  {
    id: 1086,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde ao conceito de manutenção preventiva de microcomputadores.`,
    options: [
      { letter: 'A', text: `Realizar a formatação do disco rígido sempre que houver lentidão no sistema.` },
      { letter: 'B', text: `Substituir peças do computador apenas quando elas apresentarem falhas.` },
      { letter: 'C', text: `Executar atualizações de software e limpar os componentes hardware periodicamente para evitar problemas.` },
      { letter: 'D', text: `Inspecionar visualmente o computador somente quando houver reclamações de usuários.` }
    ],
    correctAnswer: 'C',
    explanation: `A manutenção preventiva envolve ações regulares, como atualizações de software e limpeza física, para evitar falhas e garantir o bom funcionamento do sistema.`,
  },
  {
    id: 1087,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre sistemas de armazenamento, avalie:
I. RAID é uma tecnologia que combina múltiplos discos para melhorar a performance e/ou a redundância.
II. NAS é uma solução que permite acesso a arquivos via rede, mas não oferece redundância.
III. SAN é uma rede dedicada a armazenamento de dados, proporcionando alta performance.`,
    options: [
      { letter: 'A', text: `Apenas I e II estão corretas.` },
      { letter: 'B', text: `Apenas I e III estão corretas.` },
      { letter: 'C', text: `Apenas II e III estão corretas.` },
      { letter: 'D', text: `I, II e III estão corretas.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa I e III estão corretas, pois RAID melhora performance e redundância, enquanto NAS oferece acesso a arquivos, mas não necessariamente redundância.`,
  },
  {
    id: 1088,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre o Active Directory no Windows Server, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `É um serviço de gerenciamento de diretórios para administração centralizada de usuários e recursos.` },
      { letter: 'B', text: `É um antivírus integrado ao Windows Server.` },
      { letter: 'C', text: `É um servidor web para hospedagem de sites.` },
      { letter: 'D', text: `É um sistema de arquivos exclusivo do Linux.` }
    ],
    correctAnswer: 'A',
    explanation: `O Active Directory é um serviço de diretório que permite administração centralizada de usuários, computadores, grupos e recursos em redes Windows.`,
  },
  {
    id: 1089,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `O Windows 10 possui um sistema de atualização automática que pode ser configurado nas configurações de Windows Update.` },
      { letter: 'B', text: `A versão Windows 11 é compatível com processadores de 32 bits.` },
      { letter: 'C', text: `A ferramenta de resolução de problemas do Windows pode ajudar na identificação de falhas do sistema.` },
      { letter: 'D', text: `O Windows 10 e 11 oferecem suportes para a instalação de drivers através do Gerenciador de Dispositivos.` }
    ],
    correctAnswer: 'B',
    explanation: `Windows 11 não é compatível com processadores de 32 bits, exigindo arquitetura de 64 bits para a instalação.`,
  },
  {
    id: 1090,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Associe a 2ª coluna com a 

1ª coluna sobre as versões do Windows e suas características:`,
    options: [
      { letter: 'A', text: `1 – Windows 10: A. Introduz a interface Metro e suporte a aplicativos da Windows Store.` },
      { letter: 'B', text: `1 – Windows 11: B. A primeira versão com suporte a interface de toque e novos recursos de produtividade.` },
      { letter: 'C', text: `1 – Windows 7: C. Famoso pela sua estabilidade e simplicidade.` },
      { letter: 'D', text: `1 – Windows XP: D. Introduzido como uma versão voltada para usuários domésticos.` }
    ],
    correctAnswer: 'A',
    explanation: `Windows 10 é a versão que introduz a interface Metro e suporte a aplicativos da Windows Store, enquanto Windows 11 é a que traz novos recursos de produtividade.`,
  },
  {
    id: 1091,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `[Nome] está enfrentando problemas de lentidão no Windows 10. Para solucionar esse problema, deve:`,
    options: [
      { letter: 'A', text: `Remover todos os programas instalados e reinstalar o sistema.` },
      { letter: 'B', text: `Verificar se há atualizações pendentes e executar a limpeza de disco.` },
      { letter: 'C', text: `Desabilitar todas as funções de segurança para aumentar a performance.` },
      { letter: 'D', text: `Formatar o computador imediatamente, pois isso resolverá todos os problemas.` }
    ],
    correctAnswer: 'B',
    explanation: `Verificar atualizações e realizar limpeza de disco são passos recomendados para melhorar a performance do sistema sem a necessidade de ações drásticas.`,
  },
  {
    id: 1092,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas corretamente descreve a função do Gerenciador de Tarefas no Windows?`,
    options: [
      { letter: 'A', text: `Ele permite a instalação e desinstalação de programas no sistema.` },
      { letter: 'B', text: `Ele gerencia as permissões de acesso dos usuários aos arquivos do sistema.` },
      { letter: 'C', text: `Ele exibe os processos em execução e o uso de recursos do sistema.` },
      { letter: 'D', text: `Ele controla a configuração do BIOS do computador.` }
    ],
    correctAnswer: 'C',
    explanation: `O Gerenciador de Tarefas no Windows é utilizado para visualizar e gerenciar os processos em execução, permitindo monitorar o uso de recursos do sistema.`,
  },
  {
    id: 1093,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre as GPOs (Group Policy Objects) no Windows Server, avalie:
I. Elas permitem a configuração de políticas de segurança e gerenciamento de usuários em um domínio.
II. GPOs podem ser aplicadas apenas a servidores, não a estações de trabalho.
III. A aplicação de GPOs é feita através da ferramenta de gerenciamento de usuários do Windows.`,
    options: [
      { letter: 'A', text: `Apenas I está correta.` },
      { letter: 'B', text: `Apenas II está correta.` },
      { letter: 'C', text: `Apenas I e III estão corretas.` },
      { letter: 'D', text: `I, II e III estão corretas.` }
    ],
    correctAnswer: 'A',
    explanation: `A alternativa I está correta, pois GPOs são utilizadas para configurar políticas em domínios, mas a II e III estão erradas, pois GPOs podem ser aplicadas a estações de trabalho e a aplicação é feita através do Group Policy Management Console.`,
  },
  {
    id: 1094,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas representa corretamente uma característica do VMware?`,
    options: [
      { letter: 'A', text: `O VMware permite a execução de sistemas operacionais virtualizados em uma única máquina física, aumentando a eficiência de recursos.` },
      { letter: 'B', text: `O VMware não suporta a criação de snapshots de máquinas virtuais, dificultando a recuperação de estados anteriores.` },
      { letter: 'C', text: `O VMware é uma ferramenta que apenas permite a virtualização em ambientes Linux.` },
      { letter: 'D', text: `O VMware não oferece suporte para integração com ferramentas de rede.` }
    ],
    correctAnswer: 'A',
    explanation: `O VMware é uma plataforma de virtualização que permite a execução de múltiplos sistemas operacionais sobre uma única máquina física, além de oferecer recursos como snapshots para recuperação de estados.`,
  },
  {
    id: 1095,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre o ITIL, avalie as afirmações a seguir:
I. O ITIL é um conjunto de práticas para gerenciamento de serviços de TI.
II. O ITIL se aplica apenas a empresas de grande porte.
III. O ITIL melhora a qualidade dos serviços de TI. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I está correta.` },
      { letter: 'B', text: `Apenas II e III estão corretas.` },
      { letter: 'C', text: `I e III estão corretas, enquanto II está errada.` },
      { letter: 'D', text: `Todas as afirmações estão corretas.` }
    ],
    correctAnswer: 'C',
    explanation: `A afirmação I é correta, pois o ITIL é um conjunto de práticas para gerenciamento de serviços de TI. A afirmação II está errada, pois o ITIL pode ser aplicado em empresas de todos os tamanhos. A afirmação III é correta, já que o ITIL visa melhorar a qualidade dos serviços.`,
  },
  {
    id: 1096,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde à forma de manutenção de impressoras.`,
    options: [
      { letter: 'A', text: `Impressoras a laser precisam de manutenção apenas quando apresentam falhas.` },
      { letter: 'B', text: `A limpeza regular e a substituição do toner são partes essenciais da manutenção de impressoras a jato de tinta.` },
      { letter: 'C', text: `Impressoras térmicas não necessitam de manutenção preventiva.` },
      { letter: 'D', text: `Não é necessário verificar os cabos de conexão das impressoras, pois eles não afetam o desempenho.` }
    ],
    correctAnswer: 'B',
    explanation: `A manutenção de impressoras a jato de tinta deve incluir limpeza regular e substituição do toner para evitar falhas de impressão, enquanto as outras alternativas apresentam informações incorretas.`,
  },
  {
    id: 1097,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre tecnologias de virtualização, assinale a alternativa INCORRETA:`,
    options: [
      { letter: 'A', text: `O Hyper-V é uma plataforma de virtualização desenvolvida pela Microsoft.` },
      { letter: 'B', text: `O VirtualBox suporta múltiplas plataformas, incluindo Windows e Linux.` },
      { letter: 'C', text: `A virtualização permite otimizar o uso de hardware físico.` },
      { letter: 'D', text: `VPN é um software que garante segurança apenas em redes locais domésticas.` }
    ],
    correctAnswer: 'D',
    explanation: `VPN (Virtual Private Network) não se limita a redes domésticas - é uma tecnologia que cria túneis seguros pela internet, usada em ambientes corporativos e pessoais.`,
  },
  {
    id: 1098,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª sobre conceitos de VPN:
I. Túnel seguro.
II. Criptografia.
III. Autenticação. Está correto:`,
    options: [
      { letter: 'A', text: `I - Criação de um canal seguro. II - Proteção dos dados transmitidos. III - Verificação da identidade do usuário.` },
      { letter: 'B', text: `I - Proteção dos dados transmitidos. II - Criação de um canal seguro. III - Verificação da identidade do usuário.` },
      { letter: 'C', text: `I - Verificação da identidade do usuário. II - Criação de um canal seguro. III - Proteção dos dados transmitidos.` },
      { letter: 'D', text: `I - Criação de um canal seguro. II - Verificação da identidade do usuário. III - Proteção dos dados transmitidos.` }
    ],
    correctAnswer: 'A',
    explanation: `A associação correta é: I - Criação de um canal seguro (túnel); II - Proteção dos dados transmitidos (criptografia); III - Verificação da identidade do usuário (autenticação).`,
  },
  {
    id: 1099,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Para resolver um problema de lentidão no computador de um usuário, um técnico de suporte deve:`,
    options: [
      { letter: 'A', text: `Reinstalar o sistema operacional imediatamente, sem verificar as causas.` },
      { letter: 'B', text: `Realizar uma análise inicial, verificando processos em execução e uso de recursos do sistema.` },
      { letter: 'C', text: `Ignorar as queixas do usuário, pois ele pode estar exagerando.` },
      { letter: 'D', text: `Recomendar ao usuário que compre um novo computador sem investigar.` }
    ],
    correctAnswer: 'B',
    explanation: `A abordagem correta é realizar uma análise inicial, verificando os processos em execução e o uso de recursos do sistema, antes de tomar qualquer ação mais drástica, como a reinstalação do sistema.`,
  },
  {
    id: 1100,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Todas as afirmações sobre o LibreOffice estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `O LibreOffice é um software livre e de código aberto.` },
      { letter: 'B', text: `O LibreOffice é compatível com formatos de arquivos do Microsoft Office.` },
      { letter: 'C', text: `O LibreOffice não possui suporte para colaboração em tempo real.` },
      { letter: 'D', text: `O LibreOffice pode ser instalado em diversos sistemas operacionais.` }
    ],
    correctAnswer: 'C',
    explanation: `A alternativa C é falsa, pois o LibreOffice possui funcionalidades de colaboração em tempo real em suas versões mais recentes, enquanto as outras alternativas são verdadeiras.`,
  },
  {
    id: 1101,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Assinale a alternativa que melhor define a função do Service Desk em uma organização de TI.`,
    options: [
      { letter: 'A', text: `O Service Desk é responsável por gerenciar a infraestrutura de TI, garantindo seu funcionamento.` },
      { letter: 'B', text: `O Service Desk atua como um ponto de contato centralizado para resolver problemas e atender solicitações dos usuários.` },
      { letter: 'C', text: `O Service Desk não possui interação direta com os usuários, lidando apenas com a equipe técnica.` },
      { letter: 'D', text: `O Service Desk é responsável apenas por incidentes de hardware.` }
    ],
    correctAnswer: 'B',
    explanation: `O Service Desk é um ponto de contato centralizado que ajuda a resolver problemas e atende às solicitações dos usuários, enquanto as outras alternativas não refletem adequadamente essa função.`,
  },
  {
    id: 1102,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas representa corretamente o que é virtualização?`,
    options: [
      { letter: 'A', text: `Virtualização é o processo de criar uma cópia exata do hardware físico em um software.` },
      { letter: 'B', text: `Virtualização é a execução de múltiplos sistemas operacionais em um único hardware, isolando-os um do outro.` },
      { letter: 'C', text: `Virtualização se refere apenas à criação de máquinas virtuais em servidores dedicados.` },
      { letter: 'D', text: `Virtualização é um conceito que não é aplicável a ambientes de nuvem.` }
    ],
    correctAnswer: 'B',
    explanation: `A virtualização é o processo que permite a execução de múltiplos sistemas operacionais em um único hardware, oferecendo isolamento entre eles, enquanto as outras alternativas contêm informações incorretas.`,
  },
  {
    id: 1103,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas representa corretamente o comando Linux utilizado para listar os arquivos de um diretório em ordem detalhada?`,
    options: [
      { letter: 'A', text: `O comando 'ls -l' exibe uma lista detalhada de arquivos incluindo permissões e tamanhos.` },
      { letter: 'B', text: `O comando 'dir' é utilizado para listar arquivos em sistemas baseados em Linux.` },
      { letter: 'C', text: `O comando 'list' é uma forma válida de listar arquivos em um terminal Linux.` },
      { letter: 'D', text: `O comando 'cat' serve para listar o conteúdo de um diretório.` }
    ],
    correctAnswer: 'A',
    explanation: `O comando 'ls -l' é realmente utilizado no Linux para listar arquivos de forma detalhada, mostrando permissões, proprietários e tamanhos dos arquivos.`,
  },
  {
    id: 1104,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre o modelo OSI, avalie:
I. O modelo OSI possui sete camadas.
II. A camada de aplicação é a primeira camada do modelo OSI.
III. A camada de enlace de dados é responsável por endereçar dados entre dispositivos na mesma rede. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `I e III.` },
      { letter: 'C', text: `II e III.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'B',
    explanation: `A opção I está correta, a opção II está errada pois a camada de aplicação é a sétima camada, e a III está correta pois a camada de enlace de dados atua na comunicação dentro da mesma rede.`,
  },
  {
    id: 1105,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre o protocolo SSH (Secure Shell), assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `É utilizado principalmente para acesso remoto seguro a servidores.` },
      { letter: 'B', text: `É um protocolo exclusivo para transferência de arquivos.` },
      { letter: 'C', text: `Não utiliza criptografia na comunicação.` },
      { letter: 'D', text: `Só funciona em redes locais, não pela internet.` }
    ],
    correctAnswer: 'A',
    explanation: `O SSH (Secure Shell) é um protocolo para acesso remoto seguro. Para transferência de arquivos, utiliza-se SFTP ou SCP, que são protocolos baseados no SSH.`,
  },
  {
    id: 1106,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde a uma categoria de cabeamento estruturado comumente utilizada em redes locais.`,
    options: [
      { letter: 'A', text: `Cabeamento de categoria 5e suporta até 1 Gbps em distâncias de até 100 metros.` },
      { letter: 'B', text: `Cabeamento de fibra óptica não é adequado para longas distâncias.` },
      { letter: 'C', text: `Cabeamento de categoria 3 é ideal para redes de alta velocidade.` },
      { letter: 'D', text: `Cabeamento coaxial é o único tipo de cabeamento utilizado em redes Ethernet.` }
    ],
    correctAnswer: 'A',
    explanation: `O cabeamento de categoria 5e é amplamente utilizado e suporta até 1 Gbps, tornando-se adequado para a maioria das redes locais.`,
  },
  {
    id: 1107,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Todas as afirmações estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `O firewall pode ser hardware ou software e visa proteger a rede contra acessos não autorizados.` },
      { letter: 'B', text: `Antivírus é uma ferramenta essencial para a prevenção de ataques de phishing e malware.` },
      { letter: 'C', text: `Backup deve ser realizado periodicamente para garantir a recuperação de dados em caso de perda.` },
      { letter: 'D', text: `Criptografia é utilizada apenas para proteger a integridade de dados em trânsito.` }
    ],
    correctAnswer: 'D',
    explanation: `Embora a criptografia proteja a integridade de dados em trânsito, também é utilizada para proteger a confidencialidade de dados armazenados.`,
  },
  {
    id: 1108,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª:
I. DNS
II. DHCP
III. FTP A. Protocolo de transferência de arquivos. B. Protocolo que atribui endereços IP dinamicamente. C. Protocolo de resolução de nomes.`,
    options: [
      { letter: 'A', text: `I-A, II-B, III-C.` },
      { letter: 'B', text: `I-C, II-A, III-B.` },
      { letter: 'C', text: `I-B, II-C, III-A.` },
      { letter: 'D', text: `I-C, II-B, III-A.` }
    ],
    correctAnswer: 'D',
    explanation: `DNS resolve nomes de domínio (I-C), DHCP atribui endereços IP dinamicamente (II-B) e FTP é o protocolo de transferência de arquivos (III-A).`,
  },
  {
    id: 1109,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `[João] está configurando um servidor web e deseja garantir que todos os dados transmitidos sejam seguros. Para isso, ele deve:`,
    options: [
      { letter: 'A', text: `Utilizar o protocolo HTTP, que é mais simples e comum.` },
      { letter: 'B', text: `Implementar o protocolo HTTPS para garantir a criptografia dos dados transmitidos.` },
      { letter: 'C', text: `Configurar um firewall apenas, sem se preocupar com o protocolo.` },
      { letter: 'D', text: `Utilizar FTP para transferências seguras de arquivos.` }
    ],
    correctAnswer: 'B',
    explanation: `O protocolo HTTPS é a versão segura do HTTP, garantindo que os dados transmitidos entre o servidor e o cliente sejam criptografados.`,
  },
  {
    id: 1110,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas melhor descreve a função do comando 'chmod' no Linux?`,
    options: [
      { letter: 'A', text: `O comando 'chmod' é utilizado para mudar o proprietário de um arquivo.` },
      { letter: 'B', text: `O comando 'chmod' altera as permissões de acesso a arquivos e diretórios.` },
      { letter: 'C', text: `O comando 'chmod' serve para copiar arquivos de um diretório para outro.` },
      { letter: 'D', text: `O comando 'chmod' é usado para visualizar o conteúdo de arquivos.` }
    ],
    correctAnswer: 'B',
    explanation: `'chmod' significa 'change mode' e é utilizado para alterar as permissões de acesso a arquivos e diretórios no sistema Linux.`,
  },
  {
    id: 1111,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre endereçamento IP e sub-redes, avalie:
I. O endereço IP é composto por 32 bits em sua versão 4.
II. Cada sub-rede pode ter um número variável de hosts, dependendo do tamanho da máscara de sub-rede.
III. O endereço IP é utilizado apenas para identificar dispositivos em redes locais. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `I e II.` },
      { letter: 'C', text: `II e III.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'B',
    explanation: `As afirmações I e II estão corretas, enquanto a III está errada, pois o endereço IP é utilizado tanto em redes locais quanto em redes globais.`,
  },
  {
    id: 1112,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas representa corretamente a função da memória RAM em um computador?`,
    options: [
      { letter: 'A', text: `A memória RAM armazena permanentemente os dados, mesmo quando o computador é desligado.` },
      { letter: 'B', text: `A memória RAM é responsável por armazenar temporariamente os dados e programas em uso pelo processador.` },
      { letter: 'C', text: `A memória RAM é utilizada apenas para armazenar o sistema operacional do computador.` },
      { letter: 'D', text: `A memória RAM atua como um dispositivo de armazenamento externo, como um HD.` }
    ],
    correctAnswer: 'B',
    explanation: `A memória RAM (Random Access Memory) é um tipo de memória volátil que armazena temporariamente os dados e programas que estão em uso pelo processador, permitindo acesso rápido a essas informações.`,
  },
  {
    id: 1113,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde à definição de RAID.`,
    options: [
      { letter: 'A', text: `RAID é uma técnica de segurança que protege os dados contra vírus.` },
      { letter: 'B', text: `RAID é um método de combinação de múltiplos discos rígidos para melhorar desempenho e/ou segurança dos dados.` },
      { letter: 'C', text: `RAID é um software que gerencia a instalação do sistema operacional em um único disco.` },
      { letter: 'D', text: `RAID é uma configuração de rede que permite a impressão compartilhada entre vários computadores.` }
    ],
    correctAnswer: 'B',
    explanation: `RAID (Redundant Array of Independent Disks) é uma tecnologia que combina múltiplos discos para melhorar a performance ou a segurança dos dados, permitindo, por exemplo, a recuperação de informações em caso de falhas.`,
  },
  {
    id: 1114,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre a manutenção de microcomputadores, avalie:
I. A manutenção preventiva deve ser realizada periodicamente para evitar falhas.
II. A manutenção corretiva é feita após a falha do equipamento.
III. A manutenção preventiva é mais cara que a corretiva. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas II e III.` },
      { letter: 'C', text: `Apenas I.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'A',
    explanation: `A manutenção preventiva deve ser realizada para evitar falhas (I) e a manutenção corretiva é feita após a falha (II). A afirmativa III é falsa, pois a manutenção preventiva normalmente é menos custosa que a corretiva, já que evita problemas maiores.`,
  },
  {
    id: 1115,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre o Windows Server, assinale a alternativa INCORRETA:`,
    options: [
      { letter: 'A', text: `Pode atuar como controlador de domínio em uma rede corporativa.` },
      { letter: 'B', text: `Não suporta Active Directory para gerenciamento de usuários.` },
      { letter: 'C', text: `Permite o uso de GPOs para controle de configurações de segurança.` },
      { letter: 'D', text: `Pode hospedar serviços como DNS, DHCP e arquivos.` }
    ],
    correctAnswer: 'B',
    explanation: `O Windows Server SUPORTA Active Directory - essa é uma de suas principais funcionalidades para gerenciamento centralizado de usuários e recursos.`,
  },
  {
    id: 1116,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `O RAID 0 oferece desempenho superior, mas não fornece proteção contra perda de dados.` },
      { letter: 'B', text: `Um NAS (Network Attached Storage) é um dispositivo de armazenamento que conecta-se à rede para compartilhamento de arquivos.` },
      { letter: 'C', text: `A SAN (Storage Area Network) é uma rede dedicada exclusivamente a dispositivos de armazenamento.` },
      { letter: 'D', text: `O RAID 1 utiliza a técnica de striping para aumentar a velocidade de leitura e gravação.` }
    ],
    correctAnswer: 'D',
    explanation: `A alternativa D é incorreta, pois o RAID 1 utiliza a técnica de espelhamento (mirroring) para garantir a redundância dos dados, e não striping, que é característico do RAID 0.`,
  },
  {
    id: 1117,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª conforme a relação de funções de cada componente do hardware:`,
    options: [
      { letter: 'A', text: `1 - Processador, 2 - Execução de instruções.` },
      { letter: 'B', text: `1 - Memória RAM, 2 - Armazenamento permanente.` },
      { letter: 'C', text: `1 - Placa-mãe, 2 - Conexão de dispositivos.` },
      { letter: 'D', text: `1 - Disco rígido, 2 - Processamento de dados.` }
    ],
    correctAnswer: 'A',
    explanation: `A alternativa A associa corretamente o processador à sua função de execução de instruções, enquanto as demais alternativas apresentam associações erradas entre componentes e suas funções.`,
  },
  {
    id: 1118,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `[Maria] está com um computador que não inicia o sistema operacional. Para resolver este problema, deve:`,
    options: [
      { letter: 'A', text: `Verificar se a fonte de energia está funcionando corretamente.` },
      { letter: 'B', text: `Trocar o disco rígido imediatamente.` },
      { letter: 'C', text: `Desinstalar todas as impressoras conectadas ao computador.` },
      { letter: 'D', text: `Reinstalar o sistema operacional sem verificar outras causas.` }
    ],
    correctAnswer: 'A',
    explanation: `Antes de tomar ações mais drásticas, Maria deve verificar a fonte de energia, pois ela pode ser a causa do computador não iniciar. A troca do disco rígido e a reinstalação do sistema devem ser consideradas apenas após a identificação de problemas básicos.`,
  },
  {
    id: 1119,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das seguintes afirmativas sobre o Windows 10/11 é verdadeira?`,
    options: [
      { letter: 'A', text: `O Windows 10/11 não permite a instalação de software de terceiros.` },
      { letter: 'B', text: `O Windows 10/11 pode ser configurado para receber atualizações automáticas.` },
      { letter: 'C', text: `O Windows 10/11 não possui suporte para bitlocker.` },
      { letter: 'D', text: `O Windows 10/11 exige hardware específico que não é compatível com a maioria dos PCs.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B é verdadeira, pois o Windows 10/11 permite que o usuário configure as atualizações para serem feitas automaticamente, garantindo que o sistema esteja sempre atualizado com as últimas correções e recursos.`,
  },
  {
    id: 1120,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Marque a alternativa CORRETA sobre o Active Directory no Windows Server.`,
    options: [
      { letter: 'A', text: `O Active Directory não é utilizado para gerenciar autenticação de usuários.` },
      { letter: 'B', text: `O Active Directory permite a organização de recursos em uma estrutura hierárquica.` },
      { letter: 'C', text: `O Active Directory só é utilizado em redes pequenas, não em grandes corporações.` },
      { letter: 'D', text: `O Active Directory exige que todos os dispositivos da rede tenham o Windows 10.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B é correta, pois o Active Directory organiza os recursos de uma rede em uma estrutura hierárquica, facilitando a gestão de usuários e recursos em diferentes ambientes corporativos.`,
  },
  {
    id: 1121,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas representa corretamente o conceito de virtualização?`,
    options: [
      { letter: 'A', text: `Virtualização é a criação de cópias físicas de um sistema operacional.` },
      { letter: 'B', text: `Virtualização permite que múltiplos sistemas operacionais compartilhem o mesmo hardware, isolando cada um deles.` },
      { letter: 'C', text: `A virtualização é uma técnica que apenas melhora o desempenho de servidores físicos.` },
      { letter: 'D', text: `Virtualização é a prática de armazenar dados em servidores externos.` }
    ],
    correctAnswer: 'B',
    explanation: `A virtualização permite que múltiplos sistemas operacionais compartilhem o mesmo hardware, isolando-os e melhorando a utilização dos recursos.`,
  },
  {
    id: 1122,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde às funções do help desk.`,
    options: [
      { letter: 'A', text: `O help desk é responsável apenas pela manutenção de hardware.` },
      { letter: 'B', text: `O help desk tem como função principal atender e resolver problemas de usuários de forma remota ou presencial.` },
      { letter: 'C', text: `O help desk realiza apenas a instalação de softwares e não fornece suporte pós-instalação.` },
      { letter: 'D', text: `As funções do help desk se limitam ao fornecimento de informações sobre produtos.` }
    ],
    correctAnswer: 'B',
    explanation: `O help desk é responsável por atender e resolver problemas dos usuários, oferecendo suporte remoto e presencial, além de orientar sobre o uso dos sistemas.`,
  },
  {
    id: 1123,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre os tipos de VPN, avalie:
I. VPN de acesso remoto permite que usuários se conectem à rede corporativa de locais externos.
II. VPN site-to-site conecta duas redes separadas pela Internet.
III. VPN não oferece segurança nas transmissões de dados. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas III.` },
      { letter: 'C', text: `Apenas II.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'A',
    explanation: `As afirmações I e II estão corretas, enquanto a III é falsa, pois a VPN proporciona segurança nos dados transmitidos através da criptografia.`,
  },
  {
    id: 1124,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre plataformas de virtualização, assinale a alternativa INCORRETA:`,
    options: [
      { letter: 'A', text: `VMware é amplamente utilizado em ambientes corporativos.` },
      { letter: 'B', text: `Hyper-V é a solução de virtualização da Microsoft.` },
      { letter: 'C', text: `VirtualBox é destinado exclusivamente para servidores.` },
      { letter: 'D', text: `Todas as plataformas permitem criar máquinas virtuais.` }
    ],
    correctAnswer: 'C',
    explanation: `VirtualBox é um software de virtualização para desktops, não exclusivamente para servidores. É gratuito e roda em Windows, Linux e macOS.`,
  },
  {
    id: 1125,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `O Microsoft Word permite a edição de documentos de texto com formatação avançada.` },
      { letter: 'B', text: `O LibreOffice Calc é um editor de texto semelhante ao Microsoft Word.` },
      { letter: 'C', text: `Ambos os pacotes, Microsoft Office e LibreOffice, têm ferramentas para criação de apresentações.` },
      { letter: 'D', text: `Ambos os softwares oferecem funcionalidades de planilhas eletrônicas.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B é incorreta, pois o LibreOffice Calc é um software de planilha, não um editor de texto.`,
  },
  {
    id: 1126,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª, relacionando os tipos de impressoras com suas características. 1. Impressora a jato de tinta 2. Impressora a laser 3. Impressora matricial. A. Gera impressão de alta qualidade para fotos. B. Utiliza toner e é mais rápida em impressões em grandes volumes. C. É utilizada principalmente para impressão de formulários e documentos simples.`,
    options: [
      { letter: 'A', text: `1 - A, 2 - B, 3 - C.` },
      { letter: 'B', text: `1 - B, 2 - A, 3 - C.` },
      { letter: 'C', text: `1 - A, 2 - C, 3 - B.` },
      { letter: 'D', text: `1 - C, 2 - A, 3 - B.` }
    ],
    correctAnswer: 'A',
    explanation: `As associações estão corretas: Impressora a jato de tinta gera alta qualidade para fotos, impressora a laser é rápida e ideal para grandes volumes, e impressora matricial é usada para documentos simples.`,
  },
  {
    id: 1127,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `[Nome] está configurando uma máquina virtual no VirtualBox. Para que a máquina virtual tenha acesso à internet, deve:`,
    options: [
      { letter: 'A', text: `Desativar a placa de rede da máquina virtual.` },
      { letter: 'B', text: `Configurar a placa de rede da máquina virtual para o modo 'NAT'.` },
      { letter: 'C', text: `Conectar a máquina virtual diretamente ao modem.` },
      { letter: 'D', text: `Utilizar um cabo Ethernet entre a máquina virtual e o roteador.` }
    ],
    correctAnswer: 'B',
    explanation: `Configurar a placa de rede da máquina virtual para o modo 'NAT' permite que ela acesse a internet utilizando a conexão da máquina host.`,
  },
  {
    id: 1128,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Marque a alternativa CORRETA que descreve a função de um service desk.`,
    options: [
      { letter: 'A', text: `O service desk é responsável apenas por questões de hardware, deixando software para o help desk.` },
      { letter: 'B', text: `O service desk atua como um ponto único de contato entre os usuários e o suporte de TI, abrangendo hardware, software e serviços.` },
      { letter: 'C', text: `O service desk fornece suporte apenas para problemas técnicos complexos.` },
      { letter: 'D', text: `O service desk é um serviço que não necessita de documentação detalhada dos atendimentos.` }
    ],
    correctAnswer: 'B',
    explanation: `O service desk é um ponto único de contato que lida com todas as solicitações de suporte, englobando hardware, software e serviços.`,
  },
  {
    id: 1129,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre o conceito de ITIL, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `É um conjunto de boas práticas para gestão de serviços de TI, alinhando tecnologia às necessidades do negócio.` },
      { letter: 'B', text: `É um software específico de gestão de projetos.` },
      { letter: 'C', text: `É aplicado apenas em empresas de grande porte.` },
      { letter: 'D', text: `É uma linguagem de programação para automação.` }
    ],
    correctAnswer: 'A',
    explanation: `ITIL (Information Technology Infrastructure Library) é um framework de boas práticas para gestão de serviços de TI, aplicável a empresas de qualquer porte.`,
  },
  {
    id: 1130,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre a instalação e configuração de impressoras, avalie:
I. Impressoras a jato de tinta geralmente requerem mais manutenção que impressoras a laser.
II. É sempre necessário instalar drivers específicos para que a impressora funcione corretamente.
III. Impressoras matriciais são mais silenciosas que impressoras a laser. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II e III.` },
      { letter: 'C', text: `I e II.` },
      { letter: 'D', text: `Apenas III.` }
    ],
    correctAnswer: 'C',
    explanation: `As afirmações I e II estão corretas; a III é falsa, pois impressoras matriciais são conhecidas por serem barulhentas em comparação às a laser.`,
  },
  {
    id: 1131,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas representa corretamente um comando para verificar o espaço em disco disponível no Linux?`,
    options: [
      { letter: 'A', text: `O comando df -h exibe o uso do espaço em disco de forma legível.` },
      { letter: 'B', text: `O comando ls -l mostra o espaço em disco disponível em formato detalhado.` },
      { letter: 'C', text: `O comando du -s lista os arquivos presentes com seu tamanho total.` },
      { letter: 'D', text: `O comando free -m apresenta a memória utilizada, mas não o espaço em disco.` }
    ],
    correctAnswer: 'A',
    explanation: `O comando 'df -h' é utilizado no Linux para mostrar o espaço em disco disponível de forma legível, enquanto os outros comandos não realizam essa função.`,
  },
  {
    id: 1132,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde ao modelo OSI e suas camadas.`,
    options: [
      { letter: 'A', text: `A camada de Aplicação é a camada mais baixa do modelo OSI.` },
      { letter: 'B', text: `A camada de Transporte é responsável pela entrega confiável de pacotes.` },
      { letter: 'C', text: `A camada de Rede é responsável pela interface com o usuário final.` },
      { letter: 'D', text: `A camada de Física lida com o endereçamento lógico dos pacotes.` }
    ],
    correctAnswer: 'B',
    explanation: `A camada de Transporte, que é a quarta camada do modelo OSI, realmente é responsável pela entrega confiável de pacotes, enquanto as outras alternativas estão incorretas.`,
  },
  {
    id: 1133,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre endereçamento IP, avalie:
I. Um endereço IPv4 é composto por 32 bits.
II. O endereço 192.168.1.1 é um endereço de rede pública.
III. A classe A de endereços IP suporta até 16 milhões de hosts por rede. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `Apenas III.` },
      { letter: 'D', text: `Apenas I e III.` }
    ],
    correctAnswer: 'D',
    explanation: `A afirmação I está correta, pois um endereço IPv4 tem 32 bits, e a afirmação III também está correta, pois a classe A suporta até 16 milhões de hosts. A afirmação II está incorreta, pois 192.168.1.1 é um endereço de rede privada.`,
  },
  {
    id: 1134,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre o protocolo DHCP, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `É utilizado para atribuição dinâmica de endereços IP a dispositivos em uma rede.` },
      { letter: 'B', text: `É um protocolo exclusivo para transferência de arquivos.` },
      { letter: 'C', text: `Atribui endereços IP de forma permanente aos dispositivos.` },
      { letter: 'D', text: `É usado apenas em redes sem fio.` }
    ],
    correctAnswer: 'A',
    explanation: `O DHCP (Dynamic Host Configuration Protocol) atribui automaticamente endereços IP, máscara de sub-rede, gateway e DNS aos dispositivos de uma rede.`,
  },
  {
    id: 1135,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `O firewall é uma barreira de segurança que controla o tráfego de entrada e saída.` },
      { letter: 'B', text: `Um antivírus é uma ferramenta que remove apenas vírus, mas não protege contra outros malwares.` },
      { letter: 'C', text: `O backup é uma cópia de segurança dos dados que pode ser feita em diferentes mídias.` },
      { letter: 'D', text: `A criptografia é um método de proteger informações transformando-as em um formato ilegível.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B é a única incorreta, pois um antivírus protege contra diversos tipos de malwares, não apenas vírus.`,
  },
  {
    id: 1136,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª referente aos tipos de cabeamento estruturado:`,
    options: [
      { letter: 'A', text: `Categoria 5e - Conector RJ-45` },
      { letter: 'B', text: `Categoria 6 - Fibra óptica` },
      { letter: 'C', text: `Categoria 3 - Conector BNC` },
      { letter: 'D', text: `Categoria 7 - Conector LC` }
    ],
    correctAnswer: 'A',
    explanation: `A Categoria 5e utiliza o conector RJ-45. As demais associações estão incorretas, pois a Categoria 6 também utiliza RJ-45 e não fibras ópticas, a Categoria 3 é utilizada para telefonia e o conector BNC, e a Categoria 7 utiliza conectores GG45 ou TERA.`,
  },
  {
    id: 1137,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `[Carlos] está configurando um firewall para proteger a rede de sua empresa. Para garantir que somente o tráfego autorizado possa entrar e sair, ele deve:`,
    options: [
      { letter: 'A', text: `Definir regras de permissões que especifiquem quais protocolos e portas podem ser utilizados.` },
      { letter: 'B', text: `Desativar todas as portas de entrada e saída para evitar qualquer tipo de acesso.` },
      { letter: 'C', text: `Permitir todo o tráfego e monitorar posteriormente qualquer atividade suspeita.` },
      { letter: 'D', text: `Focar apenas na proteção contra vírus, pois o firewall não é suficiente para segurança.` }
    ],
    correctAnswer: 'A',
    explanation: `Para proteger a rede, Carlos deve definir regras de permissões específicas no firewall, que determinem quais protocolos e portas são permitidos, garantindo assim a filtragem do tráfego.`,
  },
  {
    id: 1138,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual dos comandos abaixo é utilizado para instalar um pacote no sistema Linux usando o gerenciador APT?`,
    options: [
      { letter: 'A', text: `apt-get remove [pacote] desinstala um pacote do sistema.` },
      { letter: 'B', text: `apt-get update atualiza a lista de pacotes disponíveis.` },
      { letter: 'C', text: `apt-get install [pacote] instala um pacote do repositório.` },
      { letter: 'D', text: `apt-get search [pacote] busca por pacotes disponíveis.` }
    ],
    correctAnswer: 'C',
    explanation: `O comando 'apt-get install [pacote]' é o utilizado para instalar pacotes no sistema Linux quando se usa o gerenciador APT, enquanto os outros comandos têm funções diferentes.`,
  },
  {
    id: 1139,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre o protocolo HTTPS, avalie as afirmativas:
I. O HTTPS é a versão segura do HTTP.
II. O HTTPS utiliza criptografia para proteger dados transmitidos.
III. O HTTPS é utilizado apenas em redes locais. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `Apenas I e II.` },
      { letter: 'D', text: `Apenas III.` }
    ],
    correctAnswer: 'C',
    explanation: `As afirmações I e II estão corretas, pois o HTTPS é a versão segura do HTTP e utiliza criptografia. A afirmação III está incorreta, uma vez que o HTTPS é utilizado na internet em geral, não apenas em redes locais.`,
  },
  {
    id: 1140,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas representa corretamente uma função do servidor Windows Server?`,
    options: [
      { letter: 'A', text: `Gerenciar as configurações de rede e os dispositivos conectados.` },
      { letter: 'B', text: `Armazenar e gerenciar dados localmente, sem conexão com a rede.` },
      { letter: 'C', text: `Controlar o acesso a recursos da rede através do Active Directory.` },
      { letter: 'D', text: `Executar apenas aplicações de escritório, como editores de texto.` }
    ],
    correctAnswer: 'C',
    explanation: `O Active Directory é uma ferramenta que permite ao Windows Server controlar o acesso a recursos na rede, gerenciando usuários e grupos.`,
  },
  {
    id: 1141,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde à manutenção preventiva de microcomputadores.`,
    options: [
      { letter: 'A', text: `Realizar formatação do disco rígido a cada três meses.` },
      { letter: 'B', text: `Desfragmentar o disco rígido periodicamente para melhorar o desempenho.` },
      { letter: 'C', text: `Instalar novos aplicativos para garantir que o sistema esteja sempre atualizado.` },
      { letter: 'D', text: `Substituir o hardware por novos modelos sempre que possível.` }
    ],
    correctAnswer: 'B',
    explanation: `Desfragmentar o disco rígido é uma prática de manutenção preventiva que ajuda a melhorar o desempenho do sistema, organizando os dados de forma mais eficiente.`,
  },
  {
    id: 1142,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre sistemas de armazenamento, avalie:
I. RAID é uma técnica que combina múltiplos discos para melhorar desempenho e/ou segurança.
II. NAS é uma solução de armazenamento que permite acesso via rede e é adequada para ambientes de colaboração.
III. SAN é uma tecnologia que permite acesso a dispositivos de armazenamento de forma direta e não possui relação com redes. Está correto:`,
    options: [
      { letter: 'A', text: `Somente I e II.` },
      { letter: 'B', text: `Somente III.` },
      { letter: 'C', text: `Somente I.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'A',
    explanation: `As afirmações I e II estão corretas, enquanto a III é incorreta, pois SAN é uma tecnologia que de fato utiliza redes para conectar servidores e dispositivos de armazenamento.`,
  },
  {
    id: 1143,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual componente é o principal responsável por ARMAZENAR dados em um computador?`,
    options: [
      { letter: 'A', text: `Processador (CPU).` },
      { letter: 'B', text: `Disco rígido (HD) ou SSD.` },
      { letter: 'C', text: `Placa de vídeo.` },
      { letter: 'D', text: `Fonte de alimentação.` }
    ],
    correctAnswer: 'B',
    explanation: `O disco rígido (HD) ou SSD é o componente responsável por armazenar dados permanentemente. O processador executa cálculos e operações, não armazena dados.`,
  },
  {
    id: 1144,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `O Windows 10 permite a instalação de aplicativos via Microsoft Store.` },
      { letter: 'B', text: `O Windows Server não oferece suporte a Active Directory.` },
      { letter: 'C', text: `O Windows 11 possui requisitos de hardware mais altos que o Windows 10.` },
      { letter: 'D', text: `O Windows 10 tem um modo de segurança para solução de problemas.` }
    ],
    correctAnswer: 'B',
    explanation: `O Windows Server oferece suporte ao Active Directory, portanto, a alternativa B é a única que não está correta.`,
  },
  {
    id: 1145,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª conforme as funções dos componentes de um computador:
I. CPU
II. Memória RAM
III. Disco Rígido. A. Armazenar dados permanentemente B. Executar instruções de programas C. Armazenar dados temporariamente.`,
    options: [
      { letter: 'A', text: `I-B, II-C, III-A.` },
      { letter: 'B', text: `I-C, II-B, III-A.` },
      { letter: 'C', text: `I-A, II-B, III-C.` },
      { letter: 'D', text: `I-C, II-A, III-B.` }
    ],
    correctAnswer: 'A',
    explanation: `A associação correta é: CPU executa instruções (II-B), Memória RAM armazena dados temporariamente (III-C) e Disco Rígido armazena dados permanentemente (I-A).`,
  },
  {
    id: 1146,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `[Nome] está enfrentando lentidão no seu computador com Windows 10. Para resolver o problema, deve:`,
    options: [
      { letter: 'A', text: `Reinstalar o sistema operacional imediatamente.` },
      { letter: 'B', text: `Verificar a presença de aplicativos em segundo plano consumindo recursos.` },
      { letter: 'C', text: `Desconectar todos os dispositivos USB do computador.` },
      { letter: 'D', text: `Aumentar a capacidade da memória RAM sem verificar a causa da lentidão.` }
    ],
    correctAnswer: 'B',
    explanation: `Verificar aplicativos em segundo plano é uma abordagem correta para identificar e resolver problemas de lentidão antes de considerar reinstalações ou upgrades de hardware.`,
  },
  {
    id: 1147,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas representa corretamente um recurso do Active Directory no Windows Server?`,
    options: [
      { letter: 'A', text: `Permitir que usuários acessem a internet sem autenticação.` },
      { letter: 'B', text: `Gerenciar permissões de acesso a recursos de rede de forma centralizada.` },
      { letter: 'C', text: `Controlar o desempenho da CPU dos servidores.` },
      { letter: 'D', text: `Substituir o sistema operacional de um servidor por outro.` }
    ],
    correctAnswer: 'B',
    explanation: `O Active Directory permite gerenciar permissões de acesso a recursos de rede de forma centralizada, o que é uma de suas principais funções.`,
  },
  {
    id: 1148,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre RAID, avalie:
I. RAID 0 oferece redundância de dados.
II. RAID 1 realiza espelhamento de dados.
III. RAID 5 combina distribuição de dados e paridade. Está correto:`,
    options: [
      { letter: 'A', text: `Somente I.` },
      { letter: 'B', text: `Somente II e III.` },
      { letter: 'C', text: `Somente III.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'B',
    explanation: `A afirmação I é falsa, pois RAID 0 não oferece redundância; já RAID 1 e RAID 5 estão corretos, pois RAID 1 realiza espelhamento e RAID 5 combina paridade.`,
  },
  {
    id: 1149,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas representa corretamente o conceito de virtualização em ambientes de TI?`,
    options: [
      { letter: 'A', text: `Virtualização é a prática de criar múltiplas instâncias de hardware físico em um único servidor.` },
      { letter: 'B', text: `Virtualização permite que vários sistemas operacionais sejam executados em um único hardware físico, aumentando a eficiência dos recursos.` },
      { letter: 'C', text: `Virtualização é a técnica de dividir um disco rígido em várias partições.` },
      { letter: 'D', text: `Virtualização se refere à instalação de softwares apenas em máquinas físicas.` }
    ],
    correctAnswer: 'B',
    explanation: `A virtualização é uma técnica que permite que múltiplos sistemas operacionais sejam executados simultaneamente em um único hardware físico, otimizando a utilização de recursos.`,
  },
  {
    id: 1150,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre o ITIL (Information Technology Infrastructure Library), assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `É um conjunto de boas práticas para gestão de serviços de TI, amplamente adotado mundialmente.` },
      { letter: 'B', text: `É uma linguagem de programação para desenvolvimento de sistemas.` },
      { letter: 'C', text: `É um sistema operacional voltado para servidores.` },
      { letter: 'D', text: `É um protocolo de comunicação de redes.` }
    ],
    correctAnswer: 'A',
    explanation: `ITIL (Information Technology Infrastructure Library) é um conjunto de boas práticas para a gestão de serviços de TI, sendo um framework amplamente adotado.`,
  },
  {
    id: 1151,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre o suporte ao usuário, avalie as afirmações:
I. O help desk é focado em resolver problemas técnicos.
II. O service desk envolve um atendimento mais amplo e estratégico.
III. Não há diferença entre help desk e service desk. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II estão corretas.` },
      { letter: 'B', text: `Apenas II está correta.` },
      { letter: 'C', text: `Todas estão corretas.` },
      { letter: 'D', text: `Apenas III está correta.` }
    ],
    correctAnswer: 'A',
    explanation: `As afirmações I e II estão corretas, pois o help desk é voltado para suporte técnico e o service desk para um atendimento mais abrangente. A afirmação III é falsa.`,
  },
  {
    id: 1152,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde à função de uma VPN (Virtual Private Network):`,
    options: [
      { letter: 'A', text: `VPN é uma tecnologia que permite o acesso à internet sem a necessidade de utilização de um servidor proxy.` },
      { letter: 'B', text: `VPN é utilizada para criar uma conexão segura entre diferentes redes através da internet.` },
      { letter: 'C', text: `VPN é um software que acelera a conexão de internet de um usuário.` },
      { letter: 'D', text: `VPN é uma ferramenta que permite o compartilhamento de arquivos somente em redes locais.` }
    ],
    correctAnswer: 'B',
    explanation: `A VPN cria um túnel seguro que permite a comunicação segura entre redes diferentes, garantindo a privacidade dos dados transmitidos.`,
  },
  {
    id: 1153,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Todas as alternativas estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `O VMware é um software de virtualização amplamente utilizado em data centers.` },
      { letter: 'B', text: `O Hyper-V é uma solução de virtualização da Microsoft.` },
      { letter: 'C', text: `O VirtualBox permite a virtualização em sistemas operacionais de código aberto.` },
      { letter: 'D', text: `Todos os softwares de virtualização são compatíveis com qualquer sistema operacional.` }
    ],
    correctAnswer: 'D',
    explanation: `A alternativa D está incorreta, pois cada software de virtualização tem suas compatibilidades específicas com diferentes sistemas operacionais.`,
  },
  {
    id: 1154,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Associe a 2ª coluna com a 

1ª coluna sobre ferramentas de escritório:`,
    options: [
      { letter: 'A', text: `1 - Microsoft Word: A. Planilha eletrônica` },
      { letter: 'B', text: `2 - Excel: B. Processador de texto` },
      { letter: 'C', text: `3 - LibreOffice Writer: C. Alternativa livre a Word` },
      { letter: 'D', text: `4 - LibreOffice Calc: D. Alternativa livre a Excel` }
    ],
    correctAnswer: 'A',
    explanation: `As associações corretas são: 1-B, 2-A, 3-C e 4-D. O Microsoft Word é um processador de texto, o Excel é uma planilha eletrônica, e o LibreOffice Writer e Calc são as alternativas livres a essas ferramentas.`,
  },
  {
    id: 1155,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `[Nome] está enfrentando problemas com sua impressora que não está reconhecendo o computador. Para resolver essa questão, deve:`,
    options: [
      { letter: 'A', text: `Desinstalar e instalar novamente o driver da impressora.` },
      { letter: 'B', text: `Verificar se a impressora está conectada corretamente e ligada.` },
      { letter: 'C', text: `Trocar a impressora por outra para testar.` },
      { letter: 'D', text: `Configurar a impressora como padrão sem verificar a conexão.` }
    ],
    correctAnswer: 'B',
    explanation: `A primeira ação recomendada ao enfrentar problemas de reconhecimento de impressora é verificar a conexão e se a impressora está ligada.`,
  },
  {
    id: 1156,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre o LibreOffice, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `É uma suíte de escritório de código aberto com funcionalidades semelhantes ao Microsoft Office.` },
      { letter: 'B', text: `É um software proprietário que requer licença paga.` },
      { letter: 'C', text: `Não possui editor de texto, apenas planilhas.` },
      { letter: 'D', text: `Só funciona em sistemas operacionais Linux.` }
    ],
    correctAnswer: 'A',
    explanation: `O LibreOffice é uma suíte de escritório de código aberto e gratuita, oferecendo Writer (texto), Calc (planilhas), Impress (apresentações) e outros, compatível com Windows, Linux e macOS.`,
  },
  {
    id: 1157,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas a seguir descreve uma das principais vantagens da utilização de máquinas virtuais em ambientes corporativos?`,
    options: [
      { letter: 'A', text: `Permite a execução de apenas um sistema operacional por máquina física.` },
      { letter: 'B', text: `Reduz a necessidade de hardware físico, economizando espaço e recursos.` },
      { letter: 'C', text: `Aumenta a complexidade da gestão de servidores.` },
      { letter: 'D', text: `Garante que cada máquina virtual tenha acesso irrestrito aos recursos da máquina física.` }
    ],
    correctAnswer: 'B',
    explanation: `A utilização de máquinas virtuais permite a otimização dos recursos, reduzindo a necessidade de hardware físico e economizando espaço em datacenters.`,
  },
  {
    id: 1158,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas representa corretamente o modelo de referência OSI e suas camadas?`,
    options: [
      { letter: 'A', text: `O modelo OSI possui sete camadas, que incluem Aplicação, Transporte e Rede.` },
      { letter: 'B', text: `O modelo OSI é composto por cinco camadas, sendo a primeira a Física e a última a Aplicação.` },
      { letter: 'C', text: `No modelo OSI, as camadas de Sessão e Apresentação são a terceira e quarta, respectivamente.` },
      { letter: 'D', text: `O modelo OSI contempla uma única camada para todas as operações de rede, limitando-se à Aplicação.` }
    ],
    correctAnswer: 'A',
    explanation: `O modelo OSI é de fato composto por sete camadas, e inclui as camadas de Aplicação, Transporte e Rede, entre outras.`,
  },
  {
    id: 1159,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde ao protocolo DHCP.`,
    options: [
      { letter: 'A', text: `O protocolo DHCP é utilizado para atribuir endereços IP dinâmicos a dispositivos em uma rede.` },
      { letter: 'B', text: `O DHCP opera apenas em redes sem fio e não pode ser utilizado em redes com fio.` },
      { letter: 'C', text: `O protocolo DHCP requer configuração manual de endereços IP em cada dispositivo.` },
      { letter: 'D', text: `O DHCP é um protocolo de segurança para proteger redes contra intrusos.` }
    ],
    correctAnswer: 'A',
    explanation: `O protocolo DHCP é realmente utilizado para atribuir endereços IP dinâmicos, facilitando a gestão de redes.`,
  },
  {
    id: 1160,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre gerenciamento de pacotes no Linux, avalie:
I. O comando 'apt-get' é usado para instalar pacotes no Debian e Ubuntu.
II. O comando 'rpm' é utilizado exclusivamente no Fedora.
III. O 'yum' é um gerenciador de pacotes que não possui suporte para repositórios externos. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `I e II.` },
      { letter: 'C', text: `I e III.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'A',
    explanation: `A única afirmação correta é a I, pois 'apt-get' é usado em Debian e Ubuntu, enquanto 'rpm' é usado também em outras distros, e 'yum' pode usar repositórios externos.`,
  },
  {
    id: 1161,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Sobre o protocolo HTTPS, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `É uma versão segura do HTTP que utiliza SSL/TLS para criptografar dados.` },
      { letter: 'B', text: `Não utiliza nenhum tipo de criptografia.` },
      { letter: 'C', text: `É mais lento que o HTTP e por isso não deve ser usado.` },
      { letter: 'D', text: `Só funciona em navegadores específicos.` }
    ],
    correctAnswer: 'A',
    explanation: `HTTPS (HTTP Secure) utiliza SSL/TLS para criptografar a comunicação entre cliente e servidor, garantindo confidencialidade e integridade dos dados.`,
  },
  {
    id: 1162,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `Um firewall pode ser configurado para permitir ou bloquear tráfego com base em regras definidas.` },
      { letter: 'B', text: `Antivírus são programas que não podem remover ameaças já instaladas no sistema.` },
      { letter: 'C', text: `Backup é uma cópia de segurança que pode ser realizada de forma automática ou manual.` },
      { letter: 'D', text: `A criptografia é um método que protege informações tornando-as ilegíveis para usuários não autorizados.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B é a errada, pois muitos antivírus podem remover ameaças já instaladas no sistema.`,
  },
  {
    id: 1163,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª sobre cabeamento estruturado:
1. Categoria 5e 2. Conector RJ-45 3. Certificação ANSI/TIA 568.

A sequência correta é:`,
    options: [
      { letter: 'A', text: `1-B, 2-A, 3-C` },
      { letter: 'B', text: `1-A, 2-B, 3-C` },
      { letter: 'C', text: `1-B, 2-C, 3-A` },
      { letter: 'D', text: `1-C, 2-A, 3-B` }
    ],
    correctAnswer: 'A',
    explanation: `A categoria 5e utiliza o conector RJ-45 e é certificada pela norma ANSI/TIA 568, portanto a associação correta é 1-B, 2-A, 3-C.`,
  },
  {
    id: 1164,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `[Nome] está configurando um servidor web que aceitará conexões seguras. Para garantir a segurança das informações, deve:`,
    options: [
      { letter: 'A', text: `Instalar um certificado SSL/TLS para habilitar HTTPS.` },
      { letter: 'B', text: `Desabilitar a autenticação do servidor para aumentar a velocidade.` },
      { letter: 'C', text: `Utilizar apenas o protocolo HTTP para evitar complicações.` },
      { letter: 'D', text: `Configurar o servidor para não aceitar conexões externas.` }
    ],
    correctAnswer: 'A',
    explanation: `Para garantir a segurança das informações em um servidor web, é fundamental instalar um certificado SSL/TLS para habilitar conexões HTTPS.`,
  },
  {
    id: 1165,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Qual das alternativas representa corretamente o comando 'chmod' no Linux?`,
    options: [
      { letter: 'A', text: `O comando 'chmod' é utilizado para alterar permissões de arquivos e diretórios.` },
      { letter: 'B', text: `O 'chmod' é um comando que serve apenas para alterar a propriedade de arquivos.` },
      { letter: 'C', text: `Com 'chmod', podemos apenas visualizar as permissões de um arquivo.` },
      { letter: 'D', text: `O comando 'chmod' é usado para compactar arquivos no sistema.` }
    ],
    correctAnswer: 'A',
    explanation: `O comando 'chmod' realmente é utilizado para alterar as permissões de acesso a arquivos e diretórios no Linux.`,
  },
  {
    id: 1166,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    weight: 3,
    text: `Marque a alternativa CORRETA a respeito do endereçamento IP.`,
    options: [
      { letter: 'A', text: `Endereços IP são únicos na internet e não podem ser atribuídos a mais de um dispositivo.` },
      { letter: 'B', text: `Endereçamento IP versão 4 (IPv4) permite até 256 endereços únicos em uma rede.` },
      { letter: 'C', text: `Todo endereço IP é composto por quatro octetos, sendo cada um deles um número de 0 a 255.` },
      { letter: 'D', text: `Um endereço IP versão 6 é representado por números decimais separados por pontos.` }
    ],
    correctAnswer: 'C',
    explanation: `O endereço IP versão 4 (IPv4) é composto por quatro octetos, cada um variando de 0 a 255, portanto a alternativa C é a correta.`,
  },

  // ================================================================
  // QUESTÕES INTEGRADAS - 2026-01-13
  // Total: 15 questões
  // ================================================================
  {
    id: 1167,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Interpretação de Texto',
    difficulty: 'alto',
    weight: 2,
    text: `Leia: 'A automação de processos administrativos, conquanto reduza custos operacionais, demanda investimento inicial significativo e reciclagem profissional dos servidores.' O conectivo 'conquanto' pode ser substituído, sem alteração de sentido, por:`,
    options: [
      { letter: 'A', text: `Porque` },
      { letter: 'B', text: `Embora` },
      { letter: 'C', text: `Portanto` },
      { letter: 'D', text: `Conforme` }
    ],
    correctAnswer: 'B',
    explanation: `'Conquanto' é uma conjunção concessiva, equivalente a 'embora', 'ainda que', 'mesmo que'. Indica que a redução de custos ocorre APESAR das demandas mencionadas.`,
    tags: ['conectivos', 'concessao'],
    source: 'questoes_dificeis',
  },
  {
    id: 1168,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Regência',
    difficulty: 'alto',
    weight: 2,
    text: `Assinale a alternativa em que a regência verbal está de acordo com a norma culta:`,
    options: [
      { letter: 'A', text: `O técnico assistiu o vídeo de treinamento com atenção.` },
      { letter: 'B', text: `Os funcionários aspiram o cargo de chefia.` },
      { letter: 'C', text: `O sistema visa à segurança dos dados.` },
      { letter: 'D', text: `O chefe implicou com o funcionário novo.` }
    ],
    correctAnswer: 'C',
    explanation: `'Visar' no sentido de 'ter como objetivo' é transitivo indireto (visa A algo). 'Assistir' (ver) é transitivo indireto (assistiu AO vídeo). 'Aspirar' (desejar) é transitivo indireto (aspiram AO cargo). 'Implicar' (ter implicância) não usa 'com'.`,
    tags: ['regencia_verbal'],
    source: 'questoes_dificeis',
  },
  {
    id: 1169,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    subtopic: 'Negação de Proposições',
    difficulty: 'alto',
    weight: 2,
    text: `Qual é a negação CORRETA da proposição: 'Se o backup foi realizado, então nenhum dado foi perdido'?`,
    options: [
      { letter: 'A', text: `O backup foi realizado e algum dado foi perdido.` },
      { letter: 'B', text: `Se o backup não foi realizado, então algum dado foi perdido.` },
      { letter: 'C', text: `O backup não foi realizado ou nenhum dado foi perdido.` },
      { letter: 'D', text: `Se algum dado foi perdido, então o backup não foi realizado.` }
    ],
    correctAnswer: 'A',
    explanation: `A negação de 'Se P, então Q' é 'P e não Q'. Negando 'nenhum dado foi perdido' obtemos 'algum dado foi perdido'. Portanto: 'O backup foi realizado E algum dado foi perdido'.`,
    tags: ['negacao', 'condicional'],
    source: 'questoes_dificeis',
  },
  {
    id: 1170,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    subtopic: 'Raciocínio Analítico',
    difficulty: 'alto',
    weight: 2,
    text: `Cinco técnicos (Ana, Bruno, Carlos, Diana, Eduardo) trabalham em dias diferentes da semana (segunda a sexta). Sabe-se que: Ana trabalha antes de Bruno; Carlos não trabalha na segunda nem na sexta; Diana trabalha imediatamente após Carlos; Eduardo trabalha na sexta. Em que dia Ana trabalha?`,
    options: [
      { letter: 'A', text: `Segunda-feira` },
      { letter: 'B', text: `Terça-feira` },
      { letter: 'C', text: `Quarta-feira` },
      { letter: 'D', text: `Pode ser segunda ou terça` }
    ],
    correctAnswer: 'A',
    explanation: `Eduardo = sexta. Carlos não trabalha seg/sex, Diana vem logo após Carlos. Se Carlos = terça, Diana = quarta. Se Carlos = quarta, Diana = quinta. Como Ana vem antes de Bruno e precisamos encaixar todos, Ana = segunda, Bruno = um dia após Ana mas antes de Carlos/Diana.`,
    tags: ['raciocinio_analitico', 'logica'],
    source: 'questoes_dificeis',
  },
  {
    id: 1171,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    subtopic: 'Responsabilidade Civil',
    difficulty: 'alto',
    weight: 2,
    text: `Um servidor público, no exercício de suas funções, causou dano a particular por negligência. Quanto à responsabilidade civil, é CORRETO afirmar:`,
    options: [
      { letter: 'A', text: `O particular deve acionar diretamente o servidor, que responde objetivamente.` },
      { letter: 'B', text: `O Estado responde objetivamente perante o particular e pode exercer direito de regresso contra o servidor, que responde subjetivamente.` },
      { letter: 'C', text: `O Estado e o servidor respondem solidariamente de forma objetiva.` },
      { letter: 'D', text: `A responsabilidade é exclusiva do servidor, pois agiu com culpa.` }
    ],
    correctAnswer: 'B',
    explanation: `Conforme art. 37, §6º da CF/88, o Estado responde OBJETIVAMENTE pelos danos causados por seus agentes. Porém, ao exercer o direito de regresso contra o servidor, este responde SUBJETIVAMENTE (apenas se houver dolo ou culpa comprovados).`,
    tags: ['responsabilidade_civil', 'regresso'],
    source: 'questoes_dificeis',
  },
  {
    id: 1172,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    subtopic: 'Lei de Acesso à Informação',
    difficulty: 'alto',
    weight: 2,
    text: `Segundo a Lei de Acesso à Informação (Lei 12.527/2011), informações classificadas como ULTRASSECRETA podem ter seu sigilo mantido por, no máximo:`,
    options: [
      { letter: 'A', text: `5 anos, prorrogáveis por igual período.` },
      { letter: 'B', text: `15 anos, sem possibilidade de prorrogação.` },
      { letter: 'C', text: `25 anos, prorrogáveis uma única vez por igual período.` },
      { letter: 'D', text: `25 anos, sem possibilidade de prorrogação.` }
    ],
    correctAnswer: 'C',
    explanation: `Conforme art. 24 da LAI: Ultrassecreta = 25 anos (prorrogável uma vez); Secreta = 15 anos (não prorrogável); Reservada = 5 anos (não prorrogável). Portanto, ultrassecreta pode chegar a 50 anos no total.`,
    tags: ['lai', 'sigilo'],
    source: 'questoes_dificeis',
  },
  {
    id: 1173,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    subtopic: 'Windows Server',
    difficulty: 'alto',
    weight: 3,
    text: `Em um ambiente Windows Server com Active Directory, um administrador precisa aplicar uma política de grupo (GPO) que afete APENAS os computadores do departamento financeiro, sem afetar os usuários. Qual é a configuração CORRETA?`,
    options: [
      { letter: 'A', text: `Vincular a GPO à OU de usuários do financeiro e configurar apenas 'Configurações do Computador'.` },
      { letter: 'B', text: `Vincular a GPO à OU de computadores do financeiro e habilitar 'Configurações do Computador', desabilitando 'Configurações do Usuário'.` },
      { letter: 'C', text: `Aplicar a GPO no domínio inteiro e usar filtro de segurança baseado em usuários.` },
      { letter: 'D', text: `Criar a GPO e aplicar via script de logon dos usuários.` }
    ],
    correctAnswer: 'B',
    explanation: `Para aplicar GPO apenas em computadores específicos: vincule à OU onde estão os objetos de computador, use 'Configurações do Computador' e desabilite 'Configurações do Usuário' para otimizar o processamento.`,
    tags: ['gpo', 'active_directory'],
    source: 'questoes_dificeis',
  },
  {
    id: 1174,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    subtopic: 'Redes',
    difficulty: 'alto',
    weight: 3,
    text: `Um técnico precisa configurar uma VLAN para isolar o tráfego do departamento de RH. Para que computadores em VLANs diferentes possam se comunicar, é necessário:`,
    options: [
      { letter: 'A', text: `Configurar todos os computadores na mesma sub-rede IP.` },
      { letter: 'B', text: `Utilizar um roteador ou switch Layer 3 para fazer o roteamento inter-VLAN.` },
      { letter: 'C', text: `Conectar um hub entre os switches das VLANs.` },
      { letter: 'D', text: `Configurar o modo trunk em todas as portas de acesso.` }
    ],
    correctAnswer: 'B',
    explanation: `VLANs isolam o tráfego em camada 2. Para comunicação entre VLANs diferentes, é necessário roteamento (camada 3), que pode ser feito por um roteador dedicado ou um switch Layer 3 com capacidade de roteamento inter-VLAN.`,
    tags: ['vlan', 'roteamento'],
    source: 'questoes_dificeis',
  },
  {
    id: 1175,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    subtopic: 'Hardware',
    difficulty: 'alto',
    weight: 3,
    text: `Um servidor apresenta travamentos frequentes após upgrade de memória RAM. A memória instalada é DDR4 2666MHz, mas o processador suporta até DDR4 2400MHz. Qual é a causa mais provável e a solução?`,
    options: [
      { letter: 'A', text: `Incompatibilidade total; substituir por memória DDR3.` },
      { letter: 'B', text: `A memória funcionará em velocidade reduzida (2400MHz) automaticamente; verificar outras causas como temperatura ou BIOS.` },
      { letter: 'C', text: `É necessário fazer overclock do processador para suportar 2666MHz.` },
      { letter: 'D', text: `Memórias mais rápidas nunca funcionam em sistemas mais lentos.` }
    ],
    correctAnswer: 'B',
    explanation: `Memórias DDR4 são retrocompatíveis em velocidade - uma memória 2666MHz funcionará a 2400MHz se o controlador não suportar mais. Os travamentos provavelmente têm outra causa: temperatura, configuração de BIOS, módulos defeituosos ou incompatibilidade de fabricante.`,
    tags: ['hardware', 'memoria_ram'],
    source: 'questoes_dificeis',
  },
  {
    id: 1176,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    subtopic: 'Backup',
    difficulty: 'alto',
    weight: 3,
    text: `Uma política de backup utiliza a estratégia 'Avô-Pai-Filho' (GFS - Grandfather-Father-Son) com backup completo aos domingos, incremental nos demais dias, e retenção mensal. Para restaurar dados de quarta-feira da semana anterior, quantos conjuntos de backup são necessários?`,
    options: [
      { letter: 'A', text: `Apenas o backup de quarta-feira.` },
      { letter: 'B', text: `O backup completo de domingo + incrementais de segunda, terça e quarta.` },
      { letter: 'C', text: `Todos os backups da semana (domingo a sábado).` },
      { letter: 'D', text: `O backup completo de domingo + apenas o incremental de quarta.` }
    ],
    correctAnswer: 'B',
    explanation: `Backup incremental armazena apenas alterações desde o último backup (completo ou incremental). Para restaurar quarta: precisa do completo (domingo) + todos os incrementais em sequência (segunda, terça, quarta) para reconstruir o estado completo.`,
    tags: ['backup', 'gfs'],
    source: 'questoes_dificeis',
  },
  {
    id: 1177,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    subtopic: 'Segurança',
    difficulty: 'alto',
    weight: 3,
    text: `Um usuário relata que recebeu email aparentemente do banco solicitando atualização de dados via link. O email possui o logotipo oficial e endereço semelhante ao real (banc0.com.br em vez de banco.com.br). Qual tipo de ataque e a orientação correta?`,
    options: [
      { letter: 'A', text: `Ransomware; desconectar o computador da rede imediatamente.` },
      { letter: 'B', text: `Phishing; não clicar no link, verificar o remetente real e reportar ao setor de segurança.` },
      { letter: 'C', text: `DDoS; aguardar o ataque cessar.` },
      { letter: 'D', text: `Vírus; executar antivírus no anexo do email.` }
    ],
    correctAnswer: 'B',
    explanation: `Phishing usa engenharia social para enganar usuários com páginas/emails falsos que imitam instituições legítimas. Características: URLs semelhantes mas falsas, urgência, solicitação de dados. A orientação é NÃO clicar, verificar e reportar.`,
    tags: ['phishing', 'engenharia_social'],
    source: 'questoes_dificeis',
  },
  {
    id: 1178,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    subtopic: 'Virtualização',
    difficulty: 'alto',
    weight: 3,
    text: `Em um ambiente Hyper-V, qual tipo de disco virtual oferece MELHOR performance para um servidor de banco de dados em produção?`,
    options: [
      { letter: 'A', text: `Disco Dinâmico (Dynamic) - cresce conforme necessidade.` },
      { letter: 'B', text: `Disco de Diferenciação (Differencing) - economiza espaço.` },
      { letter: 'C', text: `Disco Fixo (Fixed) - espaço pré-alocado.` },
      { letter: 'D', text: `Disco Pass-through - acesso direto ao disco físico.` }
    ],
    correctAnswer: 'D',
    explanation: `Para máxima performance, o disco Pass-through oferece acesso direto ao disco físico, eliminando a camada de virtualização do storage. Disco Fixo é a segunda melhor opção. Dinâmico e Diferenciação têm overhead por gerenciar alocação em tempo real.`,
    tags: ['hyperv', 'virtualizacao'],
    source: 'questoes_dificeis',
  },
  {
    id: 1179,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    subtopic: 'Help Desk',
    difficulty: 'alto',
    weight: 3,
    text: `Segundo as práticas ITIL, qual é a diferença fundamental entre Gerenciamento de Incidentes e Gerenciamento de Problemas?`,
    options: [
      { letter: 'A', text: `Incidentes são mais graves que problemas.` },
      { letter: 'B', text: `Incidentes focam em restaurar o serviço rapidamente; Problemas focam em identificar e eliminar a causa raiz.` },
      { letter: 'C', text: `Problemas são resolvidos pelo nível 1; Incidentes pelo nível 3.` },
      { letter: 'D', text: `Não há diferença; são termos intercambiáveis.` }
    ],
    correctAnswer: 'B',
    explanation: `ITIL distingue: Gerenciamento de INCIDENTES = restaurar o serviço o mais rápido possível (foco reativo). Gerenciamento de PROBLEMAS = investigar causa raiz para prevenir recorrência (foco proativo). São processos complementares mas distintos.`,
    tags: ['itil', 'incidente', 'problema'],
    source: 'questoes_dificeis',
  },
  {
    id: 1180,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    subtopic: 'Cabeamento Estruturado',
    difficulty: 'alto',
    weight: 3,
    text: `Em uma instalação de cabeamento estruturado Cat6, qual é a distância máxima permitida entre o patch panel e a tomada de rede (horizontal cabling), segundo a norma TIA/EIA-568?`,
    options: [
      { letter: 'A', text: `50 metros` },
      { letter: 'B', text: `90 metros` },
      { letter: 'C', text: `100 metros (incluindo patch cords)` },
      { letter: 'D', text: `150 metros` }
    ],
    correctAnswer: 'B',
    explanation: `A norma TIA/EIA-568 especifica: cabeamento horizontal (permanent link) = máximo 90m. Os 10m restantes (até 100m total do canal) são reservados para patch cords nas extremidades (5m em cada ponta).`,
    tags: ['cabeamento', 'normas'],
    source: 'questoes_dificeis',
  },
  {
    id: 1181,
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    subtopic: 'LibreOffice',
    difficulty: 'alto',
    weight: 3,
    text: `No LibreOffice Calc, qual fórmula retorna o valor da célula B2 se A2 contiver 'Aprovado', o valor de C2 se A2 contiver 'Pendente', e 0 (zero) em qualquer outro caso?`,
    options: [
      { letter: 'A', text: `=SE(A2="Aprovado";B2;SE(A2="Pendente";C2;0))` },
      { letter: 'B', text: `=ESCOLHER(A2;B2;C2;0)` },
      { letter: 'C', text: `=PROCV(A2;B2:C2;2;0)` },
      { letter: 'D', text: `=SEERRO(A2;B2;C2)` }
    ],
    correctAnswer: 'A',
    explanation: `A função SE aninhada é a solução correta: SE(condição1; valor_se_verdadeiro; SE(condição2; valor_se_verdadeiro; valor_se_falso)). ESCOLHER requer índice numérico; PROCV busca em tabela; SEERRO trata erros.`,
    tags: ['calc', 'formulas'],
    source: 'questoes_dificeis',
  },
];

export const getQuestionsBySubjectTecnico = (subjectId: string): Question[] => {
  return questionsTecnico.filter(q => q.subject === subjectId);
};

export const getTotalPointsTecnico = (answers: Map<number, string>): number => {
  let total = 0;
  questionsTecnico.forEach(q => {
    if (answers.get(q.id) === q.correctAnswer) {
      total += q.weight;
    }
  });
  return total;
};

export const getPassingScoreTecnico = (): number => {
  const maxPoints = questionsTecnico.reduce((sum, q) => sum + q.weight, 0);
  return maxPoints * 0.5;
};
