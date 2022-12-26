import { useEffect, useState } from 'react'

import { AppContext } from '../Context/AppProvider'
import Button from '../components/Button'
import AdminHeader from '../layouts/components/AdminHeader'
import QuestionFilter from '../components/QuestionFilter'
import { PlusIcon } from '../components/Icon'
import CreateMultipleChoiceModal from '../components/MultipleChoice/CreateMultipleChoiceModal'
import MultipleChoiceTable from '../components/MultipleChoice/MultipleChoiceTable'
import { useContext } from 'react'

function MultipleChoiceManagement() {
    const { examples } = useContext(AppContext)
    const [dataRender, setDataRender] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [filters, setFilters] = useState({
        id: '',
        question: '',
        topic: ''
    })

    useEffect(() => {
        const data = examples.filter(
            item =>
                item.type === 'multiple-choice' &&
                item.id.includes(filters.id) &&
                item.question.includes(filters.question) &&
                item.topic.includes(filters.topic)
        )
        setDataRender(data)
    }, [examples, filters.id, filters.question, filters.topic, filters.level])

    return (
        <section className='flex flex-col h-screen overflow-hidden'>
            <AdminHeader>Quản lí câu hỏi trắc nghiệm</AdminHeader>
            <div className='p-16 h-[calc(100vh-128px)] overflow-auto'>
                <div className='grid grid-cols-12 gap-8 mb-8'>
                    <QuestionFilter onChange={setFilters} />
                    <Button
                        className='col-span-2 bg-[#247dea]'
                        type='submit'
                        icon={<PlusIcon />}
                        onClick={() => setShowModal(true)}
                    >
                        Tạo
                    </Button>
                </div>
                <CreateMultipleChoiceModal isOpen={showModal} onClose={() => setShowModal(false)} />

                <div className='shadow-xl'>
                    <MultipleChoiceTable data={dataRender} />
                </div>
            </div>
        </section>
    )
}

export default MultipleChoiceManagement
