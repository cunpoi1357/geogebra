import { memo } from 'react'
import { useState } from 'react'
import Latex from 'react-latex'
import isEqual from 'lodash/isEqual'

import { EditIcon, EyeIcon, TrashIcon } from '../Icon'
import Markdown from '../Markdown'
import EditQuestionModal from './EditQuestionModal'
import PreviewQuestionModal from './PreviewQuestionModal'

function QuestionItem({ data, index, onRemove }) {
    const [showEditModal, setShowEditModal] = useState(false)
    const [showPreviewModal, setShowPreviewModal] = useState(false)

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
            <td className='px-6 py-4'>
                <Markdown className='w-[400px]'>{data.question}</Markdown>
            </td>
            <td className='px-6 py-4'>
                <Latex>{data[data.answerKey]}</Latex>
            </td>
            <td className='flex items-center gap-3 px-6 py-4'>
                <label title='Xem' onClick={() => setShowPreviewModal(true)}>
                    <EyeIcon className='cursor-pointer hover:text-[#247dea] transition-colors' />
                </label>
                <label title='Sửa' onClick={() => setShowEditModal(true)}>
                    <EditIcon className='cursor-pointer hover:text-[#247dea] transition-colors' />
                </label>
                <label title='Xóa' onClick={onRemove}>
                    <TrashIcon className='cursor-pointer hover:text-[#247dea] transition-colors' />
                </label>
            </td>
            <EditQuestionModal onClose={() => setShowEditModal(false)} isOpen={showEditModal} id={data.id} />
            <PreviewQuestionModal onClose={() => setShowPreviewModal(false)} isOpen={showPreviewModal} data={data} />
        </tr>
    )
}

export default memo(QuestionItem, (prevState, nextState) => isEqual(prevState.data, nextState.data))
