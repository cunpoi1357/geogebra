import { useEffect, useState } from 'react'
import toArray from 'lodash/toArray'
import filter from 'lodash/filter'
import sampleSize from 'lodash/sampleSize'
import { get, ref } from 'firebase/database'

import { database } from '../firebase'

function useCreateTest(patten) {
    const [data, setData] = useState([])

    useEffect(() => {
        get(ref(database, 'questions')).then(snapshot => {
            setData(toArray(snapshot.val()).filter(item => !!item && JSON.parse(item.topic)))
        })
    }, [])

    const result = []
    patten.forEach(item =>
        result.push(
            ...sampleSize(
                filter(data, {
                    topic: item.topic,
                    level: item.level
                }).map(question => question.id),
                item.amount
            )
        )
    )
    console.log(result)

    return result
}

export default useCreateTest
