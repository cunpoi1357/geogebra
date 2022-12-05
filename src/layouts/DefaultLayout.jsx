import React, { useState } from 'react'
import propsTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { get, ref } from 'firebase/database'

import Navbar from './components/Navbar'
import Header from './components/Header'
import CreateTestYourSelfModal from '../components/CreateTestYourSelfModal'
import { database } from '../firebase'

function DefaultLayout({ children }) {
    const [isCreateTestShow, setCreateTestShow] = useState(false)
    const [expandedMenu, setExpandedMenu] = useState(false)
    const location = useLocation()

    const [data, setData] = useState([])
    useEffect(() => {
        get(ref(database, 'structure')).then(snapshot => setData(JSON.parse(snapshot.val())))
    }, [])

    useEffect(() => {
        setExpandedMenu(false)
        setCreateTestShow(false)
    }, [location])

    return (
        <div className='flex flex-col bg-[#cce2ff] md:p-4'>
            <Header onToggle={() => setExpandedMenu(!expandedMenu)} expandedMenu={expandedMenu} />
            <div className={`flex w-full ${expandedMenu ? 'bg-transparent' : 'bg-white'} md:bg-white`}>
                <Navbar
                    data={data}
                    expandedMenu={expandedMenu}
                    onOpenMenu={() => setExpandedMenu(true)}
                    className={`h-[100vh] flex-col lg:flex lg:mx-0 ${
                        expandedMenu ? 'mx-4' : 'mx-0'
                    } bg-[#0060a7] overflow-auto ${expandedMenu ? 'w-full lg:w-auto' : 'w-0 lg:w-auto'}`}
                    onOpenCreateTestModal={() => setCreateTestShow(true)}
                />
                <main
                    className={`relative flex-1 h-[100vh] overflow-auto bg lg:pl-4 pt-4 lg:block ${
                        expandedMenu ? 'hidden' : ''
                    }`}
                >
                    {children}
                </main>
            </div>
            {/* <GetRandomQuestionButton className='absolute z-10 w-10 h-10 p-2 bg-white border border-gray-600 rounded-full right-6 bottom-10 hover:opacity-50' /> */}
            <CreateTestYourSelfModal isOpen={isCreateTestShow} onClose={() => setCreateTestShow(false)} />
        </div>
    )
}

DefaultLayout.propsType = {
    children: propsTypes.node.isRequired
}

export default DefaultLayout
