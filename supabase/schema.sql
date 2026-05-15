-- ============================================================
--  LAMILASH KARI — Supabase Database Schema
--  Run this in your Supabase project → SQL Editor → New Query
-- ============================================================

-- 1. PROFILES (extends Supabase Auth users)
create table if not exists profiles (
  id             uuid references auth.users on delete cascade primary key,
  full_name      text,
  phone          text,
  telegram_chat_id bigint,
  avatar_url     text,
  created_at     timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. SERVICES
create table if not exists services (
  id               serial primary key,
  name             text not null,
  name_ru          text not null,
  description      text,
  description_ru   text,
  duration_minutes int not null default 60,
  price            numeric(10,2) not null,
  category         text check (category in ('lash', 'brow', 'combo', 'tinting')),
  is_active        boolean default true,
  sort_order       int default 0
);

-- Seed services
insert into services (name, name_ru, description, description_ru, duration_minutes, price, category, sort_order) values
  ('Lash Lamination 3-in-1', 'Ламинирование ресниц 3в1', 'Lifting, straightening and nourishing your natural lashes', 'Подъём, выравнивание и питание натуральных ресниц', 90, 600, 'lash', 1),
  ('Brow Lamination 5-in-1', 'Ламинирование бровей 5в1', 'Reshape and set your brows in your desired shape', 'Придание формы и фиксация бровей', 60, 800, 'brow', 2),
  ('Combo Lami (All inclusive)', 'Комбо Лами (все включено)', 'Full lash lamination with brow lamination at a special combo price', 'Полное ламинирование ресниц и бровей по специальной цене', 150, 1200, 'combo', 3),
  ('Lash Tinting', 'Окрашивание ресниц', 'Natural-looking color enhancement for your lashes with semi-permanent dye', 'Натуральное усиление цвета ресниц полуперманентной краской', 45, 2500, 'tinting', 4),
  ('Brow Tinting', 'Окрашивание бровей', 'Define and darken your brows with precision tinting', 'Чёткость и насыщенность бровей с точным окрашиванием', 45, 2500, 'tinting', 5),
  ('Brow Correction', 'Коррекция бровей', 'Expert brow shaping and grooming to frame your face perfectly', 'Экспертная коррекция и укладка бровей для идеального обрамления лица', 30, 1500, 'brow', 6);

-- 3. AVAILABLE SLOTS (managed by owner)
create table if not exists available_slots (
  id             serial primary key,
  slot_datetime  timestamptz not null unique,
  is_booked      boolean default false,
  created_at     timestamptz default now()
);

-- 4. BOOKINGS
create table if not exists bookings (
  id             serial primary key,
  user_id        uuid references profiles(id) on delete set null,
  service_id     int references services(id) on delete restrict,
  slot_id        int references available_slots(id) on delete restrict,
  booked_at      timestamptz not null,
  status         text default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed', 'pending')),
  client_name    text,
  client_phone   text,
  notes          text,
  created_at     timestamptz default now()
);

-- 5. REVIEWS
create table if not exists reviews (
  id             serial primary key,
  user_id        uuid references profiles(id) on delete set null,
  booking_id     int references bookings(id) on delete set null,
  service_id     int references services(id) on delete set null,
  rating         int check (rating between 1 and 5),
  text           text,
  client_name    text,
  is_published   boolean default false,
  created_at     timestamptz default now()
);

-- Seed sample reviews
insert into reviews (rating, text, client_name, is_published) values
  (5, 'Невероятный результат! Ресницы выглядят как после наращивания, но абсолютно натурально. Каждое утро просыпаюсь красивой — экономлю 20 минут на макияже!', 'Алина К.', true),
  (5, 'Kari — настоящий мастер своего дела. Ламинирование бровей держится уже 7 недель, форма идеальная. Обязательно вернусь!', 'Марина В.', true),
  (5, 'Комбо-процедура превзошла все мои ожидания. Глаза сразу стали выглядеть больше и выразительнее. Муж спросил, сменила ли я макияж 😄', 'Диана Р.', true),
  (5, 'Очень уютная атмосфера, Кари объяснила весь процесс и подобрала состав под мои чувствительные ресницы. Результат — огонь!', 'Сания О.', true),
  (5, 'Делаю ламинирование уже 3-й раз, только у Кари. Лучший специалист в городе без преувеличений!', 'Жанар М.', true),
  (4, 'Всё отлично, брови держатся хорошо. Единственное — немного долго ждала записи, но результат стоит того!', 'Катя Л.', true);

-- 6. PORTFOLIO (before/after images)
create table if not exists portfolio_items (
  id             serial primary key,
  service_id     int references services(id),
  before_url     text,
  after_url      text,
  caption        text,
  category       text,
  sort_order     int default 0,
  is_active      boolean default true,
  created_at     timestamptz default now()
);

-- RLS Policies
alter table profiles enable row level security;
alter table bookings enable row level security;
alter table reviews enable row level security;
alter table available_slots enable row level security;
alter table services enable row level security;
alter table portfolio_items enable row level security;

-- Profiles: users can read/update their own
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Bookings: users can view their own
create policy "Users can view own bookings" on bookings for select using (auth.uid() = user_id);
create policy "Authenticated users can insert bookings" on bookings for insert with check (auth.role() = 'authenticated' or true);

-- Public read for services, slots, portfolio, reviews
create policy "Public can view services" on services for select using (true);
create policy "Public can view slots" on available_slots for select using (true);
create policy "Public can view portfolio" on portfolio_items for select using (is_active = true);
create policy "Public can view published reviews" on reviews for select using (is_published = true);
