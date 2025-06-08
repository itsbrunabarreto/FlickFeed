import React from 'react'
import {Route, Routes} from 'react-router-dom';
import UserFormList from '../views/user/UserFormList';
import UserFormStore from '../views/user/UserFormStore';
import UserFormShow from '../views/user/UserFormShow';
import UserFormDestroy from '../views/user/UserFormDestroy';
import UserFormUpdate from '../views/user/UserFormUpdate';

import MovieFormList from '../views/movie/MovieFormList';
import MovieFormStore from '../views/movie/MovieFormStore';
import MovieFormShow from '../views/movie/MovieFormShow';
import MovieFormUpdate from '../views/movie/MovieFormUpdate';
import MovieFormDelete from '../views/movie/MovieFormDelete';

import SerieFormList from '../views/serie/SerieFormList';
import SerieFormStore from '../views/serie/SerieFormStore';
import SerieFormShow from '../views/serie/SerieFormShow';
import SerieFormUpdate from '../views/serie/SerieFormUpdate';
import SerieFormDelete from '../views/serie/SerieFormDelete';

import EpisodeFormShow from '../views/episode/EpisodeFormShow';
import EpisodeSeasonList from '../views/episode/EpisodeSeasonList';

import NotFound from '../views/NotFound';
import Login from '../views/login/Login';
import Signup from '../views/login/Signup';
import UpdatePassword from '../views/login/UpdatePassword';
import ForgotPassword from '../views/login/ForgotPassword';

const Rotas = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/updatepassword' element={<UpdatePassword/>}/>
        
        <Route path='movie/index' element={<MovieFormList/>} />
        <Route path='movie/store' element={<MovieFormStore/>} />
        <Route path='movie/show/:id' element={<MovieFormShow/>} />
        <Route path='movie/update/:id' element={<MovieFormUpdate/>} />
        <Route path='movie/destroy/:id' element={<MovieFormDelete/>} />

        <Route path='serie/index' element={<SerieFormList/>} />
        <Route path='serie/store' element={<SerieFormStore/>} />
        <Route path='serie/show/:id' element={<SerieFormShow/>} />
        <Route path='serie/update/:id' element={<SerieFormUpdate/>} />
        <Route path='serie/destroy/:id' element={<SerieFormDelete/>} />

        <Route path='episode/show/:id' element={<EpisodeFormShow/>} />
        <Route path="serie/:serieId/season/:season" element={<EpisodeSeasonList />} />

        <Route path='user/index' element={<UserFormList/>} />
        <Route path='user/store' element={<UserFormStore/>} />
        <Route path='user/show/:id' element={<UserFormShow />} />
        <Route path='user/destroy/:id' element={<UserFormDestroy/>} />
        <Route path='user/update/:id' element={<UserFormUpdate/>} />

        <Route path = "*" element={<NotFound/>}/>
    </Routes>
)
}

export default Rotas