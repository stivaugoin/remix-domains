"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputFromSearch = exports.inputFromFormData = exports.inputFromUrl = exports.inputFromForm = void 0;
const qs_1 = __importDefault(require("qs"));
const inputFromSearch = (queryString) => qs_1.default.parse(queryString.toString());
exports.inputFromSearch = inputFromSearch;
const inputFromFormData = (formData) => inputFromSearch(new URLSearchParams(formData.entries()));
exports.inputFromFormData = inputFromFormData;
const inputFromForm = async (request) => inputFromFormData(await request.clone().formData());
exports.inputFromForm = inputFromForm;
const inputFromUrl = (request) => inputFromSearch(new URL(request.url).searchParams);
exports.inputFromUrl = inputFromUrl;
