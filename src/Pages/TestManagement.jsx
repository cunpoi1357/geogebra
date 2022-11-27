import React from 'react'

import AdminHeader from '../layouts/components/AdminHeader'

function TestManagement() {
    return (
        <div className='h-[100vh] flex flex-col overflow-hidden'>
            <AdminHeader>Quản lí menu</AdminHeader>
            <section className='p-16 overflow-auto'></section>
        </div>
    )
}

export default TestManagement
