import { Fragment, useEffect, useState } from "react";
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from "react-router-dom";

export default function UserFormStore ()
{
    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: null,
        name:"",
        email:"",
        password:""
    });

    const onSubmit = (e) => {
        e.preventDefault();
        
       axiosClient.post('/user/store', user)
        .then(({ }) => {
            setUser({});
            console.log("Usuário incluido com sucesso");
            navigate('/user/index');
        }).catch((error) => {
            console.log(error);
        });
    }


    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão do usuário</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input 
                        type = "text"
                        value={user.name} 
                        placeholder="Nome" 
                        onChange={
                            e => setUser({
                                ...user, name:e.target.value
                            })
                        }
                        />

                        <input 
                        type = "text"
                        value={user.email} 
                        placeholder="E-mail" 
                        onChange={
                            e => setUser({
                                ...user, email:e.target.value
                            })
                        }
                        />
                        <input 
                        type = "password"
                        value={user.password} 
                        placeholder="Senha" 
                        onChange={
                            e => setUser({
                                ...user, password:e.target.value
                            })
                        }
                        />
                        <button className="btn-add">Salvar</button>
                        <Link type="button"
                                className="btn-cancel"
                                to = '/user/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}