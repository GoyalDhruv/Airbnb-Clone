import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import React from 'react'

function Layout() {
    return (
        <>
            <Header />
            <div className='py-4 px-8'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout