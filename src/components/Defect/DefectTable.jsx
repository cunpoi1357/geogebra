import React from 'react'
import DefectItem from './DefectItem'

function DefectTable({ data }) {
    return (
        <table className='w-full text-sm text-left border border-[#a3a3a3]'>
            <thead className='text-xs text-[#a3a6b8] uppercase bg-[#fcfcfd] border border-[#a3a3a3]'>
                <tr>
                    <th scope='col' className='px-6 py-3'>
                        STT
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Chủ đề
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Câu hỏi
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Hành động
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 &&
                    data.map((item, index) => <DefectItem key={item.id} index={index + 1} data={item} />)}
            </tbody>
        </table>
    )
}

export default DefectTable
