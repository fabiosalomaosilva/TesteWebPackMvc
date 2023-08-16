import { z } from 'zod';
import { icons } from 'feather-icons'
import { User } from '../models/User';
import { deletePost, getPosts, postPost, putPost } from '../services/postService';
import { Post } from '../models/Post';

const btnAddPost = document.getElementById('btnAddPost') as HTMLButtonElement;
const titlePageUser = document.getElementById('titlePageUser') as HTMLHeadElement;
const title = document.getElementById('title') as HTMLInputElement;
const body = document.getElementById('body') as HTMLInputElement;
const formModalPost = document.getElementById('formModalPost') as HTMLFormElement;
const inputs = formModalPost.querySelectorAll('input, textarea');
let postId: number = 0;
let isDirty: boolean = false;

let currentuser: User | null = null;
const localStorageData = localStorage.getItem('user');

document.addEventListener('DOMContentLoaded', async function () {
    if (window.location.pathname.toLocaleLowerCase() === '/posts') {
        if (localStorageData !== null) {
            currentuser = JSON.parse(localStorageData) as User;
            titlePageUser.textContent = `Feed - ${currentuser.name}`;
            await ListarPosts();
        } else {
            window.location.href = '/auth';
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('blur', () => {
            validarCampos();
        });
    });
});

const dataSchema = z.object({
    title: z.string().nonempty('O Título é obrigatório'),
    body: z.string().nonempty('O COnteúdo é obrigatório'),
});

type FormData = z.infer<typeof dataSchema>;


const ListarPosts = async () => {
    const ulPosts = document.getElementById('ulPosts') as HTMLUListElement;
    ulPosts.innerHTML = '';
    const posts = await getPosts();
    const local = localStorage.getItem('user');
    if (local !== null) {
        currentuser = JSON.parse(local) as User;
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
                    <span>${currentuser?.name}</span>
                </div>
              <br />
                <p>${post.body}</p>
              </div>
            </div>           
        `;
            ulPosts.appendChild(li); 
        }
        );
        const liButtons = document.querySelectorAll('.btnEdit');
        liButtons.forEach((button) => {
            const postIdButtom = button.id;
            button.addEventListener('click', () => {
                isDirty = false;
                title.value = posts.find(post => post.id === parseInt(postIdButtom as string))?.title as string;
                body.value = posts.find(post => post.id === parseInt(postIdButtom as string))?.body as string;
                postId = parseInt(postIdButtom as string);
            });
        });

        const liButtonsDelete = document.querySelectorAll('.btnDelete');
        liButtonsDelete.forEach((button) => {
            const postIdButtom = button.id.replace('delete-', '');
            button.addEventListener('click', async () => {
                await deletePost(parseInt(postIdButtom as string));
                await ListarPosts();
            });
        });

    }
}

btnAddPost.addEventListener('click', async (event) => {
    isDirty = false;
    postId = 0;
    formModalPost.reset();
});

formModalPost.addEventListener('submit', async (event) => {
    event.preventDefault();
    await savePost();

});

const savePost = async () => {
    isDirty = true;
    const result = dataSchema.safeParse({
        title: title.value.trim(),
        body: body.value.trim()
    });

    if (result.success) {
        carregando(true);
        if (postId === 0) {
            const data = result.data as Post;
            data.userId = currentuser?.id as number;
            await insertPost(data);
        } else {
            const data = result.data as Post;
            data.id = postId;
            await updatePost(result.data as Post);
        }
    } else {
        validarCampos();
    }
}


const validarCampos = () => {
    if (!isDirty) return;

    const formData: FormData = {
        title: title.value,
        body: body.value,
    };

    const result = dataSchema.safeParse(formData);

    if (!result.success) {
        inputs.forEach((input) => {
            const field = result.error.errors.find(p => p.path[0] === input.id)?.message;
            if (field !== undefined && field?.length > 0) {
                input.classList.add('border-error');
                const nextElement = input.nextElementSibling;
                if (nextElement) {
                    nextElement.textContent = field;
                }
            } else {
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
}

const carregando = (value: boolean) => {
    const spinner = document.getElementById('spinner') as HTMLSpanElement;
    if (value) {
        spinner.className = 'spinner-border spinner-border-sm mx-2';
    } else {
        spinner.className = '';
    }
}

const insertPost = async (data: Post) => {
    await postPost(data);
    await ListarPosts();
    carregando(false);
    formModalPost.reset();
}

const updatePost = async (data: Post) => {
    await putPost(data.id, data);
    await ListarPosts();
    carregando(false);
    formModalPost.reset();
}