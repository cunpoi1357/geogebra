import { get, ref, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { database } from '../../firebase'
import Button from '../Button'
import { XIcon } from '../Icon'
import SelectTopic from '../SelectTopic'
import Textarea from '../Textarea'
import Modal from '../Modal'

function EditDefectModal({ isOpen, onClose, id }) {
    const { control, handleSubmit, reset, setValue } = useForm()

    const [question, setQuestion] = useState({})

    useEffect(() => {
        get(ref(database, `examples/${id}`)).then(snapshot => {
            setQuestion(snapshot.val())
        })
        Array.from(Object.keys(question)).forEach(key => setValue(key, question[key]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    const onSubmit = handleSubmit(dataForm => {
        update(ref(database, 'examples/' + id), dataForm)
            .then(() => {
                toast.success('Cập nhật thành công')
            })
            .catch(error => toast.error(error.message))
        onClose()
        reset()
    })

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div className='bg-neutrals-01 p-6 min-h-[200px] w-1/2 rounded'>
                <div className='flex flex-col w-full align-center'>
                    <header className='flex items-center w-full'>
                        <span className='inline-block w-1 h-4 mr-3 rounded bg-primary-blue' />
                        <p className='flex-1 inline-block font-bold text-neutrals-07'>Chỉnh sửa câu hỏi</p>
                        <XIcon className='inline-block cursor-pointer text-neutrals-04' onClick={onClose} />
                    </header>
                    <hr className='bg-neutrals-03 w-full h-[1px] my-6'></hr>
                    <form onSubmit={onSubmit} className='grid grid-cols-2 col-span-1 grid-rows-4 gap-6'>
                        <SelectTopic
                            className='col-span-2'
                            name='topic'
                            control={control}
                            placeholder='Chuyên đề'
                            isRequired='Vui lòng nhập trường này'
                        />
                        <Textarea
                            name='question'
                            className='col-span-2 row-span-2'
                            control={control}
                            placeholder='Câu hỏi'
                            isRequired='Vui lòng nhập trường này'
                        />
                        <Button
                            className='col-span-2 row-span-1 mt-2 text-black transition-colors border border-blue-500 bg-primary-blue hover:bg-blue-500 hover:text-white'
                            type='submit'
                        >
                            Cập nhật
                        </Button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default EditDefectModal
