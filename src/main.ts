import * as core from "@actions/core";
import { getOctokit } from "@actions/github";
import { defaults as defaultGitHubOptions } from "@actions/github/lib/utils";
import { requestLog } from "@octokit/plugin-request-log";
import { retry } from "@octokit/plugin-retry";
import { RequestRequestOptions } from "@octokit/types";

type RetryOptions = {
  doNotRetry?: number[];
  enabled?: boolean;
};

type Options = {
  log?: Console;
  userAgent?: string;
  baseUrl?: string;
  previews?: string[];
  retry?: RetryOptions;
  request?: RequestRequestOptions;
};

async function main(): Promise<void> {
  const token = core.getInput("github-token", { required: true });
  const owner = core.getInput("owner", { required: true });
  const repo = core.getInput("repo", { required: true });
  const workflowId = core.getInput("name", { required: true });
  const reference = core.getInput("ref");
  const inputs = core.getMultilineInput("input");
  const debug = core.getBooleanInput("debug");

  const opts: Options = {
    log: debug ? console : undefined,
    retry: {
      enabled: false,
    },
    request: defaultGitHubOptions.request,
  };

  const splitInputs = inputs.map((input): [string, string] => {
    const splitInput = input.split("=");
    const key = splitInput[0];
    const value = splitInput.slice(1);
    return [key, value.join("=")];
  });

  let parsedInputs: { [key: string]: string } = {};

  for (const splitInput of splitInputs) {
    parsedInputs[splitInput[0]] = splitInput[1];
  }

  const github = getOctokit(token, opts, retry, requestLog);

  await github.rest.actions.createWorkflowDispatch({
    owner: owner,
    repo: repo,
    workflow_id: workflowId,
    ref: reference,
    inputs: parsedInputs,
  });
}
