import { z } from 'zod';
import { User } from '../models/User';
import { getPosts } from '../services/postService';


const myModal = document.getElementById('myModal');
const myInput = document.getElementById('myInput');
const titlePageUser = document.getElementById('titlePageUser') as HTMLHeadElement;
const title = document.getElementById('title') as HTMLInputElement;
const body = document.getElementById('body') as HTMLTextAreaElement;

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
});


const dataSchema = z.object({
    title: z.string().nonempty('O Título é obrigatório'),
    body: z.string().nonempty('O COnteúdo é obrigatório'),
});



type formData = z.infer<typeof dataSchema>;


const carregando = (value: boolean) => {
    const spinner = document.getElementById('spinner') as HTMLSpanElement;
    if (value) {
        spinner.className = 'spinner-border spinner-border-sm mx-2';
    } else {
        spinner.className = '';
    }
}


myModal?.addEventListener('shown.bs.modal', () => {
    myInput?.focus()
})

const ListarPosts = async () => {
    const posts = await getPosts();
    const local = localStorage.getItem('user');
    if (local !== null) {
        currentuser = JSON.parse(local) as User;
    }
    const ulPosts = document.getElementById('ulPosts') as HTMLUListElement;
    if (posts) {
        posts.forEach((post) => {
            const li = document.createElement('li');
            li.className = 'no-bullets';
            li.innerHTML = `
            <div class="card w-100 mb-4">
              <div class="card-body">
                <div class="d-flex justify-content-start align-items-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/1395/1395476.png" class="feed-title" alt="...">
                    <h4>${post.title}</h4>
                </div>

                <div class="d-flex justify-content-start align-items-center mx-3">
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
    }
}
