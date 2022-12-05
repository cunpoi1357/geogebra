import { ref, remove } from 'firebase/database'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useState } from 'react'

import ImageItem from './ImageItem'
import YesNoModal from '../YesNoModal'
import { database, storage } from '../../firebase'
import { toast } from 'react-toastify'

function ImageTable({ data }) {
    const [showYesNoModal, setShowYesNoModal] = useState(false)
    const [imageRemove, setImageRemove] = useState(null)

    const handleRemove = image => {
        const imagesRef = storageRef(storage, image.image)
        deleteObject(imagesRef)
        remove(ref(database, 'images/' + image.id))
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
                    <th scope='col' className='w-2/12 px-6 py-3'>
                        Tên
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Hành động
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <ImageItem
                        key={item.id}
                        index={index}
                        data={item}
                        onRemove={() => {
                            setShowYesNoModal(true)
                            setImageRemove(item)
                        }}
                    />
                ))}
            </tbody>
            <YesNoModal
                title='Cảnh báo! bạn đang xóa một hình ảnh.'
                isOpen={showYesNoModal}
                onClose={() => setShowYesNoModal(false)}
                onSubmit={() => handleRemove(imageRemove)}
            />
        </table>
    )
}

export default ImageTable
