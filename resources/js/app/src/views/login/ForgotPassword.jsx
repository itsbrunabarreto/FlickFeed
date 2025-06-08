import {Link} from 'react-router-dom';

export default function ForgotPassword()
{
    return(
        <div className="login-signup-form animated fadeInDown">
            <div className= "form">
                <form>
                <h1 className="title">Recuperar Senha</h1>

                <input type="text" placeholder="E-mail"/>

                <button className='btn btn-block'>Recuperar</button>
                <p className='message'>Está registrado?</p><Link to="/login">Login</Link>
                </form>
            </div>
        </div>
    )
}
