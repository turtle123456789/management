import React from 'react'
import HeaderComponent from '../components/headerComponent'
import { Outlet } from 'react-router-dom'

const DefaultPage = () => {
  return (
    <div>
        <HeaderComponent/>
        <Outlet/>
    </div>
  )
}

export default DefaultPage