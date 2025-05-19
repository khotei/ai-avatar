# 🧠 Full-Stack Monorepo Starter

A high-performance, type-safe monorepo starter template for scalable full-stack web applications.
Engineered for **velocity**, **composability**, and **long-term maintainability**.

Designed with AI-augmented development in mind, this template is **fully declarative**, **schema-driven**, and *
*contract-first** — enabling humans and machines to collaborate in extending features with minimal friction.

---

## 🧭 Purpose

This framework provides a clear system of **rules, boundaries, and contracts** for frontend, backend, and shared code in
a monorepo structure.
Its goals:

* ⚡ Accelerate MVP-to-production cycle
* 🧩 Enable AI to generate consistent, extensible modules
* 🔐 Enforce type-safety and input/output integrity across all layers
* 🧱 Maximize code reuse via package-level modularization
* 🧬 Encourage declarative, functional programming

---

## 🧰 Toolchain Overview

| Domain   | Tools                                                                                                                                                                 |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Monorepo | [Turborepo](https://turborepo.com/), [npm workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces)                                                            |
| Frontend | [React 19](https://react.dev/), [TanStack](https://tanstack.com/), [Chakra UI](https://chakra-ui.com/), [react-use](https://github.com/streamich/react-use)           |
| Backend  | [tRPC](https://trpc.io/), [Drizzle](https:/drizzle.team/), [Better Auth](https://www.better-auth.com/), [Neon](https://neon.tech/)                                    |
| Shared   | [Zod](https://zod.dev/), [Lodash](https://lodash.com/), [date-fns](https://date-fns.org/), [type-fest](https://github.com/sindresorhus/type-fest)                     |
| Tooling  | [ESLint](https://eslint.org/), [TypeScript](https://www.typescriptlang.org/), [GitHub Actions](https://docs.github.com/en/actions), [Pulumi](https://www.pulumi.com/) |

---

## 🏗 Architectural Principles

### Modular + Contract-First

* **All shared logic** lives in `/packages` (schemas, types, utils, UI).
* **All implementation** lives in `/apps/client` and `/apps/server`.
* Every module begins with a **Zod schema** and generates:
    * tRPC route (server)
    * DB schema (Drizzle)
    * UI form (client)
    * API call binding (React Query) with tRPC (client)
* **Data Flow** Lodash

### Declarative by Default

* No class-based abstractions.
* Pure functions, schemas, hooks, and static typing power the architecture.

---

## 🧩 Feature Highlights

* ✅ Schema-driven UI + API + DB generation
* ✅ Type-safe full-stack CRUD via Zod/tRPC/Drizzle
* ✅ Auto-cache + refetch with TanStack Query
* ✅ Auth scaffold with [Better Auth](https://better-auth.com/)
* ✅ Chakra UI form system powered by TanStack Form
* ✅ Functional patterns, immutability-first design
* ✅ AI-friendly structure and naming

---

## 🌐 Frontend — `apps/client`

Built with **React 19**, Chakra UI, and the TanStack ecosystem.

### Key Features

* React Query → automatic state caching + mutation for API calls
* TanStack Form → schema-driven form builder (Zod)
* Chakra UI → design system, responsive layout
* react-use → effectful hooks (debounce, mount, interval, etc.)
* Seamless integration with tRPC queries and mutations

---

## 🖥 Backend — `apps/server`

The backend is built on tRPC, Drizzle ORM, and Better Auth. It is designed for modularity, composability, and strict
input/output validation.

### 🔧 Design Principles

* Schema-first: Define data models using Zod, shared across layers.
* Contract-based APIs: Every tRPC router is backed by Zod schemas for runtime validation and compile-time inference.
* One source of truth: Schemas are re-exported from the backend to ensure type safety on the client.
* Composable procedures: Queries and mutations follow functional, atomic design.

---

## 🔐 Auth System

Authentication and authorization are powered by Better Auth.

* Session and token-based auth strategies
* Middleware integrated with tRPC context and guards
* Fully extensible to support OAuth, magic links, etc.

---

## 🌱 Database & Seeding

Database schema is defined via Drizzle ORM, with support for migrations and seed data.

* Migrations auto-generated from schema changes
* Seed support for dev/staging environments using Drizzle Seed
* Manual migration workflow via GitHub Actions

---

## 📦 CI/CD Requirements

Our CI/CD is defined via **GitHub Actions**, built for clarity, modularity, and scalability.

### ✅ Manual Deployment Workflows

> Triggered manually via the GitHub Actions UI (`workflow_dispatch`)

* **UI Deployment:** Deploys `apps/client` to your designated frontend hosting provider.
* **Server Deployment:** Deploys `apps/server` to the serverless infrastructure (Pulumi).
* **Database Migration:** Executes Drizzle-based database migrations safely with logging, rollback, and post-migration
  validation.

### 🧪 PR Automation Workflows

> Automatically triggered on Pull Request creation and updates

* **Linting:** Runs `eslint` across all packages and apps.
* **Type Checking:** Executes strict `tsc` type checking across the monorepo.
* **Unit/Integration Tests:** Hooks for future test suites (e.g. `node:test` and Playwright).

### ☁️ Infrastructure as Code (IaC)

> Managed via **Pulumi**, integrated with GitHub Actions

* Serverless deployments
* Drizzle-managed with [Neon](https://neon.tech/)
* Secrets managed via Pulumi Config + GitHub Secrets

### 🔐 Security & Best Practices

* Required status checks before merging to `main`
* Branch protection rules for all production-bound branches
* Centralized `.github/workflows` folder with reusable workflows
* Isolated deploy keys for Pulumi state management

---

## 📚 References

- [React Docs](https://react.dev/learn)
- [TanStack](https://tanstack.com/)
- [Chakra UI](https://chakra-ui.com/)
- [react-use](https://github.com/streamich/react-use)
- [tRPC](https://trpc.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Better Auth](https://www.better-auth.com/)
- [Neon](https://neon.tech/)
- [Turbo](https://turborepo.com/)
- [Zod](https://zod.dev/)
- [Lodash](https://lodash.com/)
- [type-fest](https://github.com/sindresorhus/type-fest)
- [Functional-Light-JS](https://github.com/getify/Functional-Light-JS)
- [You Don’t Know JS](https://github.com/getify/You-Dont-Know-JS)
