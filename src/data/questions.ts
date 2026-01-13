export type Difficulty = 'baixo' | 'medio' | 'alto';

export interface Question {
  id: number;
  subject: string;
  subjectName: string;
  subtopic?: string;
  difficulty?: Difficulty;
  weight: number;
  text: string;
  options: {
    letter: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation?: string;
  tags?: string[];
  source?: string;
}

export interface SubjectInfo {
  id: string;
  name: string;
  questionCount: number;
  weight: number;
  maxPoints: number;
}

export const subjects: SubjectInfo[] = [
  { id: 'portugues', name: 'Língua Portuguesa', questionCount: 10, weight: 2, maxPoints: 20 },
  { id: 'logica', name: 'Raciocínio Lógico-Matemático', questionCount: 10, weight: 2, maxPoints: 20 },
  { id: 'direito', name: 'Direito Administrativo e Constitucional', questionCount: 10, weight: 2, maxPoints: 20 },
  { id: 'especificos_analista', name: 'Conhecimentos Específicos - Analista', questionCount: 30, weight: 3, maxPoints: 90 },
];

export const questions: Question[] = [
  {
    id: 1,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Funções da Linguagem',
    difficulty: 'medio',
    weight: 2,
    text: `Qual das alternativas representa corretamente a função referencial da linguagem em um texto informativo?`,
    options: [
      { letter: 'A', text: `A linguagem é utilizada para expressar emoções e sentimentos do autor.` },
      { letter: 'B', text: `A linguagem é usada para transmitir informações de maneira objetiva e clara.` },
      { letter: 'C', text: `A linguagem busca envolver o leitor em uma narrativa cativante.` },
      { letter: 'D', text: `A linguagem serve para persuadir o leitor a adotar um ponto de vista.` }
    ],
    correctAnswer: 'B',
    explanation: `A função referencial da linguagem está voltada para a transmissão de informações de forma clara e objetiva, como ocorre em textos informativos.`,
  },
  {
    id: 2,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Acentuação Gráfica',
    difficulty: 'medio',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde ao uso correto da acentuação gráfica.`,
    options: [
      { letter: 'A', text: `A palavra 'saudade' deve ser acentuada como 'saudáde'.` },
      { letter: 'B', text: `A forma verbal 'pôde' é a mesma que 'pode'.` },
      { letter: 'C', text: `A palavra 'exceção' leva acento circunflexo.` },
      { letter: 'D', text: `A palavra 'papéis' deve ser acentuada com acento agudo.` }
    ],
    correctAnswer: 'D',
    explanation: `A palavra 'papéis' é acentuada com acento agudo, pois é uma palavra oxítona terminada em 'éis'.`,
  },
  {
    id: 3,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Tipologia Textual',
    difficulty: 'medio',
    weight: 2,
    text: `Sobre a tipologia textual, avalie:
I. O texto narrativo se foca em contar uma história.
II. O texto descritivo tem como principal função relatar acontecimentos.
III. O texto dissertativo argumenta sobre um tema específico. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `Apenas III.` },
      { letter: 'D', text: `I e III.` }
    ],
    correctAnswer: 'D',
    explanation: `As afirmações I e III estão corretas, enquanto a II está errada, pois o texto descritivo não relata acontecimentos, mas descreve características e detalhes.`,
  },
  {
    id: 4,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Gramática',
    difficulty: 'medio',
    weight: 2,
    text: `Sobre as expressões e palavras da língua portuguesa, assinale a alternativa INCORRETA:`,
    options: [
      { letter: 'A', text: `'A gente vai' é uma forma aceita na linguagem coloquial.` },
      { letter: 'B', text: `'Hão de vir' é uma construção com o verbo haver no futuro.` },
      { letter: 'C', text: `'Mau' e 'mal' têm significados idênticos e podem ser usados de forma intercambiável.` },
      { letter: 'D', text: `'Mau' é adjetivo (oposto de bom) e 'mal' é advérbio (oposto de bem).` }
    ],
    correctAnswer: 'C',
    explanation: `'Mau' e 'mal' NÃO têm significados idênticos: 'mau' é adjetivo (oposto de bom) e 'mal' é advérbio (oposto de bem).`,
  },
  {
    id: 5,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Acentuação Gráfica',
    difficulty: 'baixo',
    weight: 2,
    text: `Todas as alternativas estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `A palavra 'cama' deve ser sempre acentuada.` },
      { letter: 'B', text: `A conjugação do verbo 'ter' na 3ª pessoa do singular do presente é 'tem'.` },
      { letter: 'C', text: `A palavra 'síndrome' é acentuada na primeira sílaba.` },
      { letter: 'D', text: `A forma plural de 'animal' é 'animais'.` }
    ],
    correctAnswer: 'A',
    explanation: `A palavra 'cama' não é acentuada, portanto a alternativa A está incorreta, enquanto as demais estão corretas.`,
  },
  {
    id: 6,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Classes de Palavras',
    difficulty: 'medio',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª conforme o tipo de classe gramatical:

1. 'rápido'
2. 'correr'
3. 'aquela'

( ) Adjetivo
( ) Verbo
( ) Pronome

A sequência CORRETA é:`,
    options: [
      { letter: 'A', text: `1, 2, 3.` },
      { letter: 'B', text: `2, 1, 3.` },
      { letter: 'C', text: `1, 3, 2.` },
      { letter: 'D', text: `3, 1, 2.` }
    ],
    correctAnswer: 'A',
    explanation: `Na sequência correta, 'rápido' é um adjetivo, 'correr' é um verbo e 'aquela' é um pronome.`,
  },
  {
    id: 7,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Interpretação de Texto',
    difficulty: 'baixo',
    weight: 2,
    text: `[Carlos] está analisando um texto para um projeto. Para melhorar sua interpretação, deve:`,
    options: [
      { letter: 'A', text: `Ler rapidamente o texto sem se preocupar com detalhes.` },
      { letter: 'B', text: `Fazer anotações de palavras desconhecidas e seus significados.` },
      { letter: 'C', text: `Ignorar as referências bibliográficas contidas no texto.` },
      { letter: 'D', text: `Concentrar-se apenas nos dados estatísticos apresentados.` }
    ],
    correctAnswer: 'B',
    explanation: `Fazer anotações de palavras desconhecidas e seus significados é uma técnica eficaz para melhorar a compreensão e interpretação do texto.`,
  },
  {
    id: 8,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Ortografia',
    difficulty: 'medio',
    weight: 2,
    text: `Qual das alternativas apresenta um erro de ortografia oficial?`,
    options: [
      { letter: 'A', text: `A palavra 'necessário' é escrita corretamente.` },
      { letter: 'B', text: `A grafia 'exceção' está de acordo com a norma padrão.` },
      { letter: 'C', text: `A palavra 'desassociar' é escrita com 's'.` },
      { letter: 'D', text: `A palavra 'caminhão' deve ser escrita com 'nh'.` }
    ],
    correctAnswer: 'C',
    explanation: `A palavra 'desassociar' é escrita com 'ss' e não com 's', portanto a alternativa C está errada.`,
  },
  {
    id: 9,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Classes de Palavras',
    difficulty: 'medio',
    weight: 2,
    text: `Sobre o emprego das classes de palavras, avalie:
I. Os advérbios podem modificar substantivos.
II. Os adjetivos são usados para caracterizar substantivos.
III. Os pronomes substituem ou acompanham substantivos. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `Apenas III.` },
      { letter: 'D', text: `II e III.` }
    ],
    correctAnswer: 'D',
    explanation: `As afirmações II e III estão corretas, enquanto a I é falsa, pois advérbios não modificam substantivos, mas sim verbos, adjetivos ou outros advérbios.`,
  },
  {
    id: 10,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Colocação Pronominal',
    difficulty: 'medio',
    weight: 2,
    text: `Qual das alternativas representa corretamente a colocação pronominal na frase: 'Ele me disse que viria amanhã'?`,
    options: [
      { letter: 'A', text: `A colocação do pronome está correta, pois precede o verbo.` },
      { letter: 'B', text: `A colocação do pronome está incorreta, deveria ser 'disse-me'.` },
      { letter: 'C', text: `A colocação do pronome está correta, pois vem após o verbo.` },
      { letter: 'D', text: `A colocação do pronome está correta, mas poderia vir em posição ênclitica.` }
    ],
    correctAnswer: 'A',
    explanation: `Na frase, o pronome 'me' está corretamente posicionado antes do verbo 'disse', respeitando a norma culta da língua.`,
  },
  {
    id: 11,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde ao antônimo da palavra 'rápido'.`,
    options: [
      { letter: 'A', text: `Lento` },
      { letter: 'B', text: `Rápido` },
      { letter: 'C', text: `Acelerado` },
      { letter: 'D', text: `Velocidade` }
    ],
    correctAnswer: 'A',
    explanation: `O antônimo de 'rápido' é 'lento', que expressa a ideia oposta de velocidade.`,
  },
  {
    id: 12,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Sobre interpretação de texto, avalie:
I. A leitura crítica deve considerar o contexto.
II. O título não influencia na compreensão do texto.
III. É importante identificar a ideia central. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I` },
      { letter: 'B', text: `I e III` },
      { letter: 'C', text: `II e III` },
      { letter: 'D', text: `I, II e III` }
    ],
    correctAnswer: 'B',
    explanation: `As assertivas I e III estão corretas, pois o contexto e a ideia central são fundamentais na leitura crítica; a II está errada, pois o título é crucial para a compreensão.`,
  },
  {
    id: 13,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Colocação Pronominal',
    difficulty: 'medio',
    weight: 2,
    text: `Sobre a colocação pronominal na frase "Os alunos se esforçaram bastante para a prova", é CORRETO afirmar que:`,
    options: [
      { letter: 'A', text: `A próclise está correta, pois o sujeito "Os alunos" atrai o pronome.` },
      { letter: 'B', text: `A ênclise seria obrigatória neste caso: "esforçaram-se".` },
      { letter: 'C', text: `A mesóclise deveria ser usada: "esforçar-se-ão".` },
      { letter: 'D', text: `O pronome está incorretamente posicionado em qualquer hipótese.` }
    ],
    correctAnswer: 'A',
    explanation: `A próclise (pronome antes do verbo) está correta porque o sujeito substantivo "Os alunos" atrai o pronome. Em início de oração com sujeito expresso, a próclise é aceita na norma culta brasileira.`,
    tags: ['colocação pronominal', 'próclise', 'sintaxe'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 14,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `A palavra 'mau' é antônimo de 'bom'.` },
      { letter: 'B', text: `A palavra 'paz' é homônima de 'pase'.` },
      { letter: 'C', text: `A palavra 'cesta' é parônima de 'sesta'.` },
      { letter: 'D', text: `A palavra 'comprar' é sinônimo de 'adquirir'.` }
    ],
    correctAnswer: 'B',
    explanation: `A palavra 'paz' não é homônima de 'pase', pois 'paz' refere-se a tranquilidade, enquanto 'pase' não é uma palavra em uso comum.`,
  },
  {
    id: 15,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª, relacionando os gêneros textuais às suas características:
I. Crônica
II. Artigo de opinião
III. Conto.`,
    options: [
      { letter: 'A', text: `I-3, II-1, III-2` },
      { letter: 'B', text: `I-1, II-2, III-3` },
      { letter: 'C', text: `I-2, II-3, III-1` },
      { letter: 'D', text: `I-2, II-1, III-3` }
    ],
    correctAnswer: 'B',
    explanation: `A crônica é um gênero que faz uma reflexão sobre o cotidiano (I-1), o artigo de opinião expressa um ponto de vista (II-2) e o conto é uma narrativa ficcional (III-3).`,
  },
  {
    id: 16,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Cenário Prático: Maria está escrevendo um ensaio acadêmico. Para garantir a clareza do texto, deve:`,
    options: [
      { letter: 'A', text: `Usar jargões técnicos sem explicação.` },
      { letter: 'B', text: `Evitar a repetição de palavras e estruturar parágrafos coerentes.` },
      { letter: 'C', text: `Reduzir o número de citações para parecer mais original.` },
      { letter: 'D', text: `Usar frases longas para evitar quebras de parágrafo.` }
    ],
    correctAnswer: 'B',
    explanation: `Maria deve evitar a repetição de palavras e estruturar parágrafos coerentes para garantir a clareza e a fluidez do seu ensaio acadêmico.`,
  },
  {
    id: 17,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Qual das alternativas apresenta um exemplo de homônimo?`,
    options: [
      { letter: 'A', text: `A palavra 'banco' como instituição financeira e 'banco' como banco de praça.` },
      { letter: 'B', text: `A palavra 'pintor' e 'pintura'.` },
      { letter: 'C', text: `A palavra 'ponto' e 'pontal'.` },
      { letter: 'D', text: `A palavra 'casa' e 'residência'.` }
    ],
    correctAnswer: 'A',
    explanation: `A palavra 'banco' é um exemplo de homônimo, pois possui mais de um significado: instituição financeira e objeto para sentar.`,
  },
  {
    id: 18,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Marque a alternativa INCORRETA em relação à ortografia oficial.`,
    options: [
      { letter: 'A', text: `A forma correta é 'exceção', e não 'excessão'.` },
      { letter: 'B', text: `A forma correta é 'diferença', e não 'diferensa'.` },
      { letter: 'C', text: `A forma correta é 'decisão', e não 'decisão'.` },
      { letter: 'D', text: `A forma correta é 'interessante', e não 'interezante'.` }
    ],
    correctAnswer: 'C',
    explanation: `A alternativa C apresenta uma frase sem erro, pois 'decisão' está correta. As demais alternativas estão corretas.`,
  },
  {
    id: 19,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Semântica',
    difficulty: 'medio',
    weight: 2,
    text: `Sobre homonímia e paronímia, avalie as afirmativas:

I. "Banco" (instituição financeira) e "banco" (assento) são homônimos perfeitos.
II. "Comprimento" e "cumprimento" são parônimos.
III. "Marido" usado em diferentes contextos caracteriza homonímia.

Está CORRETO o que se afirma em:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas I e III.` },
      { letter: 'C', text: `Apenas II e III.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'A',
    explanation: `I e II estão corretas. "Banco" é homônimo perfeito (mesma grafia e pronúncia, significados diferentes). "Comprimento/cumprimento" são parônimos (palavras parecidas). III está errada: "marido" em diferentes contextos não caracteriza homonímia, pois mantém o mesmo significado básico.`,
    tags: ['homonímia', 'paronímia', 'semântica'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 20,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Qual das alternativas representa corretamente o uso da crase na frase: 'Entreguei o documento ___ Diretoria'?`,
    options: [
      { letter: 'A', text: `Entreguei o documento à Diretoria, pois se refere a um lugar.` },
      { letter: 'B', text: `Entreguei o documento a Diretoria, pois não ocorre crase antes de palavras femininas.` },
      { letter: 'C', text: `Entreguei o documento à a Diretoria, pois a preposição exige o artigo.` },
      { letter: 'D', text: `Entreguei o documento à Diretoria, pois a palavra 'Diretoria' é masculina.` }
    ],
    correctAnswer: 'A',
    explanation: `A crase é utilizada antes de palavras femininas que exigem a preposição 'a'. Portanto, 'à Diretoria' está correto.`,
  },
  {
    id: 21,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Sobre a regência verbal, avalie as frases:
I. Ele assistiu o filme.
II. Ela obedeceu aos pais.
III. Nós gostamos de chocolate. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas a frase I está correta.` },
      { letter: 'B', text: `As frases II e III estão corretas.` },
      { letter: 'C', text: `Apenas a frase III está correta.` },
      { letter: 'D', text: `Todas as frases estão corretas.` }
    ],
    correctAnswer: 'B',
    explanation: `A frase I está incorreta porque o verbo 'assistir' exige a construção 'assistir a'. As frases II e III estão corretas.`,
  },
  {
    id: 22,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde à colocação pronominal adequada: 'Ele ___ entregou o relatório.'`,
    options: [
      { letter: 'A', text: `me` },
      { letter: 'B', text: `se` },
      { letter: 'C', text: `te` },
      { letter: 'D', text: `nos` }
    ],
    correctAnswer: 'A',
    explanation: `O pronome 'me' é a opção correta, sendo que ele deve preceder o verbo na construção direta.`,
  },
  {
    id: 23,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Sobre homônimos na língua portuguesa, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `São palavras que possuem a mesma pronúncia ou grafia, mas significados diferentes.` },
      { letter: 'B', text: `São palavras com significados iguais e grafias diferentes.` },
      { letter: 'C', text: `São palavras com grafias semelhantes e significados iguais.` },
      { letter: 'D', text: `São palavras que sempre têm a mesma origem etimológica.` }
    ],
    correctAnswer: 'A',
    explanation: `Homônimos são palavras que possuem a mesma pronúncia (homófonos) ou mesma grafia (homógrafos), mas com significados diferentes.`,
  },
  {
    id: 24,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Todas as alternativas estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `Os antônimos são palavras de significados iguais.` },
      { letter: 'B', text: `Os parônimos são palavras semelhantes em forma, mas diferentes em significado.` },
      { letter: 'C', text: `Os sinônimos são palavras que possuem significados iguais ou semelhantes.` },
      { letter: 'D', text: `Os homônimos possuem a mesma forma, mas significados diferentes.` }
    ],
    correctAnswer: 'A',
    explanation: `A alternativa A está incorreta, pois antônimos têm significados opostos, e não iguais.`,
  },
  {
    id: 25,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª, relacionando os termos:

1. Acariciar
2. Amarelo
3. Frio

A. Calor
B. Carinho
C. Cor

A sequência CORRETA é:`,
    options: [
      { letter: 'A', text: `1-B, 2-C, 3-A` },
      { letter: 'B', text: `1-A, 2-B, 3-C` },
      { letter: 'C', text: `1-C, 2-A, 3-B` },
      { letter: 'D', text: `1-B, 2-A, 3-C` }
    ],
    correctAnswer: 'A',
    explanation: `A relação correta é: Acariciar (Carinho), Amarelo (Cor), Frio (Calor), estabelecendo as conexões adequadas.`,
  },
  {
    id: 26,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Cenário Prático: Maria está revisando um texto e se depara com a palavra 'custo', que pode ser confundida com 'custo' (do verbo custar). Para evitar mal-entendidos, deve:`,
    options: [
      { letter: 'A', text: `Trocar por um sinônimo, como 'preço', a fim de tornar o sentido mais claro.` },
      { letter: 'B', text: `Eliminar a palavra para não causar confusão.` },
      { letter: 'C', text: `Manter a palavra, pois o contexto já esclarece o significado.` },
      { letter: 'D', text: `Adicionar um adjetivo que a qualifique.` }
    ],
    correctAnswer: 'A',
    explanation: `Trocar a palavra por um sinônimo ajuda a esclarecer o sentido e evita confusões entre os significados.`,
  },
  {
    id: 27,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde ao uso adequado da colocação pronominal: 'Ela ___ viu na festa.'`,
    options: [
      { letter: 'A', text: `me` },
      { letter: 'B', text: `se` },
      { letter: 'C', text: `te` },
      { letter: 'D', text: `nos` }
    ],
    correctAnswer: 'A',
    explanation: `A opção correta é 'me', pois se refere à primeira pessoa do singular e atende à colocação pronominal adequada.`,
  },
  {
    id: 28,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    weight: 2,
    text: `Sobre a regência nominal, avalie as frases:
I. A necessidade de compromisso é elevada.
II. O amor à vida é essencial.
III. A paixão por música é intensa. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas a frase I está correta.` },
      { letter: 'B', text: `As frases II e III estão corretas.` },
      { letter: 'C', text: `Todas as frases estão corretas.` },
      { letter: 'D', text: `Apenas a frase III está correta.` }
    ],
    correctAnswer: 'C',
    explanation: `Todas as frases estão corretas, pois respeitam a regência nominal adequada.`,
  },
  {
    id: 29,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    subtopic: 'Negação de Proposições',
    difficulty: 'medio',
    weight: 2,
    text: `Qual das alternativas representa corretamente a negação da proposição 'Todos os alunos passaram no exame'?`,
    options: [
      { letter: 'A', text: `Alguns alunos não passaram no exame.` },
      { letter: 'B', text: `Nem todos os alunos passaram no exame.` },
      { letter: 'C', text: `Todos os alunos falharam no exame.` },
      { letter: 'D', text: `A maioria dos alunos passou no exame.` }
    ],
    correctAnswer: 'B',
    explanation: `A negação de uma proposição universal como 'Todos os alunos passaram' é que existe pelo menos um aluno que não passou.`,
  },
  {
    id: 30,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    subtopic: 'Tabela-Verdade',
    difficulty: 'medio',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde ao resultado da tabela-verdade da proposição 'P e Q', onde P é 'Está chovendo' e Q é 'Eu vou ao cinema'.`,
    options: [
      { letter: 'A', text: `A proposição é verdadeira somente se P e Q forem verdadeiros.` },
      { letter: 'B', text: `A proposição é verdadeira se pelo menos uma das variáveis for verdadeira.` },
      { letter: 'C', text: `A proposição é verdadeira se P for verdadeira, independentemente de Q.` },
      { letter: 'D', text: `A proposição é sempre verdadeira.` }
    ],
    correctAnswer: 'A',
    explanation: `A conjunção 'P e Q' é verdadeira apenas quando ambas P e Q são verdadeiras.`,
  },
  {
    id: 31,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    subtopic: 'Equivalências Lógicas',
    difficulty: 'alto',
    weight: 2,
    text: `Sobre equivalências lógicas, avalie:
I. 'P ou ¬P' sempre é verdadeiro.
II. 'P e ¬P' sempre é falso.
III. 'P implica Q' é equivalente a '¬P ou Q'. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I está correta.` },
      { letter: 'B', text: `Apenas II e III estão corretas.` },
      { letter: 'C', text: `Todas as afirmações estão corretas.` },
      { letter: 'D', text: `Apenas I e II estão corretas.` }
    ],
    correctAnswer: 'C',
    explanation: `Todas as afirmações são verdadeiras, evidenciando propriedades fundamentais da lógica.`,
  },
  {
    id: 32,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    subtopic: 'Proposições Condicionais',
    difficulty: 'baixo',
    weight: 2,
    text: `Sobre a proposição 'Se a luz está acesa, então a energia está ligada', assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `É um exemplo de implicação lógica (condicional).` },
      { letter: 'B', text: `É um exemplo de conjunção lógica.` },
      { letter: 'C', text: `É um exemplo de disjunção lógica.` },
      { letter: 'D', text: `Não é uma proposição lógica válida.` }
    ],
    correctAnswer: 'A',
    explanation: `A proposição 'Se... então...' é uma implicação lógica (condicional), onde o antecedente implica o consequente.`,
  },
  {
    id: 33,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    subtopic: 'Proposições',
    difficulty: 'medio',
    weight: 2,
    text: `Todas as afirmativas estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `Uma proposição pode ser verdadeira ou falsa.` },
      { letter: 'B', text: `A negação de uma proposição é sempre verdadeira.` },
      { letter: 'C', text: `Duas proposições podem ser equivalentes.` },
      { letter: 'D', text: `O valor de verdade de uma proposição é independente do contexto.` }
    ],
    correctAnswer: 'B',
    explanation: `A negação de uma proposição não é sempre verdadeira, ela é falsa quando a proposição original é verdadeira.`,
  },
  {
    id: 34,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    subtopic: 'Conectivos Lógicos',
    difficulty: 'medio',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª:

A. Conectivo 'E'
B. Conectivo 'OU'
C. Conectivo 'NÃO'

1. Exige que ambas as variáveis sejam verdadeiras.
2. Aceita uma das variáveis como verdadeira.
3. Inverte o valor de verdade.

A sequência CORRETA é:`,
    options: [
      { letter: 'A', text: `A-1, B-2, C-3.` },
      { letter: 'B', text: `A-2, B-3, C-1.` },
      { letter: 'C', text: `A-3, B-1, C-2.` },
      { letter: 'D', text: `A-2, B-1, C-3.` }
    ],
    correctAnswer: 'A',
    explanation: `A associação correta respeita as definições dos conectivos lógicos.`,
  },
  {
    id: 35,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    subtopic: 'Sequências Numéricas',
    difficulty: 'baixo',
    weight: 2,
    text: `Carlos está analisando a seguinte sequência numérica: 2, 4, 8, 16. Para prever o próximo termo, deve:`,
    options: [
      { letter: 'A', text: `Multiplicar o último termo por 2.` },
      { letter: 'B', text: `Adicionar 2 ao último termo.` },
      { letter: 'C', text: `Subtrair 2 do último termo.` },
      { letter: 'D', text: `Dividir o último termo por 2.` }
    ],
    correctAnswer: 'A',
    explanation: `A sequência é uma progressão geométrica onde cada termo é o dobro do anterior.`,
  },
  {
    id: 36,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Qual das alternativas representa corretamente o valor de verdade da proposição 'P implica Q' quando P é falsa e Q é verdadeira?`,
    options: [
      { letter: 'A', text: `Verdadeiro.` },
      { letter: 'B', text: `Falso.` },
      { letter: 'C', text: `Indeterminado.` },
      { letter: 'D', text: `Nulo.` }
    ],
    correctAnswer: 'A',
    explanation: `'P implica Q' é sempre verdadeira quando P é falsa, independentemente do valor de Q.`,
  },
  {
    id: 37,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Marque a alternativa CORRETA sobre a negação da proposição 'Alguns profissionais são médicos'.`,
    options: [
      { letter: 'A', text: `Todos os profissionais são médicos.` },
      { letter: 'B', text: `Nenhum profissional é médico.` },
      { letter: 'C', text: `A maioria dos profissionais é médico.` },
      { letter: 'D', text: `Alguns profissionais não são médicos.` }
    ],
    correctAnswer: 'D',
    explanation: `A negação da proposição é que existem profissionais que não se enquadram como médicos.`,
  },
  {
    id: 38,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Qual das alternativas representa corretamente a negação da proposição "Todos os gatos são pretos"?`,
    options: [
      { letter: 'A', text: `Nenhum gato é preto.` },
      { letter: 'B', text: `Existem gatos que não são pretos.` },
      { letter: 'C', text: `Alguns gatos são pretos.` },
      { letter: 'D', text: `Todos os gatos são brancos.` }
    ],
    correctAnswer: 'B',
    explanation: `A negação da proposição "Todos os gatos são pretos" é que existem pelo menos alguns gatos que não são pretos.`,
  },
  {
    id: 39,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Sobre equivalências lógicas, avalie:
I. A proposição "P e Q" é equivalente a "¬(¬P ou ¬Q)".
II. A proposição "P ou Q" é equivalente a "¬P e ¬Q".
III. A proposição "P implica Q" é equivalente a "¬P ou Q". Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas I e III.` },
      { letter: 'C', text: `Apenas II e III.` },
      { letter: 'D', text: `Todos estão corretos.` }
    ],
    correctAnswer: 'B',
    explanation: `A proposição I está correta, a II está incorreta, e a III está correta, portanto apenas I e III estão corretas.`,
  },
  {
    id: 40,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Considere a proposição condicional "Se chove, então a rua está molhada". Em qual situação essa proposição é FALSA?`,
    options: [
      { letter: 'A', text: `Quando chove e a rua está molhada.` },
      { letter: 'B', text: `Quando chove e a rua NÃO está molhada.` },
      { letter: 'C', text: `Quando não chove e a rua está molhada.` },
      { letter: 'D', text: `Quando não chove e a rua não está molhada.` }
    ],
    correctAnswer: 'B',
    explanation: `Uma condicional (Se P, então Q) só é FALSA quando o antecedente é verdadeiro e o consequente é falso. Ou seja, quando chove (V) e a rua NÃO está molhada (F).`,
  },
  {
    id: 41,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª, ligando cada proposição a sua tabela-verdade correspondente:`,
    options: [
      { letter: 'A', text: `1 - (I), 2 - (II), 3 - (III)` },
      { letter: 'B', text: `1 - (III), 2 - (I), 3 - (II)` },
      { letter: 'C', text: `1 - (II), 2 - (III), 3 - (I)` },
      { letter: 'D', text: `1 - (I), 2 - (III), 3 - (II)` }
    ],
    correctAnswer: 'A',
    explanation: `A primeira coluna contém proposições que correspondem corretamente às tabelas-verdade na segunda coluna.`,
  },
  {
    id: 42,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Em uma sequência numérica onde cada termo é o dobro do anterior, se o primeiro termo é 3, qual é o quinto termo dessa sequência?`,
    options: [
      { letter: 'A', text: `48` },
      { letter: 'B', text: `24` },
      { letter: 'C', text: `12` },
      { letter: 'D', text: `6` }
    ],
    correctAnswer: 'A',
    explanation: `A sequência é 3, 6, 12, 24, 48, logo o quinto termo é 48.`,
  },
  {
    id: 43,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Todas as alternativas sobre diagramas lógicos estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `Os diagramas lógicos ajudam a visualizar relações entre proposições.` },
      { letter: 'B', text: `Os diagramas lógicos podem ser usados para provar a validade de argumentos.` },
      { letter: 'C', text: `Diagramas lógicos não têm aplicação em raciocínio dedutivo.` },
      { letter: 'D', text: `Diagramas lógicos são ferramentas úteis na lógica formal.` }
    ],
    correctAnswer: 'C',
    explanation: `A alternativa C está incorreta, pois diagramas lógicos são, sim, utilizados em raciocínio dedutivo.`,
  },
  {
    id: 44,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde à proposição "P ou Q" quando P é verdadeira e Q é falsa.`,
    options: [
      { letter: 'A', text: `A proposição é verdadeira.` },
      { letter: 'B', text: `A proposição é falsa.` },
      { letter: 'C', text: `A proposição é indeterminada.` },
      { letter: 'D', text: `A proposição é uma contradição.` }
    ],
    correctAnswer: 'A',
    explanation: `A proposição "P ou Q" é verdadeira se pelo menos uma das partes (P ou Q) for verdadeira, e neste caso P é verdadeira.`,
  },
  {
    id: 45,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Cenário prático: Ana precisa saber se a proposição "Se A então B" é verdadeira. Para isso, deve verificar:`,
    options: [
      { letter: 'A', text: `Se A é verdadeira e B é falsa.` },
      { letter: 'B', text: `Se A é falsa e B é verdadeira.` },
      { letter: 'C', text: `A veracidade de A e B.` },
      { letter: 'D', text: `Se A é verdadeira, independentemente de B.` }
    ],
    correctAnswer: 'A',
    explanation: `A proposição "Se A então B" é falsa somente quando A é verdadeira e B é falsa, logo Ana deve verificar isso.`,
  },
  {
    id: 46,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Qual das alternativas representa adequadamente a tabela-verdade para a proposição "¬(P e Q)"?`,
    options: [
      { letter: 'A', text: `V F F F, F V V V.` },
      { letter: 'B', text: `F V V F, V F F V.` },
      { letter: 'C', text: `V V F F, V F F V.` },
      { letter: 'D', text: `F F V V, V F V F.` }
    ],
    correctAnswer: 'C',
    explanation: `A tabela-verdade para "¬(P e Q)" resulta em V V F F, mostrando que a negação é verdadeira quando P ou Q são falsos.`,
  },
  {
    id: 47,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Qual das alternativas representa corretamente a negação da proposição "Todos os pássaros podem voar"?`,
    options: [
      { letter: 'A', text: `Existem pássaros que não podem voar.` },
      { letter: 'B', text: `Alguns pássaros podem voar.` },
      { letter: 'C', text: `Nenhum pássaro pode voar.` },
      { letter: 'D', text: `Todos os pássaros voam.` }
    ],
    correctAnswer: 'A',
    explanation: `A negação da proposição universal "Todos os pássaros podem voar" é que existe pelo menos um pássaro que não pode voar.`,
  },
  {
    id: 48,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde à tabela-verdade da proposição A ∧ (B ∨ C).`,
    options: [
      { letter: 'A', text: `A proposição é verdadeira somente quando A, B e C são verdadeiras.` },
      { letter: 'B', text: `A proposição é falsa quando A é falsa, independentemente de B e C.` },
      { letter: 'C', text: `A proposição é verdadeira quando A é verdadeira e B ou C é falsa.` },
      { letter: 'D', text: `A proposição é verdadeira em todas as combinações de A, B e C.` }
    ],
    correctAnswer: 'B',
    explanation: `A proposição A ∧ (B ∨ C) é falsa quando A é falsa, independentemente dos valores de B e C.`,
  },
  {
    id: 49,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Sobre equivalências lógicas, avalie: I. "A ∨ B" é equivalente a "¬A → B". II. "A ∧ B" é equivalente a "¬(A → ¬B)". III. "¬(A ∧ B)" é equivalente a "¬A ∨ ¬B". Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II e III.` },
      { letter: 'C', text: `Todas as afirmações estão corretas.` },
      { letter: 'D', text: `Apenas III.` }
    ],
    correctAnswer: 'C',
    explanation: `Todas as afirmações são equivalências lógicas corretas, conforme as regras da lógica proposicional.`,
  },
  {
    id: 50,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    subtopic: 'Equivalências Lógicas',
    difficulty: 'medio',
    weight: 2,
    text: `Considere a proposição: "Se chove, então o solo está molhado". 

Sobre suas equivalências lógicas, é CORRETO afirmar que:`,
    options: [
      { letter: 'A', text: `"Se o solo não está molhado, então não chove" é equivalente (contrapositiva).` },
      { letter: 'B', text: `"Se o solo está molhado, então chove" é equivalente (recíproca).` },
      { letter: 'C', text: `"Se não chove, então o solo não está molhado" é equivalente (inversa).` },
      { letter: 'D', text: `Nenhuma das proposições acima é logicamente equivalente.` }
    ],
    correctAnswer: 'A',
    explanation: `A contrapositiva de "P → Q" é "¬Q → ¬P", que é sempre equivalente. A recíproca (Q → P) e a inversa (¬P → ¬Q) NÃO são equivalentes à original.`,
    tags: ['contrapositiva', 'equivalência lógica', 'condicional'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 51,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Todas as alternativas são proposições verdadeiras, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `"2 + 2 = 4".` },
      { letter: 'B', text: `"O céu é azul durante o dia.".` },
      { letter: 'C', text: `"Todos os triângulos têm quatro lados.".` },
      { letter: 'D', text: `"A água ferve a 100 °C ao nível do mar.".` }
    ],
    correctAnswer: 'C',
    explanation: `A afirmação "Todos os triângulos têm quatro lados" é falsa, pois um triângulo tem três lados.`,
  },
  {
    id: 52,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª em relação às operações lógicas:
1. Conjunção 2. Disjunção 3. Negação.  A. "A ∧ B"  B. "¬A"  C. "A ∨ B".`,
    options: [
      { letter: 'A', text: `1-A, 2-C, 3-B.` },
      { letter: 'B', text: `1-B, 2-C, 3-A.` },
      { letter: 'C', text: `1-C, 2-B, 3-A.` },
      { letter: 'D', text: `1-A, 2-B, 3-C.` }
    ],
    correctAnswer: 'A',
    explanation: `A conjunção é representada por "A ∧ B", a disjunção por "A ∨ B" e a negação por "¬A".`,
  },
  {
    id: 53,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `[Maria] está organizando uma sequência de números para um projeto. Ela notou que a sequência começa em 2 e aumenta em 3 a cada passo: 2, 5, 8, 11. Para descobrir o próximo número da sequência, deve:`,
    options: [
      { letter: 'A', text: `Somar 3 ao último número da sequência.` },
      { letter: 'B', text: `Multiplicar o último número por 3.` },
      { letter: 'C', text: `Subtrair 3 do último número da sequência.` },
      { letter: 'D', text: `Adicionar 2 ao último número da sequência.` }
    ],
    correctAnswer: 'A',
    explanation: `A sequência é aritmética com razão 3, portanto, o próximo número é 11 + 3 = 14.`,
  },
  {
    id: 54,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Qual das alternativas representa corretamente a validade do argumento: "Se P, então Q. P. Portanto, Q."?`,
    options: [
      { letter: 'A', text: `O argumento é inválido, pois a conclusão não se segue das premissas.` },
      { letter: 'B', text: `O argumento é válido e se baseia na regra do modus tollens.` },
      { letter: 'C', text: `O argumento é válido e se baseia na regra do modus ponens.` },
      { letter: 'D', text: `O argumento é inválido, pois a conclusão não pode ser verdadeira.` }
    ],
    correctAnswer: 'C',
    explanation: `O argumento é válido e se baseia na regra do modus ponens, onde se P é verdadeiro e P implica Q, então Q também é verdadeiro.`,
  },
  {
    id: 55,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    weight: 2,
    text: `Sobre a sequência numérica 3, 6, 12, 24, 48, avalie as afirmações:
I. Os números são resultados da multiplicação do anterior por 2.
II. O próximo número deve ser 96.
III. A sequência é uma progressão aritmética. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas III.` },
      { letter: 'C', text: `Apenas I.` },
      { letter: 'D', text: `Todas as afirmações estão corretas.` }
    ],
    correctAnswer: 'A',
    explanation: `As afirmações I e II estão corretas. A sequência não é uma progressão aritmética, mas uma progressão geométrica.`,
  },
  {
    id: 56,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    subtopic: 'Princípios Constitucionais',
    difficulty: 'medio',
    weight: 2,
    text: `Qual das alternativas representa corretamente um dos princípios fundamentais da Constituição Federal de 1988?`,
    options: [
      { letter: 'A', text: `A promoção do bem comum é um dos princípios fundamentais, sendo obrigatório a todos os cidadãos.` },
      { letter: 'B', text: `A dignidade da pessoa humana é um dos princípios fundamentais, servindo como base para a construção dos direitos e garantias fundamentais.` },
      { letter: 'C', text: `A soberania é um princípio que se aplica apenas às relações internacionais do Brasil.` },
      { letter: 'D', text: `A cidadania é um princípio que se restrige apenas aos cidadãos natos do Brasil.` }
    ],
    correctAnswer: 'B',
    explanation: `A dignidade da pessoa humana é um dos princípios fundamentais da Constituição Federal, estabelecendo a base para os direitos e garantias fundamentais.`,
  },
  {
    id: 57,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    subtopic: 'Direitos Fundamentais',
    difficulty: 'medio',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde aos direitos e garantias fundamentais previstos na Constituição Federal.`,
    options: [
      { letter: 'A', text: `Os direitos fundamentais são exclusivos para os cidadãos brasileiros, não se aplicando aos estrangeiros.` },
      { letter: 'B', text: `Os direitos à vida, à liberdade e à propriedade são considerados direitos fundamentais e são invioláveis.` },
      { letter: 'C', text: `Os direitos sociais, como o direito à educação e à saúde, são considerados secundários em relação aos direitos civis.` },
      { letter: 'D', text: `A Constituição garante direitos e garantias apenas a pessoas físicas, excluindo pessoas jurídicas.` }
    ],
    correctAnswer: 'B',
    explanation: `Os direitos à vida, à liberdade e à propriedade são reconhecidos como direitos fundamentais e sua inviolabilidade é garantida pela Constituição.`,
  },
  {
    id: 58,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    subtopic: 'Organização do Estado',
    difficulty: 'medio',
    weight: 2,
    text: `Sobre a organização do Estado brasileiro, avalie as afirmativas:
I. O Brasil é uma República Federativa composta pela união de Estados, Municípios e Distrito Federal.
II. A União é responsável por legislar sobre todos os temas, não existindo competências concorrentes.
III. Os Estados possuem autonomia para criar suas próprias leis, desde que respeitadas as normas federais. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `Apenas III.` },
      { letter: 'D', text: `I e III.` }
    ],
    correctAnswer: 'D',
    explanation: `A afirmativa I está correta ao afirmar que o Brasil é uma República Federativa. A afirmativa III também está correta, pois os Estados possuem autonomia, enquanto a II é falsa, pois existem competências concorrentes.`,
  },
  {
    id: 59,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Sobre o princípio da legalidade na Administração Pública, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `A Administração só pode agir conforme a lei, enquanto os administrados podem fazer tudo o que a lei não proíbe.` },
      { letter: 'B', text: `A Administração e os administrados podem fazer tudo o que a lei não proíbe.` },
      { letter: 'C', text: `A Administração pode agir livremente, desde que não contrarie a lei expressamente.` },
      { letter: 'D', text: `O princípio da legalidade aplica-se apenas aos administrados, não à Administração Pública.` }
    ],
    correctAnswer: 'A',
    explanation: `O princípio da legalidade possui duas faces: para a Administração Pública, significa que ela só pode fazer o que a lei autoriza; para os particulares (administrados), significa que podem fazer tudo o que a lei não proíbe.`,
  },
  {
    id: 60,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    subtopic: 'Princípios da Administração Pública',
    difficulty: 'medio',
    weight: 2,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `A Administração Pública deve observar os princípios da transparência e da publicidade.` },
      { letter: 'B', text: `O controle social é um dos mecanismos que garantem a accountability na gestão pública.` },
      { letter: 'C', text: `A moralidade administrativa não precisa ser considerada nas ações da Administração Pública.` },
      { letter: 'D', text: `Os atos administrativos devem ser motivados nos casos em que a lei exigir.` }
    ],
    correctAnswer: 'C',
    explanation: `A alternativa C é a única que está incorreta, pois a moralidade administrativa é um princípio fundamental que deve ser considerado em todas as ações da Administração Pública.`,
  },
  {
    id: 61,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Sobre o princípio da LEGALIDADE na Administração Pública, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `A Administração só pode fazer o que a lei autoriza ou determina.` },
      { letter: 'B', text: `A Administração pode fazer tudo que a lei não proíbe expressamente.` },
      { letter: 'C', text: `A legalidade permite ao gestor agir conforme sua conveniência.` },
      { letter: 'D', text: `O princípio da legalidade aplica-se apenas ao setor privado.` }
    ],
    correctAnswer: 'A',
    explanation: `O princípio da legalidade para a Administração Pública significa que ela só pode fazer aquilo que a lei expressamente autoriza ou determina, diferente dos particulares que podem fazer tudo que a lei não proíbe.`,
  },
  {
    id: 62,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `[Carlos] está analisando a legalidade de um ato administrativo que foi publicado sem a devida motivação. Para garantir a legalidade e a moralidade do ato, deve:`,
    options: [
      { letter: 'A', text: `Aprovar o ato, pois a falta de motivação não é um vício grave.` },
      { letter: 'B', text: `Anular o ato, já que a falta de motivação compromete sua validade.` },
      { letter: 'C', text: `Solicitar a revisão do ato apenas se houver reclamações.` },
      { letter: 'D', text: `Publicar uma nova edital justificando a ausência de motivação.` }
    ],
    correctAnswer: 'B',
    explanation: `A falta de motivação em um ato administrativo compromete sua validade. Carlos deve anular o ato para garantir a legalidade e a moralidade.`,
  },
  {
    id: 63,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde à administração pública indireta.`,
    options: [
      { letter: 'A', text: `A administração pública indireta é composta exclusivamente por entidades da sociedade civil.` },
      { letter: 'B', text: `As autarquias, fundações públicas e empresas estatais são exemplos de entidades da administração pública indireta.` },
      { letter: 'C', text: `As entidades da administração pública indireta não estão sujeitas ao controle da administração pública direta.` },
      { letter: 'D', text: `A administração pública indireta não possui vínculos com a União.` }
    ],
    correctAnswer: 'B',
    explanation: `As autarquias, fundações públicas e empresas estatais realmente constituem a administração pública indireta e estão vinculadas à administração pública direta.`,
  },
  {
    id: 64,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Sobre os direitos sociais previstos na Constituição Federal, avalie:
I. O direito à educação é garantido para todos os cidadãos, sem distinção.
II. O direito à saúde é considerado um direito fundamental, vinculando o Estado a fornecer serviços de saúde à população.
III. O direito à moradia é um direito que não pode ser exigido judicialmente. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `Apenas III.` },
      { letter: 'D', text: `I e II.` }
    ],
    correctAnswer: 'D',
    explanation: `As afirmativas I e II estão corretas, pois o direito à educação e à saúde são garantidos pela Constituição. A afirmativa III é falsa, pois o direito à moradia pode ser exigido judicialmente.`,
  },
  {
    id: 65,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde ao conceito de improbidade administrativa segundo a Lei 8.429/92.`,
    options: [
      { letter: 'A', text: `Improbidade administrativa é a prática de atos que visam somente o enriquecimento ilícito do agente público.` },
      { letter: 'B', text: `Improbidade administrativa compreende ações ou omissões que atentem contra os princípios da administração pública, causando prejuízo ao erário.` },
      { letter: 'C', text: `Improbidade administrativa está restrita a atos de corrupção e desvio de verbas públicas.` },
      { letter: 'D', text: `Improbidade administrativa envolve apenas a má gestão de recursos públicos, sem implicar em penalidades para os agentes.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B está correta, pois define a improbidade administrativa como ações ou omissões que violam os princípios administrativos e causam danos ao patrimônio público.`,
  },
  {
    id: 66,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Sobre a Lei de Acesso à Informação (Lei 12.527/2011), avalie:
I. A lei garante o direito de acesso à informação a qualquer pessoa, independentemente de justificativa.
II. As informações sigilosas podem ser mantidas por tempo indeterminado.
III. A lei estabelece prazos para resposta aos pedidos de informação. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas I e III.` },
      { letter: 'C', text: `Apenas II e III.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B está correta, pois a Lei de Acesso à Informação garante o direito de acesso à informação (I) e estabelece prazos para resposta (III), enquanto II está errada, pois informações sigilosas têm prazos definidos para revisão.`,
  },
  {
    id: 67,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Qual das alternativas representa corretamente um dos princípios fundamentais da Constituição Federal do Brasil?`,
    options: [
      { letter: 'A', text: `A dignidade da pessoa humana é considerada um dos princípios fundamentais que regem a ordem econômica e social do país.` },
      { letter: 'B', text: `A busca pela igualdade é um princípio que deve ser respeitado apenas nas relações entre o Estado e os cidadãos.` },
      { letter: 'C', text: `A soberania nacional é um princípio que deve ser observado em todas as esferas da administração pública.` },
      { letter: 'D', text: `A solidariedade social é um princípio fundamental que deve ser considerado apenas em políticas públicas específicas.` }
    ],
    correctAnswer: 'C',
    explanation: `A alternativa C é correta, pois a soberania nacional é um princípio fundamental que orienta a atuação do Estado em todas as suas esferas.`,
  },
  {
    id: 68,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Sobre o direito de acesso à informação na Constituição Federal de 1988, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `Todos têm direito ao acesso à informação, podendo ser limitado por interesse público ou segurança nacional.` },
      { letter: 'B', text: `O acesso à informação é garantido apenas a servidores públicos.` },
      { letter: 'C', text: `Não há previsão constitucional sobre acesso à informação.` },
      { letter: 'D', text: `O direito de acesso à informação não pode sofrer qualquer limitação.` }
    ],
    correctAnswer: 'A',
    explanation: `A Constituição garante o direito de acesso à informação (art. 5º, XXXIII), permitindo restrições quando imprescindível à segurança da sociedade e do Estado.`,
  },
  {
    id: 69,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Todas as afirmações sobre improbidade administrativa estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `A improbidade administrativa pode ocorrer tanto por ação quanto por omissão do agente público.` },
      { letter: 'B', text: `A lei prevê sanções que incluem a perda da função pública, suspensão dos direitos políticos e multa.` },
      { letter: 'C', text: `A improbidade administrativa se refere exclusivamente a atos que causam dano ao erário.` },
      { letter: 'D', text: `A prática de atos de improbidade administrativa pode resultar em responsabilização civil e criminal.` }
    ],
    correctAnswer: 'C',
    explanation: `A alternativa C é a única incorreta, pois a improbidade administrativa abrange atos que atentam contra os princípios da administração e não se limita apenas ao dano ao erário.`,
  },
  {
    id: 70,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª, relacionando os direitos e garantias fundamentais previstos na Constituição Federal com suas respectivas categorias:
I. Direitos sociais
II. Direitos civis
III. Direitos políticos. A. Liberdade de expressão B. Direito à educação C. Direito de votar.`,
    options: [
      { letter: 'A', text: `I-A, II-B, III-C` },
      { letter: 'B', text: `I-C, II-A, III-B` },
      { letter: 'C', text: `I-B, II-C, III-A` },
      { letter: 'D', text: `I-B, II-A, III-C` }
    ],
    correctAnswer: 'D',
    explanation: `A alternativa D está correta, pois relaciona corretamente os direitos: I-B (Direito à educação), II-A (Liberdade de expressão) e III-C (Direito de votar).`,
  },
  {
    id: 71,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Em um cenário prático, João, servidor público, descobre que um colega está praticando atos de improbidade administrativa. Para cumprir seu dever de responsabilidade, deve:`,
    options: [
      { letter: 'A', text: `Ignorar a situação, já que não é do seu interesse pessoal.` },
      { letter: 'B', text: `Comunicar imediatamente suas suspeitas aos órgãos competentes para investigação.` },
      { letter: 'C', text: `Aguardar que outros servidores tomem a iniciativa de denunciar.` },
      { letter: 'D', text: `Fazer uma denúncia anônima apenas se for conveniente.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B é correta, pois João deve comunicar imediatamente suas suspeitas aos órgãos competentes, uma vez que é seu dever agir em defesa da legalidade e do interesse público.`,
  },
  {
    id: 72,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Qual das alternativas representa corretamente a estrutura do Estado brasileiro segundo a Constituição Federal?`,
    options: [
      { letter: 'A', text: `O Estado brasileiro é composto apenas pela União, Estados e Municípios, sem a participação do Distrito Federal.` },
      { letter: 'B', text: `O Estado brasileiro é organizado em três esferas: União, Estados e Municípios, sendo o Distrito Federal uma unidade federativa com autonomia.` },
      { letter: 'C', text: `O Estado brasileiro organiza-se apenas em esferas administrativas, sem considerar a divisão em entes federativos.` },
      { letter: 'D', text: `A Constituição não define a organização do Estado, permitindo liberdade total aos legisladores.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B está correta, pois descreve corretamente a estrutura do Estado brasileiro, com a inclusão do Distrito Federal como uma unidade federativa.`,
  },
  {
    id: 73,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Marque a alternativa CORRETA sobre a função do controle social na administração pública.`,
    options: [
      { letter: 'A', text: `O controle social é um mecanismo que apenas serve para punir os administradores públicos em caso de irregularidades.` },
      { letter: 'B', text: `O controle social é essencial para promover a transparência e a accountability na gestão pública.` },
      { letter: 'C', text: `O controle social não possui relevância na avaliação das políticas públicas.` },
      { letter: 'D', text: `O controle social deve ser exercido exclusivamente pelos órgãos de controle interno do governo.` }
    ],
    correctAnswer: 'B',
    explanation: `A alternativa B é correta, pois o controle social é fundamental para garantir a transparência e a accountability, permitindo que a sociedade fiscalize e participe da administração pública.`,
  },
  {
    id: 74,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Qual das alternativas representa corretamente a responsabilidade civil do Estado segundo a Constituição Federal?`,
    options: [
      { letter: 'A', text: `O Estado não pode ser responsabilizado por danos causados a terceiros em decorrência de atos administrativos.` },
      { letter: 'B', text: `A responsabilidade civil do Estado é objetiva, ou seja, independe da culpa em casos de danos causados por sua ação.` },
      { letter: 'C', text: `O Estado somente responde civilmente quando agir com dolo.` },
      { letter: 'D', text: `A responsabilidade civil do Estado é sempre subsidiária, devendo primeiro ser acionado o responsável pelo ato.` }
    ],
    correctAnswer: 'B',
    explanation: `A Constituição Federal prevê, em seu artigo 37, § 6º, que a responsabilidade civil do Estado é objetiva, ou seja, a Administração Pública deve indenizar os danos causados por suas ações, independentemente de culpa.`,
  },
  {
    id: 75,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Marque a alternativa CORRETA que corresponde ao controle da Administração Pública.`,
    options: [
      { letter: 'A', text: `O controle da Administração Pública é exclusivamente realizado pelo Poder Judiciário, que é o único competente para fiscalizar atos administrativos.` },
      { letter: 'B', text: `O controle da Administração Pública pode ser exercido pelo Poder Legislativo, Poder Judiciário e pela própria Administração, assegurando a legalidade e eficiência.` },
      { letter: 'C', text: `O controle social não se aplica à Administração Pública, pois esta é fiscalizada apenas pelos órgãos internos do governo.` },
      { letter: 'D', text: `A fiscalização dos atos administrativos é desnecessária, uma vez que a Administração Pública atua sempre dentro da legalidade.` }
    ],
    correctAnswer: 'B',
    explanation: `O controle da Administração Pública envolve a atuação do Poder Legislativo, que exerce o controle externo; do Poder Judiciário, que pode anular atos administrativos; e do controle interno, que é realizado pela própria Administração.`,
  },
  {
    id: 76,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Sobre a improbidade administrativa, avalie:
I. A Lei 8.429/1992 estabelece as condutas que configuram improbidade administrativa.
II. Apenas a perda do cargo é uma das penalidades previstas para os atos de improbidade.
III. A lei prevê a possibilidade de sanções civis além das administrativas. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas II e III.` },
      { letter: 'C', text: `Apenas I e III.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'C',
    explanation: `A Lei 8.429/1992 realmente define condutas que configuram improbidade administrativa (I) e prevê sanções civis, como ressarcimento ao erário, mas a perda do cargo é apenas uma das penalidades, e não uma exclusividade (II), portanto, a combinação correta é I e III.`,
  },
  {
    id: 77,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Sobre a Lei de Acesso à Informação (Lei 12.527/2011) e as informações pessoais, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `Informações pessoais de cidadãos são sempre públicas e de livre acesso.` },
      { letter: 'B', text: `Informações pessoais têm acesso restrito, independentemente de classificação, pelo prazo máximo de 100 anos.` },
      { letter: 'C', text: `A lei não trata sobre informações pessoais, apenas documentos públicos.` },
      { letter: 'D', text: `Qualquer pessoa pode acessar dados pessoais de terceiros sem restrição.` }
    ],
    correctAnswer: 'B',
    explanation: `A Lei de Acesso à Informação protege informações pessoais, que têm acesso restrito pelo prazo máximo de 100 anos a partir da data de produção, garantindo a privacidade dos cidadãos.`,
  },
  {
    id: 78,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `A Administração Pública deve observar o princípio da legalidade em seus atos.` },
      { letter: 'B', text: `O controle da Administração Pública pode ser realizado apenas pelo Poder Legislativo.` },
      { letter: 'C', text: `Os atos administrativos devem ser motivados, salvo exceções previstas em lei.` },
      { letter: 'D', text: `A eficiência é um dos princípios que regem a Administração Pública.` }
    ],
    correctAnswer: 'B',
    explanation: `A afirmação de que o controle da Administração Pública é realizado apenas pelo Poder Legislativo é falsa, pois também envolve o Poder Judiciário e controle interno. As demais afirmações estão corretas.`,
  },
  {
    id: 79,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Associe a 2ª coluna com a 1ª, relacionando os princípios fundamentais da Constituição Federal com suas definições:
I. Legalidade
II. Impessoalidade
III. Moralidade
IV. Publicidade
V. Eficiência. Está correto:`,
    options: [
      { letter: 'A', text: `I-4, II-1, III-3, IV-2, V-5.` },
      { letter: 'B', text: `I-1, II-2, III-3, IV-4, V-5.` },
      { letter: 'C', text: `I-5, II-4, III-3, IV-2, V-1.` },
      { letter: 'D', text: `I-2, II-3, III-1, IV-4, V-5.` }
    ],
    correctAnswer: 'B',
    explanation: `A correta associação é: I-1 (Legalidade: todos devem obedecer a lei), II-2 (Impessoalidade: o serviço é prestado sem favorecimento), III-3 (Moralidade: atos devem ser éticos), IV-4 (Publicidade: atos devem ser divulgados), V-5 (Eficiência: busca por resultados eficazes).`,
  },
  {
    id: 80,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `[João] está insatisfeito com a demora na resposta a um pedido de informação que realizou ao governo. Para garantir seu direito, deve:`,
    options: [
      { letter: 'A', text: `Aguardar o prazo de 30 dias antes de tomar qualquer providência.` },
      { letter: 'B', text: `Recorrer ao Judiciário imediatamente, sem esperar resposta.` },
      { letter: 'C', text: `Utilizar o recurso administrativo junto ao órgão que não respondeu.` },
      { letter: 'D', text: `Desistir do pedido, pois o prazo já foi longo.` }
    ],
    correctAnswer: 'C',
    explanation: `João deve utilizar o recurso administrativo, conforme previsto na Lei de Acesso à Informação, que garante o direito ao recurso em caso de negativa ou não resposta.`,
  },
  {
    id: 81,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Qual das alternativas descreve corretamente as sanções previstas na Lei de Improbidade Administrativa?`,
    options: [
      { letter: 'A', text: `As sanções incluem apenas a suspensão dos direitos políticos por até cinco anos.` },
      { letter: 'B', text: `São previstas sanções como a perda da função pública, ressarcimento ao erário e suspensão dos direitos políticos.` },
      { letter: 'C', text: `A única sanção prevista é a multa, independente da gravidade do ato.` },
      { letter: 'D', text: `As sanções são apenas administrativas e não envolvem responsabilização civil.` }
    ],
    correctAnswer: 'B',
    explanation: `A Lei de Improbidade Administrativa prevê diversas sanções, que incluem a perda da função pública, ressarcimento ao erário, suspensão dos direitos políticos, entre outras.`,
  },
  {
    id: 82,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    weight: 2,
    text: `Marque a alternativa CORRETA em relação à Lei de Acesso à Informação (Lei 12.527/2011).`,
    options: [
      { letter: 'A', text: `A lei aplica-se apenas a órgãos da União, não abrangendo estados ou municípios.` },
      { letter: 'B', text: `Todos têm direito a solicitar informações, sendo vedada a recusa em atender a pedidos de acesso.` },
      { letter: 'C', text: `As informações sigilosas podem ser acessadas por qualquer cidadão mediante simples solicitação.` },
      { letter: 'D', text: `O prazo para resposta aos pedidos de informação é de 60 dias, podendo ser prorrogado.` }
    ],
    correctAnswer: 'B',
    explanation: `A Lei de Acesso à Informação garante a qualquer cidadão o direito de solicitar informações, sujeitando a Administração Pública a atender os pedidos, salvo exceções previstas na lei.`,
  },
  {
    id: 83,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Metodologias Ágeis',
    difficulty: 'baixo',
    weight: 3,
    text: `Qual das alternativas representa corretamente uma característica do desenvolvimento ágil de software?`,
    options: [
      { letter: 'A', text: `O desenvolvimento ágil é um processo linear e sequencial.` },
      { letter: 'B', text: `O desenvolvimento ágil prioriza a colaboração entre equipes e a flexibilidade em relação a mudanças.` },
      { letter: 'C', text: `O desenvolvimento ágil não permite a interação com o cliente durante o ciclo de vida do projeto.` },
      { letter: 'D', text: `O desenvolvimento ágil deve seguir estritamente um conjunto de regras fixas.` }
    ],
    correctAnswer: 'B',
    explanation: `O desenvolvimento ágil prioriza a colaboração e a flexibilidade, permitindo adaptação às mudanças nas necessidades do cliente.`,
  },
  {
    id: 84,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'UML',
    difficulty: 'baixo',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde a um tipo de diagrama da UML 2.5.`,
    options: [
      { letter: 'A', text: `Diagrama de fluxo de dados.` },
      { letter: 'B', text: `Diagrama de classe.` },
      { letter: 'C', text: `Diagrama de entidade-relacionamento.` },
      { letter: 'D', text: `Diagrama de estrutura organizacional.` }
    ],
    correctAnswer: 'B',
    explanation: `O diagrama de classe é um dos principais diagramas da UML, utilizado para representar a estrutura de classes de um sistema.`,
  },
  {
    id: 85,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Metodologias Ágeis',
    difficulty: 'medio',
    weight: 3,
    text: `Sobre as metodologias ágeis de desenvolvimento de software, avalie:
I. Scrum é uma metodologia que utiliza sprints para entregas incrementais.
II. Kanban foca em visualizar o trabalho e limitar o trabalho em progresso.
III. XP (Extreme Programming) é uma metodologia que enfatiza a programação em pares e testes contínuos. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `Apenas III.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'D',
    explanation: `Todas as afirmações estão corretas e descrevem características importantes das metodologias ágeis.`,
  },
  {
    id: 86,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Arquitetura de Software',
    difficulty: 'medio',
    weight: 3,
    text: `Sobre a arquitetura de microsserviços, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `Permite construir sistemas como um conjunto de serviços independentes que se comunicam via APIs.` },
      { letter: 'B', text: `Exige que todos os serviços compartilhem o mesmo banco de dados.` },
      { letter: 'C', text: `Só pode ser utilizada em sistemas pequenos e simples.` },
      { letter: 'D', text: `Não permite deploy independente dos serviços.` }
    ],
    correctAnswer: 'A',
    explanation: `A arquitetura de microsserviços é baseada em serviços independentes, com bancos de dados próprios, comunicação via APIs e deploy independente.`,
  },
  {
    id: 87,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Padrões de Projeto',
    difficulty: 'medio',
    weight: 3,
    text: `Todas as afirmações sobre padrões de projeto do GoF estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `Os padrões criacionais tratam da criação de objetos.` },
      { letter: 'B', text: `Os padrões estruturais abordam a forma como os objetos se relacionam.` },
      { letter: 'C', text: `Os padrões comportamentais focam na interação entre objetos.` },
      { letter: 'D', text: `Os padrões do GoF não são aplicáveis em sistemas de software.` }
    ],
    correctAnswer: 'D',
    explanation: `Os padrões de projeto do GoF são amplamente aplicáveis em sistemas de software, e a afirmativa D é falsa.`,
  },
  {
    id: 88,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Arquitetura de Software',
    difficulty: 'medio',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª:
I. MVC
II. SOA
III. REST
IV. API. Para a 

1ª coluna, as opções são: A. Arquitetura de software. B. Estilo de arquitetura que utiliza serviços. C. Interação entre componentes. D. Padrão arquitetural de representação de recursos.`,
    options: [
      { letter: 'A', text: `I-A, II-B, III-D, IV-C.` },
      { letter: 'B', text: `I-C, II-A, III-B, IV-D.` },
      { letter: 'C', text: `I-B, II-C, III-A, IV-D.` },
      { letter: 'D', text: `I-D, II-A, III-B, IV-C.` }
    ],
    correctAnswer: 'A',
    explanation: `A associação correta é I-A (MVC é um padrão arquitetural), II-B (SOA utiliza serviços), III-D (REST representa recursos) e IV-C (API interage entre componentes).`,
  },
  {
    id: 89,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'DevOps',
    difficulty: 'medio',
    weight: 3,
    text: `[Nome] é um Analista de Sistemas e deve implementar um pipeline de CI/CD para automatizar os testes e a entrega de software. Para garantir a consistência e o versionamento do código, ele deve utilizar:`,
    options: [
      { letter: 'A', text: `Docker, para criar contêineres de aplicação.` },
      { letter: 'B', text: `Kubernetes, para orquestrar ambientes de contêineres.` },
      { letter: 'C', text: `Git, para controle de versão do código-fonte.` },
      { letter: 'D', text: `Jenkins, para gerenciar o fluxo de integração contínua.` }
    ],
    correctAnswer: 'C',
    explanation: `Git é a ferramenta mais utilizada para controle de versão do código-fonte, fundamental para um pipeline de CI/CD.`,
  },
  {
    id: 90,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'DevOps',
    difficulty: 'medio',
    weight: 3,
    text: `Qual das seguintes opções é uma estratégia comum utilizada em DevOps para facilitar a entrega contínua de software?`,
    options: [
      { letter: 'A', text: `Realizar testes manuais antes de cada entrega.` },
      { letter: 'B', text: `Implementar pipelines de CI/CD para automação do processo.` },
      { letter: 'C', text: `Desenvolver as funcionalidades de forma isolada sem integração.` },
      { letter: 'D', text: `Esperar longos períodos entre as entregas para evitar erros.` }
    ],
    correctAnswer: 'B',
    explanation: `A implementação de pipelines de CI/CD é uma prática central em DevOps que permite a automação e agilidade nos processos de entrega.`,
  },
  {
    id: 91,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Sobre o padrão de projeto Singleton, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `Garante que uma classe tenha apenas uma instância e fornece um ponto global de acesso.` },
      { letter: 'B', text: `Permite criar múltiplas instâncias de uma classe de forma controlada.` },
      { letter: 'C', text: `É um padrão estrutural que define a composição de objetos.` },
      { letter: 'D', text: `É usado exclusivamente para criar interfaces de usuário.` }
    ],
    correctAnswer: 'A',
    explanation: `O padrão Singleton é um padrão criacional que garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a ela.`,
  },
  {
    id: 92,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas representa corretamente um dos principais benefícios da normalização em bancos de dados relacionais?`,
    options: [
      { letter: 'A', text: `A normalização aumenta a redundância de dados, facilitando a recuperação.` },
      { letter: 'B', text: `A normalização elimina a redundância de dados, melhorando a integridade.` },
      { letter: 'C', text: `A normalização permite a inserção de dados sem restrições.` },
      { letter: 'D', text: `A normalização prejudica a performance da consulta aos dados.` }
    ],
    correctAnswer: 'B',
    explanation: `A normalização é um processo que visa eliminar redundâncias e garantir a integridade dos dados, facilitando a manutenção do banco de dados.`,
  },
  {
    id: 93,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde ao conceito de NoSQL.`,
    options: [
      { letter: 'A', text: `NoSQL refere-se exclusivamente a bancos de dados relacionais.` },
      { letter: 'B', text: `NoSQL é uma abordagem de banco de dados que suporta modelos não relacionais.` },
      { letter: 'C', text: `NoSQL implica na obrigatoriedade de uso de SQL como linguagem de consulta.` },
      { letter: 'D', text: `NoSQL é sinônimo de bancos de dados em nuvem.` }
    ],
    correctAnswer: 'B',
    explanation: `NoSQL é uma abordagem que abrange vários tipos de bancos de dados, incluindo documentos, chave-valor e grafos, que não seguem o modelo relacional tradicional.`,
  },
  {
    id: 94,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Sobre segurança da informação, avalie as afirmações:
I. A criptografia simétrica utiliza a mesma chave para encriptar e decriptar dados.
II. Certificados digitais são utilizados para garantir a autenticidade e integridade de informações.
III. A LGPD não se aplica a dados coletados para fins acadêmicos. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas II e III.` },
      { letter: 'C', text: `I, II e III.` },
      { letter: 'D', text: `Apenas I.` }
    ],
    correctAnswer: 'A',
    explanation: `A afirmação I é verdadeira, a II também, mas a III é incorreta, pois a LGPD se aplica a qualquer dado pessoal, independentemente do contexto.`,
  },
  {
    id: 95,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Sobre o protocolo TCP (Transmission Control Protocol) em redes de computadores, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `É responsável por garantir a entrega confiável dos pacotes, com controle de ordem e erros.` },
      { letter: 'B', text: `Não garante a entrega dos pacotes, sendo um protocolo não orientado à conexão.` },
      { letter: 'C', text: `É utilizado apenas para transmissão de vídeo em tempo real.` },
      { letter: 'D', text: `Opera na camada física do modelo OSI.` }
    ],
    correctAnswer: 'A',
    explanation: `O TCP é um protocolo da camada de transporte que oferece entrega confiável de dados, garantindo que os pacotes sejam entregues na ordem correta, sem erros e com confirmação de recebimento.`,
  },
  {
    id: 96,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `IaaS permite que usuários provisionem recursos de computação em nuvem.` },
      { letter: 'B', text: `PaaS oferece um ambiente para desenvolvimento de aplicações sem gerenciar a infraestrutura.` },
      { letter: 'C', text: `SaaS requer que o usuário instale software localmente.` },
      { letter: 'D', text: `Cloud computing pode reduzir custos operacionais e aumentar a flexibilidade.` }
    ],
    correctAnswer: 'C',
    explanation: `SaaS (Software as a Service) não requer instalação local, pois as aplicações são acessadas pela internet, o que é uma de suas principais vantagens.`,
  },
  {
    id: 97,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª referente aos tipos de serviços de Cloud Computing:
I. IaaS
II. PaaS
III. SaaS A) Serviços de Infraestrutura B) Serviços de Plataforma C) Serviços de Aplicação.

A sequência correta é:`,
    options: [
      { letter: 'A', text: `I - A; II - B; III - C.` },
      { letter: 'B', text: `I - B; II - C; III - A.` },
      { letter: 'C', text: `I - C; II - A; III - B.` },
      { letter: 'D', text: `I - A; II - C; III - B.` }
    ],
    correctAnswer: 'A',
    explanation: `A associação correta é IaaS com Infraestrutura, PaaS com Plataforma e SaaS com Aplicação, conforme a definição de cada serviço.`,
  },
  {
    id: 98,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `[Carlos] está desenvolvendo um sistema que requer alta escalabilidade e flexibilidade de dados. Para atender a essa necessidade, ele deve utilizar:`,
    options: [
      { letter: 'A', text: `Um banco de dados relacional, como MySQL.` },
      { letter: 'B', text: `Um banco de dados NoSQL, como MongoDB.` },
      { letter: 'C', text: `Um sistema de arquivos tradicional.` },
      { letter: 'D', text: `Um banco de dados em nuvem com SQL.` }
    ],
    correctAnswer: 'B',
    explanation: `Um banco de dados NoSQL, como MongoDB, é ideal para aplicações que requerem alta escalabilidade e flexibilidade na manipulação de dados não estruturados.`,
  },
  {
    id: 99,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas que se segue descreve corretamente uma das principais funções da criptografia na segurança da informação?`,
    options: [
      { letter: 'A', text: `A criptografia é utilizada apenas para autenticar usuários em sistemas.` },
      { letter: 'B', text: `A criptografia assegura que apenas usuários autorizados possam acessar e ler informações.` },
      { letter: 'C', text: `A criptografia impede a alteração de dados por qualquer usuário.` },
      { letter: 'D', text: `A criptografia é um método de backup de dados.` }
    ],
    correctAnswer: 'B',
    explanation: `A criptografia tem como função principal proteger a confidencialidade das informações, garantindo que apenas usuários autorizados possam acessá-las.`,
  },
  {
    id: 100,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde à afirmação: A LGPD regulamenta a coleta e o tratamento de dados pessoais no Brasil.`,
    options: [
      { letter: 'A', text: `A LGPD se aplica apenas a empresas privadas.` },
      { letter: 'B', text: `A LGPD regulamenta o uso de dados pessoais, independentemente do setor.` },
      { letter: 'C', text: `A LGPD não se aplica a dados anônimos.` },
      { letter: 'D', text: `A LGPD é uma lei que trata exclusivamente de segurança cibernética.` }
    ],
    correctAnswer: 'B',
    explanation: `A LGPD se aplica a todas as empresas e órgãos que tratam dados pessoais, independentemente do setor, visando proteger a privacidade dos indivíduos.`,
  },
  {
    id: 101,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas representa corretamente uma característica das metodologias ágeis?`,
    options: [
      { letter: 'A', text: `As metodologias ágeis não permitem mudanças durante o desenvolvimento do software.` },
      { letter: 'B', text: `As metodologias ágeis enfatizam a colaboração e a flexibilidade nas etapas do projeto.` },
      { letter: 'C', text: `As metodologias ágeis seguem um ciclo de desenvolvimento linear e sequencial.` },
      { letter: 'D', text: `As metodologias ágeis são aplicáveis apenas em projetos de grande escala.` }
    ],
    correctAnswer: 'B',
    explanation: `As metodologias ágeis enfatizam a colaboração e a flexibilidade, permitindo que as equipes façam ajustes conforme necessário ao longo do desenvolvimento.`,
  },
  {
    id: 102,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Engenharia de Software',
    difficulty: 'medio',
    weight: 3,
    text: `Sobre o ciclo de vida do software, avalie as afirmativas:

I. A fase de manutenção é a última do ciclo e concentra-se em correções e atualizações.
II. A manutenção corretiva visa adicionar novas funcionalidades.
III. A manutenção adaptativa ajusta o software a mudanças no ambiente.
IV. A manutenção perfectiva melhora o desempenho sem alterar funcionalidades.

Estão CORRETAS:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas I, III e IV.` },
      { letter: 'C', text: `Apenas II e III.` },
      { letter: 'D', text: `I, II, III e IV.` }
    ],
    correctAnswer: 'B',
    explanation: `I, III e IV estão corretas. II está errada: manutenção corretiva corrige defeitos; a evolutiva adiciona funcionalidades. Tipos: Corretiva (corrige bugs), Adaptativa (adapta ao ambiente), Perfectiva (melhora desempenho), Evolutiva (novas funcionalidades).`,
    tags: ['manutenção de software', 'ciclo de vida', 'engenharia de software'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 103,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Sobre UML 2.5, avalie:
I. O diagrama de classe representa a estrutura de classes de um sistema.
II. O diagrama de sequência mostra a interação entre objetos ao longo do tempo.
III. O diagrama de atividades é utilizado para modelar o comportamento dinâmico de um sistema. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II e III.` },
      { letter: 'C', text: `Todas as afirmativas I, II e III.` },
      { letter: 'D', text: `Apenas I e II.` }
    ],
    correctAnswer: 'C',
    explanation: `Todas as afirmativas estão corretas e descrevem adequadamente os diferentes tipos de diagramas da UML 2.5.`,
  },
  {
    id: 104,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde a um padrão de projeto criacional GoF.`,
    options: [
      { letter: 'A', text: `O padrão Singleton assegura que uma classe tenha apenas uma instância.` },
      { letter: 'B', text: `O padrão Adapter é usado para criar uma nova interface para uma classe existente.` },
      { letter: 'C', text: `O padrão Observer é utilizado para encapsular um algoritmo dentro de uma classe.` },
      { letter: 'D', text: `O padrão Decorator é um padrão estrutural que adiciona responsabilidades a objetos.` }
    ],
    correctAnswer: 'A',
    explanation: `O padrão Singleton garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a essa instância.`,
  },
  {
    id: 105,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Todas as alternativas estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `A arquitetura MVC divide a aplicação em três componentes principais: Modelo, Visão e Controle.` },
      { letter: 'B', text: `A arquitetura SOA é baseada em serviços que se comunicam através de mensagens.` },
      { letter: 'C', text: `A arquitetura REST permite o uso de qualquer protocolo para comunicação entre cliente e servidor.` },
      { letter: 'D', text: `Os microsserviços são independentes e podem ser desenvolvidos e escalados separadamente.` }
    ],
    correctAnswer: 'C',
    explanation: `A arquitetura REST é baseada principalmente no protocolo HTTP, não permitindo o uso de qualquer protocolo para comunicação.`,
  },
  {
    id: 106,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª:
1. CI/CD - A. Containers;
2. Docker - B. Integração e Entrega Contínua;
3. Kubernetes - C. Orquestração de containers.`,
    options: [
      { letter: 'A', text: `1-B; 2-A; 3-C.` },
      { letter: 'B', text: `1-A; 2-C; 3-B.` },
      { letter: 'C', text: `1-C; 2-B; 3-A.` },
      { letter: 'D', text: `1-C; 2-A; 3-B.` }
    ],
    correctAnswer: 'A',
    explanation: `A associação correta é: CI/CD se refere a Integração e Entrega Contínua, Docker está relacionado a Containers, e Kubernetes é usado para Orquestração de containers.`,
  },
  {
    id: 107,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Para um projeto que utiliza a metodologia Scrum, um Analista de Sistemas deve realizar as seguintes atividades, EXCETO:`,
    options: [
      { letter: 'A', text: `Definir as histórias de usuário e priorizá-las no backlog.` },
      { letter: 'B', text: `Organizar reuniões diárias para acompanhar o progresso da equipe.` },
      { letter: 'C', text: `Desenvolver o software individualmente sem interações com a equipe.` },
      { letter: 'D', text: `Fazer a revisão das entregas e coletar feedback do Product Owner.` }
    ],
    correctAnswer: 'C',
    explanation: `Na metodologia Scrum, o trabalho deve ser colaborativo e não pode ser realizado individualmente sem interações com a equipe.`,
  },
  {
    id: 108,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `[Nome] está implementando um sistema baseado em microsserviços. Para garantir a comunicação e a interoperabilidade entre os serviços, deve:`,
    options: [
      { letter: 'A', text: `Utilizar apenas chamadas de função internas, sem comunicação entre serviços.` },
      { letter: 'B', text: `Implementar uma API RESTful para expor os serviços de forma acessível.` },
      { letter: 'C', text: `Concentrar todos os dados em um único banco de dados para simplificar o acesso.` },
      { letter: 'D', text: `Desenvolver todos os microsserviços na mesma linguagem de programação.` }
    ],
    correctAnswer: 'B',
    explanation: `Implementar uma API RESTful é uma prática comum que permite a comunicação clara e acessível entre os microsserviços.`,
  },
  {
    id: 109,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas representa corretamente um dos principais conceitos do PMBOK?`,
    options: [
      { letter: 'A', text: `O PMBOK é um guia que não inclui técnicas específicas de gerenciamento de projetos.` },
      { letter: 'B', text: `O PMBOK define um conjunto de práticas e processos que são aceitos como padrão na gestão de projetos.` },
      { letter: 'C', text: `O PMBOK recomenda a utilização exclusiva de metodologias ágeis em todos os projetos.` },
      { letter: 'D', text: `O PMBOK é um documento que deve ser seguido rigidamente, sem adaptações para cada tipo de projeto.` }
    ],
    correctAnswer: 'B',
    explanation: `O PMBOK define um conjunto de práticas e processos que são aceitos como padrão na gestão de projetos, proporcionando uma abordagem estruturada ao gerenciamento.`,
  },
  {
    id: 110,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde a uma característica das metodologias ágeis.`,
    options: [
      { letter: 'A', text: `As metodologias ágeis priorizam a documentação extensiva em todas as etapas do projeto.` },
      { letter: 'B', text: `As metodologias ágeis promovem adaptações rápidas às mudanças e feedback contínuo dos stakeholders.` },
      { letter: 'C', text: `As metodologias ágeis exigem um planejamento detalhado antes do início do desenvolvimento.` },
      { letter: 'D', text: `As metodologias ágeis não utilizam iterações, focando apenas em entregas finais.` }
    ],
    correctAnswer: 'B',
    explanation: `As metodologias ágeis promovem adaptações rápidas às mudanças e feedback contínuo dos stakeholders, permitindo uma maior flexibilidade no desenvolvimento.`,
  },
  {
    id: 111,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Sobre BPMN 2.0, avalie:
I. BPMN 2.0 é uma notação gráfica para modelagem de processos de negócio.
II. BPMN 2.0 não permite a representação de fluxos de dados.
III. BPMN 2.0 facilita a comunicação entre diferentes partes interessadas. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `Apenas III.` },
      { letter: 'D', text: `I e III.` }
    ],
    correctAnswer: 'D',
    explanation: `BPMN 2.0 é uma notação gráfica para modelagem de processos de negócio que facilita a comunicação entre partes interessadas, enquanto a afirmação II é falsa, pois BPMN pode representar fluxos de dados.`,
  },
  {
    id: 112,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Testes de Software',
    difficulty: 'medio',
    weight: 3,
    text: `Sobre os níveis de teste de software, associe corretamente:

1. Teste Unitário
2. Teste de Integração
3. Teste de Sistema
4. Teste de Aceitação

( ) Verifica a interação entre módulos
( ) Valida requisitos do cliente
( ) Testa unidades individuais de código
( ) Avalia o sistema completo

A sequência CORRETA é:`,
    options: [
      { letter: 'A', text: `2, 4, 1, 3` },
      { letter: 'B', text: `1, 3, 2, 4` },
      { letter: 'C', text: `3, 4, 1, 2` },
      { letter: 'D', text: `2, 3, 1, 4` }
    ],
    correctAnswer: 'A',
    explanation: `Teste de Integração (2) verifica interação entre módulos; Teste de Aceitação (4) valida requisitos do cliente; Teste Unitário (1) testa unidades individuais; Teste de Sistema (3) avalia o sistema completo.`,
    tags: ['testes de software', 'níveis de teste', 'qualidade'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 113,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `TDD (Test-Driven Development) prioriza a escrita de testes antes do código.` },
      { letter: 'B', text: `BDD (Behavior-Driven Development) foca no comportamento do software em vez da implementação.` },
      { letter: 'C', text: `O teste de sistema avalia a integração entre componentes, mas não o sistema como um todo.` },
      { letter: 'D', text: `O teste unitário é focado em verificar funcionalidades específicas de uma unidade de código.` }
    ],
    correctAnswer: 'C',
    explanation: `A alternativa C é incorreta, pois o teste de sistema avalia o sistema como um todo e não apenas a integração entre componentes.`,
  },
  {
    id: 114,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª em relação a linguagens de programação.`,
    options: [
      { letter: 'A', text: `Java - Orientação a objetos e uso em aplicações empresariais.` },
      { letter: 'B', text: `Python - Somente para scripts simples.` },
      { letter: 'C', text: `JavaScript - Uso exclusivo no backend.` },
      { letter: 'D', text: `Ruby - Linguagem sem suporte para desenvolvimento web.` }
    ],
    correctAnswer: 'A',
    explanation: `A alternativa A corretamente associa Java com orientação a objetos e seu uso em aplicações empresariais. As demais alternativas contêm informações falsas sobre as linguagens.`,
  },
  {
    id: 115,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `[Nome] está desenvolvendo um novo sistema de gerenciamento de serviços de TI. Para garantir a qualidade e a eficiência do serviço prestado, deve:`,
    options: [
      { letter: 'A', text: `Implementar o ITIL 4, focando em práticas de gerenciamento de serviços.` },
      { letter: 'B', text: `Aderir unicamente ao modelo de desenvolvimento ágil, ignorando práticas de ITIL.` },
      { letter: 'C', text: `Priorizar a criação de documentação extensiva sobre o ITIL e deixar a implementação em segundo plano.` },
      { letter: 'D', text: `Descartar qualquer metodologia de gestão de projetos e focar apenas no desenvolvimento ágil.` }
    ],
    correctAnswer: 'A',
    explanation: `Implementar o ITIL 4 é essencial para garantir a qualidade e a eficiência na gestão de serviços de TI, integrando práticas de gerenciamento com abordagens ágeis.`,
  },
  {
    id: 116,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas representa corretamente a função de um teste de integração?`,
    options: [
      { letter: 'A', text: `O teste de integração verifica apenas a funcionalidade de cada módulo individualmente.` },
      { letter: 'B', text: `O teste de integração verifica a interação e a comunicação entre diferentes módulos do sistema.` },
      { letter: 'C', text: `O teste de integração é realizado após todos os testes de sistema.` },
      { letter: 'D', text: `O teste de integração não é relevante para o ciclo de vida do desenvolvimento de software.` }
    ],
    correctAnswer: 'B',
    explanation: `O teste de integração é responsável por verificar a interação e comunicação entre diferentes módulos do sistema, garantindo que eles funcionem corretamente em conjunto.`,
  },
  {
    id: 117,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Sobre o conceito de ITIL 4, avalie:
I. ITIL 4 foca na entrega de valor ao cliente.
II. ITIL 4 não é aplicável a ambientes ágeis.
III. ITIL 4 promove a melhoria contínua dos serviços. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `I e III.` },
      { letter: 'D', text: `Todas as alternativas.` }
    ],
    correctAnswer: 'C',
    explanation: `ITIL 4 realmente foca na entrega de valor ao cliente e promove a melhoria contínua dos serviços, enquanto a afirmação II é falsa, pois ITIL 4 é aplicável a ambientes ágeis.`,
  },
  {
    id: 118,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas representa corretamente uma característica da normalização em bancos de dados relacionais?`,
    options: [
      { letter: 'A', text: `A normalização é um processo que visa aumentar a redundância dos dados para otimizar o desempenho.` },
      { letter: 'B', text: `A normalização tem como objetivo reduzir a redundância e melhorar a integridade dos dados.` },
      { letter: 'C', text: `A normalização é utilizada apenas em bancos de dados NoSQL.` },
      { letter: 'D', text: `A normalização não é importante para o design de um banco de dados relacional.` }
    ],
    correctAnswer: 'B',
    explanation: `A normalização é um processo essencial que visa reduzir a redundância e melhorar a integridade dos dados em bancos de dados relacionais.`,
  },
  {
    id: 119,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde às características do MongoDB.`,
    options: [
      { letter: 'A', text: `O MongoDB é um banco de dados relacional que utiliza SQL como linguagem de consulta.` },
      { letter: 'B', text: `O MongoDB armazena dados em documentos BSON, que são formatos binários de JSON.` },
      { letter: 'C', text: `O MongoDB não permite escalabilidade horizontal.` },
      { letter: 'D', text: `O MongoDB é otimizado apenas para leitura de dados.` }
    ],
    correctAnswer: 'B',
    explanation: `O MongoDB usa documentos BSON para armazenar dados, permitindo uma estrutura flexível e escalabilidade.`,
  },
  {
    id: 120,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Sobre segurança da informação, avalie:
I. A criptografia transforma dados originais em uma forma ilegível.
II. Os certificados digitais garantem a autenticidade de uma comunicação.
III. A LGPD se aplica somente a dados pessoais armazenados em bancos de dados relacionais. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas II e III.` },
      { letter: 'C', text: `Apenas I e III.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'A',
    explanation: `A afirmação III está incorreta, pois a LGPD se aplica a qualquer forma de tratamento de dados pessoais, independentemente do tipo de banco de dados.`,
  },
  {
    id: 121,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Sobre os protocolos de rede TCP, IP e UDP, assinale a alternativa INCORRETA:`,
    options: [
      { letter: 'A', text: `O TCP garante entrega de dados sem erros e na ordem correta.` },
      { letter: 'B', text: `O IP é responsável pelo endereçamento e roteamento entre redes.` },
      { letter: 'C', text: `O UDP garante entrega de dados com confirmação de recebimento.` },
      { letter: 'D', text: `O UDP é mais rápido que o TCP por não ter controle de erros.` }
    ],
    correctAnswer: 'C',
    explanation: `O UDP NÃO garante entrega de dados com confirmação - é um protocolo não orientado à conexão. O TCP é que oferece essa garantia.`,
  },
  {
    id: 122,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `A segurança em redes pode ser melhorada com firewalls e criptografia.` },
      { letter: 'B', text: `A computação em nuvem elimina a necessidade de segurança de dados.` },
      { letter: 'C', text: `Os serviços de IaaS oferecem infraestrutura como serviço em ambientes de nuvem.` },
      { letter: 'D', text: `Os protocolos de segurança ajudam na proteção dos dados transmitidos.` }
    ],
    correctAnswer: 'B',
    explanation: `A computação em nuvem não elimina a necessidade de segurança de dados, que continua a ser uma preocupação essencial.`,
  },
  {
    id: 123,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª:
I. IaaS
II. PaaS
III. SaaS A. Plataforma para desenvolvimento B. Infraestrutura como serviço C. Software como serviço`,
    options: [
      { letter: 'A', text: `I-B, II-A, III-C.` },
      { letter: 'B', text: `I-A, II-B, III-C.` },
      { letter: 'C', text: `I-C, II-B, III-A.` },
      { letter: 'D', text: `I-B, II-C, III-A.` }
    ],
    correctAnswer: 'A',
    explanation: `A associação correta é I-B (IaaS é Infraestrutura como serviço), II-A (PaaS é Plataforma para desenvolvimento) e III-C (SaaS é Software como serviço).`,
  },
  {
    id: 124,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `[Nome] está desenvolvendo uma aplicação web que precisa escalar horizontalmente. Para garantir essa escalabilidade, deve:`,
    options: [
      { letter: 'A', text: `Utilizar um banco de dados relacional exclusivo.` },
      { letter: 'B', text: `Armazenar dados em um formato não relacional.` },
      { letter: 'C', text: `Implementar uma arquitetura monolítica.` },
      { letter: 'D', text: `Limitar a utilização de serviços de nuvem.` }
    ],
    correctAnswer: 'B',
    explanation: `Armazenar dados em um formato não relacional, como NoSQL, facilita a escalabilidade horizontal da aplicação.`,
  },
  {
    id: 125,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas representa corretamente um princípio da LGPD?`,
    options: [
      { letter: 'A', text: `Os dados pessoais podem ser coletados sem o consentimento do titular.` },
      { letter: 'B', text: `Os dados pessoais devem ser tratados de forma transparente e lícita.` },
      { letter: 'C', text: `Não é necessário informar o titular sobre o tratamento de seus dados.` },
      { letter: 'D', text: `Os dados pessoais devem ser mantidos indefinidamente.` }
    ],
    correctAnswer: 'B',
    explanation: `A LGPD estabelece que os dados pessoais devem ser tratados de forma transparente e lícita, garantindo os direitos dos titulares.`,
  },
  {
    id: 126,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Marque a alternativa CORRETA que descreve a segurança em redes de computadores.`,
    options: [
      { letter: 'A', text: `A segurança em redes não requer políticas de acesso e autenticação.` },
      { letter: 'B', text: `A utilização de VPNs é uma prática comum para garantir a segurança em redes.` },
      { letter: 'C', text: `Firewall é um conceito desatualizado e não é mais utilizado.` },
      { letter: 'D', text: `Antivírus são suficientes para garantir a segurança em todas as redes.` }
    ],
    correctAnswer: 'B',
    explanation: `A utilização de VPNs é uma prática comum e eficaz para garantir a segurança de dados em redes, especialmente em conexões remotas.`,
  },
  {
    id: 127,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas representa corretamente um dos princípios do Scrum?`,
    options: [
      { letter: 'A', text: `O Scrum é um modelo de desenvolvimento que foca exclusivamente em documentação detalhada.` },
      { letter: 'B', text: `O Scrum promove a auto-organização e a colaboração entre os membros da equipe.` },
      { letter: 'C', text: `O Scrum não permite alterações na equipe durante o ciclo de vida do projeto.` },
      { letter: 'D', text: `O Scrum é uma metodologia que deve ser utilizada de forma rígida e não admite adaptações.` }
    ],
    correctAnswer: 'B',
    explanation: `O Scrum é uma metodologia ágil que enfatiza a auto-organização e a colaboração entre os membros da equipe para promover o desenvolvimento eficaz.`,
  },
  {
    id: 128,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde ao ciclo de vida do desenvolvimento de software.`,
    options: [
      { letter: 'A', text: `O ciclo de vida do desenvolvimento de software é linear e não permite revisões.` },
      { letter: 'B', text: `O ciclo de vida abrange fases como planejamento, análise, design, implementação e manutenção.` },
      { letter: 'C', text: `O ciclo de vida é uma sequência de etapas que deve ser seguida rigidamente em todos os projetos.` },
      { letter: 'D', text: `O ciclo de vida do desenvolvimento de software não inclui a fase de testes.` }
    ],
    correctAnswer: 'B',
    explanation: `O ciclo de vida do desenvolvimento de software realmente abrange fases como planejamento, análise, design, implementação e manutenção.`,
  },
  {
    id: 129,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Sobre UML 2.5, avalie:
I. O diagrama de classes representa a estrutura estática do sistema.
II. O diagrama de sequência ilustra como os objetos interagem em um determinado cenário.
III. O diagrama de atividades é utilizado exclusivamente para descrever a arquitetura de um sistema. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas II e III.` },
      { letter: 'C', text: `Apenas I.` },
      { letter: 'D', text: `I, II e III.` }
    ],
    correctAnswer: 'A',
    explanation: `As afirmações I e II estão corretas, enquanto a III é incorreta, pois o diagrama de atividades é utilizado para descrever fluxos de trabalho, não arquitetura.`,
  },
  {
    id: 130,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas descreve CORRETAMENTE o padrão de projeto Singleton?`,
    options: [
      { letter: 'A', text: `Cria famílias de objetos relacionados sem especificar suas classes concretas.` },
      { letter: 'B', text: `Garante que uma classe tenha apenas uma instância com ponto de acesso global.` },
      { letter: 'C', text: `Define uma interface para criar objetos, deixando as subclasses decidirem.` },
      { letter: 'D', text: `Separa a construção de um objeto complexo da sua representação.` }
    ],
    correctAnswer: 'B',
    explanation: `O Singleton garante instância única e ponto de acesso global. A é Abstract Factory, C é Factory Method, D é Builder.`,
  },
  {
    id: 131,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `A arquitetura MVC separa a lógica de apresentação da lógica de negócios.` },
      { letter: 'B', text: `Microsserviços permitem escalar aplicações de forma independente.` },
      { letter: 'C', text: `A API REST é uma forma de comunicação baseada em mensagens binárias.` },
      { letter: 'D', text: `A SOA promove a integração de serviços de forma modular.` }
    ],
    correctAnswer: 'C',
    explanation: `A alternativa C é a única incorreta, pois a API REST utiliza comunicação baseada em mensagens textuais, tipicamente em formato JSON ou XML, e não binárias.`,
  },
  {
    id: 132,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª conforme os padrões de projeto (GoF):
I. Factory Method
II. Observer
III. Composite. Associe: A. Criacional B. Estrutural C. Comportamental.`,
    options: [
      { letter: 'A', text: `I – A; II – C; III – B.` },
      { letter: 'B', text: `I – B; II – A; III – C.` },
      { letter: 'C', text: `I – C; II – A; III – B.` },
      { letter: 'D', text: `I – A; II – B; III – C.` }
    ],
    correctAnswer: 'A',
    explanation: `I corresponde ao padrão Criacional (Factory Method), II ao Comportamental (Observer) e III ao Estrutural (Composite).`,
  },
  {
    id: 133,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `[Nome] está implementando uma arquitetura de microsserviços em sua aplicação. Para garantir a comunicação eficiente entre os serviços, deve:`,
    options: [
      { letter: 'A', text: `Utilizar apenas chamadas síncronas para garantir a consistência dos dados.` },
      { letter: 'B', text: `Implementar uma API REST para facilitar a interação entre os serviços.` },
      { letter: 'C', text: `Evitar o uso de containers, pois eles aumentam a complexidade do sistema.` },
      { letter: 'D', text: `Todos os serviços devem ser implementados na mesma linguagem de programação.` }
    ],
    correctAnswer: 'B',
    explanation: `Implementar uma API REST é fundamental para garantir a comunicação eficiente entre os serviços em uma arquitetura de microsserviços.`,
  },
  {
    id: 134,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `A prática de CI/CD em DevOps envolve:`,
    options: [
      { letter: 'A', text: `A integração contínua, que é uma etapa final antes do lançamento do software.` },
      { letter: 'B', text: `A entrega contínua, que permite a automação do processo de deploy.` },
      { letter: 'C', text: `A implementação de testes manuais que ocorrem após o desenvolvimento.` },
      { letter: 'D', text: `A separação dos ambientes de desenvolvimento e produção para evitar conflitos.` }
    ],
    correctAnswer: 'B',
    explanation: `A prática de CI/CD envolve a integração contínua e a entrega contínua, permitindo a automação e agilidade no processo de deployment.`,
  },
  {
    id: 135,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas apresenta corretamente uma característica do Docker?`,
    options: [
      { letter: 'A', text: `Docker permite a criação de ambientes de desenvolvimento que são exclusivos para cada projeto.` },
      { letter: 'B', text: `Docker não suporta a virtualização de sistemas operacionais.` },
      { letter: 'C', text: `Docker utiliza containers que compartilham o mesmo kernel do sistema operacional.` },
      { letter: 'D', text: `Docker é uma ferramenta que não suporta a automação de processos de build.` }
    ],
    correctAnswer: 'C',
    explanation: `Docker utiliza containers que compartilham o mesmo kernel do sistema operacional, o que permite a execução eficiente de aplicações isoladas.`,
  },
  {
    id: 136,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas representa corretamente um dos principais objetivos da gestão de projetos segundo o PMBOK?`,
    options: [
      { letter: 'A', text: `Reduzir os custos em todos os processos de forma irrestrita.` },
      { letter: 'B', text: `Alcançar os objetivos do projeto dentro do escopo, prazo e custo estabelecidos.` },
      { letter: 'C', text: `Evitar a utilização de ferramentas de software para a gestão do projeto.` },
      { letter: 'D', text: `Promover o trabalho individual em vez do trabalho em equipe.` }
    ],
    correctAnswer: 'B',
    explanation: `O PMBOK enfatiza que o principal objetivo da gestão de projetos é atender aos requisitos do projeto, garantindo que os objetivos sejam alcançados dentro das limitações de escopo, prazo e custo.`,
  },
  {
    id: 137,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde a uma prática recomendada nas metodologias ágeis.`,
    options: [
      { letter: 'A', text: `A documentação deve ser extensiva e detalhada antes do início do desenvolvimento.` },
      { letter: 'B', text: `Mudanças nos requisitos são bem-vindas, mesmo após o início do desenvolvimento.` },
      { letter: 'C', text: `A entrega de software deve ocorrer apenas no final do projeto.` },
      { letter: 'D', text: `As equipes devem trabalhar de forma isolada para evitar distrações.` }
    ],
    correctAnswer: 'B',
    explanation: `Nas metodologias ágeis, especialmente no Scrum, é fundamental que as mudanças nos requisitos sejam aceitas e incorporadas ao processo ao longo do desenvolvimento, visando atender melhor às necessidades do cliente.`,
  },
  {
    id: 138,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Sobre o BPMN 2.0, avalie as afirmativas a seguir:
I. BPMN é uma notação padrão para modelagem de processos de negócio.
II. BPMN permite a visualização e a comunicação clara entre as partes interessadas.
III. BPMN é exclusivamente utilizado para processos de manufatura. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I.` },
      { letter: 'B', text: `Apenas II.` },
      { letter: 'C', text: `As afirmativas I e II estão corretas.` },
      { letter: 'D', text: `Todas as afirmativas estão corretas.` }
    ],
    correctAnswer: 'C',
    explanation: `As afirmativas I e II estão corretas, pois BPMN é uma notação padrão para modelagem de processos e facilita a comunicação. A afirmativa III está incorreta, pois BPMN pode ser utilizado em diversos tipos de processos, não apenas os de manufatura.`,
  },
  {
    id: 139,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Sobre testes de software e TDD, assinale a alternativa INCORRETA:`,
    options: [
      { letter: 'A', text: `Testes unitários verificam se componentes individuais funcionam corretamente.` },
      { letter: 'B', text: `Testes de integração focam na interação entre módulos ou sistemas.` },
      { letter: 'C', text: `No TDD os testes são escritos APÓS o desenvolvimento do código.` },
      { letter: 'D', text: `Testes de regressão garantem que novas alterações não quebrem funcionalidades existentes.` }
    ],
    correctAnswer: 'C',
    explanation: `No TDD (Test-Driven Development) os testes são escritos ANTES do código, não depois. O ciclo é: Red (escrever teste que falha) → Green (escrever código mínimo) → Refactor.`,
  },
  {
    id: 140,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Todas as alternativas estão corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `Java é uma linguagem de programação orientada a objetos.` },
      { letter: 'B', text: `Python suporta múltiplos paradigmas de programação, incluindo programação funcional.` },
      { letter: 'C', text: `JavaScript é uma linguagem de programação que roda exclusivamente no lado do servidor.` },
      { letter: 'D', text: `Todas as linguagens mencionadas são amplamente utilizadas no desenvolvimento web.` }
    ],
    correctAnswer: 'C',
    explanation: `A alternativa C está incorreta, pois JavaScript é geralmente associado ao desenvolvimento no lado do cliente, embora também possa ser utilizado no lado do servidor com ambientes como Node.js.`,
  },
  {
    id: 141,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª em relação ao ITIL 4:
I. Gerenciamento de Mudanças.
II. Gerenciamento de Incidentes.
III. Gerenciamento de Problemas. A. Minimizar o impacto dos incidentes. B. Controlar mudanças em serviços de TI. C. Identificar e remover causas de incidentes.`,
    options: [
      { letter: 'A', text: `I-B, II-A, III-C.` },
      { letter: 'B', text: `I-C, II-B, III-A.` },
      { letter: 'C', text: `I-A, II-C, III-B.` },
      { letter: 'D', text: `I-B, II-C, III-A.` }
    ],
    correctAnswer: 'A',
    explanation: `A associação correta é I-B (Gerenciamento de Mudanças - Controlar mudanças em serviços de TI), II-A (Gerenciamento de Incidentes - Minimizar o impacto dos incidentes) e III-C (Gerenciamento de Problemas - Identificar e remover causas de incidentes).`,
  },
  {
    id: 142,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `[Nome] é um analista de sistemas que precisa implementar uma nova funcionalidade em um software existente. Para garantir que a nova funcionalidade não quebre as existentes, ele deve:`,
    options: [
      { letter: 'A', text: `Realizar apenas testes manuais para verificar a nova funcionalidade.` },
      { letter: 'B', text: `Implementar testes unitários e de integração para validar a nova funcionalidade.` },
      { letter: 'C', text: `Desconsiderar os testes, pois a funcionalidade é simples.` },
      { letter: 'D', text: `Aguardar a finalização do projeto para realizar todos os testes.` }
    ],
    correctAnswer: 'B',
    explanation: `Para garantir que a nova funcionalidade não quebre o que já existe, é fundamental implementar testes unitários e de integração, que verificarão se as novas alterações interagem corretamente com o restante do sistema.`,
  },
  {
    id: 143,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas descreve corretamente a principal função do gerenciamento de serviços de TI segundo o ITIL 4?`,
    options: [
      { letter: 'A', text: `Gerenciar a alocação de hardware e recursos físicos em uma empresa.` },
      { letter: 'B', text: `Aprimorar a experiência do cliente ao fornecer serviços de TI que atendam suas necessidades.` },
      { letter: 'C', text: `Implementar soluções tecnológicas sem considerar as demandas dos usuários.` },
      { letter: 'D', text: `Priorizar a eficiência operacional em detrimento da satisfação do cliente.` }
    ],
    correctAnswer: 'B',
    explanation: `O ITIL 4 foca na entrega de valor para os clientes, priorizando a experiência do cliente e assegurando que os serviços de TI sejam alinhados às suas necessidades e expectativas.`,
  },
  {
    id: 144,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Marque a alternativa CORRETA em relação ao conceito de TDD (Test-Driven Development).`,
    options: [
      { letter: 'A', text: `O TDD é uma prática que não prioriza a escrita de testes antes do código.` },
      { letter: 'B', text: `No TDD, os testes são escritos após a implementação do código para validá-lo.` },
      { letter: 'C', text: `O TDD envolve escrever testes antes de escrever o código que deve passar nesses testes.` },
      { letter: 'D', text: `No TDD, não há foco na automação dos testes.` }
    ],
    correctAnswer: 'C',
    explanation: `O TDD é uma prática que prioriza a escrita de testes antes do desenvolvimento do código, seguindo o ciclo de redigir um teste, escrever o código que o faz passar e, por fim, refatorar o código.`,
  },
  {
    id: 145,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas representa corretamente o conceito de normalização em bancos de dados relacionais?`,
    options: [
      { letter: 'A', text: `Normalização é o processo de duplicar dados para aumentar a eficiência das consultas.` },
      { letter: 'B', text: `Normalização é o processo de organizar os dados para reduzir a redundância e melhorar a integridade.` },
      { letter: 'C', text: `Normalização é a técnica de criptografar dados para proteger informações sensíveis.` },
      { letter: 'D', text: `Normalização é a prática de agrupar dados em tabelas de maneira aleatória.` }
    ],
    correctAnswer: 'B',
    explanation: `A normalização é um processo que visa reduzir a redundância de dados e garantir a integridade dos dados em bancos de dados relacionais.`,
  },
  {
    id: 146,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Sobre segurança da informação, avalie:
I. A criptografia é uma técnica para proteger dados em trânsito.
II. Certificados digitais garantem a autenticidade de uma entidade.
III. A LGPD não se aplica a dados pessoais anônimos. Está correto:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Somente III.` },
      { letter: 'C', text: `I, II e III.` },
      { letter: 'D', text: `Apenas II.` }
    ],
    correctAnswer: 'A',
    explanation: `As afirmações I e II estão corretas, enquanto a III está incorreta, pois a LGPD se aplica a dados pessoais, mesmo que anônimos, quando há possibilidade de reidentificação.`,
  },
  {
    id: 147,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Sobre os modelos de serviço em Cloud Computing, assinale a alternativa CORRETA:`,
    options: [
      { letter: 'A', text: `IaaS oferece infraestrutura, PaaS oferece plataforma de desenvolvimento, SaaS oferece software pela internet.` },
      { letter: 'B', text: `IaaS e PaaS são a mesma coisa, apenas com nomes diferentes.` },
      { letter: 'C', text: `SaaS exige que o usuário gerencie toda a infraestrutura de servidores.` },
      { letter: 'D', text: `PaaS é usado exclusivamente para armazenamento de arquivos.` }
    ],
    correctAnswer: 'A',
    explanation: `IaaS (Infrastructure as a Service) fornece infraestrutura, PaaS (Platform as a Service) fornece plataforma para desenvolvimento, e SaaS (Software as a Service) oferece software pronto pela internet.`,
  },
  {
    id: 148,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde ao uso do MongoDB como banco de dados NoSQL.`,
    options: [
      { letter: 'A', text: `O MongoDB utiliza tabelas e relacionamentos tradicionais como os bancos de dados relacionais.` },
      { letter: 'B', text: `No MongoDB, os dados são armazenados em documentos JSON, permitindo maior flexibilidade na estrutura.` },
      { letter: 'C', text: `MongoDB é um banco de dados que requer um esquema fixo e imutável para o armazenamento de dados.` },
      { letter: 'D', text: `O MongoDB não oferece suporte a consultas complexas ou agregações.` }
    ],
    correctAnswer: 'B',
    explanation: `O MongoDB utiliza documentos JSON para armazenar dados, o que proporciona flexibilidade na estrutura dos dados.`,
  },
  {
    id: 149,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Todas corretas, com EXCEÇÃO de:`,
    options: [
      { letter: 'A', text: `O protocolo TCP garante a entrega confiável de pacotes em uma rede.` },
      { letter: 'B', text: `O protocolo UDP é utilizado para aplicações que necessitam de entrega rápida, mas não garantem a entrega.` },
      { letter: 'C', text: `O protocolo HTTP é utilizado para transmissão de dados pela web e é sempre inseguro.` },
      { letter: 'D', text: `O protocolo HTTPS é a versão segura do HTTP, utilizando criptografia para proteger dados.` }
    ],
    correctAnswer: 'C',
    explanation: `A alternativa C é a incorreta, pois o protocolo HTTP pode ser utilizado de forma segura quando combinado com outras técnicas, embora não o seja por si só.`,
  },
  {
    id: 150,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Associe a 2ª coluna com a 1ª:
I. IaaS
II. PaaS
III. SaaS  A. Oferece infraestrutura de TI como servidores e armazenamento. B. Fornece uma plataforma para desenvolvimento de aplicações. C. Permite acesso a aplicações através da internet.`,
    options: [
      { letter: 'A', text: `I-A, II-B, III-C.` },
      { letter: 'B', text: `I-B, II-C, III-A.` },
      { letter: 'C', text: `I-C, II-A, III-B.` },
      { letter: 'D', text: `I-A, II-C, III-B.` }
    ],
    correctAnswer: 'A',
    explanation: `A associação correta é I-A, II-B e III-C, que descreve corretamente os tipos de serviços em Cloud Computing.`,
  },
  {
    id: 151,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Juliana está desenvolvendo uma aplicação que precisa armazenar grandes volumes de dados não estruturados. Para isso, ela deve:`,
    options: [
      { letter: 'A', text: `Utilizar um banco de dados relacional, pois garante a integridade dos dados.` },
      { letter: 'B', text: `Optar por um banco de dados NoSQL, como MongoDB, que permite flexibilidade na estrutura.` },
      { letter: 'C', text: `Escolher um sistema de arquivos local para gerenciar os dados, já que é mais simples.` },
      { letter: 'D', text: `Implementar um banco de dados em memória, pois ele é mais rápido.` }
    ],
    correctAnswer: 'B',
    explanation: `Um banco de dados NoSQL, como o MongoDB, é apropriado para grandes volumes de dados não estruturados, oferecendo flexibilidade na modelagem.`,
  },
  {
    id: 152,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Qual das alternativas abaixo apresenta um exemplo de técnica de criptografia utilizada para proteger informações sensíveis?`,
    options: [
      { letter: 'A', text: `Hashing, que transforma dados em um valor fixo e irreversível.` },
      { letter: 'B', text: `Base64, que é uma técnica de codificação que não criptografa os dados.` },
      { letter: 'C', text: `SSL, que é um protocolo para comunicação segura, mas não utiliza criptografia.` },
      { letter: 'D', text: `AES, que é um algoritmo de criptografia simétrica amplamente utilizado.` }
    ],
    correctAnswer: 'D',
    explanation: `O AES (Advanced Encryption Standard) é um algoritmo de criptografia simétrica muito utilizado para proteger informações sensíveis.`,
  },
  {
    id: 153,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    weight: 3,
    text: `Marque a alternativa CORRETA que corresponde a um protocolo de segurança de redes.`,
    options: [
      { letter: 'A', text: `O protocolo FTP é usado para transferir arquivos sem criptografia.` },
      { letter: 'B', text: `O protocolo SSH é utilizado para acesso remoto seguro a sistemas.` },
      { letter: 'C', text: `O protocolo Telnet proporciona uma conexão segura e criptografada.` },
      { letter: 'D', text: `O protocolo ICMP é utilizado para transferência de arquivos.` }
    ],
    correctAnswer: 'B',
    explanation: `O protocolo SSH (Secure Shell) é amplamente utilizado para acesso remoto seguro, oferecendo criptografia e autenticação segura.`,
  },
  // ============================================
  // QUESTÕES DE INTERPRETAÇÃO DE TEXTO (PADRÃO IBDO)
  // ============================================
  {
    id: 154,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Interpretação de Texto',
    difficulty: 'medio',
    weight: 2,
    text: `Leia o texto a seguir e responda:

"A transformação digital no setor público brasileiro tem enfrentado diversos desafios, desde a resistência cultural até limitações orçamentárias. No entanto, a pandemia de COVID-19 acelerou significativamente este processo, forçando órgãos governamentais a adotarem soluções tecnológicas que antes eram vistas como futuristas. O cidadão, por sua vez, passou a exigir serviços mais ágeis e acessíveis, pressionando a administração pública a modernizar seus processos."

De acordo com o texto, é CORRETO afirmar que:`,
    options: [
      { letter: 'A', text: `A transformação digital foi totalmente concluída durante a pandemia.` },
      { letter: 'B', text: `A pandemia funcionou como catalisador da adoção de tecnologias no setor público.` },
      { letter: 'C', text: `Os cidadãos não tiveram influência na modernização dos serviços públicos.` },
      { letter: 'D', text: `As limitações orçamentárias impediram qualquer avanço tecnológico.` }
    ],
    correctAnswer: 'B',
    explanation: `O texto afirma que a pandemia "acelerou significativamente" o processo de transformação digital, funcionando como catalisador. As demais alternativas contradizem informações do texto.`,
    tags: ['interpretação de texto', 'tecnologia', 'setor público'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 155,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Interpretação de Texto',
    difficulty: 'medio',
    weight: 2,
    text: `Leia o texto a seguir:

"O desenvolvimento de software ágil representa uma mudança de paradigma em relação aos métodos tradicionais. Enquanto o modelo cascata pressupõe que todos os requisitos podem ser definidos no início do projeto, as metodologias ágeis reconhecem que mudanças são inevitáveis e até desejáveis. A colaboração constante entre desenvolvedores e stakeholders substitui a documentação extensiva como principal meio de comunicação."

Com base no texto, analise as afirmativas:
I. O modelo cascata é mais flexível que as metodologias ágeis.
II. As metodologias ágeis valorizam a colaboração em detrimento de documentação excessiva.
III. Mudanças durante o projeto são vistas como negativas nas metodologias ágeis.

Está CORRETO apenas:`,
    options: [
      { letter: 'A', text: `I` },
      { letter: 'B', text: `II` },
      { letter: 'C', text: `III` },
      { letter: 'D', text: `I e III` }
    ],
    correctAnswer: 'B',
    explanation: `Apenas II está correta. O texto afirma que "a colaboração constante substitui a documentação extensiva". I está errada (o cascata é menos flexível) e III está errada (mudanças são "desejáveis" no ágil).`,
    tags: ['interpretação de texto', 'metodologias ágeis', 'desenvolvimento de software'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 156,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Interpretação de Texto',
    difficulty: 'alto',
    weight: 2,
    text: `Leia o texto:

"A Lei Geral de Proteção de Dados (LGPD) representa um marco regulatório fundamental para a privacidade no Brasil. Inspirada no Regulamento Geral de Proteção de Dados europeu, a legislação brasileira estabelece princípios como finalidade, adequação e necessidade no tratamento de dados pessoais. Empresas e órgãos públicos precisaram adaptar seus processos, investir em segurança da informação e designar encarregados de proteção de dados, sob pena de multas que podem chegar a 2% do faturamento."

O termo "marco regulatório" utilizado no texto pode ser substituído, SEM ALTERAÇÃO DE SENTIDO, por:`,
    options: [
      { letter: 'A', text: `Obstáculo legal` },
      { letter: 'B', text: `Referência normativa` },
      { letter: 'C', text: `Limite burocrático` },
      { letter: 'D', text: `Impedimento jurídico` }
    ],
    correctAnswer: 'B',
    explanation: `"Marco regulatório" significa um conjunto de normas que serve como referência para regulamentar determinada área. "Referência normativa" mantém esse sentido de padrão/base legal.`,
    tags: ['interpretação de texto', 'LGPD', 'vocabulário'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 157,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Interpretação de Texto',
    difficulty: 'medio',
    weight: 2,
    text: `Leia o fragmento:

"A computação em nuvem democratizou o acesso a recursos computacionais antes restritos a grandes corporações. Pequenas empresas agora podem escalar suas operações sem investimentos massivos em infraestrutura própria. Contudo, essa facilidade traz consigo preocupações legítimas sobre segurança e dependência de fornecedores externos."

O conectivo "Contudo" estabelece, entre as orações, uma relação de:`,
    options: [
      { letter: 'A', text: `Adição, somando informações complementares.` },
      { letter: 'B', text: `Conclusão, fechando um raciocínio lógico.` },
      { letter: 'C', text: `Oposição, introduzindo uma ressalva ao benefício apresentado.` },
      { letter: 'D', text: `Explicação, detalhando a afirmação anterior.` }
    ],
    correctAnswer: 'C',
    explanation: `"Contudo" é uma conjunção adversativa que introduz uma ideia oposta ou ressalva. No texto, após apresentar benefícios da nuvem, introduz preocupações (ressalva).`,
    tags: ['interpretação de texto', 'conjunções', 'coesão textual'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 158,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Interpretação de Texto',
    difficulty: 'medio',
    weight: 2,
    text: `Leia o texto:

"O servidor público estadual tem o dever de zelar pela economicidade na utilização dos recursos públicos. Isso implica não apenas evitar desperdícios, mas também buscar a melhor relação custo-benefício em todas as aquisições e contratações. A eficiência administrativa não é apenas uma meta desejável, mas um princípio constitucional que vincula toda a Administração Pública."

Segundo o texto, a eficiência administrativa:`,
    options: [
      { letter: 'A', text: `É uma orientação opcional para os servidores públicos.` },
      { letter: 'B', text: `Limita-se a evitar desperdícios de recursos.` },
      { letter: 'C', text: `Constitui um princípio constitucional de observância obrigatória.` },
      { letter: 'D', text: `Aplica-se apenas às contratações de grande valor.` }
    ],
    correctAnswer: 'C',
    explanation: `O texto afirma expressamente que "a eficiência administrativa não é apenas uma meta desejável, mas um princípio constitucional que vincula toda a Administração Pública", indicando obrigatoriedade.`,
    tags: ['interpretação de texto', 'direito administrativo', 'eficiência'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 159,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Interpretação de Texto',
    difficulty: 'alto',
    weight: 2,
    text: `Leia atentamente:

"A arquitetura de microsserviços fragmenta aplicações monolíticas em serviços independentes, cada qual responsável por uma funcionalidade específica. Essa abordagem facilita a manutenção e permite que equipes trabalhem de forma autônoma. Entretanto, a complexidade operacional aumenta exponencialmente, exigindo ferramentas sofisticadas de orquestração e monitoramento."

Assinale a alternativa que apresenta a ideia CENTRAL do texto:`,
    options: [
      { letter: 'A', text: `Microsserviços são sempre superiores a aplicações monolíticas.` },
      { letter: 'B', text: `A arquitetura de microsserviços oferece vantagens, mas implica maior complexidade operacional.` },
      { letter: 'C', text: `Equipes autônomas são incompatíveis com arquiteturas tradicionais.` },
      { letter: 'D', text: `Ferramentas de orquestração são desnecessárias em sistemas modernos.` }
    ],
    correctAnswer: 'B',
    explanation: `A ideia central apresenta os benefícios (manutenção, autonomia) seguidos de ressalva ("Entretanto") sobre a complexidade operacional, caracterizando um trade-off.`,
    tags: ['interpretação de texto', 'microsserviços', 'ideia central'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 160,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Interpretação de Texto',
    difficulty: 'medio',
    weight: 2,
    text: `Leia o texto:

"O princípio da publicidade impõe à Administração Pública o dever de dar transparência a seus atos. Não se trata apenas de publicar no Diário Oficial, mas de garantir que o cidadão tenha acesso efetivo às informações. A Lei de Acesso à Informação consolidou esse direito, estabelecendo prazos e procedimentos para atendimento às solicitações."

De acordo com o texto, o princípio da publicidade:`,
    options: [
      { letter: 'A', text: `Restringe-se à publicação de atos no Diário Oficial.` },
      { letter: 'B', text: `Foi criado pela Lei de Acesso à Informação.` },
      { letter: 'C', text: `Abrange o acesso efetivo do cidadão às informações públicas.` },
      { letter: 'D', text: `Não estabelece obrigações para a Administração Pública.` }
    ],
    correctAnswer: 'C',
    explanation: `O texto afirma que "não se trata apenas de publicar no Diário Oficial, mas de garantir que o cidadão tenha acesso efetivo às informações", indicando amplitude maior do princípio.`,
    tags: ['interpretação de texto', 'publicidade', 'LAI'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 161,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Interpretação de Texto',
    difficulty: 'medio',
    weight: 2,
    text: `Leia o fragmento:

"A integração contínua (CI) e a entrega contínua (CD) revolucionaram o desenvolvimento de software ao automatizar processos que antes eram manuais e propensos a erros. Pipelines bem configurados detectam problemas rapidamente, antes que cheguem ao ambiente de produção. O resultado é software de maior qualidade entregue com mais frequência."

A expressão "propensos a erros" pode ser substituída, mantendo o sentido original, por:`,
    options: [
      { letter: 'A', text: `Isentos de falhas` },
      { letter: 'B', text: `Suscetíveis a falhas` },
      { letter: 'C', text: `Resistentes a problemas` },
      { letter: 'D', text: `Imunes a defeitos` }
    ],
    correctAnswer: 'B',
    explanation: `"Propenso" significa inclinado, tendente, suscetível. Portanto, "propensos a erros" equivale a "suscetíveis a falhas". As demais opções expressam ideias opostas.`,
    tags: ['interpretação de texto', 'vocabulário', 'CI/CD'],
    source: 'Elaborada - Padrão IBDO'
  },
  // ============================================
  // QUESTÕES DE UML (GAP CRÍTICO)
  // ============================================
  {
    id: 162,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'UML',
    difficulty: 'medio',
    weight: 3,
    text: `Sobre os diagramas da UML 2.5, associe corretamente:

1. Diagrama de Classes
2. Diagrama de Sequência
3. Diagrama de Casos de Uso
4. Diagrama de Atividades

( ) Representa a interação temporal entre objetos
( ) Modela os requisitos funcionais do sistema
( ) Representa a estrutura estática de classes e relacionamentos
( ) Modela fluxos de trabalho e processos

A sequência CORRETA é:`,
    options: [
      { letter: 'A', text: `2, 3, 1, 4` },
      { letter: 'B', text: `3, 2, 1, 4` },
      { letter: 'C', text: `2, 4, 1, 3` },
      { letter: 'D', text: `1, 3, 2, 4` }
    ],
    correctAnswer: 'A',
    explanation: `Diagrama de Sequência (2) mostra interação temporal; Casos de Uso (3) modela requisitos funcionais; Classes (1) representa estrutura estática; Atividades (4) modela fluxos de trabalho.`,
    tags: ['UML', 'diagramas', 'modelagem'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 163,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'UML',
    difficulty: 'medio',
    weight: 3,
    text: `No diagrama de casos de uso da UML, o relacionamento <<extend>> indica que:`,
    options: [
      { letter: 'A', text: `O caso de uso base sempre executa o caso de uso estendido.` },
      { letter: 'B', text: `O caso de uso estendido pode ser executado opcionalmente, sob certas condições.` },
      { letter: 'C', text: `Há uma relação de herança entre os casos de uso.` },
      { letter: 'D', text: `O caso de uso estendido é obrigatório para o funcionamento do sistema.` }
    ],
    correctAnswer: 'B',
    explanation: `O relacionamento <<extend>> indica comportamento opcional que estende o caso de uso base sob determinadas condições. Diferente de <<include>> que é obrigatório.`,
    tags: ['UML', 'casos de uso', 'extend'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 164,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'UML',
    difficulty: 'medio',
    weight: 3,
    text: `Em um diagrama de classes UML, a multiplicidade "0..*" em uma associação indica:`,
    options: [
      { letter: 'A', text: `Exatamente zero ou exatamente um elemento.` },
      { letter: 'B', text: `Zero ou muitos elementos, sem limite superior definido.` },
      { letter: 'C', text: `Pelo menos um elemento obrigatório.` },
      { letter: 'D', text: `Quantidade fixa de elementos.` }
    ],
    correctAnswer: 'B',
    explanation: `A multiplicidade "0..*" significa zero ou mais elementos (sem limite superior). "0..1" seria zero ou um; "1..*" seria um ou mais (pelo menos um obrigatório).`,
    tags: ['UML', 'diagrama de classes', 'multiplicidade'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 165,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'UML',
    difficulty: 'alto',
    weight: 3,
    text: `Sobre relacionamentos em diagramas de classes UML, avalie:

I. Agregação representa uma relação "parte-todo" onde a parte pode existir independentemente do todo.
II. Composição representa uma relação "parte-todo" onde a parte não existe sem o todo.
III. Generalização representa herança entre classes.
IV. Dependência indica que uma classe utiliza outra temporariamente.

Estão CORRETAS:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas I, II e III.` },
      { letter: 'C', text: `Apenas II, III e IV.` },
      { letter: 'D', text: `I, II, III e IV.` }
    ],
    correctAnswer: 'D',
    explanation: `Todas estão corretas. Agregação: losango vazio, parte independente. Composição: losango preenchido, parte dependente. Generalização: seta com triângulo (herança). Dependência: linha tracejada.`,
    tags: ['UML', 'relacionamentos', 'agregação', 'composição'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 166,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'UML',
    difficulty: 'medio',
    weight: 3,
    text: `No diagrama de sequência UML, uma mensagem representada por uma seta tracejada indica:`,
    options: [
      { letter: 'A', text: `Chamada síncrona de método.` },
      { letter: 'B', text: `Mensagem de retorno.` },
      { letter: 'C', text: `Criação de novo objeto.` },
      { letter: 'D', text: `Destruição de objeto.` }
    ],
    correctAnswer: 'B',
    explanation: `No diagrama de sequência, seta contínua representa chamada de método e seta tracejada representa mensagem de retorno. Criação usa seta com <<create>> e destruição usa X.`,
    tags: ['UML', 'diagrama de sequência', 'mensagens'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 167,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'UML',
    difficulty: 'medio',
    weight: 3,
    text: `Qual diagrama UML é mais adequado para representar os estados pelos quais um objeto passa durante seu ciclo de vida?`,
    options: [
      { letter: 'A', text: `Diagrama de Classes` },
      { letter: 'B', text: `Diagrama de Sequência` },
      { letter: 'C', text: `Diagrama de Máquina de Estados` },
      { letter: 'D', text: `Diagrama de Componentes` }
    ],
    correctAnswer: 'C',
    explanation: `O Diagrama de Máquina de Estados (ou Diagrama de Estados) representa os diferentes estados de um objeto e as transições entre eles durante seu ciclo de vida.`,
    tags: ['UML', 'diagrama de estados', 'ciclo de vida'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 168,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'UML',
    difficulty: 'alto',
    weight: 3,
    text: `Em UML 2.5, os diagramas são classificados em duas categorias principais. Sobre essa classificação, é CORRETO afirmar:`,
    options: [
      { letter: 'A', text: `Diagramas estruturais modelam aspectos estáticos; diagramas comportamentais modelam aspectos dinâmicos.` },
      { letter: 'B', text: `Diagramas estruturais incluem apenas o diagrama de classes; os demais são comportamentais.` },
      { letter: 'C', text: `Diagramas comportamentais não incluem o diagrama de casos de uso.` },
      { letter: 'D', text: `O diagrama de sequência é classificado como estrutural.` }
    ],
    correctAnswer: 'A',
    explanation: `Diagramas estruturais (Classes, Objetos, Componentes, etc.) modelam a estrutura estática. Diagramas comportamentais (Sequência, Atividades, Estados, Casos de Uso) modelam comportamento dinâmico.`,
    tags: ['UML', 'classificação', 'diagramas estruturais', 'diagramas comportamentais'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 169,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'UML',
    difficulty: 'medio',
    weight: 3,
    text: `No diagrama de casos de uso, o relacionamento <<include>> indica que:`,
    options: [
      { letter: 'A', text: `O caso de uso incluído é opcional e executado sob condições específicas.` },
      { letter: 'B', text: `O caso de uso base sempre inclui e executa o caso de uso incluído.` },
      { letter: 'C', text: `Existe herança entre os casos de uso.` },
      { letter: 'D', text: `O ator pode escolher executar ou não o caso de uso incluído.` }
    ],
    correctAnswer: 'B',
    explanation: `<<include>> representa inclusão obrigatória: o caso de uso base sempre executa o caso de uso incluído. Diferente de <<extend>> que é opcional/condicional.`,
    tags: ['UML', 'casos de uso', 'include'],
    source: 'Elaborada - Padrão IBDO'
  },
  // ============================================
  // QUESTÕES DE BPMN (GAP CRÍTICO)
  // ============================================
  {
    id: 170,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'BPMN',
    difficulty: 'medio',
    weight: 3,
    text: `Em BPMN 2.0, o gateway exclusivo (XOR) é representado pelo símbolo:`,
    options: [
      { letter: 'A', text: `Losango com círculo interno` },
      { letter: 'B', text: `Losango com sinal de "+" interno` },
      { letter: 'C', text: `Losango com "X" interno ou vazio` },
      { letter: 'D', text: `Retângulo arredondado com borda dupla` }
    ],
    correctAnswer: 'C',
    explanation: `O gateway exclusivo (XOR) é um losango com "X" interno ou vazio. O gateway paralelo (+) tem sinal de mais. O gateway inclusivo (O) tem círculo interno.`,
    tags: ['BPMN', 'gateway', 'XOR'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 171,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'BPMN',
    difficulty: 'medio',
    weight: 3,
    text: `Na notação BPMN, uma tarefa de usuário (User Task) indica:`,
    options: [
      { letter: 'A', text: `Tarefa executada automaticamente pelo sistema sem intervenção humana.` },
      { letter: 'B', text: `Tarefa que requer interação humana para ser concluída.` },
      { letter: 'C', text: `Tarefa de comunicação entre processos diferentes.` },
      { letter: 'D', text: `Tarefa de tomada de decisão automática baseada em regras.` }
    ],
    correctAnswer: 'B',
    explanation: `User Task (tarefa de usuário) representa uma atividade que requer interação humana. Service Task é automática, Send/Receive Task são de comunicação, Business Rule Task usa regras.`,
    tags: ['BPMN', 'user task', 'tarefas'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 172,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'BPMN',
    difficulty: 'medio',
    weight: 3,
    text: `Sobre os elementos de BPMN 2.0, associe:

1. Evento de Início
2. Evento de Fim
3. Gateway Paralelo
4. Pool

( ) Representa um participante ou organização no processo
( ) Indica onde o processo começa
( ) Divide ou sincroniza fluxos paralelos
( ) Indica onde o processo termina

A sequência CORRETA é:`,
    options: [
      { letter: 'A', text: `4, 1, 3, 2` },
      { letter: 'B', text: `3, 1, 4, 2` },
      { letter: 'C', text: `4, 2, 3, 1` },
      { letter: 'D', text: `1, 4, 3, 2` }
    ],
    correctAnswer: 'A',
    explanation: `Pool (4) representa participante/organização; Evento de Início (1) onde começa; Gateway Paralelo (3) divide/sincroniza fluxos; Evento de Fim (2) onde termina.`,
    tags: ['BPMN', 'elementos', 'pool', 'gateway'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 173,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'BPMN',
    difficulty: 'alto',
    weight: 3,
    text: `Em BPMN, qual é a diferença entre Gateway Exclusivo (XOR) e Gateway Inclusivo (OR)?`,
    options: [
      { letter: 'A', text: `XOR permite apenas um caminho; OR permite um ou mais caminhos simultaneamente.` },
      { letter: 'B', text: `XOR é usado apenas para junção; OR apenas para divisão de fluxos.` },
      { letter: 'C', text: `Não há diferença funcional entre eles.` },
      { letter: 'D', text: `XOR executa todos os caminhos; OR executa apenas um.` }
    ],
    correctAnswer: 'A',
    explanation: `Gateway Exclusivo (XOR): apenas UM caminho é seguido baseado na condição. Gateway Inclusivo (OR): UM OU MAIS caminhos podem ser seguidos simultaneamente se as condições forem verdadeiras.`,
    tags: ['BPMN', 'gateway', 'XOR', 'OR'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 174,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'BPMN',
    difficulty: 'medio',
    weight: 3,
    text: `Na modelagem BPMN, o elemento "Lane" (raia) é utilizado para:`,
    options: [
      { letter: 'A', text: `Representar subprocessos dentro de um processo maior.` },
      { letter: 'B', text: `Organizar atividades por papel, departamento ou sistema responsável.` },
      { letter: 'C', text: `Indicar pontos de decisão no fluxo do processo.` },
      { letter: 'D', text: `Armazenar dados intermediários do processo.` }
    ],
    correctAnswer: 'B',
    explanation: `Lanes (raias) são subdivisões dentro de um Pool que organizam atividades por responsável (papel, departamento, sistema). Facilitam a visualização de quem executa cada tarefa.`,
    tags: ['BPMN', 'lane', 'organização'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 175,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'BPMN',
    difficulty: 'medio',
    weight: 3,
    text: `Em BPMN, eventos intermediários são representados por:`,
    options: [
      { letter: 'A', text: `Círculo com borda simples fina` },
      { letter: 'B', text: `Círculo com borda dupla` },
      { letter: 'C', text: `Círculo com borda simples grossa` },
      { letter: 'D', text: `Círculo preenchido` }
    ],
    correctAnswer: 'B',
    explanation: `Eventos de início: círculo com borda simples fina. Eventos intermediários: círculo com borda dupla. Eventos de fim: círculo com borda simples grossa (preenchida).`,
    tags: ['BPMN', 'eventos', 'notação'],
    source: 'Elaborada - Padrão IBDO'
  },
  // ============================================
  // QUESTÕES DE SQL (GAP CRÍTICO)
  // ============================================
  {
    id: 176,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'SQL',
    difficulty: 'medio',
    weight: 3,
    text: `Qual cláusula SQL é utilizada para filtrar grupos criados pela cláusula GROUP BY?`,
    options: [
      { letter: 'A', text: `WHERE` },
      { letter: 'B', text: `HAVING` },
      { letter: 'C', text: `FILTER` },
      { letter: 'D', text: `GROUP FILTER` }
    ],
    correctAnswer: 'B',
    explanation: `HAVING filtra grupos após o GROUP BY. WHERE filtra linhas antes do agrupamento. A ordem de execução é: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.`,
    tags: ['SQL', 'GROUP BY', 'HAVING'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 177,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'SQL',
    difficulty: 'medio',
    weight: 3,
    text: `Em SQL, o comando que combina os resultados de duas queries eliminando duplicatas é:`,
    options: [
      { letter: 'A', text: `UNION ALL` },
      { letter: 'B', text: `UNION` },
      { letter: 'C', text: `INTERSECT` },
      { letter: 'D', text: `MERGE` }
    ],
    correctAnswer: 'B',
    explanation: `UNION combina resultados e remove duplicatas. UNION ALL combina mantendo duplicatas. INTERSECT retorna apenas registros comuns. MERGE é para operações de upsert.`,
    tags: ['SQL', 'UNION', 'operadores de conjunto'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 178,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'SQL',
    difficulty: 'medio',
    weight: 3,
    text: `Qual tipo de JOIN retorna apenas os registros que possuem correspondência em ambas as tabelas?`,
    options: [
      { letter: 'A', text: `LEFT JOIN` },
      { letter: 'B', text: `RIGHT JOIN` },
      { letter: 'C', text: `INNER JOIN` },
      { letter: 'D', text: `FULL OUTER JOIN` }
    ],
    correctAnswer: 'C',
    explanation: `INNER JOIN retorna apenas registros com correspondência em ambas as tabelas. LEFT/RIGHT JOIN retornam todos de um lado. FULL OUTER JOIN retorna todos de ambos os lados.`,
    tags: ['SQL', 'JOIN', 'INNER JOIN'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 179,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'SQL',
    difficulty: 'alto',
    weight: 3,
    text: `Considere a tabela FUNCIONARIOS com as colunas: id, nome, salario, departamento_id. Para obter o maior salário de cada departamento, a query correta é:`,
    options: [
      { letter: 'A', text: `SELECT departamento_id, MAX(salario) FROM FUNCIONARIOS;` },
      { letter: 'B', text: `SELECT departamento_id, MAX(salario) FROM FUNCIONARIOS GROUP BY departamento_id;` },
      { letter: 'C', text: `SELECT departamento_id, salario FROM FUNCIONARIOS WHERE salario = MAX(salario);` },
      { letter: 'D', text: `SELECT MAX(departamento_id, salario) FROM FUNCIONARIOS;` }
    ],
    correctAnswer: 'B',
    explanation: `Para obter o maior salário POR DEPARTAMENTO, é necessário usar GROUP BY departamento_id junto com a função de agregação MAX(salario).`,
    tags: ['SQL', 'GROUP BY', 'funções de agregação'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 180,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'SQL',
    difficulty: 'medio',
    weight: 3,
    text: `Sobre subconsultas (subqueries) em SQL, é CORRETO afirmar:`,
    options: [
      { letter: 'A', text: `Subconsultas não podem ser usadas na cláusula WHERE.` },
      { letter: 'B', text: `Uma subconsulta correlacionada é executada uma vez para cada linha da consulta externa.` },
      { letter: 'C', text: `Subconsultas sempre retornam múltiplas colunas.` },
      { letter: 'D', text: `O operador IN não pode ser usado com subconsultas.` }
    ],
    correctAnswer: 'B',
    explanation: `Subconsultas correlacionadas fazem referência a colunas da consulta externa e são executadas uma vez para cada linha processada. Subconsultas podem ser usadas no WHERE, podem retornar uma coluna e IN aceita subconsultas.`,
    tags: ['SQL', 'subconsultas', 'correlacionadas'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 181,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'SQL',
    difficulty: 'medio',
    weight: 3,
    text: `Qual comando SQL é utilizado para remover TODAS as linhas de uma tabela de forma mais eficiente que DELETE, mas que NÃO pode ser revertido com ROLLBACK em alguns SGBDs?`,
    options: [
      { letter: 'A', text: `DROP TABLE` },
      { letter: 'B', text: `DELETE` },
      { letter: 'C', text: `TRUNCATE` },
      { letter: 'D', text: `REMOVE` }
    ],
    correctAnswer: 'C',
    explanation: `TRUNCATE remove todas as linhas rapidamente, resetando contadores de identidade. É DDL (não DML), por isso em alguns SGBDs não pode ser revertido. DROP remove a estrutura da tabela.`,
    tags: ['SQL', 'TRUNCATE', 'DDL'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 182,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'SQL',
    difficulty: 'alto',
    weight: 3,
    text: `Sobre índices em bancos de dados relacionais, avalie:

I. Índices aceleram consultas SELECT mas podem tornar INSERT/UPDATE/DELETE mais lentos.
II. Índices clustered reorganizam fisicamente os dados da tabela.
III. Uma tabela pode ter múltiplos índices clustered.
IV. Índices ocupam espaço adicional em disco.

Estão CORRETAS:`,
    options: [
      { letter: 'A', text: `Apenas I e II.` },
      { letter: 'B', text: `Apenas I, II e IV.` },
      { letter: 'C', text: `Apenas II e III.` },
      { letter: 'D', text: `I, II, III e IV.` }
    ],
    correctAnswer: 'B',
    explanation: `I, II e IV estão corretas. III está errada: uma tabela pode ter apenas UM índice clustered (que define a ordem física dos dados), mas pode ter múltiplos índices non-clustered.`,
    tags: ['SQL', 'índices', 'clustered', 'performance'],
    source: 'Elaborada - Padrão IBDO'
  },
  {
    id: 183,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'SQL',
    difficulty: 'medio',
    weight: 3,
    text: `Em SQL, a função COALESCE é utilizada para:`,
    options: [
      { letter: 'A', text: `Concatenar strings de múltiplas colunas.` },
      { letter: 'B', text: `Retornar o primeiro valor não nulo de uma lista de expressões.` },
      { letter: 'C', text: `Converter tipos de dados entre formatos.` },
      { letter: 'D', text: `Calcular a média de valores numéricos.` }
    ],
    correctAnswer: 'B',
    explanation: `COALESCE retorna o primeiro valor não nulo da lista de argumentos. Exemplo: COALESCE(coluna1, coluna2, 'valor_padrao') retorna o primeiro não nulo.`,
    tags: ['SQL', 'COALESCE', 'funções'],
    source: 'Elaborada - Padrão IBDO'
  },

  // ================================================================
  // QUESTÕES INTEGRADAS - 2026-01-13
  // Total: 15 questões
  // ================================================================
  {
    id: 184,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Interpretação de Texto',
    difficulty: 'alto',
    weight: 2,
    text: `Leia o trecho: 'A digitalização dos serviços públicos, embora promova eficiência e transparência, pode inadvertidamente excluir parcelas da população sem acesso à tecnologia, criando um paradoxo entre modernização e democratização.' Com base no texto, assinale a alternativa que apresenta uma INFERÊNCIA VÁLIDA:`,
    options: [
      { letter: 'A', text: `A digitalização é intrinsecamente excludente e deve ser evitada.` },
      { letter: 'B', text: `Políticas de inclusão digital são necessárias para que a modernização não comprometa a democratização.` },
      { letter: 'C', text: `A eficiência administrativa é mais importante que a acessibilidade.` },
      { letter: 'D', text: `A transparência só é possível em ambientes digitais.` }
    ],
    correctAnswer: 'B',
    explanation: `O texto apresenta um paradoxo entre modernização e democratização. A inferência válida é que políticas de inclusão digital são necessárias para equilibrar esses aspectos, não que a digitalização deva ser evitada.`,
    tags: ['interpretacao_texto', 'inferencia'],
    source: 'questoes_dificeis',
  },
  {
    id: 185,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Coesão e Coerência',
    difficulty: 'alto',
    weight: 2,
    text: `Analise: 'O servidor público deve agir com probidade. Entretanto, casos de improbidade são frequentes. Isso ocorre porque a fiscalização é insuficiente. Portanto, fortalecer os mecanismos de controle é essencial.' A sequência de conectivos (Entretanto, porque, Portanto) estabelece, respectivamente, relações de:`,
    options: [
      { letter: 'A', text: `Adição, causa, conclusão.` },
      { letter: 'B', text: `Oposição, explicação, conclusão.` },
      { letter: 'C', text: `Oposição, consequência, explicação.` },
      { letter: 'D', text: `Concessão, finalidade, conclusão.` }
    ],
    correctAnswer: 'B',
    explanation: `'Entretanto' indica oposição/contraste; 'porque' indica explicação/causa; 'Portanto' indica conclusão. A sequência correta é: oposição, explicação, conclusão.`,
    tags: ['coesao', 'conectivos'],
    source: 'questoes_dificeis',
  },
  {
    id: 186,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    subtopic: 'Equivalências Lógicas',
    difficulty: 'alto',
    weight: 2,
    text: `Considere a proposição: 'Se o servidor é eficiente, então o serviço é de qualidade.' Qual das alternativas apresenta uma proposição LOGICAMENTE EQUIVALENTE?`,
    options: [
      { letter: 'A', text: `Se o serviço não é de qualidade, então o servidor não é eficiente.` },
      { letter: 'B', text: `Se o serviço é de qualidade, então o servidor é eficiente.` },
      { letter: 'C', text: `O servidor é eficiente se, e somente se, o serviço é de qualidade.` },
      { letter: 'D', text: `O servidor não é eficiente ou o serviço não é de qualidade.` }
    ],
    correctAnswer: 'A',
    explanation: `A contrapositiva de 'Se P, então Q' é 'Se não Q, então não P', que é logicamente equivalente. A alternativa A é a contrapositiva da proposição original.`,
    tags: ['equivalencia', 'contrapositiva'],
    source: 'questoes_dificeis',
  },
  {
    id: 187,
    subject: 'logica',
    subjectName: 'Raciocínio Lógico-Matemático',
    subtopic: 'Argumentação',
    difficulty: 'alto',
    weight: 2,
    text: `Analise o argumento: 'Todo sistema seguro usa criptografia. Alguns sistemas governamentais são seguros. Logo, alguns sistemas governamentais usam criptografia.' Este argumento é:`,
    options: [
      { letter: 'A', text: `Inválido, pois a conclusão não decorre das premissas.` },
      { letter: 'B', text: `Válido, pois segue a estrutura do silogismo categórico.` },
      { letter: 'C', text: `Inválido, pois comete a falácia da afirmação do consequente.` },
      { letter: 'D', text: `Válido apenas se todos os sistemas governamentais forem seguros.` }
    ],
    correctAnswer: 'B',
    explanation: `O argumento é um silogismo válido: Todo A é B; Algum C é A; Logo, algum C é B. As premissas garantem a conclusão pela lógica dos quantificadores.`,
    tags: ['silogismo', 'argumentacao'],
    source: 'questoes_dificeis',
  },
  {
    id: 188,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    subtopic: 'Atos Administrativos',
    difficulty: 'alto',
    weight: 2,
    text: `Um servidor público praticou ato administrativo com desvio de finalidade, beneficiando terceiro em processo licitatório. Posteriormente, a Administração constatou o vício. Nesse caso, o ato deve ser:`,
    options: [
      { letter: 'A', text: `Revogado, por conveniência e oportunidade.` },
      { letter: 'B', text: `Anulado, por vício de legalidade insanável.` },
      { letter: 'C', text: `Convalidado, desde que não haja prejuízo a terceiros.` },
      { letter: 'D', text: `Mantido, pois já produziu efeitos jurídicos.` }
    ],
    correctAnswer: 'B',
    explanation: `O desvio de finalidade é vício de legalidade insanável que atinge o elemento finalidade do ato administrativo. Atos com vícios insanáveis devem ser ANULADOS, não revogados ou convalidados.`,
    tags: ['ato_administrativo', 'anulacao'],
    source: 'questoes_dificeis',
  },
  {
    id: 189,
    subject: 'direito',
    subjectName: 'Direito Administrativo e Constitucional',
    subtopic: 'LGPD',
    difficulty: 'alto',
    weight: 2,
    text: `Uma autarquia estadual pretende compartilhar dados pessoais de cidadãos com empresa privada para fins de análise estatística. Segundo a LGPD (Lei 13.709/2018), essa operação:`,
    options: [
      { letter: 'A', text: `É permitida sem restrições, pois se trata de interesse público.` },
      { letter: 'B', text: `Exige consentimento específico do titular ou deve atender a uma das bases legais previstas.` },
      { letter: 'C', text: `É proibida em qualquer hipótese entre órgãos públicos e empresas privadas.` },
      { letter: 'D', text: `Depende apenas de autorização do órgão controlador interno.` }
    ],
    correctAnswer: 'B',
    explanation: `A LGPD exige base legal para tratamento de dados pessoais. O compartilhamento com empresa privada requer consentimento específico do titular ou enquadramento em outra base legal (art. 7º), mesmo quando envolve órgão público.`,
    tags: ['lgpd', 'dados_pessoais'],
    source: 'questoes_dificeis',
  },
  {
    id: 190,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Arquitetura de Software',
    difficulty: 'alto',
    weight: 3,
    text: `Em uma arquitetura de microsserviços, um serviço de pedidos precisa consultar dados de clientes e produtos de outros serviços. Qual padrão arquitetural é MAIS adequado para evitar acoplamento forte e garantir resiliência?`,
    options: [
      { letter: 'A', text: `Chamadas síncronas diretas via REST entre os serviços.` },
      { letter: 'B', text: `Banco de dados compartilhado entre todos os microsserviços.` },
      { letter: 'C', text: `Event Sourcing com CQRS e comunicação assíncrona via mensageria.` },
      { letter: 'D', text: `Replicação dos dados de clientes e produtos no serviço de pedidos.` }
    ],
    correctAnswer: 'C',
    explanation: `Event Sourcing com CQRS e comunicação assíncrona via mensageria (ex: Kafka, RabbitMQ) reduz acoplamento, melhora resiliência e permite que cada serviço opere independentemente. Chamadas síncronas criam dependência direta e pontos únicos de falha.`,
    tags: ['microsservicos', 'event_sourcing', 'cqrs'],
    source: 'questoes_dificeis',
  },
  {
    id: 191,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'SQL',
    difficulty: 'alto',
    weight: 3,
    text: `Considere as tabelas: FUNCIONARIO(id, nome, depto_id) e DEPARTAMENTO(id, nome). Qual consulta retorna os departamentos que NÃO possuem funcionários?`,
    options: [
      { letter: 'A', text: `SELECT d.nome FROM DEPARTAMENTO d INNER JOIN FUNCIONARIO f ON d.id = f.depto_id WHERE f.id IS NULL` },
      { letter: 'B', text: `SELECT d.nome FROM DEPARTAMENTO d LEFT JOIN FUNCIONARIO f ON d.id = f.depto_id WHERE f.id IS NULL` },
      { letter: 'C', text: `SELECT d.nome FROM DEPARTAMENTO d WHERE d.id IN (SELECT depto_id FROM FUNCIONARIO)` },
      { letter: 'D', text: `SELECT d.nome FROM DEPARTAMENTO d RIGHT JOIN FUNCIONARIO f ON d.id = f.depto_id WHERE d.id IS NULL` }
    ],
    correctAnswer: 'B',
    explanation: `LEFT JOIN retorna todos os registros da tabela da esquerda (DEPARTAMENTO), mesmo sem correspondência na direita. Com WHERE f.id IS NULL, filtramos apenas os departamentos sem funcionários. INNER JOIN não funciona pois exclui registros sem correspondência.`,
    tags: ['sql', 'join', 'subconsulta'],
    source: 'questoes_dificeis',
  },
  {
    id: 192,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'UML',
    difficulty: 'alto',
    weight: 3,
    text: `Em um diagrama de sequência UML, qual é a representação correta para indicar que uma mensagem é enviada de forma ASSÍNCRONA e o objeto remetente NÃO aguarda resposta?`,
    options: [
      { letter: 'A', text: `Seta com linha contínua e ponta preenchida.` },
      { letter: 'B', text: `Seta com linha tracejada e ponta preenchida.` },
      { letter: 'C', text: `Seta com linha contínua e ponta aberta (não preenchida).` },
      { letter: 'D', text: `Seta com linha tracejada e ponta aberta.` }
    ],
    correctAnswer: 'C',
    explanation: `Em UML 2.x, mensagens assíncronas são representadas por setas com linha contínua e ponta ABERTA (não preenchida). Setas com ponta preenchida indicam mensagens síncronas. Linhas tracejadas são usadas para mensagens de retorno.`,
    tags: ['uml', 'diagrama_sequencia'],
    source: 'questoes_dificeis',
  },
  {
    id: 193,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'BPMN',
    difficulty: 'alto',
    weight: 3,
    text: `Em BPMN 2.0, um processo de aprovação de documento tem a seguinte regra: 'Se o valor for maior que R$ 10.000, é necessária aprovação do diretor E do gerente financeiro; caso contrário, apenas o gerente.' Qual combinação de gateways modela CORRETAMENTE esta regra?`,
    options: [
      { letter: 'A', text: `Gateway Exclusivo (XOR) para a decisão de valor, seguido de Gateway Paralelo (AND) para múltiplas aprovações.` },
      { letter: 'B', text: `Gateway Inclusivo (OR) para ambas as situações.` },
      { letter: 'C', text: `Apenas Gateway Exclusivo (XOR) para todas as decisões.` },
      { letter: 'D', text: `Gateway Paralelo (AND) para a decisão de valor, seguido de Gateway Exclusivo (XOR) para aprovações.` }
    ],
    correctAnswer: 'A',
    explanation: `O Gateway Exclusivo (XOR) modela a decisão do valor (ou/ou). Quando > R$ 10.000, o Gateway Paralelo (AND) garante que AMBAS as aprovações (diretor E gerente) ocorram antes de prosseguir.`,
    tags: ['bpmn', 'gateway'],
    source: 'questoes_dificeis',
  },
  {
    id: 194,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'DevOps',
    difficulty: 'alto',
    weight: 3,
    text: `Em um pipeline CI/CD, a equipe precisa garantir que vulnerabilidades de segurança sejam detectadas antes do deploy em produção. Qual prática DevSecOps é MAIS adequada para integrar no pipeline?`,
    options: [
      { letter: 'A', text: `Testes manuais de penetração após cada deploy.` },
      { letter: 'B', text: `SAST (Static Application Security Testing) e SCA (Software Composition Analysis) automatizados no pipeline.` },
      { letter: 'C', text: `Revisão de código manual por especialista em segurança.` },
      { letter: 'D', text: `Monitoramento de logs em produção para detectar ataques.` }
    ],
    correctAnswer: 'B',
    explanation: `SAST analisa código fonte para vulnerabilidades e SCA verifica dependências de terceiros. Ambos são automatizáveis no pipeline CI/CD, detectando problemas ANTES do deploy. Testes manuais e revisões não escalam; monitoramento é reativo, não preventivo.`,
    tags: ['devsecops', 'cicd', 'seguranca'],
    source: 'questoes_dificeis',
  },
  {
    id: 195,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Padrões de Projeto',
    difficulty: 'alto',
    weight: 3,
    text: `Um sistema legado possui uma classe com interface incompatível com o novo módulo que está sendo desenvolvido. Qual padrão de projeto GoF resolve este problema SEM modificar a classe original?`,
    options: [
      { letter: 'A', text: `Decorator - adiciona responsabilidades dinamicamente.` },
      { letter: 'B', text: `Adapter - converte a interface da classe para a interface esperada.` },
      { letter: 'C', text: `Facade - simplifica a interface de um subsistema.` },
      { letter: 'D', text: `Proxy - controla o acesso ao objeto original.` }
    ],
    correctAnswer: 'B',
    explanation: `O padrão Adapter (também conhecido como Wrapper) converte a interface de uma classe em outra interface esperada pelo cliente, permitindo que classes com interfaces incompatíveis trabalhem juntas SEM modificar o código original.`,
    tags: ['design_patterns', 'adapter'],
    source: 'questoes_dificeis',
  },
  {
    id: 196,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Cloud Computing',
    difficulty: 'alto',
    weight: 3,
    text: `Uma aplicação governamental requer alta disponibilidade (99,99%) e recuperação de desastres com RPO de 15 minutos e RTO de 1 hora. Qual estratégia de arquitetura em nuvem é MAIS adequada?`,
    options: [
      { letter: 'A', text: `Single-region com backup diário em storage externo.` },
      { letter: 'B', text: `Multi-region Active-Passive com replicação assíncrona e failover automatizado.` },
      { letter: 'C', text: `Multi-region Active-Active com replicação síncrona e load balancer global.` },
      { letter: 'D', text: `Single-region com múltiplas Availability Zones e snapshots horários.` }
    ],
    correctAnswer: 'B',
    explanation: `Para RPO de 15min e RTO de 1h, Multi-region Active-Passive com replicação assíncrona atende aos requisitos. Active-Active seria over-engineering para esse RTO. Single-region não garante DR adequado. Replicação síncrona multi-region tem latência e custo elevados.`,
    tags: ['cloud', 'disaster_recovery', 'alta_disponibilidade'],
    source: 'questoes_dificeis',
  },
  {
    id: 197,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Segurança da Informação',
    difficulty: 'alto',
    weight: 3,
    text: `Em um sistema de autenticação, qual combinação de fatores representa autenticação multifator (MFA) CORRETA segundo as categorias de autenticação?`,
    options: [
      { letter: 'A', text: `Senha + PIN (dois fatores de conhecimento).` },
      { letter: 'B', text: `Senha + Token OTP + Biometria (conhecimento + posse + inerência).` },
      { letter: 'C', text: `Cartão magnético + Token físico (dois fatores de posse).` },
      { letter: 'D', text: `Reconhecimento facial + Impressão digital (dois fatores de inerência).` }
    ],
    correctAnswer: 'B',
    explanation: `MFA verdadeiro requer fatores de CATEGORIAS diferentes: conhecimento (algo que você sabe), posse (algo que você tem) e inerência (algo que você é). A alternativa B combina as três categorias. As demais usam fatores da mesma categoria.`,
    tags: ['seguranca', 'autenticacao', 'mfa'],
    source: 'questoes_dificeis',
  },
  {
    id: 198,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Banco de Dados',
    difficulty: 'alto',
    weight: 3,
    text: `Em um banco de dados relacional com alto volume de consultas analíticas, a equipe identificou que uma consulta específica está lenta. A consulta usa WHERE em uma coluna de data e JOIN com outra tabela. Qual estratégia de otimização deve ser priorizada?`,
    options: [
      { letter: 'A', text: `Criar índice composto na coluna de data e na coluna de JOIN, e analisar o plano de execução.` },
      { letter: 'B', text: `Aumentar a memória RAM do servidor de banco de dados.` },
      { letter: 'C', text: `Normalizar ainda mais as tabelas para reduzir redundância.` },
      { letter: 'D', text: `Migrar para um banco de dados NoSQL.` }
    ],
    correctAnswer: 'A',
    explanation: `A primeira abordagem para otimização de consultas é analisar o plano de execução e criar índices apropriados. Um índice composto nas colunas usadas em WHERE e JOIN pode melhorar drasticamente a performance. Aumentar RAM ou migrar para NoSQL são medidas drásticas sem análise prévia.`,
    tags: ['banco_dados', 'otimizacao', 'indices'],
    source: 'questoes_dificeis',
  },


  // ================================================================
  // QUESTÕES INTEGRADAS - 2026-01-13
  // Total: 5 questões
  // ================================================================
  {
    id: 199,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Interpretação de texto e inferências',
    difficulty: 'alto',
    weight: 2,
    text: `Leia o trecho a seguir: "A equipe de desenvolvimento __ de que o sistema estaria pronto em três meses, entretanto, __ o prazo estipulado, houve necessidade de ajustes no cronograma." Assinale a alternativa que preenche corretamente as lacunas, considerando a regência verbal e a concordância nominal.`,
    options: [
      { letter: 'A', text: `assegurou - ao término de` },
      { letter: 'B', text: `assegurou - à término de` },
      { letter: 'C', text: `asseguraram - ao término de` },
      { letter: 'D', text: `asseguraram - à término de` }
    ],
    correctAnswer: 'A',
    explanation: `A concordância correta é 'a equipe assegurou', pois 'equipe' é um substantivo coletivo singular. Quanto à regência, usa-se 'ao término', pois o termo 'término' é masculino, portanto, não se usa crase. As alternativas C e D estão erradas devido à concordância verbal e ao uso indevido de crase.`,
    tags: ['portugues', 'alto'],
    source: 'OpenAI-GPT4',
  },
  {
    id: 200,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Gramática: concordância verbal e nominal',
    difficulty: 'alto',
    weight: 2,
    text: `Em relação à pontuação, analise a frase: "Os desenvolvedores, que participaram do projeto, estavam presentes na reunião." Assinale a opção que explica corretamente o uso das vírgulas.`,
    options: [
      { letter: 'A', text: `As vírgulas separam um aposto explicativo.` },
      { letter: 'B', text: `As vírgulas indicam uma oração subordinada adjetiva explicativa.` },
      { letter: 'C', text: `As vírgulas indicam uma elipse de sujeito.` },
      { letter: 'D', text: `As vírgulas separam uma oração coordenada sindética.` }
    ],
    correctAnswer: 'B',
    explanation: `As vírgulas estão separando uma oração subordinada adjetiva explicativa, que fornece uma informação adicional sobre 'os desenvolvedores'. A opção A está incorreta, pois o trecho entre vírgulas não é um aposto. A opção C está errada porque não há elipse de sujeito. A opção D se refere a orações coordenadas, o que não é o caso.`,
    tags: ['portugues', 'alto'],
    source: 'OpenAI-GPT4',
  },
  {
    id: 201,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Regência verbal e nominal, crase',
    difficulty: 'alto',
    weight: 2,
    text: `Considere a frase: "O analista é responsável por todos os sistemas e, conforme a necessidade, ele __ as atualizações." Assinale a alternativa que completa corretamente a frase, considerando a concordância verbal.`,
    options: [
      { letter: 'A', text: `realizarão` },
      { letter: 'B', text: `realizará` },
      { letter: 'C', text: `realizará-o` },
      { letter: 'D', text: `realizarão-no` }
    ],
    correctAnswer: 'B',
    explanation: `O sujeito 'ele' é singular, portanto, o verbo deve concordar no singular: 'realizará'. As opções A e D estão erradas pela concordância verbal no plural, enquanto a opção C erra ao usar indevidamente o pronome oblíquo 'o' para um verbo que não é transitivo direto.`,
    tags: ['portugues', 'alto'],
    source: 'OpenAI-GPT4',
  },
  {
    id: 202,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Pontuação e ortografia oficial',
    difficulty: 'alto',
    weight: 2,
    text: `Assinale a alternativa que apresenta erro de ortografia:`,
    options: [
      { letter: 'A', text: `Acesse o portal para mais informações.` },
      { letter: 'B', text: `A reunião foi adiada por motivos técnicos.` },
      { letter: 'C', text: `O sistema está operando normalmente.` },
      { letter: 'D', text: `Deve-se evitar a proliferação de erros.` }
    ],
    correctAnswer: 'D',
    explanation: `A palavra 'proliferação' está escrita incorretamente. A forma correta é 'proliferação', com 'l' após o prefixo 'pro'. As outras alternativas estão corretas ortograficamente.`,
    tags: ['portugues', 'alto'],
    source: 'OpenAI-GPT4',
  },
  {
    id: 203,
    subject: 'portugues',
    subjectName: 'Língua Portuguesa',
    subtopic: 'Coesão e coerência textual',
    difficulty: 'alto',
    weight: 2,
    text: `Assinale a alternativa em que há erro de crase:`,
    options: [
      { letter: 'A', text: `Assisti à palestra sobre segurança de dados.` },
      { letter: 'B', text: `Referiu-se à empresa de tecnologia.` },
      { letter: 'C', text: `Foi à reunião com os gestores.` },
      { letter: 'D', text: `A atualização será feita à partir de amanhã.` }
    ],
    correctAnswer: 'D',
    explanation: `A expressão 'a partir de' não exige crase, pois 'a' é uma preposição sem artigo definido. Portanto, 'à partir de' está incorreto. As demais alternativas fazem uso correto da crase, pois envolvem a fusão da preposição 'a' com o artigo 'a'.`,
    tags: ['portugues', 'alto'],
    source: 'OpenAI-GPT4',
  },


  // ================================================================
  // QUESTÕES INTEGRADAS - 2026-01-13
  // Total: 5 questões
  // ================================================================
  {
    id: 204,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'UML 2.x: diagramas de casos de uso, classes, sequência, atividades',
    difficulty: 'alto',
    weight: 3,
    text: `No contexto de um sistema de gerenciamento de biblioteca, utilizando UML 2.x, qual diagrama seria mais apropriado para representar a interação dinâmica entre um usuário que realiza a busca de um livro e o sistema que processa essa solicitação?`,
    options: [
      { letter: 'A', text: `Diagrama de classes` },
      { letter: 'B', text: `Diagrama de sequência` },
      { letter: 'C', text: `Diagrama de casos de uso` },
      { letter: 'D', text: `Diagrama de atividades` }
    ],
    correctAnswer: 'B',
    explanation: `O diagrama de sequência é utilizado para representar a interação entre objetos ao longo do tempo. Ele é ideal para ilustrar como um usuário interage com o sistema para realizar a busca de um livro, mostrando as mensagens trocadas entre o usuário e o sistema.`,
    tags: ['especificos_analista', 'alto'],
    source: 'OpenAI-GPT4',
  },
  {
    id: 205,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'BPMN 2.0: eventos, gateways, atividades, pools, lanes',
    difficulty: 'alto',
    weight: 3,
    text: `Em um processo modelado com BPMN 2.0, qual elemento é utilizado para representar uma decisão baseada em condições, que direciona o fluxo do processo para um dos vários caminhos possíveis?`,
    options: [
      { letter: 'A', text: `Evento de início` },
      { letter: 'B', text: `Atividade` },
      { letter: 'C', text: `Gateway` },
      { letter: 'D', text: `Pool` }
    ],
    correctAnswer: 'C',
    explanation: `Um gateway em BPMN 2.0 é utilizado para controlar a divergência e convergência de fluxos de processo, frequentemente representando uma decisão que direciona o processo para diferentes caminhos com base em condições.`,
    tags: ['especificos_analista', 'alto'],
    source: 'OpenAI-GPT4',
  },
  {
    id: 206,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Padrões de projeto GoF: criacionais, estruturais, comportamentais',
    difficulty: 'alto',
    weight: 3,
    text: `Considere uma arquitetura de software que requer escalabilidade e independência de componentes. Qual padrão arquitetural é mais apropriado para dividir uma aplicação em serviços independentes que podem ser desenvolvidos, implantados e escalados de forma autônoma?`,
    options: [
      { letter: 'A', text: `Arquitetura em camadas` },
      { letter: 'B', text: `Arquitetura de microsserviços` },
      { letter: 'C', text: `Modelo-Vista-Controlador (MVC)` },
      { letter: 'D', text: `Arquitetura monolítica` }
    ],
    correctAnswer: 'B',
    explanation: `A arquitetura de microsserviços é ideal para aplicações que requerem escalabilidade e independência de componentes, pois divide a aplicação em serviços menores e independentes que podem ser desenvolvidos, testados, implantados e escalados de forma autônoma.`,
    tags: ['especificos_analista', 'alto'],
    source: 'OpenAI-GPT4',
  },
  {
    id: 207,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'Arquitetura de software: MVC, microsserviços, SOA, clean architecture',
    difficulty: 'alto',
    weight: 3,
    text: `No contexto de segurança de software, qual prática é essencial para prevenir injeções SQL em uma aplicação web?`,
    options: [
      { letter: 'A', text: `Utilização de autenticação OAuth` },
      { letter: 'B', text: `Validação de entrada e uso de consultas preparadas` },
      { letter: 'C', text: `Criação de índices nos bancos de dados` },
      { letter: 'D', text: `Implementação de autenticação JWT` }
    ],
    correctAnswer: 'B',
    explanation: `Para prevenir injeções SQL, é essencial validar todas as entradas dos usuários e utilizar consultas preparadas (ou statements parametrizados), que separam o código SQL da entrada dos dados fornecida pelo usuário, evitando a execução de comandos maliciosos.`,
    tags: ['especificos_analista', 'alto'],
    source: 'OpenAI-GPT4',
  },
  {
    id: 208,
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - Analista',
    subtopic: 'DevOps e CI/CD: Docker, Kubernetes, pipelines',
    difficulty: 'alto',
    weight: 3,
    text: `Em um ambiente DevOps, qual ferramenta é comumente utilizada para orquestrar contêineres e gerenciar a escala de aplicações em produção?`,
    options: [
      { letter: 'A', text: `Git` },
      { letter: 'B', text: `Jenkins` },
      { letter: 'C', text: `Kubernetes` },
      { letter: 'D', text: `Docker Compose` }
    ],
    correctAnswer: 'C',
    explanation: `Kubernetes é uma plataforma de orquestração de contêineres amplamente utilizada em ambientes DevOps para gerenciar o ciclo de vida de aplicações em contêineres, permitindo a escalabilidade automática e a recuperação automática de falhas.`,
    tags: ['especificos_analista', 'alto'],
    source: 'OpenAI-GPT4',
  },
];

export const getQuestionsBySubject = (subjectId: string): Question[] => {
  return questions.filter(q => q.subject === subjectId);
};

export const getTotalPoints = (answers: Map<number, string>): number => {
  let total = 0;
  questions.forEach(q => {
    if (answers.get(q.id) === q.correctAnswer) {
      total += q.weight;
    }
  });
  return total;
};

export const getPassingScore = (): number => {
  const maxPoints = questions.reduce((sum, q) => sum + q.weight, 0);
  return maxPoints * 0.5;
};
