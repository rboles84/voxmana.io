-- VM-445 - Profile Supabase RLS Source Artifact
-- Checked-in Supabase SQL/policy artifact for optional signed-in profile storage.
--
-- Scope:
-- - Store the signed-in user's saved Archscry placement/profile row.
-- - Keep placement_result as the saved-return source of truth.
-- - Allow authenticated users to select, insert/upsert, and update only their own row.
-- - Do not create public profile discovery, public display-name publishing, deck-link
--   moderation, service-role behavior, or account deletion flows.
-- - Running this file in a live Supabase project still requires manual/project-side
--   review; this repo artifact alone is not live RLS proof.

begin;

create table if not exists public.profiles (
  id uuid not null,
  email text,
  username text,
  display_name text,
  avatar_url text,
  guild text,
  guild_name text,
  runner_up text,
  confidence double precision,
  decree text,
  scores jsonb,
  taken_at timestamptz,
  placement_result jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_email_length_check check (email is null or char_length(email) <= 320),
  constraint profiles_username_length_check check (username is null or char_length(username) <= 80),
  constraint profiles_display_name_length_check check (display_name is null or char_length(display_name) <= 120),
  constraint profiles_avatar_url_length_check check (avatar_url is null or char_length(avatar_url) <= 2048),
  constraint profiles_guild_length_check check (guild is null or char_length(guild) <= 120),
  constraint profiles_guild_name_length_check check (guild_name is null or char_length(guild_name) <= 160),
  constraint profiles_runner_up_length_check check (runner_up is null or char_length(runner_up) <= 120),
  constraint profiles_confidence_range_check check (confidence is null or (confidence >= 0 and confidence <= 1)),
  constraint profiles_decree_length_check check (decree is null or char_length(decree) <= 4000),
  constraint profiles_pkey primary key (id),
  constraint profiles_id_auth_users_fkey foreign key (id) references auth.users(id) on delete cascade
);

alter table public.profiles
  add column if not exists id uuid,
  add column if not exists email text,
  add column if not exists username text,
  add column if not exists display_name text,
  add column if not exists avatar_url text,
  add column if not exists guild text,
  add column if not exists guild_name text,
  add column if not exists runner_up text,
  add column if not exists confidence double precision,
  add column if not exists decree text,
  add column if not exists scores jsonb,
  add column if not exists taken_at timestamptz,
  add column if not exists placement_result jsonb,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_pkey'
  ) then
    alter table public.profiles
      add constraint profiles_pkey primary key (id);
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_id_auth_users_fkey'
  ) then
    alter table public.profiles
      add constraint profiles_id_auth_users_fkey
      foreign key (id) references auth.users(id) on delete cascade;
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_email_length_check'
  ) then
    alter table public.profiles
      add constraint profiles_email_length_check
      check (email is null or char_length(email) <= 320);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_username_length_check'
  ) then
    alter table public.profiles
      add constraint profiles_username_length_check
      check (username is null or char_length(username) <= 80);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_display_name_length_check'
  ) then
    alter table public.profiles
      add constraint profiles_display_name_length_check
      check (display_name is null or char_length(display_name) <= 120);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_avatar_url_length_check'
  ) then
    alter table public.profiles
      add constraint profiles_avatar_url_length_check
      check (avatar_url is null or char_length(avatar_url) <= 2048);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_guild_length_check'
  ) then
    alter table public.profiles
      add constraint profiles_guild_length_check
      check (guild is null or char_length(guild) <= 120);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_guild_name_length_check'
  ) then
    alter table public.profiles
      add constraint profiles_guild_name_length_check
      check (guild_name is null or char_length(guild_name) <= 160);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_runner_up_length_check'
  ) then
    alter table public.profiles
      add constraint profiles_runner_up_length_check
      check (runner_up is null or char_length(runner_up) <= 120);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_confidence_range_check'
  ) then
    alter table public.profiles
      add constraint profiles_confidence_range_check
      check (confidence is null or (confidence >= 0 and confidence <= 1));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_decree_length_check'
  ) then
    alter table public.profiles
      add constraint profiles_decree_length_check
      check (decree is null or char_length(decree) <= 4000);
  end if;
end;
$$;

comment on table public.profiles is
  'Vox Mana optional signed-in profile storage for saved Archscry placement results. Private per-user table; not a public profile directory.';
comment on column public.profiles.id is
  'Must equal auth.users.id for the signed-in owner. RLS policies enforce auth.uid() = id.';
comment on column public.profiles.email is
  'Private owner email snapshot used only for signed-in session fallback display. Do not expose in public views.';
comment on column public.profiles.display_name is
  'Private profile display name used by the signed-in account UI. VM-422 public ledger display names require separate trusted sanitization.';
comment on column public.profiles.avatar_url is
  'Private profile avatar URL used by signed-in account UI only.';
comment on column public.profiles.guild is
  'Legacy compatibility field for the saved primary placement key.';
comment on column public.profiles.guild_name is
  'Legacy compatibility field for the saved primary placement display name.';
comment on column public.profiles.runner_up is
  'Legacy compatibility field for the saved adjacent/runner-up placement key.';
comment on column public.profiles.confidence is
  'Legacy compatibility field for placement confidence, constrained to 0..1 when present.';
comment on column public.profiles.decree is
  'Legacy compatibility summary text for saved placement.';
comment on column public.profiles.scores is
  'Legacy compatibility mana score payload.';
comment on column public.profiles.taken_at is
  'Timestamp recorded by the browser when the saved placement was taken.';
comment on column public.profiles.placement_result is
  'Richer saved placement payload and source of truth for saved-return behavior and private deck-link attachment context.';

create or replace function public.vm_profiles_touch_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
before update on public.profiles
for each row
execute function public.vm_profiles_touch_updated_at();

alter table public.profiles enable row level security;
alter table public.profiles force row level security;

revoke all on table public.profiles from anon;
revoke all on table public.profiles from authenticated;

grant select (
  id,
  email,
  username,
  display_name,
  avatar_url,
  guild,
  guild_name,
  runner_up,
  confidence,
  decree,
  scores,
  taken_at,
  placement_result,
  created_at,
  updated_at
) on public.profiles to authenticated;

grant insert (
  id,
  email,
  username,
  display_name,
  avatar_url,
  guild,
  guild_name,
  runner_up,
  confidence,
  decree,
  scores,
  taken_at,
  placement_result
) on public.profiles to authenticated;

grant update (
  email,
  username,
  display_name,
  avatar_url,
  guild,
  guild_name,
  runner_up,
  confidence,
  decree,
  scores,
  taken_at,
  placement_result
) on public.profiles to authenticated;

drop policy if exists "VM profiles select own" on public.profiles;
create policy "VM profiles select own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "VM profiles insert own" on public.profiles;
create policy "VM profiles insert own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "VM profiles update own" on public.profiles;
create policy "VM profiles update own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

commit;
