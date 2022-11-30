import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ReactModal from 'react-modal'
import { v4 as uuidv4 } from 'uuid'

import { PlusIcon, XIcon } from './Icon'
import Select from './Select'
import SelectTopic from './SelectTopic'
import Button from './Button'

function CreateTestYourSelfModal({ isOpen, onClose }) {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm({
        defaultValues: {
            topics: [
                {
                    topic: ''
                }
            ]
        }
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'topics'
    })

    const onSubmit = handleSubmit(data =>
        navigate('/test-your-self', {
            state: data
        })
    )

    return (
        <ReactModal
            id='TestYourSelfCreateModal'
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
            <div className='bg-neutrals-01 lg:md-0 m-6  p-6 min-h-[200px] lg:w-1/2 w-full rounded'>
                <div className='flex flex-col w-full align-center'>
                    <header className='flex items-center w-full'>
                        <span className='inline-block w-1 h-4 mr-3 rounded bg-primary-blue' />
                        <p className='flex-1 inline-block font-bold text-neutrals-07'>Tạo đề tự luyện</p>
                        <XIcon className='inline-block cursor-pointer text-neutrals-04' onClick={onClose} />
                    </header>
                    <hr className='bg-neutrals-03 w-full h-[1px] my-6'></hr>
                </div>
                <form onSubmit={onSubmit} className='grid gap-4'>
                    {fields.map((topic, index) => {
                        return (
                            <div key={uuidv4()} className='grid grid-cols-12 gap-4'>
                                <SelectTopic
                                    className='col-span-5'
                                    control={control}
                                    name={`topics.${index}.topic`}
                                    placeholder='Chuyên đề'
                                    label='Chuyên đề'
                                    isRequired
                                />
                                <Select
                                    className='col-span-3'
                                    control={control}
                                    name={`topics.${index}.level`}
                                    placeholder='Cấp độ'
                                    options={['Nhận biết', 'Thông hiểu', 'Vận dụng thấp', 'Vận dụng cao']}
                                    label='Cấp độ'
                                    isRequired
                                />
                                <Select
                                    className='col-span-3'
                                    control={control}
                                    name={`topics.${index}.amount`}
                                    placeholder='Số lượng'
                                    options={[5, 10, 15]}
                                    label='Số lượng câu hỏi'
                                    isRequired
                                />
                                {index !== 0 && (
                                    <button
                                        className='flex items-center justify-center w-full col-span-1'
                                        onClick={() => remove(index)}
                                    >
                                        <XIcon className='w-6 h-6 text-neutrals-04 hover:text-neutrals-06' />
                                    </button>
                                )}
                            </div>
                        )
                    })}
                    <button
                        className='flex items-center justify-between p-4 text-xl text-primary-blue w-46 place-self-end hover:underline'
                        type='button'
                        onClick={() =>
                            append({
                                topic: ''
                            })
                        }
                    >
                        <PlusIcon />
                        Thêm chuyên đề
                    </button>

                    <Button type='submit' className='text-white bg-primary-blue'>
                        Tạo
                    </Button>
                </form>
            </div>
        </ReactModal>
    )
}

export default CreateTestYourSelfModal
