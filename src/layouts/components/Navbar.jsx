import { get, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { database } from '../../firebase'

import NavParent from './NavParent'

function Navbar({ className }) {
    const [data, setData] = useState([])
    useEffect(() => {
        get(ref(database, 'structure')).then(snapshot => setData(JSON.parse(snapshot.val())))
    }, [])
    return (
        <aside className={className}>
            <div className='h-10 px-10 text-2xl leading-10 border-b'>Chủ đề</div>
            <div className='flex-1 overflow-auto bg-[#f7f8fa]'>
                {data.map(item => (
                    <NavParent key={item.name} {...item} />
                ))}
            </div>
        </aside>
    )
}

export default Navbar
