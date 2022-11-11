import React, { useState } from 'react'
import NavChild from './NavChild'

function NavParent({ name, children }) {
    const [expanded, setExpanded] = useState(false)
    return (
        <>
            <span className={`menu-item ${expanded && 'font-bold underline'}`} onClick={() => setExpanded(!expanded)}>
                {name}
            </span>
            {expanded && (
                <ul className='ml-6'>
                    {children &&
                        children.map(item => (
                            <li key={item.name}>
                                {item.children ? <NavParent {...item} /> : <NavChild data={item} />}
                            </li>
                        ))}
                </ul>
            )}
        </>
    )
}

export default NavParent
