import { get, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { database } from '../firebase'
import { PlusIcon, SearchIcon } from '../components/Icon'
import Button from '../components/Button'
import Input from '../components/Input'
import SelectTree from '../components/SelectTree'
import AdminHeader from '../layouts/components/AdminHeader'

function DefectManagement() {
    const [filters, setFilters] = useState({
        id: '',
        question: '',
        topic: ''
    })
    const [topics, setTopics] = useState([])

    const { control, handleSubmit, reset } = useForm()

    useEffect(() => {
        get(ref(database, 'structure')).then(snapshot => setTopics(JSON.parse(snapshot.val())))
    }, [])

    const onSubmit = handleSubmit(data => {
        setFilters(data)
        reset()
    })

    return (
        <div className='h-[100vh] flex flex-col overflow-hidden'>
            <AdminHeader>Quản lí câu hỏi điền khuyết</AdminHeader>
            <section className='p-16 overflow-auto'>
                <div className='grid grid-cols-12 gap-8 mb-8'>
                    <form className='grid grid-cols-12 col-span-10 gap-4' onSubmit={onSubmit} action=''>
                        <Input className='col-span-2' control={control} name='id' type='text' placeholder='ID' />
                        <Input
                            className='col-span-6'
                            control={control}
                            name='question'
                            type='text'
                            placeholder='Đề bài'
                        />
                        <SelectTree
                            className='col-span-2'
                            name='topic'
                            control={control}
                            options={topics}
                            placeholder='Loại'
                        />
                        <Button className='col-span-2 bg-[#2c3a57]' type='submit' icon={<SearchIcon />}>
                            Tìm kiếm
                        </Button>
                    </form>
                    <Button className='col-span-2 bg-[#2c3a57]' type='submit' icon={<PlusIcon />}>
                        Tạo
                    </Button>
                </div>
                <div className='grid grid-cols-12 gap-16'>
                    <div className='relative col-span-12'>
                        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        STT
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Chủ đề
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Đề bài
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DefectManagement
