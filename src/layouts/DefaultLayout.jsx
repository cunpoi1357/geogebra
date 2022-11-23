import React, { useState } from 'react'
import propsTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import ReactModal from 'react-modal'

import Navbar from './components/Navbar'
import Header from './components/Header'
import { MenuIcon, XIcon } from '../components/Icon'
import GetRandomQuestionButton from '../components/GetRandomQuestionButton'

function DefaultLayout({ children }) {
    const [isOpen, setIsOpen] = useState(true)
    const location = useLocation()

    useEffect(() => setIsOpen(false), [location])

    return (
        <div className='flex flex-col '>
            <Header />
            <div className='grid w-[100vw] grid-cols-12'>
                <main className='flex-1 bg h-[100vh] overflow-hidden lg:col-span-9 col-span-12 relative'>
                    {children}
                </main>
                <Navbar className='lg:col-span-3 h-[100vh] flex flex-col bg-white' />
            </div>
            <button
                className='absolute z-10 w-10 h-10 p-3 transition-colors bg-white border border-gray-600 rounded-full left-6 bottom-10 lg:hidden hover:opacity-50'
                onClick={() => setIsOpen(true)}
            >
                <MenuIcon />
            </button>

            <GetRandomQuestionButton className='absolute z-10 w-10 h-10 p-2 bg-white border border-gray-600 rounded-full right-6 bottom-10 hover:opacity-50' />

            <ReactModal
                appElement={document.getElementById('app')}
                ariaHideApp={false}
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                shouldCloseOnOverlayClick
                style={{
                    content: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: '400px',
                        padding: 0
                    },
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,.2)',
                        zIndex: 1000
                    }
                }}
            >
                <Navbar className='h-[100vh] w-full flex flex-col bg-white' />
                <button className='absolute right-2 top-2' onClick={() => setIsOpen(false)}>
                    <XIcon />
                </button>
            </ReactModal>
        </div>
    )
}

DefaultLayout.propsType = {
    children: propsTypes.node.isRequired
}

export default DefaultLayout
