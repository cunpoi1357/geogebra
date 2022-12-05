import React from 'react'
import { toast } from 'react-toastify'
import { CopyIcon, EyeIcon, TrashIcon } from '../Icon'

function ImageItem({ index, data, onRemove }) {
    const handleCopy = () => {
        window.navigator.clipboard.writeText(data.image)
        toast.success('Sao chép liên kết thành công')
    }
    return (
        <tr className='bg-[#fcfcfd] border-b border-[#f0f2f5] text-[#344767]'>
            <td className='px-6 py-4'>{index + 1}</td>
            <td className='px-6 py-4'>{JSON.parse(data.topic).name}</td>
            <td className='px-6 py-4'>{data.name}</td>
            <td className='flex items-center gap-3 px-6 py-4'>
                <label title='Sao chép liên kết' onClick={handleCopy}>
                    <CopyIcon className='w-6 h-6 cursor-pointer hover:text-[#247dea] transition-colors' />
                </label>
                <label title='Xem'>
                    <a href={`/question/`} target='_blank' rel='noopener noreferrer'>
                        <EyeIcon className='cursor-pointer hover:text-[#247dea] transition-colors' />
                    </a>
                </label>
                <label title='Xóa' onClick={onRemove}>
                    <TrashIcon className='cursor-pointer hover:text-[#247dea] transition-colors' />
                </label>
            </td>
        </tr>
    )
}

export default ImageItem
