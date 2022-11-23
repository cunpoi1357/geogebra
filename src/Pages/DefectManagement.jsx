import { get, onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toArray from 'lodash/toArray'

import { database } from '../firebase'
import { PlusIcon, SearchIcon } from '../components/Icon'
import Button from '../components/Button'
import Input from '../components/Input'
import SelectTree from '../components/SelectTree'
import AdminHeader from '../layouts/components/AdminHeader'
import DefectTable from '../components/DefectTable'
import DefectCreateModal from '../components/DefectCreateModal'

function DefectManagement() {
    const [examples, setExamples] = useState([])
    const [showModal, setShowModal] = useState(false)
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

    useEffect(() => {
        onValue(ref(database, 'examples'), snapshot => {
            setExamples(toArray(snapshot.val()).filter(item => !!item))
        })
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
                        <Button className='col-span-2 bg-[#247dea]' type='submit' icon={<SearchIcon />}>
                            Tìm kiếm
                        </Button>
                    </form>
                    <Button
                        className='col-span-2 bg-[#247dea]'
                        type='submit'
                        icon={<PlusIcon />}
                        onClick={() => setShowModal(true)}
                    >
                        Tạo
                    </Button>
                </div>
                <DefectCreateModal isOpen={showModal} onClose={() => setShowModal(false)} />
                <div className='grid grid-cols-12 gap-16'>
                    <div className='relative col-span-12 shadow-xl'>
                        <DefectTable
                            data={examples.filter(
                                item =>
                                    item.type === 'defect' &&
                                    item.id.includes(filters.id) &&
                                    item.question.includes(filters.question) &&
                                    item.topic.includes(filters.topic)
                            )}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DefectManagement
