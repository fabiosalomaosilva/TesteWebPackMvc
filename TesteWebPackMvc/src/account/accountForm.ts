import { z } from 'zod';
import { getUser } from '../services/accountService';


const emailInput = document.getElementById('txtEmail') as HTMLInputElement;
const usernameInput = document.getElementById('txtUsername') as HTMLInputElement;
const btnLogin = document.getElementById('btnLogin') as HTMLButtonElement;
const formLogin = document.getElementById('formLogin') as HTMLFormElement;
const preResult = document.getElementById('preResult') as HTMLPreElement;
const emailValidation = document.getElementById('emailValidation') as HTMLDivElement;
const usernameValidation = document.getElementById('usernameValidation') as HTMLDivElement;


const UserSchema = z.object({
    username: z.string().nonempty('Username é obrigatório'),
    email: z.string().nonempty('E-mail é obrigatório').email('Formato de e-mail inválido'),
});

type UserFormData = z.infer<typeof UserSchema>;


formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();
    await login();
});

const login = async () => {
    btnLogin.setAttribute('disabled', 'disabled');

    const formData: UserFormData = {
        username: usernameInput.value,
        email: emailInput.value,
    };

    const result = UserSchema.safeParse(formData);
    if (!result.success) {
        const erroFormat = result.error.format();
        emailValidation.textContent = erroFormat.email?._errors.join(",") || "";
        usernameValidation.textContent = erroFormat.username?._errors.join(",") || "";

    } else {
        const user = await getUser(formData.email, formData.username);
        preResult.innerHTML = JSON.stringify(user, null, 2);
        emailValidation.textContent = "";
        usernameValidation.textContent = "";
    } 

    btnLogin.removeAttribute('disabled');
}
