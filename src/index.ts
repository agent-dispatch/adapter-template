import type {
  AdapterCapability,
  BackendAdapter,
  CancelResult,
  CloudAgentInteraction,
  CleanupResult,
  DispatchRequest,
  PrepareTaskRequest,
  PrepareTaskResult,
  ProvisionRequest,
  ProvisionResult,
  ResolvedTarget,
  RuntimeEvent,
  RuntimeTarget,
  StartTaskRequest,
  StartTaskResult
} from "@agent-dispatch/core";

export class ExampleCloudAdapter implements BackendAdapter {
  readonly name = "example-cloud";
  readonly provider = "example";

  capabilities(): AdapterCapability[] {
    return [{ provider: "example", capability: "agent-runtime", taskTypes: ["agent.run"], targetModes: ["session"], protocols: ["a2a"] }];
  }

  async prepareTask(request: PrepareTaskRequest): Promise<PrepareTaskResult> {
    return {
      providerRefs: { sessionId: `example-session-${request.task.id}` },
      cloudAgent: this.cloudAgent(request.dispatch, `example-session-${request.task.id}`)
    };
  }

  async resolveTarget(request: DispatchRequest): Promise<ResolvedTarget> {
    return {
      account: { name: request.accountProfile, provider: request.provider, credentialSource: "example-default" },
      target: { provider: request.provider, accountProfile: request.accountProfile, capability: request.capability, backend: this.name, mode: request.target.mode, protocol: request.target.protocol }
    };
  }

  async provision(_request: ProvisionRequest): Promise<ProvisionResult> {
    return {};
  }

  async startTask(_request: StartTaskRequest): Promise<StartTaskResult> {
    return { result: { ok: true } };
  }

  async *streamEvents(taskId: string): AsyncIterable<RuntimeEvent> {
    yield { taskId, type: "task.progress", message: "Example adapter event." };
  }

  async cancel(_taskId: string): Promise<CancelResult> {
    return { status: "cancelled" };
  }

  async cleanup(_target: RuntimeTarget): Promise<CleanupResult> {
    return { status: "skipped" };
  }

  private cloudAgent(request: DispatchRequest, sessionId: string): CloudAgentInteraction {
    return {
      protocol: request.target.protocol ?? "a2a",
      provider: "example",
      backend: this.name,
      accountProfile: request.accountProfile,
      sessionId,
      providerRefs: { sessionId },
      a2a: {
        transport: "json-rpc-2.0-http",
        messageMethod: "message/send"
      }
    };
  }
}
