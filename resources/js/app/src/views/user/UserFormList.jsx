import React, { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function UserFormList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosClient.get('/user/index')
      .then(({ data }) => setUsers(data.data))
      .catch((error) => console.error('Erro ao buscar usuários:', error));
  }, []);

  return (
    <div className="display">
      <div className="card">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h1>Usuários Cadastrados</h1>
          <Link to="/user/store" className="btn-add">Novo Usuário</Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Nome</th>
              <th>Email</th>
              <th colSpan="3" className="actions">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="actions">
                    <Link className="btn-show" to={`/user/show/${user.id}`}>Ver</Link>
                  </td>
                  <td className="actions">
                    <Link className="btn-edit" to={`/user/update/${user.id}`}>Editar</Link>
                  </td>
                  <td className="actions">
                    <Link className="btn-delete" to={`/user/destroy/${user.id}`}>Excluir</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-records">Nenhum usuário encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
