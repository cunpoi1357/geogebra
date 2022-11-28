import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import toArray from 'lodash/toArray'

import { database } from '../firebase'
import { PlusIcon } from '../components/Icon'
import Button from '../components/Button'
import AdminHeader from '../layouts/components/AdminHeader'
import DefectTable from '../components/DefectTable'
import DefectCreateModal from '../components/DefectCreateModal'
import QuestionFilter from '../components/QuestionFilter'

function DefectManagement() {
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
        <div className='h-[100vh] flex flex-col overflow-hidden'>
            <AdminHeader>Quản lí câu hỏi điền khuyết</AdminHeader>
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
