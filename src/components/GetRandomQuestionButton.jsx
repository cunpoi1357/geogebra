import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sample from 'lodash/sample'
import toArray from 'lodash/toArray'

import { ShuffleIcon } from './Icon'
import { getDatabase } from '../firebase/services'

function GetRandomQuestionButton({ className }) {
    const [examples, setExamples] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getDatabase('examples').then(snapshot => {
            setExamples(toArray(snapshot.val()).filter(item => !!item))
        })
    }, [])

    const handleClick = () => {
        const question = sample(examples)
        navigate(`/example/${question.id}`)
    }
    return (
        <button className={className} onClick={handleClick}>
            <ShuffleIcon />
        </button>
    )
}

export default GetRandomQuestionButton
