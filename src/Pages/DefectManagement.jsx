import { useContext, useState, useEffect } from 'react'

import { PlusIcon } from '../components/Icon'
import Button from '../components/Button'
import AdminHeader from '../layouts/components/AdminHeader'
import CreateDefectModal from '../components/Defect/CreateDefectModal'
import QuestionFilter from '../components/QuestionFilter'
import DefectTable from '../components/Defect/DefectTable'
import { AppContext } from '../Context/AppProvider'

function DefectManagement() {
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
                item.type === 'defect' &&
                item.id.includes(filters.id) &&
                item.question.includes(filters.question) &&
                item.topic.includes(filters.topic)
        )
        setDataRender(data)
    }, [examples, filters.id, filters.question, filters.topic, filters.level])

    return (
        <div className='flex flex-col h-screen overflow-hidden'>
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
                <CreateDefectModal isOpen={showModal} onClose={() => setShowModal(false)} />
                <div className='grid grid-cols-12 gap-16'>
                    <div className='relative col-span-12 shadow-xl'>
                        <DefectTable data={dataRender} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DefectManagement
