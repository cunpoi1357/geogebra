import { ref, remove } from 'firebase/database'
import React, { useState } from 'react'
import Latex from 'react-latex'
import { toast } from 'react-toastify'

import { database } from '../firebase'
import MultipleChoiceEditModal from './MultipleChoiceEditModal'
import { EditIcon, EyeIcon, TrashIcon } from './Icon'

function MultipleChoiceItem({ data, index }) {
    const [showModal, setShowModal] = useState(false)

    const handleRemove = () => {
        remove(ref(database, 'examples/' + data.id))
            .then(() => toast.success('Xóa thành công'))
            .catch(error => toast.error(error.message))
    }

    return (
        <tr className='bg-[#fcfcfd] border-b border-[#f0f2f5] text-[#344767]'>
            {data && (
                <>
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>{index}</td>
                    <td className='px-6 py-4'>{JSON.parse(data.topic).name}</td>
                    <td className='px-6 py-4'>{data.geogebraId}</td>
                    <td className='px-6 py-4'>
                        <Latex>{data.question}</Latex>
                    </td>
                    {['A', 'B', 'C', 'D'].map(letter => (
                        <td key={letter} className={`py-4 px-6 ${data.answerKey === letter && 'text-[#2e83eb]'}`}>
                            <Latex>{data[letter]}</Latex>
                        </td>
                    ))}
                    <td className='px-6 py-4'>
                        <Latex>{data.answer}</Latex>
                    </td>
                    <td className='flex items-center gap-3 px-6 py-4'>
                        <label title='Xem'>
                            <a href={`/question/${data.id}`} target='_blank' rel='noopener noreferrer'>
                                <EyeIcon className='cursor-pointer' />
                            </a>
                        </label>
                        <label title='Sửa' onClick={() => setShowModal(true)}>
                            <EditIcon className='cursor-pointer' />
                        </label>
                        <label title='Xóa' onClick={handleRemove}>
                            <TrashIcon className='cursor-pointer' />
                        </label>
                    </td>
                    <MultipleChoiceEditModal onClose={() => setShowModal(false)} isOpen={showModal} data={data} />
                </>
            )}
        </tr>
    )
}

export default MultipleChoiceItem
