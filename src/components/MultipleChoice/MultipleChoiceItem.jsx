import React, { useState } from 'react'
import Latex from 'react-latex'

import EditMultipleChoiceModal from './EditMultipleChoiceModal'
import { CopyIcon, EditIcon, EyeIcon, TrashIcon } from '../Icon'
import Markdown from '../Markdown'
import { memo } from 'react'
import { toast } from 'react-toastify'

function MultipleChoiceItem({ data, index, onRemove }) {
    const [showModal, setShowModal] = useState(false)

    const handleCopy = () => {
        const question = { ...data }
        delete question.id
        const string = JSON.stringify(question)
        window.navigator.clipboard.writeText(string)
        toast.success('Đã sao chép câu hỏi')
    }

    return (
        <tr className='bg-[#fcfcfd] border-b border-[#f0f2f5] text-[#344767] w-[1000px]'>
            {data && (
                <>
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>{index}</td>
                    <td className='px-6 py-4'>{JSON.parse(data.topic).name}</td>
                    <td className='px-6 py-4'>
                        <Markdown className='w-[400px]'>{data.question}</Markdown>
                    </td>
                    <td className='px-6 py-4'>
                        <Latex>{data[data.answerKey]}</Latex>
                    </td>
                    <td className='px-6 py-4'>
                        <Markdown className='w-[400px]'>{data.answer}</Markdown>
                    </td>
                    <td className='flex items-center gap-3 px-6 py-4'>
                        <label title='Xem'>
                            <a href={`/question/${data.id}`} target='_blank' rel='noopener noreferrer'>
                                <EyeIcon className='cursor-pointer hover:text-[#247dea] transition-colors' />
                            </a>
                        </label>
                        <label title='Xem' onClick={handleCopy}>
                            <CopyIcon className='cursor-pointer h-6 w-6 hover:text-[#247dea] transition-colors' />
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

export default memo(MultipleChoiceItem, (prevState, nextState) => prevState.data.id === nextState.data.id)
