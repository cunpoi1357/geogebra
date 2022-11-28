import React from 'react'
import { EditIcon, EyeIcon, TrashIcon } from './Icon'

function QuestionItem({ data, index }) {
    return (
        <tr className='bg-[#fcfcfd] border-b border-[#f0f2f5] text-[#344767]'>
            <td className='px-6 py-4'>{index + 1}</td>
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
            <td className='px-6 py-4'>{data.answer}</td>
            <td className='flex items-center gap-3 px-6 py-4'>
                <label title='Xem'>
                    <EyeIcon className='cursor-pointer' />
                </label>
                <label title='Sửa'>
                    <EditIcon className='cursor-pointer' />
                </label>
                <label title='Xóa'>
                    <TrashIcon className='cursor-pointer' />
                </label>
            </td>
        </tr>
    )
}

export default QuestionItem
