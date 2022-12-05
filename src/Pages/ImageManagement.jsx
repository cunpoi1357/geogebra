import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toArray from 'lodash/toArray'

import Button from '../components/Button'
import { CloudUploadIcon, SearchIcon } from '../components/Icon'
import ImageTable from '../components/ImageManagement/ImageTable'
import UploadImageModal from '../components/ImageManagement/UploadImageModal'
import Input from '../components/Input'
import SelectTopic from '../components/SelectTopic'
import { database } from '../firebase'
import AdminHeader from '../layouts/components/AdminHeader'

function ImageManagement() {
    const [showModal, setShowModal] = useState(false)
    const [images, setImages] = useState([])
    const { control, handleSubmit, reset } = useForm()
    const onSubmit = handleSubmit(data => {
        console.log(data)
        reset()
    })
    useEffect(() => {
        onValue(ref(database, 'images'), snapshot => {
            setImages(toArray(snapshot.val()).filter(item => !!item))
        })
    }, [])

    return (
        <div className='h-[100vh] flex flex-col overflow-hidden'>
            <AdminHeader>Quản lí câu hỏi điền khuyết</AdminHeader>

            <section className='p-16 overflow-auto'>
                <div className='grid grid-cols-12 gap-8 mb-8'>
                    <form className='grid grid-cols-12 col-span-10 gap-4' onSubmit={onSubmit}>
                        <Input className='col-span-7' control={control} name='name' type='text' placeholder='Tên ảnh' />
                        <SelectTopic className='col-span-3' name='topic' control={control} placeholder='Chuyên đề' />
                        <Button className='col-span-2 bg-[#247dea]' type='submit' icon={<SearchIcon />}>
                            Tìm kiếm
                        </Button>
                    </form>
                    <Button
                        className='col-span-2 bg-[#247dea]'
                        type='submit'
                        icon={<CloudUploadIcon className='w-6 h-6' />}
                        onClick={() => setShowModal(true)}
                    >
                        Tải ảnh lên
                    </Button>
                    <UploadImageModal isOpen={showModal} onClose={() => setShowModal(false)} />
                </div>
                <ImageTable data={images} />
            </section>
        </div>
    )
}

export default ImageManagement
