import { get, ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactModal from 'react-modal'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

import { database } from '../firebase'
import Button from './Button'
import { XIcon } from './Icon'
import SelectTree from './SelectTree'
import Textarea from './Textarea'

function DefectCreateModal({ onClose, isOpen }) {
    const { control, handleSubmit, reset } = useForm()

    const [data, setData] = useState([])
    useEffect(() => {
        get(ref(database, 'structure')).then(snapshot => setData(JSON.parse(snapshot.val())))
    }, [])

    const onSubmit = handleSubmit(data => {
        const id = uuidv4()
        set(ref(database, 'examples/' + id), {
            type: 'defect',
            ...data,
            id
        })
            .then(() => {
                toast.success('Tạo thành công')
            })
            .catch(error => toast.error(error.message))
        onClose()
        reset()
    })

    return (
        <ReactModal
            appElement={document.getElementById('app')}
            ariaHideApp={false}
            isOpen={isOpen}
            style={{
                overlay: {
                    backgroundColor: 'transparent'
                }
            }}
            onRequestClose={onClose}
            className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-secondary-dark-blue/30'
        >
            <div className='bg-neutrals-01 p-6 min-h-[200px] w-1/2 rounded'>
                <div className='flex flex-col w-full align-center'>
                    <header className='flex items-center w-full'>
                        <span className='inline-block w-1 h-4 mr-3 rounded bg-primary-blue' />
                        <p className='flex-1 inline-block font-bold text-neutrals-07'>Tạo câu hỏi trắc nghiệm mới</p>
                        <XIcon className='inline-block cursor-pointer text-neutrals-04' onClick={onClose} />
                    </header>
                    <hr className='bg-neutrals-03 w-full h-[1px] my-6'></hr>
                    <form onSubmit={onSubmit} className='grid grid-cols-2 col-span-1 grid-rows-4 gap-6'>
                        <SelectTree
                            className='col-span-2'
                            name='topic'
                            control={control}
                            options={data || []}
                            placeholder='Loại'
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
                            Tạo
                        </Button>
                    </form>
                </div>
            </div>
        </ReactModal>
    )
}

export default DefectCreateModal
