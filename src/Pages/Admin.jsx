import { get, ref } from 'firebase/database'
import { useEffect } from 'react'
import { useState } from 'react'
import toArray from 'lodash/toArray'

import { database } from '../firebase'
import AdminHeader from '../layouts/components/AdminHeader'
import SelectNoControl from '../components/SelectNoControl'
import InputNoControl from '../components/InputNoControl'

function Admin() {
    const [data, setData] = useState([])
    const [formData, setFormData] = useState([
        {
            topic: '',
            level: '',
            amount: 1
        }
    ])

    useEffect(() => {
        const fetchData = async () => {
            const structureSnapshot = await get(ref(database, 'structure'))
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

            const questionsSnapshot = await get(ref(database, 'questions'))
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
                        levels: levels
                    }
                })
                .filter(item => item.amount > 0)
                .forEach(
                    item =>
                        (result[item.topic] = {
                            amount: item.amount,
                            levels: item.levels
                        })
                )

            setData(result)
        }
        fetchData()
    }, [])

    const handleChange = (index, e) => {
        const newState = [...formData]
        newState[index][e.target.name] = e.target.value
        if (e.target.name === 'amount') {
            newState[index]['amount'] = Number(e.target.value)
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

    const handleSubmit = () => {
        console.log(formData)
    }

    return (
        <section>
            <AdminHeader>Trang quản lí</AdminHeader>
            <div className='p-4'>
                <h3>Tạo đề tự luyện</h3>
                <div className='w-[800px] grid gap-4'>
                    {formData.map((item, index) => {
                        return (
                            <div key={index} className='grid grid-cols-8 gap-4'>
                                <SelectNoControl
                                    className='col-span-3'
                                    name='topic'
                                    value={item.topic}
                                    options={Object.keys(data)}
                                    placeholder='Chuyên đề'
                                    label='Chuyên đề'
                                    onChange={e => handleChange(index, e)}
                                />
                                <SelectNoControl
                                    className='col-span-2'
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
                                    className='col-span-2'
                                    type='number'
                                    name='amount'
                                    min={1}
                                    max={data[item.topic]?.levels[item.level]?.length || data[item.topic]?.amount}
                                    value={item.amount}
                                    onChange={e => handleChange(index, e)}
                                    label='Số câu hỏi'
                                />
                                <button className='col-span-1' onClick={() => handleRemove(index)}>
                                    x
                                </button>
                            </div>
                        )
                    })}

                    <button onClick={handleAdd}>Thêm</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </section>
    )
}

export default Admin
