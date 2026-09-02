# MyPavitra — Global Puja & Spiritual E-Commerce

**Domain:** [mypavitra.com](https://mypavitra.com)

Complete e-commerce website for puja samagri, brass items, kits, and spiritual products — India + 8 international markets.

## What's included

### Storefront (99 pages)
- Homepage with campaign engine, categories, kits, shop-by-purpose
- **26 product pages** with full PDP (specs, ritual guides, FAQ, cross-sells)
- **12 category pages** + category index
- **6 collections**, **5 bundle pages**
- **6 festival landing pages** (Diwali, Navratri, Jain festivals, etc.)
- **6 puja guides** (SEO/AEO optimized)
- **13 shop-by-purpose** pages
- Search, cart, checkout, order success
- About, contact, FAQ, shipping, returns, privacy, terms
- Dynamic sitemap.xml + robots.txt
- 9-country routing (`/us/`, `/uk/`, etc.)

### Admin CMS
- Product, category, bundle, festival, guide management views
- Dashboard with catalog overview

### Catalog
- 26 products, 12 categories, 5 bundles, 6 festivals, 6 guides
- Country-specific pricing (IN, US, UK, CA, AU, AE, SG, NZ, EU)
- Hindu + Jain equal prominence

Production-quality e-commerce platform for puja samagri, brass/copper items, kits, and spiritual products — India + 8 international markets.

## Stack

- **Monorepo:** Turborepo + pnpm
- **Frontend:** Next.js 15, React 19, Tailwind CSS 4
- **Database:** PostgreSQL + Drizzle ORM
- **Payments:** Razorpay (India)
- **Shipping:** Shiprocket + Shiprocket X (international)
- **Search:** Meilisearch (planned)

## Project Structure

```
apps/
  web/          Customer storefront (port 3000)
  admin/        Custom CMS admin (port 3001)
packages/
  config/       9-country configuration
  db/           Drizzle schema
  types/        Shared TypeScript types
  ui/           Design system components
docs/
  GO_TO_MARKET.md   Research-backed selling strategy
  KEYWORDS.md       SEO/AEO keyword map
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start PostgreSQL (Docker example)
docker run -d --name puja-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=puja_commerce -p 5432:5432 postgres:16

# Generate & run migrations
pnpm db:generate
pnpm db:migrate

# Start development
pnpm dev
```

- Storefront: http://localhost:3000
- Admin: http://localhost:3001
- US store: http://localhost:3000/us

## Markets

| Code | URL prefix | Currency |
|------|------------|----------|
| IN | / (default) | INR |
| US | /us | USD |
| UK | /uk | GBP |
| CA | /ca | CAD |
| AU | /au | AUD |
| AE | /ae | AED |
| SG | /sg | SGD |
| NZ | /nz | NZD |
| EU | /eu | EUR |

## Development Roadmap

- [x] Phase 0: Monorepo, country config, DB schema, design system, app shells
- [ ] Phase 1: Product catalogue + custom admin CRUD
- [ ] Phase 2: Cart, checkout, Razorpay, orders
- [ ] Phase 3: Shiprocket integration
- [ ] Phase 4: Festival engine, guides, campaigns
- [ ] Phase 5: Search, SEO sitemaps, Google Shopping feed

## Documentation

- [Go-To-Market Strategy](./docs/GO_TO_MARKET.md)
- [Keyword & Content Map](./docs/KEYWORDS.md)
