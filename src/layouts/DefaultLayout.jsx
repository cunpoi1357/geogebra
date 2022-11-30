import React, { useState } from 'react'
import propsTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import ReactModal from 'react-modal'
import { get, ref } from 'firebase/database'

import Navbar from './components/Navbar'
import Header from './components/Header'
import { MenuIcon, XIcon } from '../components/Icon'
import GetRandomQuestionButton from '../components/GetRandomQuestionButton'
import CreateTestYourSelfModal from '../components/CreateTestYourSelfModal'
import { database } from '../firebase'

function DefaultLayout({ children }) {
    const [isNavShow, setIsNavShow] = useState(false)
    const [isCreateTestShow, setCreateTestShow] = useState(false)
    const location = useLocation()

    const [data, setData] = useState([])
    useEffect(() => {
        get(ref(database, 'structure')).then(snapshot => setData(JSON.parse(snapshot.val())))
    }, [])

    useEffect(() => setIsNavShow(false), [location])
    const handleOpenCreateTestModal = () => {
        setIsNavShow(false)
        setCreateTestShow(true)
    }

    return (
        <div className='flex flex-col '>
            <Header />
            <div className='grid w-[100vw] grid-cols-12'>
                <Navbar
                    data={data}
                    className='lg:col-span-3 h-[100vh] hidden lg:flex flex-col bg-white'
                    onOpenCreateTestModal={() => setCreateTestShow(true)}
                />
                <main className='relative flex-1 h-[100vh] col-span-12 overflow-auto bg lg:col-span-9'>{children}</main>
            </div>

            <button
                className='absolute z-10 w-10 h-10 p-3 transition-colors bg-white border border-gray-600 rounded-full left-6 bottom-10 lg:hidden hover:opacity-50'
                onClick={() => setIsNavShow(true)}
            >
                <MenuIcon />
            </button>

            <GetRandomQuestionButton className='absolute z-10 w-10 h-10 p-2 bg-white border border-gray-600 rounded-full right-6 bottom-10 hover:opacity-50' />

            {isNavShow && (
                <ReactModal
                    appElement={document.getElementById('app')}
                    ariaHideApp={false}
                    isOpen={isNavShow}
                    onRequestClose={() => setIsNavShow(false)}
                    shouldCloseOnOverlayClick
                    style={{
                        content: {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            width: '400px',
                            maxWidth: '100%',
                            padding: 0
                        },
                        overlay: {
                            backgroundColor: 'rgba(0,0,0,.2)',
                            zIndex: 1000
                        }
                    }}
                >
                    <Navbar
                        data={data}
                        className='h-[100vh] w-full flex flex-col bg-white'
                        isNavOpen={isNavShow}
                        onCloseNavBar={() => setIsNavShow(false)}
                        onOpenCreateTestModal={handleOpenCreateTestModal}
                    />
                    <button className='absolute right-2 top-2' onClick={() => setIsNavShow(false)}>
                        <XIcon />
                    </button>
                </ReactModal>
            )}
            {isCreateTestShow && (
                <CreateTestYourSelfModal isOpen={isCreateTestShow} onClose={() => setCreateTestShow(false)} />
            )}
        </div>
    )
}

DefaultLayout.propsType = {
    children: propsTypes.node.isRequired
}

export default DefaultLayout
