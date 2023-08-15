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
const emailInput = document.getElementById('txtEmail');
const usernameInput = document.getElementById('txtUsername');
const btnLogin = document.getElementById('btnLogin');
const formLogin = document.getElementById('formLogin');
const preResult = document.getElementById('preResult');
const UserSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
formLogin.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    console.log(emailInput.value);
    console.log('Deu certo');
    login();
}));
const login = () => __awaiter(void 0, void 0, void 0, function* () {
    btnLogin.setAttribute('disabled', 'disabled');
    const formData = {
        username: usernameInput.value,
        email: emailInput.value,
    };
    console.log(formData);
    const result = UserSchema.safeParse(formData);
    if (!result.success) {
        console.log(result.error);
        return;
    }
    const user = yield accountService_1.getUser(formData.email, formData.username);
    preResult.innerHTML = JSON.stringify(user, null, 2);
    btnLogin.removeAttribute('disabled');
});
