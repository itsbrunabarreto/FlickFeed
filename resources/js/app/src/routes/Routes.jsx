import React from 'react'
 import { Routes, Route } from 'react-router-dom'
 import UserFormList from '../views/user/UserFormList'
 import UserFormStore from '../views/user/UserFormStore'
 import UserFormUpdate from '../views/user/UserFormUpdate'
 import UserFormShow from '../views/user/UserFormShow'
 import UserFormDestroy from '../views/user/UserFormDestroy'
 
 const Rotas = () => {
   return (
     <Routes>
         <Route path='user/index' element={<UserFormList/>} />
         <Route path='user/store' element={<UserFormStore/>} />
         <Route path='user/show/:id' element={<UserFormShow />} />
         <Route path='user/destroy/:id' element={<UserFormDestroy/>} />
         <Route path='user/update/:id' element={<UserFormUpdate/>} />
     </Routes>
   )
 }
 
 export default Rotas