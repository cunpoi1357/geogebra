import React from 'react'
import { Link } from 'react-router-dom'
import { BookIcon, CheckBoxIcon, CreateIcon } from '../../components/Icon'
import AdminNavItem from './AdminNavItem'

function AdminNavBar() {
    const MENU_LIST = [
        {
            name: 'Câu hỏi trắc nghiệm',
            path: '/admin/multipleChoice',
            icon: <CheckBoxIcon className='w-5 h-5 text-white' />
        },
        {
            name: 'Câu hỏi điền khuyết',
            path: '/admin/defect',
            icon: <CreateIcon className='w-5 h-5 text-white' />
        },
        {
            name: 'Quản lí lý thuyết',
            path: '/admin/theory',
            icon: <BookIcon className='w-5 h-5 text-white' />
        }
    ]

    return (
        <aside className='flex flex-col h-[calc(100vh - 32px)] m-4 w-[250px] admin-bar-bg rounded-xl'>
            <div className='flex items-center justify-center h-20 text-xl border-b'>
                <Link className='text-white' to='/admin'>
                    Admin page
                </Link>
            </div>
            <div className='flex-1 mt-4 overflow-auto'>
                {MENU_LIST.map(item => (
                    <AdminNavItem key={item.name} {...item} />
                ))}
            </div>
        </aside>
    )
}

export default AdminNavBar
