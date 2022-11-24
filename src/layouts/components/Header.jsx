import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className='w-full h-12 py-4 px-8 text-white text-sm font-bold bg-[#29303b]'>
            <Link to='/'>Website hỗ trợ học hình học không gian</Link>
        </header>
    )
}

export default Header
