<p align="center">
  <a href="https://skeet.dev/en/">
    <img src="https://storage.skeet.dev/ogp.jpg" alt="Skeet" />
  </a>

  <a href="https://twitter.com/intent/follow?screen_name=SkeetDev">
    <img src="https://img.shields.io/twitter/follow/SkeetDev.svg?label=Follow%20@SkeetDev" alt="Follow @SkeetDev" />
  </a>
  <br/>
  <a aria-label="npm version" href="https://www.npmjs.com/package/@skeet-framework/cli">
    <img alt="" src="https://badgen.net/npm/v/@skeet-framework/cli">
  </a>
  <a aria-label="Downloads Number" href="https://www.npmjs.com/package/@skeet-framework/cli">
    <img alt="" src="https://badgen.net/npm/dt/@skeet-framework/cli">
  </a>
  <a aria-label="License" href="https://github.com/elsoul/skeet-cli/blob/master/LICENSE.txt">
    <img alt="" src="https://badgen.net/badge/license/Apache/blue">
  </a>
    <a aria-label="Code of Conduct" href="https://github.com/elsoul/skeet-cli/blob/master/CODE_OF_CONDUCT.md">
    <img alt="" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg">
  </a>
</p>

This is the RC for the frontend app code of skeet v3.

Demo: https://app.skeeter.dev/

## Features

- Edge Runtime
- i18n Native
- AI-powered Products Ready
- Cloudflare D1 + Prisma
- Next.js App Router
- React Compiler (Always optimizes memoization for production)
- Passwordless Sign-in (Magic Link)
- Green Coding

<a href="https://www.thegreenwebfoundation.org/green-web-check/?url=https://app.skeeter.dev/">
  <img src="https://app.greenweb.org/api/v3/greencheckimage/app.skeeter.dev?nocache=true" alt="This website runs on green hosting - verified by thegreenwebfoundation.org" width="200px" height="95px">
</a>

## Built with

- [Next.js](https://nextjs.org/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Prisma](https://www.prisma.io/)
- [Auth.js](https://authjs.dev/)
- [Resend](https://resend.com/docs/introduction)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [pnpm](https://pnpm.io/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [React Compiler](https://react.dev/learn/react-compiler)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook From](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Jotai](https://jotai.org/)
- [Vercel AI SDK](https://sdk.vercel.ai/docs/introduction)

## Getting Started

### secrets

Create AUTH_SECRET with

```bash
pnpm dlx auth secret
```

You need to create free accounts on Resend (to send email) and Neon (for serverless postgresql).

- [Resend](https://resend.com/)
- [Neon](https://neon.tech/)

If you want to use AI, you need to get the OpenAI API key.

- [OpenAI](https://openai.com/index/openai-api/)

create .env/.env.local/.dev.vars from .env.sample

Also set the secret values on Cloudflare Pages.

### Run the development server

```bash
pnpm i

// D1 Auth db migration
pnpm db:auth:create create_user_table
pnpm db:auth:init --output prisma/auth/migrations/0001_create_user_table.sql
pnpm db:auth:apply --local
pnpm db:auth:gen

// Neon db migration
pnpm db:neon:migration:dev
pnpm db:neon:gen

pnpm dev
```

Open [http://localhost:4200](http://localhost:4200) with your browser to see the result.

### Migration D1 Auth example

```bash
pnpm db:auth:create create_user_table
pnpm db:auth:init --output prisma/auth/migrations/0001_create_user_table.sql
pnpm db:auth:apply --local // --remote to production
pnpm db:auth:gen


// evolve schema
pnpm db:auth:create update_user_table
pnpm db:auth:evolve --output prisma/auth/migrations/0002_update_user_table.sql
pnpm db:auth:apply --local
pnpm db:auth:gen
```

### Migration Neon example

```bash
pnpm db:neon:migration:dev // migration:prod is for production (used with .env.build)
pnpm db:neon:gen
```

### Add Components

<a href="https://ui.shadcn.com/">
  <img src="https://pub-f5c1b877dd3a4b63aacd87ee9a480be9.r2.dev/shadcnUI.jpg" alt="shadcn/ui" />
</a>

You can add the high-quality UI components from [shadcn/ui](https://ui.shadcn.com/)

```bash
// shortcut method for shadcn/ui
pnpm add:ui button
```

You can also use [v0](https://v0.dev/) which is a UI generator with shadcn/ui from simple text prompts and images.

<a href="https://v0.dev/">
  <img src="https://pub-f5c1b877dd3a4b63aacd87ee9a480be9.r2.dev/v0.jpg" alt="v0" />
</a>

## References

- [Next.js App Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [React Server Actions](https://react.dev/reference/rsc/server-actions)
- [The Edge Runtime](https://edge-runtime.vercel.app/)
- [What is edge computing?](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/elsoul/skeet-v3-next-edge-rc This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/elsoul/skeet-v3-next-edge-rc/blob/master/CODE_OF_CONDUCT.md).
