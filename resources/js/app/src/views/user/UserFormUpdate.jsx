import { Fragment, useEffect, useState } from "react";
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UserFormUpdate ()
{
    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: null,
        name:"",
        email:""
    });

    const {id} = useParams();

    if(id) {
        useEffect(() => {
            axiosClient.get(`/user/show/${id}`)
                .then(({ data }) => {
                    setUser(data.data);
            }).catch((error) => {
                console.log(error);
            });
        },[id]);
    }  
    
    const onSubmit = (e) => {
        e.preventDefault();
        
       axiosClient.put(`/user/update/${id}`, user)
        .then(({ }) => {
            setUser({});
            console.log("Usuário alterado com sucesso");
            navigate('/user/index');
        }).catch((error) => {
            console.log(error);
        });
    }


    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {user.id && <h1>Alteração do usuário</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input 
                        value={user.name} 
                        placeholder="Nome do Usuário" 
                        onChange={
                            e => setUser({
                                ...user, name:e.target.value
                            })
                        }
                        />

                        <input 
                        value={user.email} 
                        placeholder="E-mail do Usuário" 
                        onChange={
                            e => setUser({
                                ...user, email:e.target.value
                            })
                        }
                        />

                        <button className="btn-edit">Salvar</button>
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