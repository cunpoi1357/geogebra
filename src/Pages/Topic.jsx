import { useEffect, useState, useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import toArray from 'lodash/toArray'
import orderBy from 'lodash/orderBy'

import { getDatabase } from '../firebase/services'
import { AppContext } from '../Context/AppProvider'
import Markdown from '../components/Markdown'

function Topic() {
    const { examples } = useContext(AppContext)
    const { topic } = useParams()
    const [examplesFiltered, setExamplesFiltered] = useState([])
    const [content, setContent] = useState('')
    const location = useLocation()

    useEffect(() => {
        setExamplesFiltered(examples.filter(item => !!item && JSON.parse(item.topic).path === topic))

        getDatabase(`theory/${topic}`).then(snapshot => {
            setContent(snapshot.val().content)
        })
    }, [topic, location, examples])

    const sortFn = item => Number(toArray(item.question.match(/^Câu (\d+)\./))[1])

    return (
        <>
            <div className='p-6 min-h-[calc(100vh-236px)]'>
                <section className='border border-[#6382a3] rounded-lg bg-white'>
                    <header className='text-white bg-[#6382a3] w-full text-3xl px-4'>{content?.name}</header>
                    <div className='block py-1 text-2xl md:p-2'>
                        <Markdown>{content}</Markdown>
                    </div>
                </section>
                <ul className='grid grid-cols-1 gap-8 p-6 md:grid-cols-4'>
                    {orderBy(examplesFiltered, [sortFn], ['esc']).map((item, index) => (
                        <li key={item.id} className='relative justify-center col-span-1 cursor-pointer rounded-xl'>
                            <Link className='flex items-center w-full' to={`/example/${item.id}`}>
                                <span className='bg-[#6382a3] px-4 text-2xl rounded-l-xl text-white pr-6 inline-block'>
                                    Ví dụ
                                </span>
                                <span className='inline-block h-10 text-2xl w-10 text-center border-[#6382a3] border-2 rounded-full bg-white -translate-x-2'>
                                    {index + 1}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Topic
