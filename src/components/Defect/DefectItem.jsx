import { ref, remove } from 'firebase/database'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { database } from '../../firebase'
import { EditIcon, EyeIcon, TrashIcon } from '../Icon'
import EditDefectModal from './EditDefectModal'

function DefectItem({ data, index }) {
    const [showModal, setShowModal] = useState(false)

    const handleRemove = () => {
        remove(ref(database, 'examples/' + data.id))
            .then(() => toast.success('Xóa thành công'))
            .catch(error => toast.error(error.message))
    }
    return (
        <tr className='bg-[#fcfcfd] border-b border-[#f0f2f5] text-[#344767]'>
            <td className='px-6 py-4'>{index}</td>
            <td className='px-6 py-4'>{JSON.parse(data.topic).name}</td>
            <td className='px-6 py-4'>{data.question}</td>
            <td className='flex items-center gap-3 px-6 py-4'>
                <label title='Xem'>
                    <a href={`/question/${data.id}`} target='_blank' rel='noopener noreferrer'>
                        <EyeIcon className='cursor-pointer hover:text-[#247dea] transition-colors' />
                    </a>
                </label>
                <label title='Sửa' onClick={() => setShowModal(true)}>
                    <EditIcon className='cursor-pointer hover:text-[#247dea] transition-colors' />
                </label>
                <label title='Xóa' onClick={handleRemove}>
                    <TrashIcon className='cursor-pointer hover:text-[#247dea] transition-colors' />
                </label>
                <EditDefectModal isOpen={showModal} onClose={() => setShowModal(false)} id={data.id} />
            </td>
        </tr>
    )
}

export default DefectItem
