import { useEffect, useMemo, useState } from 'react'
import toArray from 'lodash/toArray'

import Button from '../components/Button'
import { PlusIcon, SearchIcon } from '../components/Icon'
import AdminHeader from '../layouts/components/AdminHeader'
import { onValue, ref } from 'firebase/database'
import { database } from '../firebase'
import CreateQuestionModal from '../components/Question/CreateQuestionModal'
import QuestionTable from '../components/Question/QuestionTable'
import { useForm } from 'react-hook-form'
import Input from '../components/Input'
import SelectTopic from '../components/SelectTopic'
import Select from '../components/Select'

function QuestionManagement() {
    const [questions, setQuestions] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [filters, setFilters] = useState({
        id: '',
        question: '',
        topic: '',
        level: ''
    })
    const [statistics, setStatistics] = useState({
        'Nhận biết': 0,
        'Thông hiểu': 0,
        'Vận dụng thấp': 0,
        'Vận dụng cao': 0,
        'Tất cả': 0
    })
    // Filter
    const { control, handleSubmit, reset, watch } = useForm()
    const onSubmit = handleSubmit(data => {
        setFilters(data)
        reset()
    })

    useEffect(() => {
        onValue(ref(database, 'questions'), snapshot => {
            setQuestions(toArray(snapshot.val()).filter(item => !!item))
        })
    }, [])

    useEffect(() => {
        watch(data => {
            const questionsFiltered = questions.filter(item => item.topic.includes(data.topic))
            setStatistics({
                'Nhận biết': questionsFiltered.filter(item => item.level === 'Nhận biết').length,
                'Thông hiểu': questionsFiltered.filter(item => item.level === 'Thông hiểu').length,
                'Vận dụng thấp': questionsFiltered.filter(item => item.level === 'Vận dụng thấp').length,
                'Vận dụng cao': questionsFiltered.filter(item => item.level === 'Vận dụng cao').length,
                'Tất cả': questionsFiltered.length
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const questionMemo = useMemo(
        () =>
            questions.filter(
                item =>
                    item.id.includes(filters.id) &&
                    item.question.includes(filters.question) &&
                    item.topic.includes(filters.topic) &&
                    item.level.includes(filters.level)
            ),
        [questions, filters.id, filters.question, filters.topic, filters.level]
    )

    return (
        <div className='h-[100vh] flex flex-col overflow-hidden'>
            <AdminHeader>Ngân hàng đề</AdminHeader>
            <section className='p-16 h-[calc(100vh-128px)] overflow-auto'>
                <div className='grid grid-cols-12 gap-8 mb-8'>
                    <form className='grid grid-cols-12 col-span-10 gap-4' onSubmit={onSubmit}>
                        <Input className='col-span-2' control={control} name='id' type='text' placeholder='ID' />
                        <Input
                            className='col-span-4'
                            control={control}
                            name='question'
                            type='text'
                            placeholder='Đề bài'
                        />
                        <SelectTopic className='col-span-2' name='topic' control={control} placeholder='Chuyên đề' />
                        <Select
                            className='col-span-2'
                            name='level'
                            placeholder='Mức độ'
                            control={control}
                            options={['Nhận biết', 'Thông hiểu', 'Vận dụng thấp', 'Vận dụng cao']}
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
                    <CreateQuestionModal isOpen={showModal} onClose={() => setShowModal(false)} />
                </div>
                <div className='flex items-center gap-4 mb-6'>
                    <span className='text-lg underline'>Thống kê: </span>
                    <div className={`bg-blue-200 p-2 rounded-lg border border-blue-400 mr-1 h-9 flex items-center`}>
                        Nhận biết:
                        <span className='ml-1 font-bold'>{statistics['Nhận biết']} câu.</span>
                    </div>
                    <div className={`bg-green-200 p-2 rounded-lg border border-green-400 h-9 flex items-center`}>
                        Thông hiểu:
                        <span className='ml-1 font-bold'>{statistics['Thông hiểu']} câu.</span>
                    </div>
                    <div className={`bg-orange-200 p-2 rounded-lg border border-orange-400 mr-1 h-9 flex items-center`}>
                        Vận dụng thấp:
                        <span className='ml-1 font-bold'>{statistics['Vận dụng thấp']} câu.</span>
                    </div>
                    <div className={`bg-red-200 p-2 rounded-lg border border-red-400 mr-1  h-9 flex items-center`}>
                        Vận dụng cao:
                        <span className='ml-1 font-bold'>{statistics['Vận dụng cao']} câu.</span>
                    </div>
                    <div
                        className={`bg-yellow-200 p-2 rounded-lg border border-yellow-400 mr-1  h-9 flex items-center`}
                    >
                        Tổng cộng:
                        <span className='ml-1 font-bold'>{statistics['Tất cả']} câu.</span>
                    </div>
                </div>
                <div className='shadow-xl'>
                    <QuestionTable data={questionMemo} />
                </div>
            </section>
        </div>
    )
}

export default QuestionManagement
