import * as z from 'zod';
import { DomainFunction, ErrorData } from './types';
declare type MakeDomainFunction = <Schema extends z.ZodTypeAny, EnvSchema extends z.ZodTypeAny>(inputSchema: Schema, environmentSchema?: EnvSchema) => <Output>(handler: (inputSchema: z.infer<Schema>, environmentSchema: z.infer<EnvSchema>) => Promise<Output>) => DomainFunction<Output>;
declare const makeDomainFunction: MakeDomainFunction;
declare type Unpack<T> = T extends DomainFunction<infer F> ? F : T;
declare function all<T extends readonly unknown[] | []>(...fns: T): DomainFunction<{
    -readonly [P in keyof T]: Unpack<T[P]>;
}>;
declare type Last<T extends readonly unknown[]> = T extends [...infer I, infer L] ? L : never;
declare type Flow = <T extends readonly DomainFunction[]>(...fns: T) => Last<T>;
declare const pipe: Flow;
declare type Map = <O, R>(dfn: DomainFunction<O>, mapper: (element: O) => R) => DomainFunction<R>;
declare const map: Map;
declare type MapError = <O>(dfn: DomainFunction<O>, mapper: (element: ErrorData) => ErrorData) => DomainFunction<O>;
declare const mapError: MapError;
export { makeDomainFunction, all, pipe, map, mapError };
