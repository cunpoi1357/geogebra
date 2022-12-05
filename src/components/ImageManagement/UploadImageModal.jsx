import { ref, set } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

import { database, storage } from '../../firebase'
import Button from '../Button'
import { XIcon } from '../Icon'
import Input from '../Input'
import Modal from '../Modal'
import SelectTopic from '../SelectTopic'

function UploadImageModal({ isOpen, onClose }) {
    const { control, handleSubmit, reset } = useForm()
    const [image, setImage] = useState({})

    const onSubmit = handleSubmit(data => {
        const id = uuidv4()
        if (image) {
            toast.info('Đang tải ảnh lên....')
            const imagesRef = storageRef(storage, `images/${image.name}`)
            uploadBytes(imagesRef, image)
                .then(() =>
                    getDownloadURL(imagesRef)
                        .then(url =>
                            set(ref(database, 'images/' + id), {
                                ...data,
                                image: url,
                                id
                            })
                                .then(() => {
                                    toast.success('Tải ảnh lên thành công.')
                                })
                                .catch(error => toast.error(error.message))
                                .finally(() => {
                                    onClose()
                                    reset()
                                })
                        )
                        .catch(error => toast.error(error))
                )
                .catch(() => toast.error('Tải ảnh lên thất bại.'))
        }
    })

    const handleInputFileChange = e => {
        setImage(e.target.files[0])
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div className='bg-neutrals-01 p-6 min-h-[100px] w-2/5 rounded'>
                <div className='flex flex-col w-full align-center'>
                    <header className='flex items-center w-full'>
                        <span className='inline-block w-1 h-4 mr-3 rounded bg-primary-blue' />
                        <p className='flex-1 inline-block font-bold text-neutrals-07'>Tải ảnh lên</p>
                        <XIcon className='inline-block cursor-pointer text-neutrals-04' onClick={onClose} />
                    </header>
                    <hr className='bg-neutrals-03 w-full h-[1px] my-6'></hr>
                    <form onSubmit={onSubmit} className='grid grid-cols-2 col-span-1 grid-rows-4 gap-6'>
                        <SelectTopic
                            className='col-span-2'
                            name='topic'
                            control={control}
                            placeholder='Chuyên đề'
                            label='Chuyên đề'
                            isRequired='Vui lòng nhập trường này'
                        />
                        <Input
                            className='col-span-2'
                            name='name'
                            control={control}
                            placeholder='Tên'
                            label='Tên'
                            isRequired='Vui lòng nhập trường này'
                        />
                        <Input
                            className='col-span-2'
                            name='image'
                            type='file'
                            control={control}
                            placeholder='Ảnh'
                            label='Ảnh'
                            isRequired='Vui lòng nhập trường này'
                            onChange={handleInputFileChange}
                        />
                        <Button
                            className='col-span-2 row-span-1 mt-2 text-black transition-colors border border-blue-500 bg-primary-blue hover:bg-blue-500 hover:text-white'
                            type='submit'
                        >
                            Tải lên
                        </Button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default UploadImageModal
