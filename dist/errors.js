"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toErrorWithMessage = exports.errorMessagesForSchema = exports.errorMessagesFor = void 0;
function isErrorWithMessage(error) {
    return (typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string');
}
function toErrorWithMessage(maybeError) {
    if (isErrorWithMessage(maybeError))
        return { message: maybeError.message };
    return { message: String(maybeError) };
}
exports.toErrorWithMessage = toErrorWithMessage;
const errorMessagesFor = (errors, name) => errors
    .filter(({ path }) => path.join('.') === name)
    .map(({ message }) => message);
exports.errorMessagesFor = errorMessagesFor;
const errorMessagesForSchema = (errors, schema) => {
    const mappedErrors = {};
    for (const stringKey in schema.shape) {
        const key = stringKey;
        mappedErrors[key] = errorMessagesFor(errors, stringKey);
    }
    return mappedErrors;
};
exports.errorMessagesForSchema = errorMessagesForSchema;
