import { ref, set } from 'firebase/database'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

import { database } from '../../firebase'
import Button from '../Button'
import { XIcon } from '../Icon'
import Modal from '../Modal'
import Input from '../Input'
import Select from '../Select'
import SelectTopic from '../SelectTopic'
import Textarea from '../Textarea'

function CreateQuestionModal({ onClose, isOpen }) {
    const { control, handleSubmit, reset } = useForm()

    const onSubmit = handleSubmit(data => {
        const id = uuidv4()
        set(ref(database, 'questions/' + id), {
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
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div className='bg-neutrals-01 p-6 min-h-[200px] min-w-[300px] rounded'>
                <div className='align-center w-[80vw] flex flex-col'>
                    <header className='flex items-center w-full'>
                        <span className='inline-block w-1 h-4 mr-3 rounded bg-primary-blue' />
                        <p className='flex-1 inline-block font-bold text-neutrals-07'>Tạo câu hỏi trắc nghiệm mới</p>
                        <XIcon className='inline-block cursor-pointer text-neutrals-04' onClick={onClose} />
                    </header>
                    <hr className='bg-neutrals-03 w-full h-[1px] my-6'></hr>
                    <form onSubmit={onSubmit} className='grid grid-cols-2 gap-6 grid-rows-9'>
                        <div className='grid grid-cols-2 col-span-1 grid-rows-4 gap-6'>
                            <SelectTopic
                                className='col-span-1'
                                name='topic'
                                control={control}
                                placeholder='Chuyên đề'
                                label='Chuyên đề'
                                isRequired='Vui lòng nhập trường này'
                            />
                            <Select
                                className='col-span-1'
                                name='level'
                                control={control}
                                options={['Nhận biết', 'Thông hiểu', 'Vận dụng thấp', 'Vận dụng cao']}
                                placeholder='Cấp độ'
                                label='Cấp độ'
                                isRequired='Vui lòng nhập trường này'
                            />
                            <Input
                                className='col-span-1'
                                name='A'
                                control={control}
                                placeholder='Đáp án A'
                                label='Đáp án A'
                                isRequired='Vui lòng nhập trường này'
                            />
                            <Input
                                className='col-span-1'
                                name='B'
                                control={control}
                                placeholder='Đáp án B'
                                label='Đáp án B'
                                isRequired='Vui lòng nhập trường này'
                            />
                            <Input
                                className='col-span-1'
                                name='C'
                                control={control}
                                placeholder='Đáp án C'
                                label='Đáp án C'
                                isRequired='Vui lòng nhập trường này'
                            />
                            <Input
                                className='col-span-1'
                                name='D'
                                control={control}
                                placeholder='Đáp án D'
                                label='Đáp án D'
                                isRequired='Vui lòng nhập trường này'
                            />
                            <Select
                                className='col-span-1'
                                name='answerKey'
                                control={control}
                                options={['A', 'B', 'C', 'D']}
                                placeholder='Đáp án'
                                label='Đáp án'
                                isRequired='Vui lòng nhập trường này'
                            />
                            <Input
                                className='col-span-1'
                                name='geogebraId'
                                control={control}
                                placeholder='Geogebra ID'
                                label='Geogebra ID'
                            />
                        </div>
                        <div className='grid grid-cols-2 col-span-1 grid-rows-4 gap-6'>
                            <Textarea
                                name='question'
                                className='col-span-2 row-span-2'
                                control={control}
                                placeholder='Đề bài'
                                label='Đề bài'
                                isRequired='Vui lòng nhập trường này'
                            />
                            <Textarea
                                name='answer'
                                className='col-span-2 row-span-3'
                                control={control}
                                placeholder='Lời giải'
                                label='Lời giải'
                            />
                        </div>

                        <Button
                            className='col-span-2 row-span-1 mt-2 text-black transition-colors border border-blue-500 bg-primary-blue hover:bg-blue-500 hover:text-white'
                            type='submit'
                        >
                            Tạo
                        </Button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default CreateQuestionModal
