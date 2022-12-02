import { useEffect, useState } from 'react'
import toArray from 'lodash/toArray'
import filter from 'lodash/filter'
import sampleSize from 'lodash/sampleSize'
import { get, ref } from 'firebase/database'

import { database } from '../firebase'

function useCreateTest(patten) {
    const [questions, setQuestions] = useState([])
    const data = []

    useEffect(() => {
        get(ref(database, 'questions')).then(snapshot => {
            setQuestions(toArray(snapshot.val()).filter(item => !!item && JSON.parse(item.topic)))
        })
    }, [])

    patten.forEach(item =>
        data.push(
            ...sampleSize(
                filter(questions, {
                    topic: item.topic,
                    level: item.level
                }).map(question => question.id),
                item.amount
            )
        )
    )

    return data
}

export default useCreateTest
