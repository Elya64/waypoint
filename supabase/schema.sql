-- ============================================================================
-- Waypoint — Supabase schema, Row Level Security, triggers, storage.
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query → Run).
-- Safe to re-run: uses "if not exists" / "drop policy if exists".
-- ============================================================================

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user (auto-created on sign-up via trigger below)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  full_name    text,
  avatar_url   text,
  created_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- plans: a user's relocation plan (the onboarding answers). One active/user.
-- ---------------------------------------------------------------------------
create table if not exists public.plans (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  email        text,
  from_loc     text,
  to_loc       text,
  visa         text,
  when_timing  text,
  active       boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists plans_user_idx on public.plans (user_id);

-- ---------------------------------------------------------------------------
-- tasks: "this week's focus" checklist items belonging to a plan
-- ---------------------------------------------------------------------------
create table if not exists public.tasks (
  id           uuid primary key default gen_random_uuid(),
  plan_id      uuid not null references public.plans (id) on delete cascade,
  ext_id       text,                      -- stable client id (e.g. "t1")
  label        text not null,
  done         boolean not null default false,
  sub          jsonb not null default '[]'::jsonb,  -- [{label, done}]
  sort         int not null default 0,
  created_at   timestamptz not null default now()
);
create index if not exists tasks_plan_idx on public.tasks (plan_id);

-- ---------------------------------------------------------------------------
-- documents: metadata for files stored in the "documents" storage bucket
-- ---------------------------------------------------------------------------
create table if not exists public.documents (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  plan_id      uuid references public.plans (id) on delete set null,
  name         text not null,
  kind         text,
  storage_path text,                       -- path within the "documents" bucket
  created_at   timestamptz not null default now()
);
create index if not exists documents_user_idx on public.documents (user_id);

-- ---------------------------------------------------------------------------
-- subscriptions: mirror of Lemon Squeezy subscription state per user
-- ---------------------------------------------------------------------------
create table if not exists public.subscriptions (
  user_id            uuid primary key references auth.users (id) on delete cascade,
  ls_customer_id     text,
  ls_subscription_id text,
  ls_variant_id      text,
  status             text,                 -- active, on_trial, past_due, cancelled, expired
  renews_at          timestamptz,
  ends_at            timestamptz,
  updated_at         timestamptz not null default now()
);
create index if not exists subscriptions_ls_sub_idx on public.subscriptions (ls_subscription_id);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.profiles      enable row level security;
alter table public.plans         enable row level security;
alter table public.tasks         enable row level security;
alter table public.documents     enable row level security;
alter table public.subscriptions enable row level security;

-- profiles: owner-only
drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- plans: owner-only
drop policy if exists "own plans" on public.plans;
create policy "own plans" on public.plans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- tasks: access gated through the owning plan
drop policy if exists "own tasks" on public.tasks;
create policy "own tasks" on public.tasks
  for all
  using (exists (select 1 from public.plans p where p.id = tasks.plan_id and p.user_id = auth.uid()))
  with check (exists (select 1 from public.plans p where p.id = tasks.plan_id and p.user_id = auth.uid()));

-- documents: owner-only
drop policy if exists "own documents" on public.documents;
create policy "own documents" on public.documents
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- subscriptions: owner can READ only; writes happen via the service role (webhook)
drop policy if exists "read own subscription" on public.subscriptions;
create policy "read own subscription" on public.subscriptions
  for select using (auth.uid() = user_id);

-- ============================================================================
-- Auto-create a profile row when a user signs up
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- keep plans.updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
drop trigger if exists plans_touch on public.plans;
create trigger plans_touch before update on public.plans
  for each row execute function public.touch_updated_at();

-- ============================================================================
-- Storage: private "documents" bucket, owner-scoped by top-level folder = uid
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

drop policy if exists "own files read" on storage.objects;
create policy "own files read" on storage.objects
  for select using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "own files insert" on storage.objects;
create policy "own files insert" on storage.objects
  for insert with check (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "own files delete" on storage.objects;
create policy "own files delete" on storage.objects
  for delete using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);
