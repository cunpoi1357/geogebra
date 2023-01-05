import React, { useState } from 'react'
import propsTypes from 'prop-types'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Navbar from './components/Navbar'
import Header from './components/Header'
import CreateTestYourSelfModal from '../components/TestYourSelf/CreateTestYourSelfModal'

function WithoutFooter() {
    const [isCreateTestShow, setCreateTestShow] = useState(false)
    const [expandedMenu, setExpandedMenu] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setExpandedMenu(false)
        setCreateTestShow(false)
    }, [location])

    return (
        <div className='flex flex-col bg-[#cce2ff] md:p-4 md:pb-0 h-screen'>
            <Header onToggle={() => setExpandedMenu(!expandedMenu)} expandedMenu={expandedMenu} />
            <main
                className={`flex w-full ${
                    expandedMenu ? 'bg-transparent' : 'bg-white'
                } md:bg-white  h-[calc(100vh-80px)]`}
            >
                <Navbar
                    expandedMenu={expandedMenu}
                    onOpenMenu={() => setExpandedMenu(true)}
                    className={`h-screen flex-col lg:flex lg:mx-0 ${
                        expandedMenu ? 'mx-4' : 'mx-0'
                    } bg-[#0060a7] overflow-auto ${expandedMenu ? 'w-full lg:w-auto' : 'w-0 lg:w-auto'}`}
                    onOpenCreateTestModal={() => setCreateTestShow(true)}
                />
                <section
                    className={`relative flex-1 h-[calc(100vh-80px)] overflow-auto lg:overflow-hidden bg lg:pl-4 pt-4 lg:block ${
                        expandedMenu ? 'hidden' : ''
                    }`}
                >
                    <Outlet />
                </section>
            </main>
            <CreateTestYourSelfModal isOpen={isCreateTestShow} onClose={() => setCreateTestShow(false)} />
        </div>
    )
}

WithoutFooter.propsType = {
    children: propsTypes.node.isRequired
}

export default WithoutFooter
