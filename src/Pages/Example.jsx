import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import DefectQuestion from '../components/Defect/DefectQuestion'
import MultipleChoiceQuestion from '../components/MultipleChoice/MultipleChoiceQuestion'
import { getDatabase } from '../firebase/services'

function Example() {
    const { id } = useParams()

    const [data, setData] = useState()

    useEffect(() => {
        getDatabase(`examples/${id}`)
            .then(snapshot => {
                if (snapshot.exists()) {
                    setData(snapshot.val())
                } else {
                    console.log('No data available')
                }
            })
            .catch(error => {
                console.error(error)
            })
    }, [id])

    return (
        <>
            <Helmet>
                {data?.topic && (
                    <title>
                        {JSON.parse(data.topic).name} - Ví dụ {data.question.split(/^Câu (\d+)\./)[1] || ''}
                    </title>
                )}
            </Helmet>
            {data?.type === 'multiple-choice' ? (
                <MultipleChoiceQuestion data={data} />
            ) : (
                data?.type === 'defect' && <DefectQuestion data={data} />
            )}
        </>
    )
}

export default Example
