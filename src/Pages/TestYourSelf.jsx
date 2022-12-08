import React from 'react'
import { useLocation } from 'react-router-dom'
import TestYourSelfNavBar from '../components/TestYourSelf/TestYourSelfNavBar'
import useCreateTest from '../hooks/useCreateTest'

function TestYourSelf() {
    const location = useLocation()
    const questions = useCreateTest(location.state)
    console.log(questions)
    return (
        <div className='grid h-full grid-cols-12 gap-4'>
            <div className='col-span-9 overflow-auto bg-red-300'>
                <div className='h-[2000px]'></div>
            </div>
            <TestYourSelfNavBar />
        </div>
    )
}

export default TestYourSelf
