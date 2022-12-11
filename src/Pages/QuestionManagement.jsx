import { useEffect, useMemo, useState } from 'react'
import toArray from 'lodash/toArray'

import Button from '../components/Button'
import { PlusIcon } from '../components/Icon'
import AdminHeader from '../layouts/components/AdminHeader'
import { onValue, ref } from 'firebase/database'
import QuestionFilter from '../components/QuestionFilter'
import { database } from '../firebase'
import CreateQuestionModal from '../components/Question/CreateQuestionModal'
import QuestionTable from '../components/Question/QuestionTable'

function QuestionManagement() {
    const [questions, setQuestions] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [filters, setFilters] = useState({
        id: '',
        question: '',
        topic: ''
    })

    useEffect(() => {
        onValue(ref(database, 'questions'), snapshot => {
            setQuestions(toArray(snapshot.val()).filter(item => !!item))
        })
    }, [])

    const questionMemo = useMemo(
        () =>
            questions.filter(
                item =>
                    item.id.includes(filters.id) &&
                    item.question.includes(filters.question) &&
                    item.topic.includes(filters.topic)
            ),
        [questions, filters.id, filters.question, filters.topic]
    )

    return (
        <div className='h-[100vh] flex flex-col overflow-hidden'>
            <AdminHeader>Ngân hàng đề</AdminHeader>
            <section className='p-16 h-[calc(100vh-128px)] overflow-auto'>
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
                    <CreateQuestionModal isOpen={showModal} onClose={() => setShowModal(false)} />
                </div>
                <div className='shadow-xl'>
                    <QuestionTable data={questionMemo} />
                </div>
            </section>
        </div>
    )
}

export default QuestionManagement
