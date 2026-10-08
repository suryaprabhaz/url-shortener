# Linkly — URL Shortener

A polished Next.js URL-shortening frontend with a provider-backed shortening flow.

## What it demonstrates

- Next.js App Router + TypeScript
- Responsive Tailwind UI
- Client-side URL validation
- Abortable network requests with an 8-second timeout
- Safe handling of provider responses
- Clipboard support with graceful failure handling
- Accessible interactive controls
- CI build verification

## Architecture

The current project is intentionally a **frontend/provider integration demo**. It does not contain the backend implied by the old monorepo scripts.

For a true production URL-shortening service, the next architecture should be:

`Browser → authenticated API → database → redirect service`

with unique aliases, rate limiting, abuse controls, expiration, analytics and persistent storage.

## Development

```bash
npm install
npm run dev
```

Or:

```bash
cd frontend
npm install
npm run dev
```

## Security

See [SECURITY.md](SECURITY.md). Do not treat the current client-side provider flow as a complete production redirect service.

## Author

[@suryaprabhaz](https://github.com/suryaprabhaz)
