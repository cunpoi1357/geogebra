import { ref, remove } from 'firebase/database'
import { useState } from 'react'
import { toast } from 'react-toastify'
import orderBy from 'lodash/orderBy'
import toArray from 'lodash/toArray'

import { database } from '../../firebase'
import MultipleChoiceItem from './MultipleChoiceItem'
import YesNoModal from '../YesNoModal'

function MultipleChoiceTable({ data = [] }) {
    const [showYesNoModal, setShowYesNoModal] = useState(false)
    const [removeID, setRemoveID] = useState(null)

    const handleRemove = id => {
        remove(ref(database, 'examples/' + id))
            .then(() => toast.success('Xóa thành công'))
            .catch(error => toast.error(error.message))
        setShowYesNoModal(false)
    }

    const sortFn = item => Number(toArray(item.question.match(/^Câu (\d+)\./))[1])

    return (
        <table className='w-full text-sm text-left border border-[#a3a3a3]'>
            <thead className='text-xs text-[#a3a6b8] uppercase bg-[#fcfcfd] border  border-[#a3a3a3]'>
                <tr>
                    <th scope='col' className='px-6 py-3'>
                        STT
                    </th>
                    <th scope='col' className='w-2/12 px-6 py-3'>
                        Chủ đề
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Đề bài
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Đáp án
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Lời giải
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Hành động
                    </th>
                </tr>
            </thead>
            <tbody>
                {orderBy(data, ['topic', sortFn], ['esc', 'esc']).map((item, index) => (
                    <MultipleChoiceItem
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

export default MultipleChoiceTable
