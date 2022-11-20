import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminNavItem({ name, path, icon }) {
    return (
        <NavLink
            className={({ isActive }) =>
                `text-white py-4 px-[10px] mx-4 my-[2px] flex items-center rounded-lg ${
                    isActive ? 'bg-[#2e88ec]' : 'hover:bg-[#636369]'
                }`
            }
            to={path}
        >
            {icon}
            <span className='ml-4'>{name}</span>
        </NavLink>
    )
}

export default AdminNavItem
