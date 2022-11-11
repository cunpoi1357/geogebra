import React from 'react'
import { Link } from 'react-router-dom'
import AdminNavParent from './AdminNavParent'

function AdminNavBar() {
    const MENU_LIST = [
        {
            name: 'Quản lí câu hỏi',
            children: [
                {
                    name: 'Trắc nghiệm',
                    path: '/admin/multipleChoice'
                },
                {
                    name: 'Điền khuyết',
                    path: '/admin/defect'
                }
            ]
        },
        {
            name: 'Quản lí lý thuyết',
            path: '/admin/theory'
        }
    ]

    return (
        <aside className='w-80 h-[100vh] flex flex-col bg-secondary-dark-blue'>
            <div className='flex items-center justify-center h-20 text-xl border-b'>
                <Link className='text-white' to='/admin'>
                    Admin page
                </Link>
            </div>
            <div className='flex-1 overflow-auto'>
                {MENU_LIST.map(item => (
                    <AdminNavParent key={item.name} {...item} />
                ))}
            </div>
        </aside>
    )
}

export default AdminNavBar
