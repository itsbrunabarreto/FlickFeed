import { Fragment, useEffect, useState } from "react";
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UserFormDestroy ()
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
        
        axiosClient.delete(`/user/destroy/${id}`)
        .then(({ }) => {
            setUser();
            console.log("Usuário excluido com sucesso");
            navigate('user/index');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const onCancel = () => {
        navigate('/user/index');
        
    }


    return(
        <Fragment>
            <div className="display">
                <div ClassName="card animated fadeinDown">
                    {user.id && <h1>Exclusão de usuário: {user.name}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input 
                        defaultValue={user.name} 
                        placeholder="Nome do Usuário" 
                        readOnly={true}
                        />

                        <input 
                        defaultValue={user.email} 
                        placeholder="E-mail do Usuário" 
                        readOnly={true}
                        />
                        <button className="btn-delete">Excluir</button>
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