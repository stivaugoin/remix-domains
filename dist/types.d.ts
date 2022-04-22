declare type ErrorWithMessage = {
    message: string;
};
declare type SuccessResult<T = void> = {
    success: true;
    data: T;
    errors: [];
    inputErrors: [];
    environmentErrors: [];
};
declare type ErrorResult = {
    success: false;
    errors: ErrorWithMessage[];
    inputErrors: SchemaError[];
    environmentErrors: SchemaError[];
};
declare type SchemaError = {
    path: string[];
    message: string;
};
declare type ErrorData = Omit<ErrorResult, 'success'>;
declare type Result<T = void> = SuccessResult<T> | ErrorResult;
declare type DomainFunction<Output = unknown> = {
    (input: unknown, environment?: unknown): Promise<Result<Output>>;
};
declare type UnpackResult<F extends DomainFunction> = Awaited<ReturnType<F>>;
declare type UnpackSuccess<F extends DomainFunction> = Extract<UnpackResult<F>, {
    success: true;
}>;
declare type UnpackData<F extends DomainFunction> = UnpackSuccess<F>['data'];
export type { DomainFunction, Result, SchemaError, SuccessResult, ErrorResult, ErrorData, UnpackResult, UnpackSuccess, UnpackData, ErrorWithMessage, };
