import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Button from './Button'

function DefectQuestion({ data }) {
    const regex =
        /(\[[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+\])/
    const { handleSubmit, register } = useForm()
    const questionSlice = data.question.split(regex)

    const onSubmit = handleSubmit(data => {
        let count = 0
        let total = (questionSlice.length - 1) / 2
        if (questionSlice[1].slice(1, -1) === String(data.slot1).toLowerCase().trim()) count += 1
        if (questionSlice[3].slice(1, -1) === String(data.slot2).toLowerCase().trim()) count += 1
        if (questionSlice[5].slice(1, -1) === String(data.slot3).toLowerCase().trim()) count += 1
        if (questionSlice[7].slice(1, -1) === String(data.slot4).toLowerCase().trim()) count += 1
        if (count === total) toast.success(`Rất tốt! bạn đã làm đúng ${count}/${total}!`)
        if (count > 0) toast.info(`Bạn đã làm đúng ${count}/${total}!`)
        if (count === 0) toast.warning(`Vui lòng điền vào chỗ trống`)
    })

    return (
        <div className='h-[100vh] flex flex-col relative overflow-hidden mt-48'>
            <div className='py-3 px-4 w-[100wh] bg-[#fff2ea] text-xl m-1 rounded rounded-tr-3xl border border-[#6382a3]'>
                {data.question.split(/^Câu (\d+)\./)[1] && (
                    <span className='bg-[#6382a3] rounded text-white font-semibold p-1 -ml-4 mr-2 -translate-y-2 inline-block leading-6'>
                        Câu ${data.question.split(/^Câu (\d+)\./)[1]}
                    </span>
                )}

                <form onSubmit={onSubmit}>
                    <span>{questionSlice[0]}</span>
                    <input
                        {...register('slot1')}
                        className='inline-block px-1 py-0 bg-transparent border border-b-2 outline-none border-b-gray-500'
                        style={{
                            width: questionSlice[1].length * 9 + 'px'
                        }}
                    />
                    <span>{questionSlice[2]}</span>

                    {questionSlice.length > 2 && (
                        <>
                            <input
                                {...register('slot2')}
                                className='inline-block px-1 py-0 bg-transparent border border-b-2 outline-none border-b-gray-500'
                                style={{
                                    width: questionSlice[3]?.length * 9 + 'px'
                                }}
                            />
                            <span>{questionSlice[4]}</span>
                        </>
                    )}
                    {questionSlice.length > 4 && (
                        <>
                            <input
                                {...register('slot3')}
                                className='inline-block px-1 py-0 bg-transparent border border-b-2 outline-none border-b-gray-500'
                                style={{
                                    width: questionSlice[5]?.length * 9 + 'px'
                                }}
                            />
                            <span>{questionSlice[6]}</span>
                        </>
                    )}
                    {questionSlice.length > 6 && (
                        <>
                            <input
                                {...register('slot4')}
                                className='inline-block px-1 py-0 bg-transparent border border-b-2 outline-none border-b-gray-500'
                                style={{
                                    width: questionSlice[7]?.length * 9 + 'px'
                                }}
                            />
                            <span>{questionSlice[8]}</span>
                        </>
                    )}
                    <Button className='float-right mt-8 bg-primary-blue' type='submit'>
                        Kiểm tra
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default DefectQuestion
