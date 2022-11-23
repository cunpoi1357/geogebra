import React, { useState } from 'react'
import NavChild from './NavChild'

function NavParent({ name, children, className }) {
    const [expanded, setExpanded] = useState(false)
    return (
        <>
            <span
                className={`menu-item ${expanded && 'underline'} border border-b-[#dedfe0] ${className}`}
                onClick={() => setExpanded(!expanded)}
            >
                {name}
            </span>
            {expanded && (
                <ul className='pl-6 bg-white'>
                    {children &&
                        children.map(item => (
                            <li key={item.name}>
                                {item.children ? (
                                    <NavParent className='border-none hover:underline hover:bg-white' {...item} />
                                ) : (
                                    <NavChild className='hover:underline hover:bg-white' data={item} />
                                )}
                            </li>
                        ))}
                </ul>
            )}
        </>
    )
}

export default NavParent
