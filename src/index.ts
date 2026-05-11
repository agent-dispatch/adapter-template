import type {
  AdapterCapability,
  BackendAdapter,
  CancelResult,
  CleanupResult,
  DispatchRequest,
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
    return [{ provider: "example", capability: "agent-runtime", taskTypes: ["agent.run"], targetModes: ["session"] }];
  }

  async resolveTarget(request: DispatchRequest): Promise<ResolvedTarget> {
    return {
      account: { name: request.accountProfile, provider: request.provider, credentialSource: "example-default" },
      target: { provider: request.provider, accountProfile: request.accountProfile, capability: request.capability, backend: this.name, mode: request.target.mode }
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
}
