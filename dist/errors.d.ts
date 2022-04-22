import * as z from 'zod';
import type { ErrorWithMessage, SchemaError } from './types';
declare function toErrorWithMessage(maybeError: unknown): ErrorWithMessage;
declare const errorMessagesFor: (errors: SchemaError[], name: string) => string[];
declare const errorMessagesForSchema: <T extends z.AnyZodObject>(errors: SchemaError[], schema: T) => Record<keyof z.TypeOf<T>, string[]>;
export { errorMessagesFor, errorMessagesForSchema, toErrorWithMessage };
