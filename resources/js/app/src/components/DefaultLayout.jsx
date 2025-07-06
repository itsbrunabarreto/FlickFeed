import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useLogin } from '../context/ContextProvider'
import './DefaultLayout.css' 

export default function DefaultLayout({children}) {
  const navigate = useNavigate()
  const { token, _setUser, _setToken, user } = useLogin()

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (e) => {
    e.preventDefault()
    axiosClient.post('/logout', user.email)
      .then(() => {
        _setUser({})
        _setToken(null)
        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/user/index">Usuário</Link>
        <Link to="/movie/index">Movies</Link>
        <Link to="/serie/index">Séries</Link>
        <Link to="/list/index">Listas</Link>
      </aside>
      <div className='content'>
        <header>
          <div className='header'>
            Sistema de Avaliação de Filmes e Séries
          </div>
          <div>
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className='btn-logout' href="#">Logout</a>
          </div>
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}
