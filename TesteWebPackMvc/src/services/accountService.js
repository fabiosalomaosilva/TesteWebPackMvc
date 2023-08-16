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
exports.getUser = exports.getUsers = void 0;
const axios_1 = __importDefault(require("axios"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
});
exports.getUsers = getUsers;
const getUser = (email, username) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield axios_1.default.get(`https://jsonplaceholder.typicode.com/users?email=${email}`);
    if (((_a = response.data[0]) === null || _a === void 0 ? void 0 : _a.username) == username) {
        return response.data[0];
    }
    else {
        return null;
    }
});
exports.getUser = getUser;
