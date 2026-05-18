-- Ejecuta este código en el SQL Editor de Supabase

-- 1. Crear la tabla de mensajes
create table public.messages (
  id text primary key,
  name text not null,
  relation text not null,
  message text not null,
  city text not null,
  country text not null,
  emoji text not null,
  timestamp bigint not null,
  date text not null,
  time text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Habilitar Row Level Security (RLS)
alter table public.messages enable row level security;

-- 3. Crear políticas para que cualquiera pueda leer y escribir de forma anónima
create policy "Allow public read access"
  on public.messages
  for select
  to public
  using (true);

create policy "Allow public insert access"
  on public.messages
  for insert
  to public
  with check (true);
