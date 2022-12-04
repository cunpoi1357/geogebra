import React from 'react'
import { NavLink } from 'react-router-dom'
import { PriceTagIcon } from '../../components/Icon'

function NavChild({ data, className, expandedMenu }) {
    return (
        <NavLink
            to={`/list/${data.path}`}
            className={({ isActive }) =>
                `text-[#92a6e2] h-[72px] flex cursor-pointer hover:bg-[#4360b5] hover:text-white transition-colors ease-linear ${className} ${
                    isActive && 'font-bold'
                }`
            }
        >
            <span
                className={`${
                    expandedMenu ? 'h-[72px] w-[72px]' : 'h-[72px] w-16'
                } transition-all ease-linear flex items-center justify-center`}
            >
                <PriceTagIcon className={`h-6 mr-1`} />
            </span>
            <span className={`py-6 pr-6  ease-linear transition-all whitespace-nowrap overflow-hidden`}>
                {data.name}
            </span>
        </NavLink>
    )
}

export default NavChild
