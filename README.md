# EduFlow

Plataforma de cursos para concursos públicos — **Do edital à aprovação.**

Monorepo com pnpm workspaces e Turborepo.

```
apps/
  web/          Frontend Next.js 16 (Feature-Sliced Design)
  api/          Backend NestJS (monólito modular) — a criar
packages/
  contracts/    Esquemas Zod e tipos compartilhados entre web e api
  tokens/       Tokens de design da marca (cores, tipografia, espaços)
  config/       tsconfig base compartilhado
```

## Requisitos

- Node.js 22.12 ou superior
- pnpm 10 (`corepack enable`)

## Como rodar

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm dev:web
```

O frontend abre em http://localhost:3000. Enquanto a API não existe, `NEXT_PUBLIC_USE_MOCKS=true` faz as features
responderem com dados de exemplo (catálogo, login, cadastro e cupons `EDITAL30` e `PRIMEIRA10`).

## Scripts

| Comando | O que faz |
|---|---|
| `pnpm dev` | Sobe todos os apps em modo de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm lint` | ESLint e Steiger (regras do FSD) |
| `pnpm typecheck` | Checagem de tipos |

## Frontend: Feature-Sliced Design

```
apps/web/
  app/          Só rotas do Next.js; cada page.tsx reexporta uma página de src/_pages
  src/
    _app/       Providers, fontes, estilos globais
    _pages/     Uma pasta por tela do fluxo (T01–T41)
    widgets/    Blocos grandes (cabeçalho, rodapé, card de compra)
    features/   Ações do usuário (entrar, criar conta, filtrar catálogo, aplicar cupom)
    entities/   Conceitos do negócio (curso)
    shared/     UI base, cliente HTTP, utilitários, configuração
```

Uma camada só importa das camadas abaixo dela, sempre pela API pública (`index.ts`) de cada slice.
As camadas `app` e `pages` do FSD usam o prefixo `_` porque esses nomes são reservados pelo Next.js.

## Commits

Conventional Commits (`feat(web): adiciona catálogo`), versões com SemVer.
