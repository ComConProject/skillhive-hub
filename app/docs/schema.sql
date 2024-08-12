create table if not exists
  public.term (
    id bigint primary key generated always as identity,
    name varchar,
    group_id bigint,
    parent_id bigint references public.term (id),
    active bool,
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now()
  );

create table if not exists
  public.provinces (
    id bigint primary key generated always as identity,
    lo text not null,
    en text not null,
    is_active bool default true
  );

create table if not exists
  public.districts (
    id bigint primary key generated always as identity,
    lo text not null,
    en text not null,
    is_active bool default true,
    prov_id bigint references provinces (id)
  );

create table if not exists
  public.villages (
    id bigint primary key generated always as identity,
    lo text not null,
    en text not null,
    is_active bool default true,
    dist_id bigint references districts (id)
  );

create table if not exists
  public.freelancer (
    id bigint primary key generated always as identity,
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now(),
    firstname text,
    lastname text,
    phone text,
    email text,
    is_available BOOL default true,
    username text,
    profile_url text,
    user_id uuid default auth.uid (),
    description text,
    freelancer_role text,
    village_id INT4
  );

create table if not exists
  public.direct_chat_rooms (
    id uuid default uuid_generate_v4 () primary key,
    seller_id INT4 references public.freelancer (id),
    buyer_id uuid,
    created_at TIMESTAMPTZ default now(),
    seller_name text,
    buyer_name text
  );

create table if not exists
  public.freelancer_occupation (
    id bigint primary key generated always as identity,
    seller_id bigint,
    term_id bigint references public.term (id),
    description varchar,
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now()
  );

create table if not exists
  public.skill (
    id bigint primary key generated always as identity,
    name text,
    description text,
    level_id bigint references public.term (id),
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now(),
    freelancer_id bigint references public.freelancer (id)
  );

create table if not exists
  public.language (
    id bigint primary key generated always as identity,
    name text,
    term_id bigint references public.term (id),
    freelancer_id bigint references public.freelancer (id),
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now()
  );

create table if not exists
  public.messages (
    id bigint primary key generated always as identity,
    user_id bigint,
    room_id uuid,
    content text,
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now(),
    direct_chat_rooms_id uuid references public.direct_chat_rooms (id)
  );

create table if not exists
  public.notification (
    id bigint primary key generated always as identity,
    user_id bigint references public.freelancer (id),
    message text,
    action_user_id uuid,
    is_read bool default false,
    url text,
    title text,
    options JSONB,
    type_app text,
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now()
  );

create table if not exists
  public.providing_service (
    id bigint primary key generated always as identity,
    title text,
    description text,
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now(),
    term_id bigint references public.term (id),
    service_duration text,
    delivery_format JSONB,
    user_id uuid,
    freelancer_id bigint references public.freelancer (id)
  );

create table if not exists
  public.order (
    id bigint primary key generated always as identity,
    price numeric,
    detail text,
    on_date date,
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now(),
    user_id uuid,
    pricing_id bigint,
    code text,
    status_id bigint references public.term (id),
    buyer_id uuid,
    metadata JSONB,
    customer text,
    customer_email text,
    freelancer_id bigint references public.freelancer (id),
    freelancer_uuid uuid
  );

create table if not exists
  public.pricing (
    id bigint primary key generated always as identity,
    package_name text,
    price numeric,
    description text,
    delivery_timeframe text,
    service_id bigint references public.providing_service (id),
    meta_data JSONB,
    type_id bigint references public.term (id),
    user_id uuid,
    stripe_price_id text,
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now(),
    order_id bigint
  );

-- Add the foreign keys afterward to resolve circular dependency
alter table public.order
  add constraint fk_order_pricing
  foreign key (pricing_id)
  references public.pricing (id);

alter table public.pricing
  add constraint fk_pricing_order
  foreign key (order_id)
  references public.order (id);

create table if not exists
  public.payment (
    id bigint primary key generated always as identity,
    amount numeric,
    method text,
    status text,
    on_date date,
    refund_info text,
    description text,
    order_id bigint references public.order (id),
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now(),
    metadata JSONB
  );

create table if not exists
  public.portfolio (
    id bigint primary key generated always as identity,
    title text,
    description text,
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now(),
    freelancer_id bigint references public.freelancer (id),
    url text
  );

create table if not exists
  public.rating (
    id bigint primary key generated always as identity,
    star int4,
    description text,
    picture text,
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now(),
    service_id bigint references public.providing_service (id),
    freelancer_id bigint references public.freelancer (id),
    buyer_id uuid,
    user_id uuid,
    buyer_name text
  );

create table if not exists
  public.stripe_webhook (
    id bigint primary key generated always as identity,
    receipt_email text,
    data JSONB,
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now()
  );
