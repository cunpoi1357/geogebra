import React from 'react'
import { useLocation } from 'react-router-dom'

function TestYourSelf() {
    const location = useLocation()
    console.log(location.state)
    return <div>TestYourSelf</div>
}

export default TestYourSelf
