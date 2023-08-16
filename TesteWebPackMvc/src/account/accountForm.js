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
const accountService_1 = require("../services/accountService");
const email = document.getElementById('email');
const username = document.getElementById('username');
const btnLogin = document.getElementById('btnLogin');
const formLogin = document.getElementById('formLogin');
const preResult = document.getElementById('preResult');
const inputs = document.querySelectorAll('#formLogin input');
let isDirty = false;
const UserSchema = zod_1.z.object({
    username: zod_1.z.string().nonempty('Username � obrigat�rio'),
    email: zod_1.z.string().nonempty('E-mail � obrigat�rio').email('Formato de e-mail inv�lido'),
});
document.addEventListener('DOMContentLoaded', () => {
    formLogin.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        yield login();
    }));
    inputs.forEach((input) => {
        input.addEventListener('blur', () => {
            validarCampos();
        });
    });
});
const login = () => __awaiter(void 0, void 0, void 0, function* () {
    isDirty = true;
    const formData = {
        username: username.value,
        email: email.value,
    };
    const result = UserSchema.safeParse(formData);
    if (result.success) {
        carregando(true);
        const user = yield accountService_1.getUser(formData.email, formData.username);
        preResult.innerHTML = JSON.stringify(user, null, 2);
        setTimeout(() => {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/';
        }, 2000);
        carregando(false);
    }
    else {
        validarCampos();
    }
});
const validarCampos = () => {
    if (!isDirty)
        return;
    const formData = {
        username: username.value,
        email: email.value,
    };
    const result = UserSchema.safeParse(formData);
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
