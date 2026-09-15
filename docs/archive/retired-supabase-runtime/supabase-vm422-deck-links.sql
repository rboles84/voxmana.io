-- VM-422 - Account Deck Links And Community Deck Ledger
-- Checked-in Supabase SQL/policy artifact for external deck-link storage.
--
-- Scope:
-- - Store external deck links and placement metadata only.
-- - Do not store decklists, card JSON, legality results, crawled content, or scraped data.
-- - Browser users can save private links and remove them only.
-- - Browser users cannot create submitted/public moderation rows in v1.
-- - Manual moderation and public discovery are deferred outside the public frontend in v1.

begin;

create extension if not exists pgcrypto with schema extensions;

create or replace function public.vm422_deck_provider(p_deck_url text)
returns text
language sql
stable
as $$
  with parsed as (
    select lower(substring(btrim(coalesce(p_deck_url, '')) from '^https://([^/?#:]+)')) as host
  )
  select case host
    when 'mtggoldfish.com' then 'mtggoldfish'
    when 'www.mtggoldfish.com' then 'mtggoldfish'
    when 'archidekt.com' then 'archidekt'
    when 'www.archidekt.com' then 'archidekt'
    when 'moxfield.com' then 'moxfield'
    when 'www.moxfield.com' then 'moxfield'
    when 'edhrec.com' then 'edhrec'
    when 'www.edhrec.com' then 'edhrec'
    when 'mtgdecks.net' then 'mtgdecks'
    when 'www.mtgdecks.net' then 'mtgdecks'
    when 'aetherhub.com' then 'aetherhub'
    when 'www.aetherhub.com' then 'aetherhub'
    when 'tappedout.net' then 'tappedout'
    when 'www.tappedout.net' then 'tappedout'
    else null
  end
  from parsed;
$$;

create or replace function public.vm422_is_allowed_deck_provider(p_deck_url text)
returns boolean
language sql
stable
as $$
  select public.vm422_deck_provider(p_deck_url) is not null;
$$;

create table if not exists public.user_deck_links (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  deck_url text not null,
  provider text not null,
  deck_title text,
  commander_name text,
  user_note text,
  placement_key text,
  placement_name text,
  color_identity_key text,
  visibility text not null default 'private',
  public_display_name text not null default 'Vox Mana player',
  upvote_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz,
  approved_at timestamptz,
  approved_by uuid references auth.users(id) on delete set null,
  rejected_at timestamptz,
  moderation_note text,
  constraint user_deck_links_provider_check check (
    provider in ('mtggoldfish', 'archidekt', 'moxfield', 'edhrec', 'mtgdecks', 'aetherhub', 'tappedout')
  ),
  constraint user_deck_links_visibility_check check (
    visibility in ('private', 'submitted', 'public', 'rejected', 'archived')
  ),
  constraint user_deck_links_url_provider_check check (
    provider = public.vm422_deck_provider(deck_url)
  ),
  constraint user_deck_links_lengths_check check (
    char_length(deck_url) <= 2048
    and (deck_title is null or char_length(deck_title) <= 120)
    and (commander_name is null or char_length(commander_name) <= 120)
    and (user_note is null or char_length(user_note) <= 500)
    and char_length(public_display_name) <= 120
  ),
  constraint user_deck_links_url_protocol_check check (
    deck_url ~ '^https://'
  ),
  constraint user_deck_links_vote_count_check check (
    upvote_count >= 0
  ),
  constraint user_deck_links_submitted_timestamp_check check (
    visibility <> 'submitted' or submitted_at is not null
  ),
  constraint user_deck_links_public_timestamp_check check (
    visibility <> 'public' or approved_at is not null
  )
);

comment on table public.user_deck_links is
  'VM-422 external deck-link references only. Does not store decklists or card JSON.';
comment on column public.user_deck_links.public_display_name is
  'Public-safe display name snapshot. Browser save/update grants do not set this; trusted moderation/account flow may set it only from a sanitized public profile name, never from owner email or email-local fallback.';
comment on column public.user_deck_links.moderation_note is
  'Private moderation note. Do not expose through browser grants or public views.';

create table if not exists public.community_deck_votes (
  id uuid primary key default gen_random_uuid(),
  deck_link_id uuid not null references public.user_deck_links(id) on delete cascade,
  voter_id uuid not null references auth.users(id) on delete cascade,
  vote_type text not null default 'upvote',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint community_deck_votes_vote_type_check check (vote_type = 'upvote'),
  constraint community_deck_votes_unique_user_vote unique (deck_link_id, voter_id)
);

comment on table public.community_deck_votes is
  'VM-422 one-positive-signal-per-user votes for approved public deck links.';

create index if not exists user_deck_links_owner_id_idx
  on public.user_deck_links(owner_id);
create index if not exists user_deck_links_visibility_created_at_idx
  on public.user_deck_links(visibility, created_at desc);
create index if not exists user_deck_links_provider_idx
  on public.user_deck_links(provider);
create index if not exists user_deck_links_placement_key_idx
  on public.user_deck_links(placement_key);
create unique index if not exists user_deck_links_owner_url_placement_active_unique_idx
  on public.user_deck_links(owner_id, deck_url, coalesce(placement_key, ''))
  where visibility <> 'archived';
create index if not exists community_deck_votes_deck_link_id_idx
  on public.community_deck_votes(deck_link_id);
create index if not exists community_deck_votes_voter_id_idx
  on public.community_deck_votes(voter_id);

create or replace function public.vm422_normalize_deck_link()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  resolved_provider text;
  current_actor uuid := auth.uid();
begin
  new.deck_url := btrim(new.deck_url);
  resolved_provider := public.vm422_deck_provider(new.deck_url);

  if resolved_provider is null then
    raise exception 'Deck URL provider is not allowed.';
  end if;

  new.provider := resolved_provider;
  new.deck_title := nullif(btrim(coalesce(new.deck_title, '')), '');
  new.commander_name := nullif(btrim(coalesce(new.commander_name, '')), '');
  new.user_note := nullif(btrim(coalesce(new.user_note, '')), '');
  new.placement_key := nullif(btrim(coalesce(new.placement_key, '')), '');
  new.placement_name := nullif(btrim(coalesce(new.placement_name, '')), '');
  new.color_identity_key := nullif(btrim(coalesce(new.color_identity_key, '')), '');
  new.public_display_name := coalesce(nullif(btrim(new.public_display_name), ''), 'Vox Mana player');

  if tg_op = 'INSERT' then
    if new.owner_id is null then
      new.owner_id := current_actor;
    end if;

    if current_actor is not null and new.owner_id is distinct from current_actor then
      raise exception 'Deck link owner must match the authenticated user.';
    end if;

    if new.visibility is null then
      new.visibility := 'private';
    end if;

    if current_actor is not null and new.visibility <> 'private' then
      raise exception 'Browser deck-link saves are private-only in v1.';
    end if;

    if new.visibility = 'private' then
      new.approved_at := null;
      new.approved_by := null;
    end if;
  end if;

  if tg_op = 'UPDATE' then
    new.owner_id := old.owner_id;
    new.created_at := old.created_at;
  end if;

  if new.visibility = 'submitted' and new.submitted_at is null then
    new.submitted_at := now();
  end if;

  new.updated_at := now();
  return new;
end;
$$;

create or replace function public.vm422_guard_deck_link_owner_update()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  current_actor uuid := auth.uid();
  public_fields_changed boolean;
begin
  if tg_op <> 'UPDATE' then
    return new;
  end if;

  if current_actor is not null and current_actor = old.owner_id then
    if new.visibility not in ('private', 'archived') then
      raise exception 'Browser users can only keep private or remove saved deck links.';
    end if;

    public_fields_changed :=
      new.deck_url is distinct from old.deck_url
      or new.provider is distinct from old.provider
      or new.deck_title is distinct from old.deck_title
      or new.commander_name is distinct from old.commander_name
      or new.user_note is distinct from old.user_note
      or new.placement_key is distinct from old.placement_key
      or new.placement_name is distinct from old.placement_name
      or new.color_identity_key is distinct from old.color_identity_key;

    if old.visibility = 'public' and public_fields_changed then
      raise exception 'Public deck-link fields are locked in browser clients.';
    end if;
  end if;

  return new;
end;
$$;

create or replace function public.vm422_guard_vote_public_link()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  current_actor uuid := auth.uid();
  target_visibility text;
begin
  if new.voter_id is null then
    new.voter_id := current_actor;
  end if;

  if current_actor is not null and new.voter_id is distinct from current_actor then
    raise exception 'Vote owner must match the authenticated user.';
  end if;

  new.vote_type := 'upvote';
  new.updated_at := now();

  select visibility
    into target_visibility
    from public.user_deck_links
    where id = new.deck_link_id
      and approved_at is not null
      and rejected_at is null;

  if target_visibility is distinct from 'public' then
    raise exception 'Votes are only allowed on public deck links.';
  end if;

  return new;
end;
$$;

create or replace function public.vm422_refresh_deck_vote_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_deck_link_id uuid;
begin
  target_deck_link_id := coalesce(new.deck_link_id, old.deck_link_id);

  update public.user_deck_links
    set upvote_count = (
      select count(*)::integer
        from public.community_deck_votes
        where deck_link_id = target_deck_link_id
          and vote_type = 'upvote'
    ),
    updated_at = now()
    where id = target_deck_link_id;

  return coalesce(new, old);
end;
$$;

create or replace function public.vm422_list_my_deck_links()
returns table (
  id uuid,
  deck_url text,
  provider text,
  deck_title text,
  commander_name text,
  user_note text,
  placement_key text,
  placement_name text,
  color_identity_key text,
  visibility text,
  upvote_count integer
)
language sql
stable
security definer
set search_path = public, auth
as $$
  select
    deck_links.id,
    deck_links.deck_url,
    deck_links.provider,
    deck_links.deck_title,
    deck_links.commander_name,
    deck_links.user_note,
    deck_links.placement_key,
    deck_links.placement_name,
    deck_links.color_identity_key,
    deck_links.visibility,
    deck_links.upvote_count
  from public.user_deck_links deck_links
  where deck_links.owner_id = auth.uid()
    and deck_links.visibility = 'private'
  order by deck_links.updated_at desc, deck_links.created_at desc;
$$;

comment on function public.vm422_list_my_deck_links() is
  'VM-422 owner-scoped account list. Returns only the authenticated user''s deck links without exposing owner_id to browser clients.';

drop trigger if exists trg_10_vm422_normalize_deck_link on public.user_deck_links;
create trigger trg_10_vm422_normalize_deck_link
  before insert or update on public.user_deck_links
  for each row execute function public.vm422_normalize_deck_link();

drop trigger if exists trg_20_vm422_guard_deck_link_owner_update on public.user_deck_links;
create trigger trg_20_vm422_guard_deck_link_owner_update
  before update on public.user_deck_links
  for each row execute function public.vm422_guard_deck_link_owner_update();

drop trigger if exists trg_10_vm422_guard_vote_public_link on public.community_deck_votes;
create trigger trg_10_vm422_guard_vote_public_link
  before insert or update on public.community_deck_votes
  for each row execute function public.vm422_guard_vote_public_link();

drop trigger if exists trg_20_vm422_refresh_deck_vote_count_insert on public.community_deck_votes;
create trigger trg_20_vm422_refresh_deck_vote_count_insert
  after insert on public.community_deck_votes
  for each row execute function public.vm422_refresh_deck_vote_count();

drop trigger if exists trg_20_vm422_refresh_deck_vote_count_delete on public.community_deck_votes;
create trigger trg_20_vm422_refresh_deck_vote_count_delete
  after delete on public.community_deck_votes
  for each row execute function public.vm422_refresh_deck_vote_count();

alter table public.user_deck_links enable row level security;
alter table public.user_deck_links force row level security;
alter table public.community_deck_votes enable row level security;
alter table public.community_deck_votes force row level security;

drop policy if exists "VM-422 deck links select public" on public.user_deck_links;
create policy "VM-422 deck links select public"
  on public.user_deck_links
  for select
  to anon, authenticated
  using (
    visibility = 'public'
    and approved_at is not null
    and rejected_at is null
  );

drop policy if exists "VM-422 deck links select own" on public.user_deck_links;
create policy "VM-422 deck links select own"
  on public.user_deck_links
  for select
  to authenticated
  using (owner_id = auth.uid());

drop policy if exists "VM-422 deck links insert own private or submitted" on public.user_deck_links;
drop policy if exists "VM-422 deck links insert own private" on public.user_deck_links;
create policy "VM-422 deck links insert own private"
  on public.user_deck_links
  for insert
  to authenticated
  with check (
    owner_id = auth.uid()
    and visibility = 'private'
    and approved_at is null
    and approved_by is null
  );

drop policy if exists "VM-422 deck links update own moderated fields" on public.user_deck_links;
drop policy if exists "VM-422 deck links update own private or archive" on public.user_deck_links;
create policy "VM-422 deck links update own private or archive"
  on public.user_deck_links
  for update
  to authenticated
  using (owner_id = auth.uid())
  with check (
    owner_id = auth.uid()
    and visibility in ('private', 'archived')
    and approved_at is null
    and approved_by is null
  );

drop policy if exists "VM-422 votes select own" on public.community_deck_votes;
create policy "VM-422 votes select own"
  on public.community_deck_votes
  for select
  to authenticated
  using (voter_id = auth.uid());

drop policy if exists "VM-422 votes insert own on public deck links" on public.community_deck_votes;
create policy "VM-422 votes insert own on public deck links"
  on public.community_deck_votes
  for insert
  to authenticated
  with check (
    voter_id = auth.uid()
    and vote_type = 'upvote'
    and exists (
      select 1
        from public.user_deck_links
        where id = deck_link_id
          and visibility = 'public'
          and approved_at is not null
          and rejected_at is null
    )
  );

drop policy if exists "VM-422 votes delete own" on public.community_deck_votes;
create policy "VM-422 votes delete own"
  on public.community_deck_votes
  for delete
  to authenticated
  using (voter_id = auth.uid());

create or replace view public.community_deck_ledger_public
with (security_invoker = true)
as
select
  id as deck_link_id,
  provider,
  deck_url,
  deck_title,
  commander_name,
  public_display_name as user_display_name,
  placement_key,
  placement_name,
  color_identity_key,
  user_note,
  approved_at as public_at,
  upvote_count
from public.user_deck_links
where visibility = 'public'
  and approved_at is not null
  and rejected_at is null;

comment on view public.community_deck_ledger_public is
  'Sanitized VM-422 public view for approved player-submitted external deck links.';

revoke all on table public.user_deck_links from anon, authenticated;
revoke all on table public.community_deck_votes from anon, authenticated;
revoke all on public.community_deck_ledger_public from anon, authenticated;
revoke all on function public.vm422_list_my_deck_links() from public;
revoke all on function public.vm422_list_my_deck_links() from anon, authenticated;

grant usage on schema public to anon, authenticated;

-- Narrow base-table SELECT grants support the security_invoker public view.
-- Account saved-link listing uses vm422_list_my_deck_links() so owner_id does not
-- need to be selectable by browser clients.
grant select (
  id,
  deck_url,
  provider,
  deck_title,
  commander_name,
  user_note,
  placement_key,
  placement_name,
  color_identity_key,
  visibility,
  public_display_name,
  upvote_count,
  approved_at
) on public.user_deck_links to anon, authenticated;

grant insert (
  deck_url,
  deck_title,
  commander_name,
  user_note,
  placement_key,
  placement_name,
  color_identity_key,
  visibility
) on public.user_deck_links to authenticated;

grant update (
  deck_url,
  deck_title,
  commander_name,
  user_note,
  placement_key,
  placement_name,
  color_identity_key,
  visibility
) on public.user_deck_links to authenticated;

grant select (
  id,
  deck_link_id,
  voter_id,
  vote_type,
  created_at,
  updated_at
) on public.community_deck_votes to authenticated;

grant insert (
  deck_link_id
) on public.community_deck_votes to authenticated;

grant delete on public.community_deck_votes to authenticated;

grant select on public.community_deck_ledger_public to anon, authenticated;
grant execute on function public.vm422_list_my_deck_links() to authenticated;

commit;
