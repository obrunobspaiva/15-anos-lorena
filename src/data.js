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
      { h: '19:00', acao: 'Abertura das portas — DJ toca lounge/ambient',          resp: 'DJ' },
      { h: '19:05', acao: 'Convidados chegam — família recepciona',                resp: 'Família' },
      { h: '19:00+', acao: 'Mural Digital ativo — QR Code nas mesas (mensagens, fotos e vídeos dos convidados)', resp: '—' },
      { h: '19:00+', acao: 'Magic Mirror disponível (fotos ilimitadas)',            resp: 'Operador Mirror' },
      { h: '20:20', acao: 'DJ reduz volume — transição para cerimônia',            resp: 'DJ / Cerimonialista' },
    ],
  },
  {
    num: 2, horario: '20:30 – 21:30', duracao: '1h', icone: '💒',
    titulo: 'Cerimônia',
    atividades: [
      { h: '20:30', acao: 'Início da cerimônia — violinista assume',               resp: 'Orquestra / Cerimonialista' },
      { h: '20:32', acao: '🎥 Retrospectiva — linha do tempo infância → 15 anos (~5 min)', resp: 'Operador projetor' },
      { h: '20:37', acao: 'Cerimonialista faz transição emocional — anuncia entrada da Lorena', resp: 'Cerimonialista' },
      { h: '20:40', acao: 'Entrada de Lorena (Look 1) com o pai — violinista toca', resp: 'Lorena / Bruno / Orquestra' },
      { h: '20:45', acao: 'Valsa pai e filha',                                     resp: 'Orquestra' },
      { h: '20:50', acao: 'Fala do cerimonialista — mensagem breve',               resp: 'Cerimonialista' },
      { h: '20:53', acao: '💍 Entrega do Anel — pai → filha, momento simbólico',  resp: 'Bruno / Lorena' },
      { h: '20:58', acao: 'Brinde com família',                                    resp: 'Cerimonialista / Família' },
      { h: '21:00', acao: '🎥 Vídeo-Carta — mensagens gravadas por família e amigos (~5–8 min)', resp: 'Operador projetor' },
      { h: '21:08', acao: '🎂 Parabéns — Lorena sopra a vela',                    resp: 'DJ / Todos' },
      { h: '21:13', acao: 'Corte do bolo + fotos',                                resp: 'Família / Fotógrafo' },
      { h: '21:18', acao: 'Mesa de doces liberada',                               resp: 'Equipe buffet' },
      { h: '21:23', acao: '🎆 Fogos indoor — encerramento da cerimônia',          resp: 'Equipe técnica' },
      { h: '21:30', acao: 'Transição para o buffet',                              resp: 'Equipe' },
    ],
  },
  {
    num: 3, horario: '21:30 – 22:45', duracao: '1h15', icone: '🍽️',
    titulo: 'Jantar + Convívio',
    atividades: [
      { h: '21:30', acao: 'Abertura do buffet (Menu Rosmarino)',                   resp: 'Equipe buffet' },
      { h: '21:30', acao: 'Cairo Bar aberto + cervejas disponíveis',               resp: 'Equipe bar' },
      { h: '21:30', acao: 'DJ retoma com música ambiente',                         resp: 'DJ' },
      { h: '21:30', acao: 'Mural Digital no telão — slideshow das mensagens dos convidados', resp: 'Operador projetor' },
      { h: '21:30', acao: 'Magic Mirror continua disponível',                      resp: 'Operador Mirror' },
      { h: '22:30', acao: 'Lorena sai para troca de look (bastidores) — ~20 min', resp: 'Maquiadora' },
    ],
  },
  {
    num: 4, horario: '22:45 – 01:00', duracao: '2h15', icone: '💃',
    titulo: 'Balada e Encerramento',
    atividades: [
      { h: '22:45', acao: 'DJ esquenta a pista (hits, volume subindo)',             resp: 'DJ' },
      { h: '22:50', acao: 'Luzes apagam — silêncio total',                        resp: 'Equipe técnica' },
      { h: '22:51', acao: '🤖 Robô de LED entra sozinho — CO₂, laser, aquece a pista (~3 min)', resp: 'Robô LED' },
      { h: '22:54', acao: 'Gelo seco + fogos indoor',                             resp: 'Equipe técnica' },
      { h: '22:54', acao: 'Reentrada de Lorena — Look 2 (macacão de festa)',       resp: 'Lorena / DJ' },
      { h: '22:55', acao: 'DJ solta hit — Lorena dança livre no centro (~1 min)', resp: 'DJ' },
      { h: '22:56', acao: '💃🤖 Amigas surgem + robô — coreografia conjunta (~3–4 min)', resp: 'Amigas / Robô LED / DJ' },
      { h: '23:00', acao: 'Coreografia encerra — DJ solta pancadão — pista aberta pra todos', resp: 'DJ' },
      { h: '23:00', acao: 'Robô continua interagindo com convidados na pista',    resp: 'Robô LED' },
      { h: '23:40', acao: 'Robô encerra show (total ~50 min)',                     resp: 'Robô LED' },
      { h: '23:40', acao: 'DJ segue — set de pico',                               resp: 'DJ' },
      { h: '00:15', acao: 'DJ desacelera gradualmente',                           resp: 'DJ' },
      { h: '00:30', acao: 'Agradecimento de Lorena e família',                    resp: 'Cerimonialista / Lorena' },
      { h: '00:40', acao: 'Última música especial',                               resp: 'DJ' },
      { h: '00:45', acao: 'Cartões QR da galeria digital na mesa de saída',       resp: 'Equipe' },
      { h: '00:50', acao: 'Fotos finais',                                         resp: 'Fotógrafo' },
      { h: '01:00', acao: 'Encerramento — luzes acesas',                          resp: 'Equipe' },
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
/* checkId vincula ao item correspondente do grupo "Por Fora" no checklist */
export const PENDENCIAS = [
  { id: 'pd1', checkId: 'pf1', titulo: 'Cerimonialista (Alan)',              prioridade: 'media', prazo: '30/04/2026', resp: 'Família', obs: 'Confirmar contrato com Alan' },
  { id: 'pd2', checkId: 'pf2', titulo: 'DJ (Shalom)',                        prioridade: 'media', prazo: '30/04/2026', resp: 'Família', obs: 'Confirmar contrato com Shalom' },
  { id: 'pd3', checkId: 'pf3', titulo: 'Banda',                              prioridade: 'alta',  prazo: '30/04/2026', resp: 'Família', obs: 'A definir — obter orçamentos' },
  { id: 'pd4', checkId: 'pf4', titulo: 'Maquiador (make, cabelo, retoques)', prioridade: 'alta',  prazo: '28/05/2026', resp: 'Família', obs: 'A definir — incluir prova antes do evento' },
  { id: 'pd5', checkId: 'pf5', titulo: 'Lembrancinhas',                      prioridade: 'media', prazo: '28/05/2026', resp: 'Família', obs: 'A definir' },
  { id: 'pd6', checkId: 'pf6', titulo: 'Vestidos debutante (3 looks)',        prioridade: 'alta',  prazo: '30/04/2026', resp: 'Lorena',  obs: 'Look 1 entrada/cerimônia · Look 2 festa · Look 3' },
]

/* ── IDEIAS & EXTRAS ── */
export const IDEIAS = [
  {
    id: 'idea1',
    label: 'Robô de LED',
    status: '⚠️',
    statusLabel: 'A contratar',
    descricao: 'Abertura da balada — robô surpresa com CO₂ e laser abrindo a pista de dança.',
    prazo: 'mar/2026',
    custo: 'R$ 1.200 – R$ 1.800',
    subTarefas: [
      { id: 'idea1_s1', label: 'Pedir orçamento nos 3 fornecedores (data 28/06/2026, Mansão Adélia)' },
      { id: 'idea1_s2', label: 'Confirmar pé-direito do salão com a Mansão Adélia' },
      { id: 'idea1_s3', label: 'Escolher fornecedor e fechar contrato' },
      { id: 'idea1_s4', label: 'Alinhar com DJ o momento exato da entrada do robô' },
      { id: 'idea1_s5', label: 'Confirmar personalização do peitoral "Lorena 15"' },
      { id: 'idea1_s6', label: 'Pagamento (30% reserva + saldo até véspera)' },
    ],
  },
  {
    id: 'idea2',
    label: 'Mural de Recados Digital',
    status: '⚠️',
    statusLabel: 'A definir',
    descricao: 'QR Code nas mesas — convidados enviam mensagens/fotos em tempo real no telão.',
    prazo: 'mai/2026',
    custo: 'R$ 0 (DIY) ou R$ 150–300 (Cápsula do Tempo)',
    subTarefas: [
      { id: 'idea2_s1', label: 'Decidir entre DIY (app) ou Cápsula do Tempo (pronto)' },
      { id: 'idea2_s2', label: 'Se DIY: desenvolver páginas /enviar, /mural e /admin' },
      { id: 'idea2_s3', label: 'Se Cápsula do Tempo: contratar e configurar o evento' },
      { id: 'idea2_s4', label: 'Criar design do QR Code (identidade visual da festa)' },
      { id: 'idea2_s5', label: 'Imprimir QR Codes (1 por mesa + extras bar e recepção)' },
      { id: 'idea2_s6', label: 'Testar integração com telão/projetor da Mansão Adélia' },
      { id: 'idea2_s7', label: 'Alinhar com DJ/assessoria o momento de exibição no telão' },
    ],
  },
  {
    id: 'idea3',
    label: 'Galeria Digital + Cartão QR',
    status: '⚠️',
    statusLabel: 'A produzir',
    descricao: 'Cartãozinho lembrancinha com QR Code para galeria digital com todas as fotos da festa.',
    prazo: 'jun/2026',
    custo: 'R$ 80–150 (impressão dos cartões)',
    subTarefas: [
      { id: 'idea3_s1', label: 'Criar a página /galeria no app' },
      { id: 'idea3_s2', label: 'Definir design do cartão (identidade visual da festa)' },
      { id: 'idea3_s3', label: 'Aprovar layout com a Lorena' },
      { id: 'idea3_s4', label: 'Imprimir cartões na gráfica (160 unidades)' },
      { id: 'idea3_s5', label: 'Combinar com fotógrafo o upload das fotos pós-evento' },
      { id: 'idea3_s6', label: 'Definir forma de distribuição dos cartões na festa' },
    ],
  },
  {
    id: 'idea4',
    label: 'Vídeo-Carta',
    status: '⚠️',
    statusLabel: 'A produzir',
    descricao: 'Vídeo compilado com mensagens de família e amigos, exibido na cerimônia. Surpresa!',
    prazo: 'jun/2026 (edição até 21/06)',
    custo: 'R$ 0 (produção DIY)',
    subTarefas: [
      { id: 'idea4_s1', label: 'Definir lista final de pessoas para gravar' },
      { id: 'idea4_s2', label: 'Criar mensagem/convite com roteiro e instruções' },
      { id: 'idea4_s3', label: 'Escolher forma de coleta (WhatsApp, app ou Drive)' },
      { id: 'idea4_s4', label: 'Enviar convites para gravação (até 28/05/2026)' },
      { id: 'idea4_s5', label: 'Cobrar retardatários (lembrete 1 semana antes do deadline)' },
      { id: 'idea4_s6', label: 'Baixar e organizar todos os vídeos recebidos' },
      { id: 'idea4_s7', label: 'Editar vídeo final com trilha e transições (5–8 min)' },
      { id: 'idea4_s8', label: 'Revisar e aprovar versão final (sem mostrar à Lorena — surpresa)' },
      { id: 'idea4_s9', label: 'Testar reprodução no projetor/telão da Mansão Adélia' },
      { id: 'idea4_s10', label: 'Entregar arquivo final ao DJ/operador de vídeo da festa' },
    ],
  },
]

/* ── CHECKLIST PRÉ-CERIMÔNIA ── */
export const CHECKLIST_CERIMONIA = [
  { id: 'cc1', label: 'Texto do MC revisado e aprovado pela família' },
  { id: 'cc2', label: 'Música de entrada da debutante definida' },
  { id: 'cc3', label: 'Música da valsa definida' },
  { id: 'cc4', label: 'Retrospectiva editada e aprovada' },
  { id: 'cc5', label: 'Projetor e tela testados no local' },
  { id: 'cc6', label: 'Sequência de fotos da retrospectiva selecionada' },
  { id: 'cc7', label: 'Anel da entrega preparado e guardado' },
  { id: 'cc8', label: 'Taças de brinde separadas' },
  { id: 'cc9', label: 'Posições da família ensaiadas' },
]

