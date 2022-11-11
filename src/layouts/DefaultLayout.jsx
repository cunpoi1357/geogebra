import React from 'react'
import propsTypes from 'prop-types'
import Navbar from './components/Navbar'

function DefaultLayout({ children }) {
    return (
        <div className='flex'>
            <Navbar />
            <main className='flex-1 bg'>{children}</main>
        </div>
    )
}

DefaultLayout.propsType = {
    children: propsTypes.node.isRequired
}

export default DefaultLayout
