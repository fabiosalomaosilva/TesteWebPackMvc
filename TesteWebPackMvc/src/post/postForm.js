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
const btnAddPost = document.getElementById('btnAddPost');
const titlePageUser = document.getElementById('titlePageUser');
const title = document.getElementById('title');
const body = document.getElementById('body');
const formModalPost = document.getElementById('formModalPost');
const inputs = formModalPost.querySelectorAll('input, textarea');
let postId = 0;
let isDirty = false;
let currentuser = null;
const localStorageData = localStorage.getItem('user');
document.addEventListener('DOMContentLoaded', function () {
    return __awaiter(this, void 0, void 0, function* () {
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
        inputs.forEach((input) => {
            input.addEventListener('blur', () => {
                validarCampos();
            });
        });
    });
});
const dataSchema = zod_1.z.object({
    title: zod_1.z.string().nonempty('O T�tulo � obrigat�rio'),
    body: zod_1.z.string().nonempty('O COnte�do � obrigat�rio'),
});
const ListarPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const ulPosts = document.getElementById('ulPosts');
    ulPosts.innerHTML = '';
    const posts = yield postService_1.getPosts();
    const local = localStorage.getItem('user');
    if (local !== null) {
        currentuser = JSON.parse(local);
    }
    if (posts) {
        posts.forEach((post) => {
            const li = document.createElement('li');
            li.className = 'no-bullets';
            li.innerHTML = `
            <div class="card card-li">
              <div class="card-body">
                <div class="d-flex align-items-center feed-title">
                    <div class="me-auto d-flex justify-content-start align-items-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/1395/1395476.png" class="feed-title-img" alt="...">
                        <h4>${post.title}</h4>
                    </div>
                    <div class="p-2">
                        <div class="div-button">
                            <button type="button" id="${post.id}" onclick="editPost(${post.id})" data-bs-toggle="modal" data-bs-target="#novopost" class="round-button btnEdit hide"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#707070}</style><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg></button>
  
                            <button type="button" id="delete-${post.id}" class="round-button btnDelete hide">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#707070}</style><path d="M163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3C140.6 6.8 151.7 0 163.8 0zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm192 64c-6.4 0-12.5 2.5-17 7l-80 80c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V408c0 13.3 10.7 24 24 24s24-10.7 24-24V273.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-4.5-4.5-10.6-7-17-7z"/></svg>
                            </button>
                        </div>

                    </div>
                </div>
                 <div class="d-flex justify-content-start align-items-center mx-3 ">
                    <img src="https://i.pinimg.com/736x/3e/aa/24/3eaa245d923949b6f662b8ba07b7a3b2.jpg" class="avatar" alt="...">
                    <span>${currentuser === null || currentuser === void 0 ? void 0 : currentuser.name}</span>
                </div>
              <br />
                <p>${post.body}</p>
              </div>
            </div>           
        `;
            ulPosts.appendChild(li);
        });
        const liButtons = document.querySelectorAll('.btnEdit');
        liButtons.forEach((button) => {
            const postIdButtom = button.id;
            button.addEventListener('click', () => {
                var _a, _b;
                isDirty = false;
                title.value = (_a = posts.find(post => post.id === parseInt(postIdButtom))) === null || _a === void 0 ? void 0 : _a.title;
                body.value = (_b = posts.find(post => post.id === parseInt(postIdButtom))) === null || _b === void 0 ? void 0 : _b.body;
                postId = parseInt(postIdButtom);
            });
        });
        const liButtonsDelete = document.querySelectorAll('.btnDelete');
        liButtonsDelete.forEach((button) => {
            const postIdButtom = button.id.replace('delete-', '');
            button.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
                yield postService_1.deletePost(parseInt(postIdButtom));
                yield ListarPosts();
            }));
        });
    }
});
btnAddPost.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
    isDirty = false;
    postId = 0;
    formModalPost.reset();
}));
formModalPost.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    yield savePost();
}));
const savePost = () => __awaiter(void 0, void 0, void 0, function* () {
    isDirty = true;
    const result = dataSchema.safeParse({
        title: title.value.trim(),
        body: body.value.trim()
    });
    if (result.success) {
        carregando(true);
        if (postId === 0) {
            const data = result.data;
            data.userId = currentuser === null || currentuser === void 0 ? void 0 : currentuser.id;
            yield insertPost(data);
        }
        else {
            const data = result.data;
            data.id = postId;
            yield updatePost(result.data);
        }
    }
    else {
        validarCampos();
    }
});
const validarCampos = () => {
    if (!isDirty)
        return;
    const formData = {
        title: title.value,
        body: body.value,
    };
    const result = dataSchema.safeParse(formData);
    if (!result.success) {
        inputs.forEach((input) => {
            var _a;
            const field = (_a = result.error.errors.find(p => p.path[0] === input.id)) === null || _a === void 0 ? void 0 : _a.message;
            if (field !== undefined && (field === null || field === void 0 ? void 0 : field.length) > 0) {
                input.classList.add('border-error');
                const nextElement = input.nextElementSibling;
                if (nextElement) {
                    nextElement.textContent = field;
                }
            }
            else {
                input.classList.remove('border-error');
                const nextElement = input.nextElementSibling;
                if (nextElement) {
                    nextElement.textContent = "";
                }
            }
        });
    }
    else {
        inputs.forEach((input) => {
            input.classList.remove('border-error');
            const nextElement = input.nextElementSibling;
            if (nextElement) {
                nextElement.textContent = "";
            }
        });
    }
};
const carregando = (value) => {
    const spinner = document.getElementById('spinner');
    if (value) {
        spinner.className = 'spinner-border spinner-border-sm mx-2';
    }
    else {
        spinner.className = '';
    }
};
const insertPost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield postService_1.postPost(data);
    yield ListarPosts();
    carregando(false);
    formModalPost.reset();
});
const updatePost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield postService_1.putPost(data.id, data);
    yield ListarPosts();
    carregando(false);
    formModalPost.reset();
});
