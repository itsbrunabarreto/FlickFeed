import {Link} from 'react-router-dom';

export default function UpdatePassword()
{
    
    return(
        <div className="login-signup-form animated fadeInDown">
            <div className= "form">
                <form>
                <h1 className="title">Alterar Senha</h1>
                <input type="password" placeholder="Senha"/>
                <input type="password" placeholder="Confirme Senha"/>

                <button className='btn btn-block'>Salvar</button>
                <p className='message'>Acesso ao sistema</p><Link to="/login">Login</Link>
                </form>
            </div>
        </div>
    )
}