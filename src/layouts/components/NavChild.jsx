import React from 'react'
import { NavLink } from 'react-router-dom'

function NavChild({ data, className }) {
    return (
        <NavLink
            to={`/list/${data.path}`}
            className={({ isActive }) => `menu-item ${className} ${isActive && 'font-bold'}`}
        >
            {data.name}
        </NavLink>
    )
}

export default NavChild
