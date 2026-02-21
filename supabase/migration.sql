-- =============================================
-- Festa 15 anos Lorena — Migração Supabase
-- Idempotente: pode ser rodado múltiplas vezes
-- =============================================

-- ── 1. TABELA APP_STATE (checklist, pendências, cerimônia) ──

create table if not exists public.app_state (
  id   text primary key,
  data jsonb not null default '{}'::jsonb
);

insert into public.app_state (id, data) values
  ('checklist',  '{}'::jsonb),
  ('pendencias', '{}'::jsonb),
  ('cerimonia',  '{}'::jsonb)
on conflict (id) do nothing;

alter table public.app_state enable row level security;

do $$ begin create policy "app_state_select" on public.app_state for select using (true);                          exception when duplicate_object then null; end $$;
do $$ begin create policy "app_state_insert" on public.app_state for insert with check (true);                     exception when duplicate_object then null; end $$;
do $$ begin create policy "app_state_update" on public.app_state for update using (true) with check (true);        exception when duplicate_object then null; end $$;

-- ── 2. TABELA CONVIDADOS ──

create table if not exists public.convidados (
  id         uuid primary key default gen_random_uuid(),
  nome       text not null,
  grupo      text not null default 'Adulto',
  de_onde    text default '',
  convidado  boolean not null default false,
  provavel   boolean not null default false,
  confirmado boolean not null default false,
  foi        boolean not null default false,
  ordem      integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.convidados add column if not exists convidado  boolean not null default false;
alter table public.convidados add column if not exists provavel   boolean not null default false;
alter table public.convidados add column if not exists confirmado boolean not null default false;
alter table public.convidados add column if not exists foi        boolean not null default false;
alter table public.convidados add column if not exists grupo      text not null default 'Adulto';
alter table public.convidados add column if not exists de_onde    text default '';
alter table public.convidados add column if not exists ordem      integer not null default 0;
alter table public.convidados add column if not exists whatsapp   text default null;

alter table public.convidados enable row level security;

do $$ begin create policy "convidados_select" on public.convidados for select using (true);                        exception when duplicate_object then null; end $$;
do $$ begin create policy "convidados_insert" on public.convidados for insert with check (true);                   exception when duplicate_object then null; end $$;
do $$ begin create policy "convidados_update" on public.convidados for update using (true) with check (true);      exception when duplicate_object then null; end $$;
do $$ begin create policy "convidados_delete" on public.convidados for delete using (true);                        exception when duplicate_object then null; end $$;

-- ── 3. TABELA LOGS_CONVIDADOS ──

create table if not exists public.logs_convidados (
  id              uuid primary key default gen_random_uuid(),
  acao            text not null,
  convidado_nome  text not null,
  detalhes        text default '',
  created_at      timestamptz not null default now()
);

alter table public.logs_convidados enable row level security;

do $$ begin create policy "logs_select" on public.logs_convidados for select using (true);                         exception when duplicate_object then null; end $$;
do $$ begin create policy "logs_insert" on public.logs_convidados for insert with check (true);                    exception when duplicate_object then null; end $$;

-- ── 4. TABELA CHAT_MESSAGES ──

create table if not exists public.chat_messages (
  id         uuid primary key default gen_random_uuid(),
  role       text not null check (role in ('user', 'assistant')),
  content    text not null,
  created_at timestamptz not null default now()
);

alter table public.chat_messages enable row level security;

do $$ begin create policy "chat_select" on public.chat_messages for select using (true);                           exception when duplicate_object then null; end $$;
do $$ begin create policy "chat_insert" on public.chat_messages for insert with check (true);                      exception when duplicate_object then null; end $$;

-- ── 5. HABILITA REALTIME (idempotente) ──

do $$ begin alter publication supabase_realtime add table public.app_state;       exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.convidados;       exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.logs_convidados;  exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.chat_messages;    exception when duplicate_object then null; end $$;
