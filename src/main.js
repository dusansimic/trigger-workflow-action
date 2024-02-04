"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("@actions/core");
var github_1 = require("@actions/github");
var utils_1 = require("@actions/github/lib/utils");
var plugin_request_log_1 = require("@octokit/plugin-request-log");
var plugin_retry_1 = require("@octokit/plugin-retry");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var token, owner, repo, workflowId, reference, inputs, debug, opts, splitInputs, parsedInputs, _i, splitInputs_1, splitInput, github;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = core.getInput("github-token", { required: true });
                    owner = core.getInput("owner", { required: true });
                    repo = core.getInput("repo", { required: true });
                    workflowId = core.getInput("name", { required: true });
                    reference = core.getInput("ref");
                    inputs = core.getMultilineInput("input");
                    debug = core.getBooleanInput("debug");
                    opts = {
                        log: debug ? console : undefined,
                        retry: {
                            enabled: false,
                        },
                        request: utils_1.defaults.request,
                    };
                    splitInputs = inputs.map(function (input) {
                        var splitInput = input.split("=");
                        var key = splitInput[0];
                        var value = splitInput.slice(1);
                        return [key, value.join("=")];
                    });
                    parsedInputs = {};
                    for (_i = 0, splitInputs_1 = splitInputs; _i < splitInputs_1.length; _i++) {
                        splitInput = splitInputs_1[_i];
                        parsedInputs[splitInput[0]] = splitInput[1];
                    }
                    github = (0, github_1.getOctokit)(token, opts, plugin_retry_1.retry, plugin_request_log_1.requestLog);
                    return [4 /*yield*/, github.rest.actions.createWorkflowDispatch({
                            owner: owner,
                            repo: repo,
                            workflow_id: workflowId,
                            ref: reference === "" ? "main" : reference,
                            inputs: parsedInputs,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
