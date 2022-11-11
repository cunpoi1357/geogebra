import React from 'react'
import { Link } from 'react-router-dom'

function NavChild({ data }) {
    return (
        <Link to={`/list/${data.path}`} className='menu-item'>
            {data.name}
        </Link>
    )
}

export default NavChild
