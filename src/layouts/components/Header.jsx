import React from 'react'
import { Link } from 'react-router-dom'
import images from '../../assets/images'
import Image from '../../components/Image'

function Header() {
    return (
        <header className='w-full h-12 py-4 px-8 flex text-white text-sm font-bold bg-[#29303b]'>
            <Link to='/'>
                <Image className='inline-block h-6 mr-3' src={images.icon} alt='logo' />
                <h2 className='inline-block font-bold text-white'>
                    StudyGeo3D.com - Website hỗ trợ học hình học không gian
                </h2>
            </Link>
        </header>
    )
}

export default Header
