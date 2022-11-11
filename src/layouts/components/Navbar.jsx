import { get, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { database } from '../../firebase'

import NavParent from './NavParent'

function Navbar() {
    const [data, setData] = useState([])
    useEffect(() => {
        get(ref(database, 'structure')).then(snapshot => setData(JSON.parse(snapshot.val())))
    }, [])
    return (
        <aside className='w-80 h-[100vh] md:flex flex-col bg-neutrals-02 hidden'>
            <div className='flex items-center justify-center h-20 text-4xl border-b'>
                <Link to='/'>Logo</Link>
            </div>
            <div className='flex-1 overflow-auto'>
                {data.map(item => (
                    <NavParent key={item.name} {...item} />
                ))}
            </div>
        </aside>
    )
}

export default Navbar
