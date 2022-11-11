import React from 'react'
import propsTypes from 'prop-types'
import AdminNavBar from './components/AdminNavBar'
import AdminHeader from './components/AdminHeader'

import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

function AdminLayout({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, user => (user ? setUser(user) : setUser(null)))
    }, [user])

    return (
        <div className='flex bg-[#f4f5f6]'>
            <AdminNavBar />
            <main className='flex flex-col flex-1'>
                {user ? (
                    children
                ) : (
                    <>
                        <AdminHeader>Trang quản lí</AdminHeader>
                        <p className='p-10'>Vui lòng đăng nhập tài khoản!</p>
                    </>
                )}
            </main>
        </div>
    )
}

AdminLayout.propsType = {
    children: propsTypes.node.isRequired
}

export default AdminLayout
