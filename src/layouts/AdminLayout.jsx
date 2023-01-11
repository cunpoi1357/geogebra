import { Suspense, useContext } from 'react'
import propsTypes from 'prop-types'
import AdminNavBar from './components/AdminNavBar'
import AdminHeader from './components/AdminHeader'
import { Outlet } from 'react-router-dom'

import { AuthContext } from '../Context/AuthProvider'
import Loading from '../components/Loading'

function AdminLayout() {
    const { user } = useContext(AuthContext)

    return (
        <div className='flex bg-[#f4f5f6] h-screen'>
            <AdminNavBar />
            <main className='flex flex-col flex-1'>
                {user?.role?.admin ? (
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                ) : (
                    <>
                        <AdminHeader>Trang quản lí</AdminHeader>
                        <p className='p-10'>
                            Vui lòng đăng nhập tài khoản quản trị!
                        </p>
                    </>
                )}
            </main>
        </div>
    )
}

AdminLayout.propsType = {
    children: propsTypes.node.isRequired,
}

export default AdminLayout
