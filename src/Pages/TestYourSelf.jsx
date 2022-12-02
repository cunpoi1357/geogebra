import React from 'react'
import { useLocation } from 'react-router-dom'
import useCreateTest from '../hooks/useCreateTest'

function TestYourSelf() {
    const location = useLocation()
    const questions = useCreateTest(location.state)
    console.log(questions)
    return <div>TestYourSelf</div>
}

export default TestYourSelf
