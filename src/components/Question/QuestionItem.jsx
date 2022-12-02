import React, { useState } from 'react'
import { EditIcon, EyeIcon, TrashIcon } from '../Icon'
import EditQuestionModal from './EditQuestionModal'

function QuestionItem({ data, index, onRemove }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <tr className='bg-[#fcfcfd] border-b border-[#f0f2f5] text-[#344767]'>
            <td className='px-6 py-4'>{index}</td>
            <td className='px-6 py-4'>{JSON.parse(data.topic).name}</td>
            <td className='px-6 py-4'>
                {(() => {
                    switch (data.level) {
                        case 'Thông hiểu':
                            return (
                                <span className={`bg-green-200 p-2 rounded-lg border border-green-400`}>
                                    {data.level}
                                </span>
                            )
                        case 'Nhận biết':
                            return (
                                <span className={`bg-blue-200 p-2 rounded-lg border border-blue-400`}>
                                    {data.level}
                                </span>
                            )
                        case 'Vận dụng thấp':
                            return (
                                <span className={`bg-orange-200 p-2 rounded-lg border border-orange-400`}>
                                    {data.level}
                                </span>
                            )
                        case 'Vận dụng cao':
                            return (
                                <span className={`bg-red-200 p-2 rounded-lg border border-red-400`}>{data.level}</span>
                            )
                        default:
                            break
                    }
                })()}
            </td>
            <td className='px-6 py-4'>{data.question}</td>
            <td className='px-6 py-4'>{data[data.answerKey]}</td>
            <td className='flex items-center gap-3 px-6 py-4'>
                <label title='Xem'>
                    <EyeIcon className='cursor-pointer' />
                </label>
                <label title='Sửa' onClick={() => setShowModal(true)}>
                    <EditIcon className='cursor-pointer' />
                </label>
                <label title='Xóa' onClick={onRemove}>
                    <TrashIcon className='cursor-pointer' />
                </label>
            </td>
            <EditQuestionModal onClose={() => setShowModal(false)} isOpen={showModal} id={data.id} />
        </tr>
    )
}

export default QuestionItem
