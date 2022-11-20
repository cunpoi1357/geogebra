import MultipleChoiceItem from './MultipleChoiceItem'

function MultipleChoiceTable({ data = [] }) {
    return (
        <table className='w-full text-sm text-left border border-[#a3a3a3]'>
            <thead className='text-xs text-[#a3a6b8] uppercase bg-[#fcfcfd]'>
                <tr>
                    <th scope='col' className='px-6 py-3'>
                        STT
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Chủ đề
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Geogebra ID
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Đề bài
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        A
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        B
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        C
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        D
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Lời giải
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Hành động
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <MultipleChoiceItem key={item.id} index={index + 1} data={item} />
                ))}
            </tbody>
        </table>
    )
}

export default MultipleChoiceTable
