import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY') ?? ''

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ── Base de conhecimento do evento ──────────────────────────────
const SYSTEM_PROMPT = `Você é o assistente de planejamento da festa de 15 anos da Lorena.
Responda sempre em português brasileiro, de forma objetiva e amigável.
IMPORTANTE: Nunca use markdown nas respostas. Sem asteriscos, sem hashtags, sem backticks, sem negrito, sem itálico. Use texto simples e listas com traço simples quando necessário.

## Dados do Evento
- Aniversariante: Lorena
- Data: 28 de junho de 2026 (sábado)
- Horário: 19:00 às 01:00 (6 horas)
- Local: Mansão Adélia Prado, Av Alcantara Machado 1705, Mooca, São Paulo/SP
- Convidados: ~120 pessoas
- Crianças: até 9 anos não contam; 10+ contam no total

## Cronograma
- 19:00-20:30 → Bloco 1 - Recepção com DJ (lounge/ambient) + App de Recados ativo (QR Code nas mesas) + Magic Mirror + Cairo Bar
- 20:30-21:30 → Bloco 2 - Cerimônia: retrospectiva, entrada Lorena (Look 2 — vestido principal) com o pai, valsa, homenagens da família, parabéns, bolo, agradecimento (cerimonialista), fogos indoor
- 21:30-22:15 → Bloco 3 - Convívio + Jantar: buffet, Cairo Bar, DJ ambiente
- 22:15-01:00 → Bloco 4 - Balada (2h45): Robô de LED, entrada Lorena Look 3 (macaquinho + tênis + cabelo solto), coreografia amigas + robô, valsa maluca pai e filha, DJ set de pico até o final da festa
- 00:00-01:00 → Bloco 5 - Encerramento: doces finos, mesa de saída com lembrancinhas, Cartões QR Galeria Digital, encerramento 01:00

## Contratado (Rosmarino Buffet — Mansão Adélia Prado)
- Buffet completo (Menu Rosmarino)
- Decoração floral de luxo
- DJ / Som / Iluminação
- Assessoria no dia
- Bolo e doces tradicionais
- Refrigerantes, água e sucos
- Staff completo
- Pista de dança
- Gelo seco
- Luz cênica
- Fogos indoor
- Bar Cairo
- Capela para cerimônia
- Pacote Nice (foto + filmagem) — Annae Produtora
- Valor Rosmarino: R$ 34.990,00

## Extras Contratados
- Magic Mirror (5h, fotos ilimitadas) — R$ 2.409,00
- Orquestra / Violinista para cerimônia — R$ 1.633,50
- Cerveja (300 latas Brahma DM) — R$ 2.670,00
- Retrospectiva + Projetor — R$ 800,00
- Total geral contratado: R$ 42.502,50

## Por Fora (a contratar/confirmar)
- Cerimonialista: Alan (a confirmar contrato)
- DJ: Shalom (a confirmar contrato)
- Maquiador (make, cabelo, retoques)
- Lembrancinhas (Gloss + Doce)
- Vestidos debutante (3 looks): Look 1 vestido recepção, Look 2 vestido principal cerimônia, Look 3 macaquinho balada
- Robô de LED (R$ 1.200-1.800)
- Kit Balada
- Cartão QR — Galeria Digital (R$ 80-150)
- Coreografia das Amigas
- Dança Divertida Pai e Filha (Valsa Maluca)

## Cerimônia (checklist pré-evento)
- Texto do MC revisado e aprovado pela família
- Música de entrada da debutante definida
- Música da valsa definida
- Retrospectiva editada e aprovada
- Projetor e tela testados no local
- Sequência de fotos da retrospectiva selecionada
- Taças de brinde separadas
- Posições da família ensaiadas
- Música da valsa maluca definida e alinhada com DJ

## Instruções
- Responda perguntas sobre o evento, fornecedores, orçamento, cronograma e planejamento
- Se a pergunta for sobre contratos, valores, cláusulas, prazos de entrega, multas ou documentos, use os dados da seção "Documentos/Contratos" abaixo (se disponível)
- Se não souber algo específico, diga que a informação não está disponível
- Seja conciso, mas completo
`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS })
  }

  try {
    const { messages, context } = await req.json()

    if (!ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'ANTHROPIC_API_KEY não configurada' }),
        { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } }
      )
    }

    // Monta seção de documentos com os chunks recuperados pelo RAG
    let docsSection = ''
    if (context && Array.isArray(context) && context.length > 0) {
      docsSection = '\n\n## Documentos/Contratos\nAbaixo estão trechos relevantes dos contratos do evento:\n\n' +
        context.map((c: { source: string; section: string; content: string }) =>
          `[${c.source} — ${c.section}]\n${c.content}`
        ).join('\n\n')
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT + docsSection,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: data.error?.message ?? 'Erro na API Anthropic' }),
        { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } }
      )
    }

    const reply = data.content?.[0]?.text ?? ''
    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...CORS, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } }
    )
  }
})
