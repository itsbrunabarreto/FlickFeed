import useValidator from "../hook/useValidator";
import { ERRO_LOGIN, LOGIN } from "../types/Login";

const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ';
const LOWERCASE = 'abcedefghijklmnopqrstuvxwyz';
const SPECIALCHARACTER  = "!'^%#()=?@";
const PASSWORD_LENGTH = 8;

const loginValidationRules  =  {

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

        // const hasNumber = [...password].some((char)=>{
        //     NUMBER.includes(char);
        //  });

        //  if (!hasNumber){
        //     mensagens.push('A senha deve conter pelo menos um número');
        //  }

        //  const hasLowerCase = [...password].some((char)=>{
        //     LOWERCASE.includes(char);
        //  });

        //  if (!hasLowerCase){
        //     mensagens.push('A senha deve conter pelo menos um caracter minúsculo');
        //  }

        return mensagens;
    },




}


export const useValidarDadosLogin = () => {
    return useValidator(LOGIN, ERRO_LOGIN, loginValidationRules);
}

