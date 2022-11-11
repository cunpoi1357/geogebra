import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminNavChild from './AdminNavChild'

function AdminNavParent({ name, children, path }) {
    const [expanded, setExpanded] = useState(false)
    return (
        <>
            {children?.length > 0 ? (
                <>
                    <span
                        className={`menu-item text-white ${expanded && 'font-bold underline'}`}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {name}
                    </span>
                    {expanded && (
                        <ul className='ml-6'>
                            {children &&
                                children.map(item => (
                                    <li key={item.name}>
                                        {item.children ? <AdminNavParent {...item} /> : <AdminNavChild data={item} />}
                                    </li>
                                ))}
                        </ul>
                    )}
                </>
            ) : (
                <Link className='text-white menu-item' to={path}>
                    {' '}
                    {name}
                </Link>
            )}
        </>
    )
}

export default AdminNavParent
