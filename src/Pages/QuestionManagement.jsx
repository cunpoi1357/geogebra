import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import { PlusIcon } from '../components/Icon'
import QuestionCreateModal from '../components/QuestionCreateModal'
import QuestionFilter from '../components/QuestionFilter'
import toArray from 'lodash/toArray'

import AdminHeader from '../layouts/components/AdminHeader'
import { onValue, ref } from 'firebase/database'
import { database } from '../firebase'
import QuestionTable from '../components/QuestionTable'

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

    return (
        <div className='h-[100vh] flex flex-col overflow-hidden'>
            <AdminHeader>Ngân hàng đề</AdminHeader>
            <section className='p-16 overflow-auto'>
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
                    <QuestionCreateModal isOpen={showModal} onClose={() => setShowModal(false)} />
                </div>
                <div className='shadow-xl'>
                    <QuestionTable data={questions} />
                </div>
            </section>
        </div>
    )
}

export default QuestionManagement
