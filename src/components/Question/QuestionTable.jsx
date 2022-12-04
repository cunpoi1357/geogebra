import { ref, remove } from 'firebase/database'
import { useState } from 'react'
import { toast } from 'react-toastify'
import orderBy from 'lodash/orderBy'

import { database } from '../../firebase'
import QuestionItem from './QuestionItem'
import YesNoModal from '../YesNoModal'

function QuestionTable({ data }) {
    const [showYesNoModal, setShowYesNoModal] = useState(false)
    const [removeID, setRemoveID] = useState(null)

    const handleRemove = id => {
        remove(ref(database, 'questions/' + id))
            .then(() => toast.success('Xóa thành công'))
            .catch(error => toast.error(error.message))
        setShowYesNoModal(false)
    }
    return (
        <table className='w-full text-sm text-left border border-[#a3a3a3]'>
            <thead className='text-xs text-[#a3a6b8] uppercase bg-[#fcfcfd] border  border-[#a3a3a3]'>
                <tr>
                    <th scope='col' className='px-6 py-3'>
                        STT
                    </th>
                    <th scope='col' className='w-2/12 px-6 py-3'>
                        Chuyên đề
                    </th>
                    <th scope='col' className='px-6 py-3 w-[150px]'>
                        Cấp độ
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Đề bài
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Đáp án
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Hành động
                    </th>
                </tr>
            </thead>
            <tbody>
                {orderBy(data, ['topic', 'question'], ['esc', 'esc']).map((item, index) => (
                    <QuestionItem
                        key={item.id}
                        data={item}
                        index={index + 1}
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

export default QuestionTable
