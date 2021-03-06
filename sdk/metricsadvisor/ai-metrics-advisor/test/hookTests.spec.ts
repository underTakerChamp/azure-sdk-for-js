// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import * as dotenv from "dotenv";
dotenv.config();

import {
  MetricsAdvisorAdministrationClient,
  MetricsAdvisorKeyCredential,
  WebhookHook,
  EmailHook,
  EmailHookPatch,
  WebhookHookPatch
} from "../src";
import { createRecordedAdminClient, testEnv } from "./util/recordedClients";
import { Recorder } from "@azure/test-utils-recorder";

describe("MetricsAdvisorClient hooks", () => {
  let client: MetricsAdvisorAdministrationClient;
  let recorder: Recorder;
  const apiKey = new MetricsAdvisorKeyCredential(
    testEnv.METRICS_ADVISOR_SUBSCRIPTION_KEY,
    testEnv.METRICS_ADVISOR_API_KEY
  );
  let createdWebHookId: string;
  let createdEmailHookId: string;
  let emailHookName: string;
  let webHookName: string;

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    ({ recorder, client } = createRecordedAdminClient(this, apiKey));
    if (recorder && !emailHookName) {
      emailHookName = recorder.getUniqueName("js-test-emailHook-");
    }
    if (recorder && !webHookName) {
      webHookName = recorder.getUniqueName("js-test-webHook-");
    }
  });

  afterEach(async function() {
    if (recorder) {
      recorder.stop();
    }
  });

  it("creates email Hook", async () => {
    const hook: EmailHook = {
      hookType: "Email",
      name: emailHookName,
      description: "description",
      hookParameter: {
        toList: ["test@example.com"]
      }
    };
    const created = await client.createHook(hook);
    assert.ok(created.id, "Expecting valid created.id");
    createdEmailHookId = created.id!;
  });

  it("creates web Hook", async () => {
    const hook: WebhookHook = {
      hookType: "Webhook",
      name: webHookName,
      description: "description",
      hookParameter: {
        endpoint: "https://httpbin.org/post",
        username: "user",
        password: "pass"
      }
    };
    const created = await client.createHook(hook);
    assert.ok(created.id, "Expecting valid created.id");
    createdWebHookId = created.id!;
  });

  it("updates email Hook", async () => {
    const emailPatch: EmailHookPatch = {
      hookType: "Email",
      hookParameter: {
        toList: ["test2@example.com", "test3@example.com"]
      }
    };
    const updated = await client.updateHook(createdEmailHookId, emailPatch);
    assert.equal(updated.hookType, emailPatch.hookType);
    const emailHook = updated as EmailHook;
    assert.deepEqual(emailHook.hookParameter.toList, ["test2@example.com", "test3@example.com"]);
  });

  it("updates Web Hook", async () => {
    const webPatch: WebhookHookPatch = {
      hookType: "Webhook",
      hookParameter: {
        endpoint: "https://httpbin.org/post",
        username: "user1",
        password: "pass123"
      }
    };
    const updated = await client.updateHook(createdWebHookId, webPatch);
    assert.equal(updated.hookType, webPatch.hookType);
    const webHook = updated as WebhookHook;
    assert.equal(webHook.hookParameter.username, "user1");
    assert.equal(webHook.hookParameter.endpoint, "https://httpbin.org/post");
    assert.equal(webHook.hookParameter.password, "pass123");
  });

  it("lists hooks", async function() {
    const iterator = client.listHooks({
      hookName: "js-test"
    });
    let result = await iterator.next();
    assert.ok(result.value.name, "Expecting first definition");
    result = await iterator.next();
    assert.ok(result.value.name, "Expecting second definition");
  });

  it("lists hooks by page", async function() {
    const iterator = client
      .listHooks({
        hookName: "js-test"
      })
      .byPage({ maxPageSize: 1 });
    let result = await iterator.next();
    assert.equal(result.value.hooks.length, 1, "Expecting one hook in first page");
    result = await iterator.next();
    assert.equal(result.value.hooks.length, 1, "Expecting one hook in second page");
  });

  it("deletes email hook", async () => {
    await client.deleteHook(createdEmailHookId);
    try {
      await client.getHook(createdEmailHookId);
      assert.fail("Expecting error getting hook");
    } catch (error) {
      assert.equal((error as any).code, "ERROR_INVALID_PARAMETER");
      assert.equal((error as any).message, "hookId is invalid.");
    }
  });

  it("deletes web hook", async () => {
    await client.deleteHook(createdWebHookId);
    try {
      await client.getHook(createdWebHookId);
      assert.fail("Expecting error getting hook");
    } catch (error) {
      assert.equal((error as any).code, "ERROR_INVALID_PARAMETER");
      assert.equal((error as any).message, "hookId is invalid.");
    }
  });
}).timeout(60000);
