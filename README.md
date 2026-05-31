# @agent-dispatch/adapter-template

[![CI](https://github.com/agent-dispatch/adapter-template/actions/workflows/ci.yml/badge.svg)](https://github.com/agent-dispatch/adapter-template/actions/workflows/ci.yml)
[![license](https://img.shields.io/badge/license-Apache--2.0-0EA5E9.svg)](./LICENSE)

Starter template for building new AgentDispatch provider adapters.

Use this package when adding support for GCP, Azure, Kubernetes, local runtimes, or a new cloud service. The goal is simple: new infrastructure should plug into AgentDispatch without adding new MCP tools.

## What the template demonstrates

- Declaring provider, capabilities, task types, and target modes.
- Validating account profile and adapter configuration.
- Resolving provider-neutral targets into provider-specific runtime references.
- Emitting provider-neutral lifecycle, log, artifact, result, and error events.
- Returning optional `cloudAgent` metadata for A2A, MCP, AG-UI, or HTTP interaction.
- Supporting adapter conformance tests from `@agent-dispatch/core`.

## Adapter checklist

- Keep provider SDK types inside the adapter package.
- Put provider-specific fields under adapter config or `target.details`.
- Return durable provider refs for every runtime, session, job, invocation, or artifact.
- Implement cancellation and cleanup even if the provider can only offer best-effort behavior.
- Add tests for capability registration, target resolution, event mapping, cancellation, and cleanup.

## Use The Template

```bash
git clone https://github.com/agent-dispatch/adapter-template my-agentdispatch-adapter
cd my-agentdispatch-adapter
npm install
```

Most teams should copy or fork the template rather than depend on it directly. The package is private template source and is not published to npm.

## Development

```bash
npm install
npm run typecheck
npm test
npm run build
```

See [template maintenance](https://github.com/agent-dispatch/adapter-template/blob/main/docs/release.md) for release policy. This package is private template source and should not be published unless intentionally converted into a public package.
