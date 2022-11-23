import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sample from 'lodash/sample'
import toArray from 'lodash/toArray'
import { get, ref } from 'firebase/database'

import { ShuffleIcon } from './Icon'
import { database } from '../firebase'
import { toast } from 'react-toastify'

function GetRandomQuestionButton({ className }) {
    const [examples, setExamples] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        get(ref(database, 'examples')).then(snapshot => {
            setExamples(toArray(snapshot.val()).filter(item => !!item))
        })
    }, [])

    const handleClick = () => {
        const question = sample(examples)
        navigate(`/question/${question.id}`)
        toast.success('Lấy câu hỏi ngẫu nhiên thành công')
    }
    return (
        <button className={className} onClick={handleClick}>
            <ShuffleIcon />
        </button>
    )
}

export default GetRandomQuestionButton
