import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import toArray from 'lodash/toArray'

import { database } from '../firebase'
import Button from '../components/Button'
import AdminHeader from '../layouts/components/AdminHeader'
import MultipleChoiceTable from '../components/MultipleChoiceTable'
import MultipleChoiceCreateModal from '../components/MultipleChoiceCreateModal'
import QuestionFilter from '../components/QuestionFilter'
import { PlusIcon } from '../components/Icon'

function MultipleChoiceManagement() {
    const [examples, setExamples] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [filters, setFilters] = useState({
        id: '',
        question: '',
        topic: ''
    })

    useEffect(() => {
        onValue(ref(database, 'examples'), snapshot => {
            setExamples(toArray(snapshot.val()).filter(item => !!item))
        })
    }, [])

    return (
        <section className='h-[100vh] flex flex-col overflow-hidden'>
            <AdminHeader>Quản lí câu hỏi trắc nghiệm</AdminHeader>
            <div className='p-16 overflow-auto'>
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
            </div>
        </section>
    )
}

export default MultipleChoiceManagement
