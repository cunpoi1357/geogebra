import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { PlusIcon, XIcon } from './Icon'
import Select from './Select'
import SelectTopic from './SelectTopic'
import Button from './Button'
import Modal from './Modal'
import Input from './Input'

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

    const onSubmit = handleSubmit(data => {
        navigate('/test-your-self', {
            state: data.topics
        })
        onClose()
    })

    return (
        <Modal
            isOpen={isOpen}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,.6)',
                    zIndex: 1000
                }
            }}
            onRequestClose={onClose}
        >
            <div className='bg-neutrals-01 lg:md-0 m-6  p-6 max-h-[80vh] lg:w-1/2 w-full rounded overflow-auto shadow-2xl'>
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
                            <div
                                key={uuidv4()}
                                className='grid grid-cols-1 gap-4 pb-8 border border-transparent md:grid-cols-12 border-b-neutrals-04'
                            >
                                <SelectTopic
                                    className='w-full col-span-1 md:col-span-5 place-self-end'
                                    control={control}
                                    name={`topics.${index}.topic`}
                                    placeholder='Chuyên đề'
                                    label='Chuyên đề'
                                    isRequired
                                />

                                <Select
                                    className='col-span-1 md:col-span-3 place-self-end'
                                    control={control}
                                    name={`topics.${index}.level`}
                                    options={['Nhận biết', 'Thông hiểu', 'Vận dụng thấp', 'Vận dụng cao']}
                                    placeholder='Mức độ'
                                    label='Mức độ'
                                    isRequired
                                />

                                <Input
                                    className='col-span-1 md:col-span-3'
                                    control={control}
                                    type='number'
                                    rules={{
                                        min: {
                                            value: 1,
                                            message: 'Số câu phải lớn hơn 1'
                                        }
                                    }}
                                    name={`topics.${index}.amount`}
                                    placeholder='Số lượng'
                                    label={`Số lượng`}
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
        </Modal>
    )
}

export default CreateTestYourSelfModal
