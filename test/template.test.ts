import { describe, expect, it } from "vitest";
import { assertBackendAdapterContract, type DispatchRequest } from "@agent-dispatch/core";
import { ExampleCloudAdapter } from "../src/index.js";

const request: DispatchRequest = {
  provider: "example",
  accountProfile: "example-dev",
  capability: "agent-runtime",
  taskType: "agent.run",
  target: { mode: "session", protocol: "a2a" },
  input: { instruction: "run a template task" }
};

describe("ExampleCloudAdapter", () => {
  it("conforms to the provider-neutral backend adapter contract", async () => {
    await expect(assertBackendAdapterContract({ adapter: new ExampleCloudAdapter(), request })).resolves.toBeUndefined();
  });

  it("declares support without requiring MCP tool changes", () => {
    const adapter = new ExampleCloudAdapter();

    expect(adapter.capabilities()).toEqual([
      {
        provider: "example",
        capability: "agent-runtime",
        taskTypes: ["agent.run"],
        targetModes: ["session"],
        protocols: ["a2a"]
      }
    ]);
  });

  it("returns cloud agent metadata without MCP changes", async () => {
    const adapter = new ExampleCloudAdapter();
    const prepared = await adapter.prepareTask({
      dispatch: request,
      task: {
        id: "task_template",
        provider: "example",
        accountProfile: "example-dev",
        capability: "agent-runtime",
        taskType: "agent.run",
        target: request.target,
        input: request.input,
        status: "queued",
        providerRefs: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    });

    expect(prepared.cloudAgent).toMatchObject({
      protocol: "a2a",
      sessionId: "example-session-task_template",
      a2a: { messageMethod: "message/send" }
    });
  });
});
