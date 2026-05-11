import { describe, expect, it } from "vitest";
import { assertBackendAdapterContract, type DispatchRequest } from "@agent-dispatch/core";
import { ExampleCloudAdapter } from "../src/index.js";

const request: DispatchRequest = {
  provider: "example",
  accountProfile: "example-dev",
  capability: "agent-runtime",
  taskType: "agent.run",
  target: { mode: "session" },
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
        targetModes: ["session"]
      }
    ]);
  });
});
