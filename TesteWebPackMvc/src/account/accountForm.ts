import { z } from 'zod';
import { getUser } from '../services/accountService';


const email = document.getElementById('email') as HTMLInputElement;
const username = document.getElementById('username') as HTMLInputElement;
const btnLogin = document.getElementById('btnLogin') as HTMLButtonElement;
const formLogin = document.getElementById('formLogin') as HTMLFormElement;
const preResult = document.getElementById('preResult') as HTMLPreElement;
const inputs = document.querySelectorAll('#formLogin input');
let isDirty: boolean = false;

const UserSchema = z.object({
    username: z.string().nonempty('Username é obrigatório'),
    email: z.string().nonempty('E-mail é obrigatório').email('Formato de e-mail inválido'),
});

type UserFormData = z.infer<typeof UserSchema>;


document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.toLocaleLowerCase() === '/auth') {

        formLogin.addEventListener('submit', async (event) => {
            event.preventDefault();
            await login();
        });

        inputs.forEach((input) => {
            input.addEventListener('blur', () => {
                validarCampos();
            });
        });
    }
});


const login = async () => {
    isDirty = true;

    const formData: UserFormData = {
        username: username.value,
        email: email.value,
    };
    const result = UserSchema.safeParse(formData);
    if (result.success) {
        carregando(true);
        const user = await getUser(formData.email, formData.username);
        preResult.innerHTML = JSON.stringify(user, null, 2);
        setTimeout(() => {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/';
        }, 2000);
        carregando(false);
    } else {
        validarCampos();
    }
}

const validarCampos = () => {
    if (!isDirty) return;

    const formData: UserFormData = {
        username: username.value,
        email: email.value,
    };

    const result = UserSchema.safeParse(formData);

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