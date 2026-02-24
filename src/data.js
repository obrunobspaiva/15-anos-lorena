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
    num: 1, horario: '19:00 – 20:30', duracao: '1h30', icone: '🎉',
    titulo: 'Recepção — DJ',
    atividades: [
      { h: '19:00',  acao: 'Abertura das portas — DJ toca lounge/ambient',                              resp: 'DJ' },
      { h: '19:00+', acao: 'Entradas liberadas (finger foods / canapés — disponíveis por 1h)',           resp: 'Equipe buffet' },
      { h: '19:00+', acao: 'Jantar liberado (disponível durante toda a festa)',                          resp: 'Equipe buffet' },
      { h: '19:00+', acao: 'Espelho Mágico disponível (fotos ilimitadas — ativo até o fim da festa)',    resp: 'Operador Mirror' },
      { h: '19:00+', acao: 'Cairo Bar aberto + cervejas (ativo até o fim da festa)',                     resp: 'Equipe bar' },
      { h: '19:00+', acao: 'App de Recados ativo — QR Code nas mesas, convidados enviam mensagens, fotos e vídeos', resp: '—' },
      { h: '19:05',  acao: 'Convidados chegam — família recepciona (Lorena com Look 1 — vestido recepção)', resp: 'Família' },
      { h: '20:20',  acao: 'DJ reduz volume — transição para cerimônia',                                resp: 'DJ / Cerimonialista' },
    ],
  },
  {
    num: 2, horario: '20:30 – 21:30', duracao: '1h', icone: '💒',
    titulo: 'Cerimônia',
    atividades: [
      { h: '20:30', acao: 'Início da cerimônia — violinista assume',                                    resp: 'Orquestra / Cerimonialista' },
      { h: '20:32', acao: '🎥 Retrospectiva — linha do tempo infância → 15 anos (~5 min)',              resp: 'Operador projetor' },
      { h: '20:37', acao: 'Cerimonialista faz transição emocional — anuncia entrada da Lorena',         resp: 'Cerimonialista' },
      { h: '20:40', acao: 'Entrada de Lorena (Look 2 — vestido principal + sapato) com o pai — violinista toca',  resp: 'Lorena / Bruno / Orquestra' },
      { h: '20:45', acao: 'Valsa pai e filha',                                                          resp: 'Orquestra' },
      { h: '20:49', acao: '🎶 Dança divertida pai e filha — "valsa maluca"',                            resp: 'Bruno / Lorena / DJ' },
      { h: '20:53', acao: 'Fala do cerimonialista — mensagem breve',                                    resp: 'Cerimonialista' },
      { h: '20:58', acao: 'Homenagens da família',                                                      resp: 'Cerimonialista / Família' },
      { h: '21:05', acao: '🎂 Parabéns — Lorena sopra a vela',                                         resp: 'DJ / Todos' },
      { h: '21:10', acao: 'Corte do bolo (bolo entregue por garçom aos convidados)',                     resp: 'Equipe buffet' },
      { h: '21:18', acao: 'Agradecimento de Lorena e família',                                          resp: 'Cerimonialista' },
      { h: '21:22', acao: '🎆 Fogos indoor — encerramento da cerimônia',                                resp: 'Equipe técnica' },
      { h: '21:30', acao: 'Transição para convívio',                                                    resp: 'Equipe' },
    ],
  },
  {
    num: 3, horario: '21:30 – 22:00', duracao: '30min', icone: '🍽️',
    titulo: 'Convívio + Jantar',
    atividades: [
      { h: '21:30', acao: 'DJ retoma com música ambiente',                                              resp: 'DJ' },
      { h: '21:30', acao: 'Espelho Mágico + Bar continuam',                                             resp: 'Operadores' },
      { h: '21:40', acao: 'Lorena sai para troca de look (bastidores) — 20 min',                        resp: 'Maquiadora' },
      { h: '21:40', acao: 'Troca: vestido principal → macaquinho / sapato → tênis / cabelo preso → cabelo solto', resp: 'Maquiadora' },
    ],
  },
  {
    num: 4, horario: '22:00 – 01:00', duracao: '3h', icone: '💃',
    titulo: 'Balada',
    atividades: [
      { h: '22:00', acao: 'DJ abre a balada — hits, volume subindo',                                    resp: 'DJ' },
      { h: '22:05', acao: 'Luzes apagam — silêncio total',                                              resp: 'Equipe técnica' },
      { h: '22:05', acao: 'Gelo seco + fogos indoor',                                                   resp: 'Equipe técnica' },
      { h: '22:06', acao: 'Entrada Lorena — Look 3 (macaquinho + tênis + cabelo solto)',                 resp: 'Lorena / DJ' },
      { h: '22:07', acao: 'DJ solta hit — Lorena dança livre no centro (~1 min)',                        resp: 'DJ' },
      { h: '22:08', acao: '💃 Amigas surgem — coreografia surpresa com Lorena (~3-4 min)',               resp: 'Amigas / Lorena / DJ' },
      { h: '22:12', acao: '🤖 Robô de LED entra durante a coreografia — CO₂, laser, LEDs sincronizados', resp: 'Robô LED' },
      { h: '22:15', acao: 'Coreografia encerra — DJ solta pancadão — pista aberta pra todos',           resp: 'DJ' },
      { h: '22:15', acao: 'Robô continua interagindo com convidados na pista',                           resp: 'Robô LED' },
      { h: '23:00', acao: 'Robô encerra show (~45 min total)',                                           resp: 'Robô LED' },
      { h: '23:00', acao: 'DJ segue — set de pico até o final da festa',                                 resp: 'DJ' },
    ],
  },
  {
    num: 5, horario: '00:00 – 01:00', duracao: '1h', icone: '🌙',
    titulo: 'Encerramento',
    atividades: [
      { h: '00:00', acao: 'Doces liberados na mesa',                                                    resp: 'Equipe buffet' },
      { h: '00:00', acao: 'Mesa de saída montada — café, chá e petit four + lembrancinhas',              resp: 'Equipe buffet' },
      { h: '00:00', acao: 'Cartões QR da galeria digital disponíveis na mesa de saída',                  resp: 'Equipe' },
      { h: '01:00', acao: 'Encerramento — luzes acesas',                                                resp: 'Equipe' },
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
      { id: 'pf4', label: 'Maquiador (make, cabelo, retoques)', fixo: false },
      { id: 'pf5', label: 'Lembrancinhas (Gloss + Doce)',       fixo: false },
      { id: 'pf6', label: 'Vestidos debutante (3 looks)',       fixo: false },
    ],
  },
]

/* ── PENDÊNCIAS ── */
/* checkId vincula ao item correspondente do grupo "Por Fora" no checklist */
export const PENDENCIAS = [
  { id: 'pd1',  checkId: 'pf1', titulo: 'Cerimonialista (Alan)',              prioridade: 'media', prazo: '30/04/2026', resp: 'Família',        obs: 'Confirmar contrato com Alan' },
  { id: 'pd2',  checkId: 'pf2', titulo: 'DJ (Shalom)',                        prioridade: 'media', prazo: '30/04/2026', resp: 'Família',        obs: 'Confirmar contrato com Shalom' },
  { id: 'pd4',  checkId: 'pf4', titulo: 'Maquiador (make, cabelo, retoques)', prioridade: 'alta',  prazo: '28/05/2026', resp: 'Família',        obs: 'A definir — incluir prova antes do evento' },
  { id: 'pd5',  checkId: 'pf5', titulo: 'Lembrancinhas (Gloss + Doce)',       prioridade: 'media', prazo: '28/05/2026', resp: 'Família',        obs: 'Gloss cores neutras + adesivo Lorena + doce Bem Vivido' },
  { id: 'pd6',  checkId: 'pf6', titulo: 'Vestidos debutante (3 looks)',       prioridade: 'alta',  prazo: '30/04/2026', resp: 'Lorena',         obs: 'Look 1: vestido recepção · Look 2: vestido principal cerimônia + sapato · Look 3: macaquinho + tênis + cabelo solto' },
  { id: 'pd7',  checkId: null,  titulo: 'Robô de LED',                        prioridade: 'alta',  prazo: '31/03/2026', resp: 'Família',        obs: 'Fechar contrato — R$ 1.200–1.800' },
  { id: 'pd9',  checkId: null,  titulo: 'Kit Balada',                         prioridade: 'media', prazo: '31/05/2026', resp: 'Família',        obs: 'Orçar e encomendar (pulseira LED, óculos neon, plaquinhas, sacola)' },
  { id: 'pd10', checkId: null,  titulo: 'Coreografia das Amigas',             prioridade: 'media', prazo: '31/05/2026', resp: 'Lorena',         obs: 'Montar grupo, escolher música e ensaiar' },
  { id: 'pd11', checkId: null,  titulo: 'Dança Divertida Pai e Filha',        prioridade: 'media', prazo: '31/05/2026', resp: 'Bruno / Lorena', obs: 'Escolher música e ensaiar — "valsa maluca"' },
  { id: 'pd12', checkId: null,  titulo: 'Cartão QR — Galeria Digital',        prioridade: 'baixa', prazo: '15/06/2026', resp: 'Família',        obs: 'Criar página /galeria, imprimir 160 cartões — R$ 80–150' },
]

/* ── IDEIAS & EXTRAS ── */
export const IDEIAS = [
  {
    id: 'idea1',
    label: 'Robô de LED',
    status: '⚠️',
    statusLabel: 'A contratar',
    descricao: 'Show de ~45 min na balada. Robô de 2,50–2,70m com LEDs RGB, CO₂, laser. Entra durante a coreografia das amigas e continua na pista depois.',
    prazo: 'mar/2026',
    custo: 'R$ 1.200 – R$ 1.800',
    subTarefas: [
      { id: 'idea1_s1', label: 'Pedir orçamento nos 3 fornecedores (data 28/06/2026, Mansão Adélia Mooca)' },
      { id: 'idea1_s2', label: 'Confirmar pé-direito do salão com a Mansão Adélia' },
      { id: 'idea1_s3', label: 'Escolher fornecedor e fechar contrato' },
      { id: 'idea1_s4', label: 'Alinhar com DJ o momento de entrada do robô (durante coreografia das amigas)' },
      { id: 'idea1_s7', label: 'Alinhar música da coreografia com operador do robô (sincronizar CO₂ e LEDs)' },
      { id: 'idea1_s8', label: 'Ensaio técnico 1h antes da festa (robô + amigas + posicionamento)' },
    ],
  },
  {
    id: 'idea2',
    label: 'App de Recados e Fotos',
    status: '⚠️',
    statusLabel: 'A desenvolver',
    descricao: 'Rede social da festa. Convidados escaneiam QR Code nas mesas e enviam mensagens, fotos e vídeos. Após o evento, vira galeria/álbum digital.',
    prazo: 'mai/2026',
    custo: 'R$ 0 (desenvolvimento próprio)',
    subTarefas: [
      { id: 'idea2_s10', label: 'Desenvolver página de envio (QR Code → formulário: nome, mensagem, foto/vídeo)' },
      { id: 'idea2_s11', label: 'Desenvolver feed/timeline (convidados veem o que outros mandaram)' },
      { id: 'idea2_s12', label: 'Desenvolver modo slideshow (apresentação em tempo real)' },
      { id: 'idea2_s13', label: 'Desenvolver painel de moderação (aprovar antes de exibir)' },
      { id: 'idea2_s14', label: 'Desenvolver galeria pós-evento (fotos do fotógrafo + convidados)' },
      { id: 'idea2_s15', label: 'Criar QR Codes para impressão (1 por mesa + extras)' },
      { id: 'idea2_s16', label: 'Testar integração completa do app' },
    ],
  },
  {
    id: 'idea3',
    label: 'Cartão QR — Galeria Digital',
    status: '⚠️',
    statusLabel: 'A produzir',
    descricao: 'Cartãozinho estilo cartão de visita com QR Code para galeria digital. Distribuído na mesa de saída.',
    prazo: 'jun/2026',
    custo: 'R$ 80–150 (impressão)',
    subTarefas: [
      { id: 'idea3_s1', label: 'Criar página /galeria no app' },
      { id: 'idea3_s2', label: 'Criar design do cartão (frente: "Lorena 15 anos — 28.06.2026" + QR + frase / verso: arte da festa)' },
      { id: 'idea3_s3', label: 'Aprovar layout' },
      { id: 'idea3_s4', label: 'Imprimir 160 cartões (couché 300g)' },
      { id: 'idea3_s7', label: 'Disponibilizar na mesa de saída junto com café/chá/petit four' },
    ],
  },
  {
    id: 'idea4',
    label: 'Lembrancinhas — Gloss + Doce',
    status: '⚠️',
    statusLabel: 'A produzir',
    descricao: 'Kit lembrancinha com gloss em várias cores neutras com adesivo personalizado da Lorena + doce Bem Vivido.',
    prazo: 'jun/2026',
    custo: 'A orçar',
    subTarefas: [
      { id: 'idea4_s1', label: 'Definir cores dos glosses' },
      { id: 'idea4_s2', label: 'Criar arte do adesivo personalizado' },
      { id: 'idea4_s3', label: 'Orçar glosses + adesivos' },
      { id: 'idea4_s4', label: 'Orçar doces Bem Vivido (quantidade: 160 unidades)' },
      { id: 'idea4_s5', label: 'Produzir/montar kits' },
      { id: 'idea4_s6', label: 'Definir ponto de distribuição (mesa de saída junto com café/chá)' },
    ],
  },
  {
    id: 'idea5',
    label: 'Kit Balada',
    status: '⚠️',
    statusLabel: 'Comprar',
    descricao: 'Kit entregue na abertura da balada. Cada convidado recebe sacola com: pulseira LED neon, adesivos para pulseira com nome, óculos neon, plaquinhas engraçadas (para fotos), sacola personalizada.',
    prazo: 'jun/2026',
    custo: 'A orçar',
    subTarefas: [
      { id: 'idea5_s1', label: 'Orçar cada item separadamente' },
      { id: 'idea5_s2', label: 'Definir quantidade (160 kits)' },
      { id: 'idea5_s3', label: 'Criar arte da sacola personalizada' },
      { id: 'idea5_s4', label: 'Montar kits (pode ser feito dias antes)' },
      { id: 'idea5_s5', label: 'Definir ponto de entrega (entrada da pista no início da balada)' },
    ],
  },
  {
    id: 'idea7',
    label: 'Coreografia das Amigas',
    status: '⚠️',
    statusLabel: 'A preparar',
    descricao: '4-6 amigas ensaiam coreografia surpresa com Lorena. Executada na abertura da balada junto com o Robô de LED.',
    prazo: 'mai-jun/2026',
    custo: 'R$ 0 (ou coreógrafo opcional)',
    subTarefas: [
      { id: 'idea7_s1', label: 'Lorena escolher as amigas (4-6)' },
      { id: 'idea7_s2', label: 'Escolher música da coreografia' },
      { id: 'idea7_s3', label: 'Montar coreografia (referências TikTok/Reels ou contratar coreógrafo)' },
      { id: 'idea7_s4', label: 'Ensaiar 4-6 vezes nas semanas antes' },
      { id: 'idea7_s5', label: 'Combinar posicionamento inicial (escondidas entre convidados)' },
      { id: 'idea7_s6', label: 'Combinar dress code das amigas' },
      { id: 'idea7_s7', label: 'Alinhar música e timing com operador do Robô de LED' },
      { id: 'idea7_s8', label: 'Ensaio técnico 1h antes da festa (com robô no local)' },
    ],
  },
  {
    id: 'idea8',
    label: 'Dança Divertida Pai e Filha ("Valsa Maluca")',
    status: '⚠️',
    statusLabel: 'A preparar',
    descricao: 'Após a valsa clássica, a música corta de surpresa pra um hit atual e pai e filha soltam dancinha engraçada juntos.',
    prazo: 'mai-jun/2026',
    custo: 'R$ 0',
    subTarefas: [
      { id: 'idea8_s1', label: 'Lorena escolher a música do "corte"' },
      { id: 'idea8_s2', label: 'Ensaiar a dancinha (simples, 1-2 min)' },
      { id: 'idea8_s3', label: 'Alinhar com DJ a transição valsa → hit' },
      { id: 'idea8_s4', label: 'Manter surpresa dos convidados' },
    ],
  },
]

/* ── CHECKLIST PRÉ-CERIMÔNIA ── */
export const CHECKLIST_CERIMONIA = [
  { id: 'cc1',  label: 'Texto do MC revisado e aprovado pela família' },
  { id: 'cc2',  label: 'Música de entrada da debutante definida' },
  { id: 'cc3',  label: 'Música da valsa definida' },
  { id: 'cc4',  label: 'Retrospectiva editada e aprovada' },
  { id: 'cc5',  label: 'Projetor e tela testados no local' },
  { id: 'cc6',  label: 'Sequência de fotos da retrospectiva selecionada' },
  { id: 'cc8',  label: 'Taças de brinde separadas' },
  { id: 'cc9',  label: 'Posições da família ensaiadas' },
  { id: 'cc11', label: 'Música da valsa maluca definida e alinhada com DJ' },
]

/* ── TOTAL CONTRATADO ── */
export const TOTAL_CONTRATADO = 42502.50

