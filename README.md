# Cart-Tech

You are viewing the development branch (`dev`). Latest features and breaking changes land here; `main` is kept stable.

Cart-Tech is an in-progress e-commerce frontend built with Next.js 15 and React 19 using Radix UI, Tailwind CSS v4, and Lucide icons. The app integrates with an external commerce API and supports images from `ecommerce.routemisr.com`.

## Tech Stack

- **Framework**: Next.js 15 (App Router, RSC)
- **Language**: TypeScript
- **UI**: Radix UI, Tailwind CSS v4, shadcn/ui config (style: new-york)
- **Icons**: lucide-react
- **Tooling**: ESLint (Next + TS), Turbopack for dev/build

## Project Structure

- `src/` — application source (App Router, components, hooks, lib, styles). Pages in `src/app/(pages)`:
  - `products/` — list, details, error boundary
  - `categories/` — list, details
  - `brands/` — list
- `public/` — static assets
- `next.config.ts` — Next.js configuration (image remote patterns set for routemisr CDN)
- `components.json` — shadcn/ui configuration and path aliases

## Developer Notes (dev)

- Node 18+ recommended
- App Router with RSC; global boundaries: `error.tsx`, `global-error.tsx`, `loading.tsx`, `not-found.tsx`
- Tailwind v4 via PostCSS (`postcss.config.mjs`), global styles in `src/app/globals.css`
- UI primitives in `src/components/ui/*` (Radix-based)
- Path aliases: `@/*` → `./src/*` (see `tsconfig.json`)
- API services in `src/services/*` (categories, brands, products)
- Types in `src/interfaces/*`; helpers in `src/helpers/*`
- Navigation content in `src/server/navBar/navData.ts`
- No global state library yet (cart/wishlist/session TBD)

## Getting Started

Prerequisites: Node 18+ recommended.

1) Install dependencies:

    ```bash
    npm install
    ```

2) Start the dev server:

    ```bash
    npm run dev
    ```

3) Open the app at:

    ```bash
    http://localhost:3000
    ```

## Scripts

- `npm run dev` — Start development server (Turbopack)
- `npm run build` — Build production bundle (Turbopack)
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Image Domains

Configured in `next.config.ts`:

- `https://ecommerce.routemisr.com/Route-Academy-products/**`
- `https://ecommerce.routemisr.com/Route-Academy-brands/**`
- `https://ecommerce.routemisr.com/Route-Academy-categories/**`

## API Tasks

This checklist tracks planned and completed API features. Work is ongoing; check `dev` for the latest.

- [ ] Introduction

- [x] Categories
  - [x] GET — Get All Categories
  - [ ] GET — Get specific category

- [ ] SubCategories
  - [ ] GET — Get All SubCategories
  - [ ] GET — Get specific SubCategory
  - [ ] GET — Get All SubCategories On Category

- [x] Brands
  - [x] GET — Get All Brands
  - [ ] GET — Get specific brand

- [x] Products
  - [x] GET — Get All Products
  - [x] GET — Get specific Product

- [ ] Authentication
  - [ ] POST — Signup
  - [ ] POST — signin
  - [ ] POST — Forgot Password
  - [ ] POST — Verify Reset Code
  - [ ] PUT — Update Logged user password
  - [ ] PUT — Reset Password
  - [ ] PUT — Update Logged user data
  - [ ] GET — Get All Users
  - [ ] GET — Verify Token

- [ ] Wishlist
  - [ ] POST — Add product to wishlist
  - [ ] DEL — Remove product from wishlist
  - [ ] GET — Get logged user wishlist

- [ ] User Addresses
  - [ ] POST — Add address
  - [ ] DEL — Remove address
  - [ ] GET — Get specific address
  - [ ] GET — Get logged user addresses

- [ ] Cart
  - [ ] POST — Add Product To Cart
  - [ ] PUT — Update cart product quantity
  - [ ] GET — Get Logged user cart
  - [ ] DEL — Remove specific cart Item
  - [ ] DEL — Clear user cart

- [ ] Orders
  - [ ] POST — Create Cash Order
  - [ ] POST — Checkout session
  - [ ] GET — getAllOrders
  - [ ] GET — getUserOrders

## Frontend Tasks (dev)

- Global & Layout
  - [x] App layout and boundaries (`layout.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx`)
  - [x] Global styles (`globals.css`) and Tailwind v4 setup
  - [ ] SEO metadata per page (title, description, OG)

- Navigation
  - [x] Header/NavBar with mobile sidebar (`components/layout/navBar/*`)
  - [x] Footer (`components/layout/footer/*`)
  - [ ] Active route styling + accessibility audit

- Pages
  - [x] Home page (`src/app/page.tsx`)
  - [x] Products: list + details (`app/(pages)/products`, `[productId]`)
  - [x] Categories: list + details (`app/(pages)/categories`, `[categoriesId]`)
  - [x] Brands: list (`app/(pages)/brands`)
  - [ ] Brands: details (`/brands/[brandId]`)

- UI Components
  - [x] Base UI primitives (`components/ui/*`)
  - [x] Product UI (`components/product/*`)
  - [x] Category/Brand UI (`components/category&brand/*`)
  - [ ] Skeletons and empty states coverage

- Data Layer
  - [x] Services for categories/brands/products (`src/services/*`)
  - [ ] Wishlist integration (client actions + optimistic updates)
  - [ ] Cart integration (client actions + optimistic updates)
  - [ ] Orders flow (cash checkout + session)

- State & Caching
  - [ ] Client store (e.g., Zustand) for cart/wishlist/session
  - [ ] RSC caching and revalidation per resource

- Quality
  - [ ] Unit tests for helpers/services
  - [ ] Component tests for critical UI
  - [ ] Lighthouse/AXE pass for performance/accessibility

## Development Workflow

- Use feature branches off `dev`.
- Open PRs into `dev`; `main` is kept stable and updated periodically.
- Lint before committing: `npm run lint`.

## Contributing

Contributions are welcome. Please:

- Discuss large changes via an issue first.
- Ensure changes build and pass lint.
- Keep PRs focused and well-described.

## License

This project is for learning and demonstration purposes. Please add an appropriate license if you plan to distribute or use this code commercially.