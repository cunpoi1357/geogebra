import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sample from 'lodash/sample'
import toArray from 'lodash/toArray'
import { get, ref } from 'firebase/database'

import { ShuffleIcon } from './Icon'
import { database } from '../firebase'
import { toast } from 'react-toastify'

function GetRandomQuestionButton() {
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
        <button
            className='absolute z-10 w-10 h-10 p-2 bg-white border border-gray-600 rounded-full right-6 bottom-[87px] hover:opacity-50'
            onClick={handleClick}
        >
            <ShuffleIcon />
        </button>
    )
}

export default GetRandomQuestionButton
