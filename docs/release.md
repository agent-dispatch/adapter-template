# Template Maintenance

`@agent-dispatch/adapter-template` is a private template package, not a public runtime dependency.

## Validation

Keep the template aligned with `@agent-dispatch/core` adapter contracts:

- Run `npm run typecheck`.
- Run `npm test`.
- Run `npm run build`.

## Publishing

Do not publish this package to npm unless the repository is intentionally converted from a private template into a public package.
