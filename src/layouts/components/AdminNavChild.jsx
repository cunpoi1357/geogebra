import React from 'react'
import { Link } from 'react-router-dom'

function AdminNavChild({ data }) {
    return (
        <Link to={data.path} className='text-white menu-item'>
            {data.name}
        </Link>
    )
}

export default AdminNavChild
