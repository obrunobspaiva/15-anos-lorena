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
- **Aniversariante:** Lorena
- **Data:** 28 de junho de 2026 (domingo)
- **Horário:** 19:00 às 01:00 (6 horas)
- **Local:** Mansão Adélia Prado, São Paulo
- **Convidados:** ~120 pessoas
- **Crianças:** até 9 anos não contam; 10+ contam no total

## Cronograma
- 19:00–19:30 → Recepção com DJ
- 19:30–20:30 → Show da Banda (1ª Parte)
- 20:30–21:30 → Cerimônia (violinista/orquestra, valsa, retrospectiva, troca de sapato, brinde)
- 21:30–22:30 → Jantar com DJ (buffet, parabéns, bolo, doces)
- 22:30–23:30 → Show da Banda (2ª Parte)
- 23:30–01:00 → DJ Balada + Lorena Look 2 + gelo seco + fogos indoor + lembrancinhas + encerramento

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
- Pacote Nice (foto + filmagem)
- **Valor Rosmarino:** R$ 34.990,00

## Extras Contratados
- Magic Mirror (5h, fotos ilimitadas) — R$ 2.409,00
- Orquestra / Violinista para cerimônia — R$ 1.633,50
- Cerveja (300 latas Brahma DM) — R$ 2.670,00
- Retrospectiva + Projetor — R$ 800,00
- **Total geral contratado:** R$ 42.502,50

## Por Fora (a contratar/confirmar)
- Cerimonialista: Alan (a confirmar contrato)
- DJ: Shalom (a confirmar contrato)
- Banda de pagode — ALTA PRIORIDADE, prazo 30/04/2026
- Maquiador (make, cabelo, retoques) — ALTA PRIORIDADE, prazo 28/05/2026
- Lembrancinhas — prazo 28/05/2026
- Vestidos debutante (3 looks) — ALTA PRIORIDADE, prazo 30/04/2026

## Cerimônia (checklist pré-evento)
- Texto do MC revisado e aprovado pela família
- Música de entrada da debutante definida
- Música da valsa definida
- Retrospectiva editada e aprovada
- Projetor e tela testados no local
- Sequência de fotos da retrospectiva selecionada
- Sapato da troca preparado
- Taças de brinde separadas
- Posições da família ensaiadas

## Instruções
- Responda perguntas sobre o evento, fornecedores, orçamento, cronograma e planejamento
- Se não souber algo específico, diga que a informação não está disponível
- Seja conciso, mas completo
`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS })
  }

  try {
    const { messages } = await req.json()

    if (!ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'ANTHROPIC_API_KEY não configurada' }),
        { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } }
      )
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
        system: SYSTEM_PROMPT,
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
