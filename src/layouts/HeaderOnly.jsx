import propsTypes from 'prop-types'

import Header from './components/Header'

function HeaderOnly({ children }) {
    return (
        <div className='flex flex-col h-[100vh]'>
            <Header />
            <main className='relative flex-1 h-full col-span-12 overflow-auto bg lg:col-span-9'>{children}</main>
        </div>
    )
}

HeaderOnly.propsType = {
    children: propsTypes.node.isRequired
}

export default HeaderOnly
