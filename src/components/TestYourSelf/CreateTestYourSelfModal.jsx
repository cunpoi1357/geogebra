import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import toArray from 'lodash/toArray'
import sampleSize from 'lodash/sampleSize'

import { getDatabase } from '../../firebase/services'
import { PlusIcon, XIcon } from '../Icon'
import Button from '../Button'
import Modal from '../Modal'
import SelectNoControl from '../SelectNoControl'
import InputNoControl from '../InputNoControl'

function CreateTestYourSelfModal({ isOpen, onClose }) {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [formData, setFormData] = useState([
        {
            topic: '',
            level: '',
            amount: 1
        }
    ])

    useEffect(() => {
        const fetchData = async () => {
            const structureSnapshot = await getDatabase('structure')
            const structureVal = await structureSnapshot.val()
            const structureData = JSON.parse(structureVal)
            const structure = []
            structureData.map(
                parent =>
                    parent.children &&
                    parent.children.map(child =>
                        child.children
                            ? child.children.map(item =>
                                  structure.push({
                                      path: item.path,
                                      name: item.name
                                  })
                              )
                            : structure.push({
                                  path: child.path,
                                  name: child.name
                              })
                    )
            )

            const questionsSnapshot = await getDatabase('questions')
            const questionVal = await questionsSnapshot.val()
            const questions = toArray(questionVal).filter(item => !!item)

            const result = {}
            structure
                .map(topic => {
                    const questionsFiltered = questions.filter(
                        question => JSON.parse(question.topic).path === topic.path
                    )

                    const levels = {}
                    questionsFiltered.forEach(question => {
                        if (levels[question.level]) {
                            levels[question.level].push(question.id)
                        } else {
                            levels[question.level] = [question.id]
                        }
                    })

                    return {
                        topic: topic.name,
                        amount: questionsFiltered.length,
                        levels: levels,
                        questions: questionsFiltered.map(question => question.id)
                    }
                })
                .filter(item => item.amount > 0)
                .forEach(
                    item =>
                        (result[item.topic] = {
                            amount: item.amount,
                            levels: item.levels,
                            questions: item.questions
                        })
                )

            setData(result)
            setTotal(questions.length)
        }
        fetchData()
    }, [])

    const handleChange = (index, e) => {
        const newState = [...formData]
        newState[index][e.target.name] = e.target.value
        if (e.target.name === 'amount') {
            newState[index]['amount'] = e.target.value
        }

        if (e.target.name === 'topic') {
            newState[index]['level'] = ''
        }
        if (e.target.name !== 'amount') {
            newState[index]['amount'] = 1
        }

        setFormData(newState)
    }

    const handleAdd = () => {
        setFormData(prevState => [
            ...prevState,
            {
                topic: '',
                level: '',
                amount: 1
            }
        ])
    }

    const handleRemove = index => {
        setFormData(prevState => {
            const newState = [...prevState]
            newState.splice(index, 1)
            return newState
        })
    }

    const onSubmit = () => {
        const formFiltered = formData.filter(item => item.topic)
        const questions = []
        // get question id by form data
        formFiltered.forEach(item => {
            if (item.level) {
                questions.push(...sampleSize(data[item.topic].levels[item.level], item.amount))
            } else {
                questions.push(...sampleSize(data[item.topic].questions, item.amount))
            }
        })

        if (questions.length > 0) {
            navigate('/test-your-self', {
                state: questions
            })
            onClose()
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,.6)',
                    zIndex: 1000
                }
            }}
            onRequestClose={onClose}
        >
            <div className='bg-neutrals-01 lg:md-0 m-6  p-6 max-h-[80vh] lg:w-1/2 w-full rounded overflow-auto shadow-2xl'>
                <div className='flex flex-col w-full align-center'>
                    <header className='flex items-center w-full'>
                        <span className='inline-block w-1 h-4 mr-3 rounded bg-primary-blue' />
                        <p className='flex-1 inline-block font-bold text-neutrals-07'>Tạo đề tự luyện</p>
                        <XIcon className='inline-block cursor-pointer text-neutrals-04' onClick={onClose} />
                    </header>
                    <hr className='bg-neutrals-03 w-full h-[1px] my-6'></hr>
                </div>
                <div className='grid gap-4'>
                    {formData.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className='grid grid-cols-8 gap-4 pb-4 border border-transparent border-b-1 border-b-neutrals-04'
                            >
                                <SelectNoControl
                                    className='col-span-8 lg:col-span-3'
                                    name='topic'
                                    value={item.topic}
                                    options={Object.keys(data)}
                                    placeholder='Chuyên đề'
                                    label='Chuyên đề'
                                    onChange={e => handleChange(index, e)}
                                />
                                <SelectNoControl
                                    className='col-span-4 lg:col-span-2'
                                    name='level'
                                    value={item.level}
                                    options={
                                        (item.topic &&
                                            ['Nhận biết', 'Thông hiểu', 'Vận dụng thấp', 'Vận dụng cao']
                                                .map(level =>
                                                    Object.keys(data[item.topic].levels).includes(level) ? level : null
                                                )
                                                .filter(item => !!item)) ||
                                        []
                                    }
                                    placeholder='Mức độ'
                                    label='Mức độ'
                                    onChange={e => handleChange(index, e)}
                                />
                                <InputNoControl
                                    className='col-span-4 lg:col-span-2'
                                    type='number'
                                    inputmode='decimal'
                                    name='amount'
                                    min={1}
                                    max={
                                        data[item.topic]?.levels[item.level]?.length ||
                                        data[item.topic]?.amount ||
                                        total
                                    }
                                    value={item.amount}
                                    onChange={e => handleChange(index, e)}
                                    label={`Số câu hỏi (hiện có ${
                                        data[item.topic]?.levels[item.level]?.length ||
                                        data[item.topic]?.amount ||
                                        total
                                    })`}
                                />
                                {index !== 0 && (
                                    <button
                                        className='flex items-center justify-center w-full col-span-1'
                                        onClick={() => handleRemove(index)}
                                    >
                                        <XIcon className='w-6 h-6 text-neutrals-04 hover:text-neutrals-06' />
                                    </button>
                                )}
                            </div>
                        )
                    })}
                    <button
                        className='flex items-center justify-between p-4 text-xl text-primary-blue w-46 place-self-end hover:underline'
                        type='button'
                        onClick={handleAdd}
                    >
                        <PlusIcon />
                        Thêm chuyên đề
                    </button>

                    <Button onClick={onSubmit} className='text-white bg-primary-blue'>
                        Tạo
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default CreateTestYourSelfModal
