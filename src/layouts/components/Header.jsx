import React from 'react'
import { Link } from 'react-router-dom'
import images from '../../assets/images'
import { MenuIcon } from '../../components/Icon'
import Image from '../../components/Image'

function Header({ expandedMenu, onToggle }) {
    return (
        <header className='flex h-16 m-4 mb-0 overflow-hidden md:m-0 rounded-tl-3xl rounded-tr-3xl'>
            <button className='flex items-center justify-center w-16 h-16 bg-[#0060a7]' onClick={onToggle}>
                <MenuIcon className={`w-8 h-8 text-white ${expandedMenu && 'text-[#8da6e5]'}`} />
            </button>
            <Link
                to='/'
                className='flex-1 flex items-center w-full h-full px-8 py-4 md:text-xl text-sm font-bold bg-white border border-b-[#cdd5d8]'
            >
                <Image className='inline-block h-6 mr-3' src={images.icon} alt='logo' />
                <h2 className='inline-block text-xl font-bold text-[#0060a7] truncate'>
                    StudyGeo3D.com{' '}
                    <span className='hidden lg:inline-block'>- Website hỗ trợ học hình học không gian</span>
                </h2>
            </Link>
        </header>
    )
}

export default Header
