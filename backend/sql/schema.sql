-- Supabase Postgres schema for Bookit

-- Experiences table
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null,
  price numeric not null check (price >= 0),
  image text not null,
  description text not null,
  category text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists experiences_category_idx on public.experiences (category);
create index if not exists experiences_location_idx on public.experiences (location);

-- Trigger to update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_experiences_updated_at on public.experiences;
create trigger trg_experiences_updated_at
before update on public.experiences
for each row execute function public.set_updated_at();

-- Bookings table
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences(id) on delete cascade,
  user_id text not null,
  date text not null,
  time text not null,
  quantity integer not null check (quantity >= 1),
  subtotal numeric not null,
  taxes numeric not null,
  total numeric not null,
  promo_code text,
  discount_amount numeric,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_user_idx on public.bookings (user_id);
create index if not exists bookings_experience_idx on public.bookings (experience_id);
create index if not exists bookings_status_idx on public.bookings (status);

drop trigger if exists trg_bookings_updated_at on public.bookings;
create trigger trg_bookings_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();


