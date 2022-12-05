import React, { useState } from 'react'
import Latex from 'react-latex'

import EditMultipleChoiceModal from './EditMultipleChoiceModal'
import { EditIcon, EyeIcon, TrashIcon } from '../Icon'

function MultipleChoiceItem({ data, index, onRemove }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <tr className='bg-[#fcfcfd] border-b border-[#f0f2f5] text-[#344767]'>
            {data && (
                <>
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>{index}</td>
                    <td className='px-6 py-4'>{JSON.parse(data.topic).name}</td>
                    <td className='px-6 py-4'>
                        <Latex>{data.question}</Latex>
                    </td>
                    <td className='px-6 py-4'>
                        <Latex>{data[data.answerKey]}</Latex>
                    </td>
                    <td className='px-6 py-4'>
                        <Latex>{data.answer}</Latex>
                    </td>
                    <td className='flex items-center gap-3 px-6 py-4'>
                        <label title='Xem'>
                            <a href={`/question/${data.id}`} target='_blank' rel='noopener noreferrer'>
                                <EyeIcon className='cursor-pointer hover:text-[#247dea] transition-colors' />
                            </a>
                        </label>
                        <label title='Sửa' onClick={() => setShowModal(true)}>
                            <EditIcon className='cursor-pointer hover:text-[#247dea] transition-colors' />
                        </label>
                        <label title='Xóa' onClick={onRemove}>
                            <TrashIcon className='cursor-pointer hover:text-[#247dea] transition-colors' />
                        </label>
                    </td>
                    <EditMultipleChoiceModal onClose={() => setShowModal(false)} isOpen={showModal} id={data.id} />
                </>
            )}
        </tr>
    )
}

export default MultipleChoiceItem
