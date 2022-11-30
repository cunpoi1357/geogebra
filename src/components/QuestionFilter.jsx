import { useForm } from 'react-hook-form'
import Button from './Button'
import { SearchIcon } from './Icon'
import Input from './Input'
import SelectTopic from './SelectTopic'

function QuestionFilter({ onChange }) {
    const { control, handleSubmit, reset } = useForm()

    const onSubmit = handleSubmit(data => {
        onChange(data)
        reset()
    })
    return (
        <form className='grid grid-cols-12 col-span-10 gap-4' onSubmit={onSubmit}>
            <Input className='col-span-2' control={control} name='id' type='text' placeholder='ID' />
            <Input className='col-span-6' control={control} name='question' type='text' placeholder='Đề bài' />
            <SelectTopic className='col-span-2' name='topic' control={control} placeholder='Chuyên đề' />
            <Button className='col-span-2 bg-[#247dea]' type='submit' icon={<SearchIcon />}>
                Tìm kiếm
            </Button>
        </form>
    )
}

export default QuestionFilter
