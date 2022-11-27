import { useEffect, useState } from 'react'
import { ref, get, onValue } from 'firebase/database'
import { useForm } from 'react-hook-form'
import toArray from 'lodash/toArray'

import { database } from '../firebase'
import Button from '../components/Button'
import Input from '../components/Input'
import AdminHeader from '../layouts/components/AdminHeader'
import { PlusIcon, SearchIcon } from '../components/Icon'
import MultipleChoiceTable from '../components/MultipleChoiceTable'
import MultipleChoiceCreateModal from '../components/MultipleChoiceCreateModal'
import SelectTree from '../components/SelectTree'

function MultipleChoiceManagement() {
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

    const onSubmit = handleSubmit(data => {
        setFilters(data)
        reset()
    })

    useEffect(() => {
        onValue(ref(database, 'examples'), snapshot => {
            setExamples(toArray(snapshot.val()).filter(item => !!item))
        })
    }, [])

    return (
        <div className='h-[100vh] flex flex-col overflow-hidden'>
            <AdminHeader>Quản lí câu hỏi trắc nghiệm</AdminHeader>
            <section className='p-16 overflow-auto'>
                <div className='grid grid-cols-12 gap-8 mb-8'>
                    <form className='grid grid-cols-12 col-span-10 gap-4' onSubmit={onSubmit}>
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
                            options={topics || []}
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
                <MultipleChoiceCreateModal isOpen={showModal} onClose={() => setShowModal(false)} />

                <div className='shadow-xl'>
                    <MultipleChoiceTable
                        data={examples.filter(
                            item =>
                                item.type === 'multiple-choice' &&
                                item.id.includes(filters.id) &&
                                item.question.includes(filters.question) &&
                                item.topic.includes(filters.topic)
                        )}
                    />
                </div>
            </section>
        </div>
    )
}

export default MultipleChoiceManagement
