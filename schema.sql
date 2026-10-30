-- Run this SQL in Supabase SQL Editor before accepting real orders.
create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  tracking_code text unique not null default upper(substr(encode(gen_random_bytes(8), 'hex'), 1, 10)),
  customer_name text not null,
  phone text not null,
  email text,
  product_url text not null,
  product_name text,
  province text not null,
  district text not null,
  municipality text not null,
  ward text not null,
  address text not null,
  landmark text,
  postal_code text,
  payment_method text not null default 'Cash on Delivery',
  status text not null default 'Received',
  created_at timestamptz not null default now()
);

-- Public customers may submit orders, but cannot read or change orders.
alter table public.orders enable row level security;
drop policy if exists "Anyone can submit an order" on public.orders;
create policy "Anyone can submit an order"
on public.orders for insert
to anon, authenticated
with check (true);

-- Do NOT create a public SELECT policy. Admin access must be added through
-- a secure authenticated admin role before exposing customer order details.