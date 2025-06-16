import useValidator from "../hook/useValidator";
import { ERROR_USER, USER } from "../types/User";


const PASSWORD_LENGTH = 8;


const userValidationRules = {

    name:(name) => {
        let mensagens = [];
        if (!name || name.trim().length === 0 ) {
           mensagens.push('Obrigatório informar o nome do usuário');
        }
        return mensagens;
    },

    email:(email)=>{
        let mensagens = [];
        if (!email || email.trim().length === 0 ) {
           mensagens.push('Obrigatório informar um e-mail');
        }
        return mensagens;
    },

    password:(password)=>{
        let mensagens = [];

        if (!password || password.trim().length === 0 ) {
            mensagens.push('Obrigatório informar a senha');
        }

        if ( password.length < PASSWORD_LENGTH ){
            mensagens.push('A senha deve conter oito caracteres ')
        }



        return mensagens;
    },

}


export const useValidarDadosUsuario = () => {
    return useValidator(USER, ERROR_USER, userValidationRules);
}
