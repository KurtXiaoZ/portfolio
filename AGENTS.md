# Portfolio Context

## Project

This repository contains the personal portfolio of Kurt Xiao, a senior full-stack engineer at PayPal.

The portfolio should present the owner as an experienced engineer who combines technical depth, product judgment, thoughtful execution, and clear communication.

## Audience

The primary audience is recruiters, hiring managers, engineering leaders, fellow engineers, and potential collaborators.

## Priorities

- Make the owner's experience, strengths, and impact easy to understand.
- Favor polished, concise storytelling over exhaustive detail.
- Build a fast, accessible, responsive, and professional experience.
- Keep the implementation maintainable and appropriately simple.

## Documentation

Start with `docs/README.md` when a task needs project context.

- `docs/product/` describes what the portfolio should communicate and how its content and sections should work.
- `docs/engineering/` describes how the portfolio is designed, implemented, tested, and operated.

Read the relevant documents before making related decisions. If documentation and implementation disagree, flag the inconsistency instead of silently choosing one.

## Commit Titles

Follow the existing commit title convention whenever creating commits.

This repository uses Conventional Commit titles:

```txt
type: short imperative description
```

Common types:

- `feat:` for user-facing features or new components
- `fix:` for bug fixes
- `chore:` for tooling, configuration, and maintenance
- `refactor:` for internal code changes without behavior changes
- `test:` for test-only changes
- `docs:` for documentation-only changes

Before committing, inspect recent Git history and match the existing title style.

When asked to create a Git commit, choose an appropriate title and proceed without requesting separate confirmation.

Examples:

- `feat: add featured projects section`
- `fix: preserve mobile navigation state`
- `chore: update lint configuration`

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
