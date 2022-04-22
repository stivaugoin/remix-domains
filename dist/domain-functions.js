"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapError = exports.map = exports.pipe = exports.all = exports.makeDomainFunction = void 0;
const z = __importStar(require("zod"));
const errors_1 = require("./errors");
const formatSchemaErrors = (errors) => errors.map((error) => {
    const { path, message } = error;
    return { path: path.map(String), message };
});
const makeDomainFunction = (inputSchema = z.object({}), environmentSchema = z.object({})) => (handler) => {
    const domainFunction = (async (input, environment = {}) => {
        const envResult = environmentSchema.safeParse(environment);
        const result = inputSchema.safeParse(input);
        try {
            if (result.success === true && envResult.success === true) {
                return {
                    success: true,
                    data: await handler(result.data, envResult.data),
                    errors: [],
                    inputErrors: [],
                    environmentErrors: [],
                };
            }
        }
        catch (error) {
            return {
                success: false,
                errors: [(0, errors_1.toErrorWithMessage)(error)],
                inputErrors: [],
                environmentErrors: [],
            };
        }
        return {
            success: false,
            errors: [],
            inputErrors: result.success
                ? []
                : formatSchemaErrors(result.error.issues),
            environmentErrors: envResult.success
                ? []
                : formatSchemaErrors(envResult.error.issues),
        };
    });
    return domainFunction;
};
exports.makeDomainFunction = makeDomainFunction;
function all(...fns) {
    return async (input, environment) => {
        const results = await Promise.all(fns.map((fn) => fn(input, environment)));
        if (!isListOfSuccess(results)) {
            return {
                success: false,
                errors: results.map(({ errors }) => errors).flat(),
                inputErrors: results.map(({ inputErrors }) => inputErrors).flat(),
                environmentErrors: results
                    .map(({ environmentErrors }) => environmentErrors)
                    .flat(),
            };
        }
        return {
            success: true,
            data: results.map(({ data }) => data),
            inputErrors: [],
            environmentErrors: [],
            errors: [],
        };
    };
}
exports.all = all;
function isListOfSuccess(result) {
    return result.every(({ success }) => success === true);
}
const pipe = (...fns) => {
    const [head, ...tail] = fns;
    return ((input, environment) => {
        return tail.reduce(async (memo, fn) => {
            const resolved = await memo;
            if (resolved.success) {
                return fn(resolved.data, environment);
            }
            else {
                return memo;
            }
        }, head(input, environment));
    });
};
exports.pipe = pipe;
const map = (dfn, mapper) => {
    return async (input, environment) => {
        const result = await dfn(input, environment);
        if (!result.success)
            return result;
        try {
            return {
                success: true,
                data: mapper(result.data),
                errors: [],
                inputErrors: [],
                environmentErrors: [],
            };
        }
        catch (error) {
            const errors = [(0, errors_1.toErrorWithMessage)(error)];
            return {
                success: false,
                errors,
                inputErrors: [],
                environmentErrors: [],
            };
        }
    };
};
exports.map = map;
const mapError = (dfn, mapper) => {
    return async (input, environment) => {
        const result = await dfn(input, environment);
        if (result.success)
            return result;
        try {
            return { ...mapper(result), success: false };
        }
        catch (error) {
            const errors = [(0, errors_1.toErrorWithMessage)(error)];
            return {
                success: false,
                errors,
                inputErrors: [],
                environmentErrors: [],
            };
        }
    };
};
exports.mapError = mapError;
