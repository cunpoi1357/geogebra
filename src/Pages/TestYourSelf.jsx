import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import toArray from 'lodash/toArray'
import shuffle from 'lodash/shuffle'

import { getDatabase } from '../firebase/services'
import TestYourSelfNavBar from '../components/TestYourSelf/TestYourSelfNavBar'
import TestYourSelfQuestion from '../components/TestYourSelf/TestYourSelfQuestion'
import Footer from '../layouts/components/Footer'
import { Helmet } from 'react-helmet-async'

function TestYourSelf() {
    const location = useLocation()
    const [question, setQuestion] = useState([])
    const [answer, setAnswer] = useState([])
    const [isAnswered, setIsAnswered] = useState(false)
    const contentRef = useRef(null)
    const answerKeys = question.map(item => item.answerKey)

    useEffect(() => {
        const patten = location.state
        const fetchData = async () => {
            const snapshot = await getDatabase('questions')
            const val = await snapshot.val()
            const questions = toArray(val).filter(item => !!item && JSON.parse(item.topic))

            const result = questions.filter(item => patten.includes(item.id))
            setQuestion(shuffle(result))
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
        let correct = 0
        answerKeys.forEach((key, index) => {
            if (key === answer[index]) {
                correct += 1
            }
        })
        setIsAnswered(true)
        toast.success(`Bạn đã chọn đúng ${correct}/${answerKeys.length}`)
    }

    return (
        <>
            <Helmet>
                <title>StudyGeo3D.com - Đề tự luyện</title>
            </Helmet>
            <div className='flex flex-col grid-cols-4 gap-4 lg:grid'>
                <div ref={contentRef} className='flex-1 overflow-auto lg:col-span-3 h-[calc(100vh-100px)]'>
                    {question &&
                        question.map((item, index) => (
                            <TestYourSelfQuestion
                                key={item.id}
                                index={index}
                                answerKey={answerKeys[index]}
                                data={item}
                                choose={answer[index]}
                                onChoose={handleChoose}
                                isAnswered={isAnswered}
                            />
                        ))}
                    <TestYourSelfNavBar
                        className='block mt-4 lg:hidden h-28'
                        data={answer}
                        answer={answerKeys}
                        isAnswered={isAnswered}
                        onClick={handleScrollToQuestion}
                        onSubmit={handleSubmit}
                    />
                    <Footer />
                </div>
                <TestYourSelfNavBar
                    className='hidden lg:col-span-1 lg:block'
                    data={answer}
                    answer={answerKeys}
                    isAnswered={isAnswered}
                    onClick={handleScrollToQuestion}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    )
}

export default TestYourSelf
