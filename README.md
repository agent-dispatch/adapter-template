# @agent-dispatch/adapter-template

[![npm](https://img.shields.io/npm/v/@agent-dispatch/adapter-template.svg)](https://www.npmjs.com/package/@agent-dispatch/adapter-template)
[![license](https://img.shields.io/npm/l/@agent-dispatch/adapter-template.svg)](https://www.npmjs.com/package/@agent-dispatch/adapter-template)

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

## Install

```bash
npm install @agent-dispatch/adapter-template
```

Most teams should copy or fork the template rather than depend on it directly.

## Development

```bash
npm install
npm run typecheck
npm test
npm run build
```
