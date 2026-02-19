/* ── DADOS DO EVENTO ── */
export const EVENTO = {
  nome:      'Lorena',
  data:      new Date(2026, 5, 28),
  dataTexto: '28 de junho de 2026',
  local:     'Mansão Adélia Prado, SP',
  convidados: 120,
  duracao:   '6 horas',
}

/* ── BLOCOS DO CRONOGRAMA ── */
export const BLOCOS = [
  {
    num: 1, horario: '19:00 – 19:30', duracao: '30min', icone: '🎉',
    titulo: 'Recepção — DJ',
    atividades: [
      { h: '19:00', acao: 'Abertura das portas — DJ toca na recepção',        resp: 'DJ / Equipe buffet' },
      { h: '19:05', acao: 'Convidados chegam — pais e Lorena recepcionam',    resp: 'Família' },
      { h: '19:25', acao: 'DJ prepara transição para a banda',                resp: 'DJ' },
    ],
  },
  {
    num: 2, horario: '19:30 – 20:30', duracao: '1h', icone: '🎸',
    titulo: 'Show da Banda — 1ª Parte',
    atividades: [
      { h: '19:30', acao: 'Banda entra — início da 1ª parte do show',        resp: 'Banda de pagode' },
      { h: '20:00', acao: 'Interação da banda com o público',                 resp: 'Banda / Alan' },
      { h: '20:20', acao: 'Pico da 1ª parte — pista animada',                resp: 'Banda' },
      { h: '20:25', acao: 'Encerramento 1ª parte — banda pausa',             resp: 'Banda' },
    ],
  },
  {
    num: 3, horario: '20:30 – 21:30', duracao: '1h', icone: '💒',
    titulo: 'Cerimônia',
    atividades: [
      { h: '20:30', acao: 'Início da cerimônia — violinista entra',           resp: 'Orquestra / Alan' },
      { h: '20:32', acao: 'Entrada de Lorena (Look 1) com o pai',             resp: 'Lorena' },
      { h: '20:37', acao: 'Início da retrospectiva em projeção',              resp: 'Operador projetor' },
      { h: '20:45', acao: 'Valsa pai e filha',                               resp: 'Orquestra' },
      { h: '20:50', acao: 'Dança de Lorena com as amigas',                   resp: 'DJ / Orquestra' },
      { h: '20:57', acao: 'Troca do sapato — momento simbólico',             resp: 'Alan' },
      { h: '20:59', acao: 'Brinde com família',                              resp: 'Alan / Família' },
      { h: '21:10', acao: 'Fim da cerimônia — transição para o buffet',      resp: 'Equipe buffet' },
    ],
  },
  {
    num: 4, horario: '21:30 – 22:30', duracao: '1h', icone: '🍽️',
    titulo: 'Jantar — DJ',
    atividades: [
      { h: '21:30', acao: 'Abertura do buffet (Menu Rosmarino) — DJ retoma', resp: 'Equipe buffet / DJ' },
      { h: '21:30', acao: 'Cairo Bar aberto / cervejas disponíveis',          resp: 'Equipe bar' },
      { h: '21:30', acao: 'Magic Mirror disponível (fotos ilimitadas)',       resp: 'Operador Mirror' },
      { h: '21:50', acao: '🎂 Parabéns — Lorena sopra a vela',              resp: 'DJ / Todos' },
      { h: '21:55', acao: 'Corte do bolo / fotógrafo posicionado',           resp: 'Família' },
      { h: '22:05', acao: 'Mesa de doces liberada',                          resp: 'Equipe buffet' },
      { h: '22:15', acao: 'Lorena sai para troca de look (bastidores)',      resp: 'Maquiadora' },
    ],
  },
  {
    num: 5, horario: '22:30 – 23:30', duracao: '1h', icone: '🎸',
    titulo: 'Show da Banda — 2ª Parte',
    atividades: [
      { h: '22:30', acao: 'Banda retorna — 2ª parte do show',                resp: 'Banda de pagode' },
      { h: '23:00', acao: 'Interação final da banda com a aniversariante',   resp: 'Banda / Alan' },
      { h: '23:20', acao: 'Banda encerra — DJ assume',                       resp: 'Banda / DJ' },
    ],
  },
  {
    num: 6, horario: '23:30 – 01:00', duracao: '1h30', icone: '💃',
    titulo: 'DJ Balada e Encerramento',
    atividades: [
      { h: '23:30', acao: 'Reentrada de Lorena — Look 2 (macacão de festa)', resp: 'DJ / Iluminação' },
      { h: '23:30', acao: 'Gelo seco + iluminação cênica (sincronizados)',   resp: 'Equipe técnica' },
      { h: '23:35', acao: 'DJ abre balada — hit de impacto',                 resp: 'DJ' },
      { h: '23:40', acao: '🎆 Fogos indoor',                                resp: 'Equipe técnica' },
      { h: '00:00', acao: 'Coreografia especial (se preparada)',             resp: 'Lorena + amigos' },
      { h: '00:20', acao: 'Distribuição das lembrancinhas',                  resp: 'Equipe / amigos' },
      { h: '00:40', acao: 'Agradecimento de Lorena e família',              resp: 'Alan / Lorena' },
      { h: '00:55', acao: 'Última música especial',                          resp: 'DJ' },
      { h: '01:00', acao: 'Encerramento — luzes acesas',                    resp: 'Equipe' },
    ],
  },
]

/* ── CHECKLIST ── */
export const CHECKLIST_GRUPOS = [
  {
    id: 'buffet',
    titulo: '🌹 Buffet e Estrutura (Rosmarino)',
    tipo: 'contratado',
    itens: [
      { id: 'b1',  label: 'Buffet completo (Menu Rosmarino)',      fixo: true },
      { id: 'b2',  label: 'Decoração floral de luxo',              fixo: true },
      { id: 'b3',  label: 'DJ / Som / Iluminação',                 fixo: true },
      { id: 'b4',  label: 'Assessoria no dia',                     fixo: true },
      { id: 'b5',  label: 'Bolo e doces tradicionais',             fixo: true },
      { id: 'b6',  label: 'Refrigerantes, água e sucos',           fixo: true },
      { id: 'b7',  label: 'Staff completo',                        fixo: true },
      { id: 'b8',  label: 'Pista de dança',                        fixo: true },
      { id: 'b9',  label: 'Gelo seco',                             fixo: true },
      { id: 'b10', label: 'Luz cênica',                            fixo: true },
      { id: 'b11', label: 'Fogos indoor',                          fixo: true },
      { id: 'b12', label: 'Bar Cairo',                             fixo: true },
      { id: 'b13', label: 'Capela para cerimônia',                 fixo: true },
      { id: 'b14', label: 'Pacote Nice (foto + filmagem)',          fixo: true },
    ],
  },
  {
    id: 'extras',
    titulo: '➕ Extras Contratados',
    tipo: 'contratado',
    itens: [
      { id: 'e1', label: 'Magic Mirror (5h, fotos ilimitadas)',   fixo: true },
      { id: 'e2', label: 'Orquestra / Violinista para cerimônia', fixo: true },
      { id: 'e3', label: 'Cerveja (300 latas Brahma DM)',         fixo: true },
      { id: 'f1', label: 'Retrospectiva + Projetor',              fixo: true },
    ],
  },
  {
    id: 'porfora',
    titulo: '🎭 Por Fora',
    tipo: 'pendente',
    itens: [
      { id: 'pf1', label: 'Cerimonialista (Alan)',              fixo: true  },
      { id: 'pf2', label: 'DJ (Shalom)',                        fixo: true  },
      { id: 'pf3', label: 'Banda',                              fixo: false },
      { id: 'pf4', label: 'Maquiador (make, cabelo, retoques)', fixo: false },
      { id: 'pf5', label: 'Lembrancinhas',                      fixo: false },
      { id: 'pf6', label: 'Vestidos debutante (3 looks)',       fixo: false },
    ],
  },
]

/* ── PENDÊNCIAS ── */
export const PENDENCIAS = [
  { id: 'pd1', titulo: 'Cerimonialista (Alan)',              prioridade: 'media', prazo: '30/04/2026', resp: 'Família', obs: 'Confirmar contrato com Alan' },
  { id: 'pd2', titulo: 'DJ (Shalom)',                        prioridade: 'media', prazo: '30/04/2026', resp: 'Família', obs: 'Confirmar contrato com Shalom' },
  { id: 'pd3', titulo: 'Banda',                              prioridade: 'alta',  prazo: '30/04/2026', resp: 'Família', obs: 'A definir — obter orçamentos' },
  { id: 'pd4', titulo: 'Maquiador (make, cabelo, retoques)', prioridade: 'alta',  prazo: '28/05/2026', resp: 'Família', obs: 'A definir — incluir prova antes do evento' },
  { id: 'pd5', titulo: 'Lembrancinhas',                      prioridade: 'media', prazo: '28/05/2026', resp: 'Família', obs: 'A definir' },
  { id: 'pd6', titulo: 'Vestidos debutante (2 looks)',        prioridade: 'alta',  prazo: '30/04/2026', resp: 'Lorena',  obs: 'Look 1 entrada/cerimônia · Look 2 festa' },
]

/* ── CHECKLIST PRÉ-CERIMÔNIA ── */
export const CHECKLIST_CERIMONIA = [
  { id: 'cc1', label: 'Texto do MC revisado e aprovado pela família' },
  { id: 'cc2', label: 'Música de entrada da debutante definida' },
  { id: 'cc3', label: 'Música da valsa definida' },
  { id: 'cc4', label: 'Retrospectiva editada e aprovada' },
  { id: 'cc5', label: 'Projetor e tela testados no local' },
  { id: 'cc6', label: 'Sequência de fotos da retrospectiva selecionada' },
  { id: 'cc7', label: 'Sapato da troca preparado' },
  { id: 'cc8', label: 'Taças de brinde separadas' },
  { id: 'cc9', label: 'Posições da família ensaiadas' },
]

