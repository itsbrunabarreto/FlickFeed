import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
       <DefaultLayout>
         <Outlet/>
       </DefaultLayout>
    </div>
  )
}

export default Layout


