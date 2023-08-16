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
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const postService_1 = require("../services/postService");
const myModal = document.getElementById('myModal');
const myInput = document.getElementById('myInput');
const titlePageUser = document.getElementById('titlePageUser');
const title = document.getElementById('title');
const body = document.getElementById('body');
let currentuser = null;
const localStorageData = localStorage.getItem('user');
document.addEventListener('DOMContentLoaded', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(window.location.pathname);
        if (window.location.pathname.toLocaleLowerCase() === '/posts') {
            if (localStorageData !== null) {
                currentuser = JSON.parse(localStorageData);
                titlePageUser.textContent = `Feed - ${currentuser.name}`;
                yield ListarPosts();
            }
            else {
                window.location.href = '/auth';
            }
        }
    });
});
const dataSchema = zod_1.z.object({
    title: zod_1.z.string().nonempty('O T�tulo � obrigat�rio'),
    body: zod_1.z.string().nonempty('O COnte�do � obrigat�rio'),
});
const carregando = (value) => {
    const spinner = document.getElementById('spinner');
    if (value) {
        spinner.className = 'spinner-border spinner-border-sm mx-2';
    }
    else {
        spinner.className = '';
    }
};
myModal === null || myModal === void 0 ? void 0 : myModal.addEventListener('shown.bs.modal', () => {
    myInput === null || myInput === void 0 ? void 0 : myInput.focus();
});
const ListarPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postService_1.getPosts();
    const ulPosts = document.getElementById('ulPosts');
    posts.forEach((post) => {
        const li = document.createElement('li');
        li.className = 'no-bullets';
        li.innerHTML = `
            <div class="card w-100 mb-4">
              <div class="card-body">
              <h4>${post.title}</h4>
              <br />
                <p>${post.body}</p>
              </div>
            </div>            
        `;
        ulPosts.appendChild(li);
    });
});
