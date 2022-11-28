import { get, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { database } from '../firebase'
import Button from './Button'
import { SearchIcon } from './Icon'
import Input from './Input'
import SelectTree from './SelectTree'

function QuestionFilter({ onChange }) {
    const { control, handleSubmit, reset } = useForm()
    const [topics, setTopics] = useState([])

    useEffect(() => {
        get(ref(database, 'structure')).then(snapshot => setTopics(JSON.parse(snapshot.val())))
    }, [])

    const onSubmit = handleSubmit(data => {
        onChange(data)
        reset()
    })
    return (
        <form className='grid grid-cols-12 col-span-10 gap-4' onSubmit={onSubmit}>
            <Input className='col-span-2' control={control} name='id' type='text' placeholder='ID' />
            <Input className='col-span-6' control={control} name='question' type='text' placeholder='Đề bài' />
            <SelectTree
                className='col-span-2'
                name='topic'
                control={control}
                options={topics}
                placeholder='Chuyên đề'
            />
            <Button className='col-span-2 bg-[#247dea]' type='submit' icon={<SearchIcon />}>
                Tìm kiếm
            </Button>
        </form>
    )
}

export default QuestionFilter
