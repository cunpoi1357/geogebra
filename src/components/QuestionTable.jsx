import React from 'react'
import QuestionItem from './QuestionItem'

function QuestionTable({ data }) {
    return (
        <table className='w-full text-sm text-left border border-[#a3a3a3]'>
            <thead className='text-xs text-[#a3a6b8] uppercase bg-[#fcfcfd] border  border-[#a3a3a3]'>
                <tr>
                    <th scope='col' className='px-6 py-3'>
                        STT
                    </th>
                    <th scope='col' className='w-2/12 px-6 py-3'>
                        Chuyên đề
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Cấp độ
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Câu hỏi
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Đáp án
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Hành động
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <QuestionItem data={item} index={index} />
                ))}
            </tbody>
        </table>
    )
}

export default QuestionTable
