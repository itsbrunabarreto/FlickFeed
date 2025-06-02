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

import SerieFormList from '../views/serie/SerieFormList';

const Rotas = () => {
  return (
    <Routes>
        <Route path='movie/index' element={<MovieFormList/>} />
        <Route path='movie/store' element={<MovieFormStore/>} />
        <Route path='movie/show/:id' element={<MovieFormShow/>} />

        <Route path='serie/index' element={<SerieFormList/>} />

        <Route path='user/index' element={<UserFormList/>} />
        <Route path='user/store' element={<UserFormStore/>} />
        <Route path='user/show/:id' element={<UserFormShow />} />
        <Route path='user/destroy/:id' element={<UserFormDestroy/>} />
        <Route path='user/update/:id' element={<UserFormUpdate/>} />
    </Routes>
)
}

export default Rotas