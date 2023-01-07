import React, { useState } from 'react'
import propsTypes from 'prop-types'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import clsx from 'clsx'

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
                className={clsx(
                    'flex w-full md:bg-white  h-[calc(100vh-80px)]',
                    expandedMenu ? 'bg-transparent' : 'bg-white'
                )}
            >
                <Navbar
                    expandedMenu={expandedMenu}
                    onOpenMenu={() => setExpandedMenu(true)}
                    onCloseMenu={() => setExpandedMenu(false)}
                    onOpenCreateTestModal={() => setCreateTestShow(true)}
                />
                <section
                    className={clsx('relative flex-1 h-full overflow-auto bg lg:pl-4 pt-4 lg:block', {
                        hidden: expandedMenu
                    })}
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
