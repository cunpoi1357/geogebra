import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Button from '../Button'

function DefectQuestion({ data }) {
    const regex =
        /\[([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)\]/
    const { handleSubmit, register } = useForm()
    const questionSlice = data.question.split(regex)

    const onSubmit = handleSubmit(data => {
        let count = 0
        let total = (questionSlice.length - 1) / 2
        for (let i = 1; i <= 4; i++) {
            count += data[`slot-${i}`] && data[`slot-${i}`] === questionSlice[2 * i - 1] ? 1 : 0
        }

        if (count === total) toast.success(`Rất tốt! bạn đã làm đúng ${count}/${total}!`)
        else if (count > 0) toast.info(`Bạn đã làm đúng ${count}/${total}!`)
        count = 0
    })

    return (
        <div className='relative flex flex-col mt-48 overflow-hidden mb-80'>
            <div className='py-3 px-4 w-[100wh] text-xl m-1 rounded rounded-tr-3xl border border-[#00adf1] bg-[#f0f9fe]'>
                {data.question.split(/^Câu (\d+)\./)[1] && (
                    <span className='bg-[#6382a3] rounded text-white font-semibold p-1 -ml-4 mr-2 -translate-y-2 inline-block leading-6'>
                        Câu {data.question.split(/^Câu (\d+)\./)[1]}
                    </span>
                )}

                <form onSubmit={onSubmit}>
                    {questionSlice.map((item, index) =>
                        index % 2 === 0 ? (
                            <span key={item}>{item}</span>
                        ) : (
                            <input
                                key={item}
                                {...register(`slot-${(index + 1) / 2}`)}
                                className='inline-block px-1 py-0 bg-transparent border border-b-2 outline-none border-b-gray-500'
                                style={{
                                    width: item.length * 24 + 'px'
                                }}
                            />
                        )
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
