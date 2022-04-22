import qs from 'qs';
declare const inputFromSearch: (queryString: URLSearchParams) => qs.ParsedQs;
declare const inputFromFormData: (formData: FormData) => qs.ParsedQs;
declare const inputFromForm: (request: Request) => Promise<qs.ParsedQs>;
declare const inputFromUrl: (request: Request) => qs.ParsedQs;
export { inputFromForm, inputFromUrl, inputFromFormData, inputFromSearch };
