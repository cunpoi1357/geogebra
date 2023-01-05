import { useState } from 'react'
import { toast } from 'react-toastify'

import { removeDatabase } from '../../firebase/services'
import DefectItem from './DefectItem'
import YesNoModal from '../YesNoModal'

function DefectTable({ data }) {
    const [showYesNoModal, setShowYesNoModal] = useState(false)
    const [removeID, setRemoveID] = useState(null)

    const handleRemove = id => {
        removeDatabase(`examples/${id}`)
            .then(() => toast.success('Xóa thành công'))
            .catch(error => toast.error(error.message))
        setShowYesNoModal(false)
    }
    return (
        <table className='w-full text-sm text-left border border-[#a3a3a3]'>
            <thead className='text-xs text-[#a3a6b8] uppercase bg-[#fcfcfd] border border-[#a3a3a3]'>
                <tr>
                    <th scope='col' className='px-6 py-3'>
                        STT
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Chủ đề
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Câu hỏi
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Hành động
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 &&
                    data.map((item, index) => (
                        <DefectItem
                            key={item.id}
                            index={index + 1}
                            data={item}
                            onRemove={() => {
                                setShowYesNoModal(true)
                                setRemoveID(item.id)
                            }}
                        />
                    ))}
            </tbody>
            <YesNoModal
                title='Cảnh báo! bạn đang xóa một câu hỏi.'
                isOpen={showYesNoModal}
                onClose={() => setShowYesNoModal(false)}
                onSubmit={() => handleRemove(removeID)}
            />
        </table>
    )
}

export default DefectTable
