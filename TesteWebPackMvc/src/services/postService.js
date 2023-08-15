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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.putPost = exports.postPost = exports.getPost = exports.getPosts = void 0;
const axios_1 = __importDefault(require("axios"));
const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
});
exports.getPosts = getPosts;
const getPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`);
    if (response.status == 200) {
        return response.data;
    }
    else {
        return null;
    }
});
exports.getPost = getPost;
const postPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post('https://jsonplaceholder.typicode.com/posts', post);
});
exports.postPost = postPost;
const putPost = (id, post) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.put(`https://jsonplaceholder.typicode.com/posts?id=${id}`, post);
});
exports.putPost = putPost;
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.delete(`https://jsonplaceholder.typicode.com/posts?id=${id}`);
});
exports.deletePost = deletePost;
