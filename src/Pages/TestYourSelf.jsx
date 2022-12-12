import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { get, ref } from 'firebase/database'
import toArray from 'lodash/toArray'
import filter from 'lodash/filter'
import sampleSize from 'lodash/sampleSize'

import { database } from '../firebase'
import TestYourSelfNavBar from '../components/TestYourSelf/TestYourSelfNavBar'
import TestYourSelfQuestion from '../components/TestYourSelf/TestYourSelfQuestion'
import { toast } from 'react-toastify'
function TestYourSelf() {
    const location = useLocation()
    const [question, setQuestion] = useState([])
    const [answer, setAnswer] = useState([])
    const [isAnswered, setIsAnswered] = useState(false)
    const contentRef = useRef(null)

    useEffect(() => {
        const patten = location.state
        const fetchData = async () => {
            const snapshot = await get(ref(database, 'questions'))
            const val = await snapshot.val()
            const questions = toArray(val).filter(item => !!item && JSON.parse(item.topic))

            const result = []
            patten.forEach(item =>
                result.push(
                    ...sampleSize(
                        filter(questions, {
                            topic: item.topic,
                            level: item.level
                        }),
                        item.amount
                    )
                )
            )
            setQuestion(result)
            setAnswer(Array(result.length).fill(null))
        }
        fetchData()
    }, [location.state])

    const handleScrollToQuestion = index => {
        const questionScroll = document.getElementById(`question-${index}`).offsetTop
        contentRef.current.scrollTo({ top: questionScroll, behavior: 'smooth' })
    }
    const handleChoose = (index, key) =>
        setAnswer(prev => {
            const question = [...prev]
            question[index] = key
            return question
        })
    const handleSubmit = () => {
        const answerKey = question.map(item => item.answerKey)
        let correct = 0
        answerKey.forEach((key, index) => {
            if (key === answer[index]) {
                correct += 1
            }
        })
        setIsAnswered(true)
        toast.success(`Bạn đã chọn đúng ${correct}/${answerKey.length}`)
    }

    return (
        <div className='grid grid-cols-12 gap-4 h-[calc(100vh-100px)]'>
            <div ref={contentRef} className='col-span-12 overflow-auto lg:col-span-9'>
                {question &&
                    question.map((item, index) => (
                        <TestYourSelfQuestion
                            key={item.id}
                            index={index}
                            data={item}
                            choose={answer[index]}
                            onChoose={handleChoose}
                            isAnswered={isAnswered}
                        />
                    ))}
                {question.length === 0 && (
                    <p>
                        Chuyên đề bạn chọn hiện đang trong gian đoạn cập nhật câu hỏi. Bạn vui lòng chọn chuyên đề khác
                    </p>
                )}
            </div>
            <TestYourSelfNavBar
                className='col-span-12 lg:col-span-3'
                data={answer}
                answer={question.map(item => item.answerKey)}
                isAnswered={isAnswered}
                onClick={handleScrollToQuestion}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default TestYourSelf
