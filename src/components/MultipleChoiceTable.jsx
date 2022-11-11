import MultipleChoiceItem from './MultipleChoiceItem'

function MultipleChoiceTable({ data = [] }) {
    return (
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
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
