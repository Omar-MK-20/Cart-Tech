# Cart-Tech

Cart-Tech is an in-progress e-commerce frontend built with Next.js 15 and React 19. It targets a clean, modern UI using Radix UI primitives, Tailwind CSS v4, and Lucide icons. The app integrates with an external commerce API and supports images from `ecommerce.routemisr.com` for products, brands, and categories.

- **Status**: Work-in-progress
- **Active development branch**: `dev` (latest features land here first)
- **Default branch**: `main`

## Tech Stack

- **Framework**: Next.js 15 (App Router, RSC)
- **Language**: TypeScript
- **UI**: Radix UI, Tailwind CSS v4, shadcn/ui config (style: new-york)
- **Icons**: lucide-react
- **Tooling**: ESLint (Next + TS), Turbopack for dev/build

## Project Structure

- `src/` — application source (App Router, components, hooks, lib, styles)
- `public/` — static assets
- `next.config.ts` — Next.js configuration (image remote patterns set for routemisr CDN)
- `components.json` — shadcn/ui configuration and path aliases

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