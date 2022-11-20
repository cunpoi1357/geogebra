import { get, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import toArray from 'lodash/toArray'

import { database } from '../firebase'
import Markdown from '../components/Markdown'
import { useMemo } from 'react'
import Geogebra from 'react-geogebra'

function List() {
    const { topic } = useParams()
    const [examples, setExamples] = useState([])
    const [content, setContent] = useState('')
    const location = useLocation()

    useEffect(() => {
        get(ref(database, 'examples')).then(snapshot => {
            setExamples(toArray(snapshot.val()).filter(item => !!item && JSON.parse(item.topic).path === topic))
        })

        get(ref(database, `theory/${topic}`)).then(snapshot => {
            setContent(snapshot.val())
        })
    }, [topic, location])

    const theory = useMemo(() => {
        const result = []
        if (content.content) {
            const Lines = content.content.split(/\r?\n/) || []
            const regex = /\[(\w*)\]\s*([\w\W]*)/
            Lines.forEach(line => {
                const data = line.match(regex)

                data &&
                    result.push({
                        type: data[1],
                        content: data[2]
                    })
            })
        }
        return result
    }, [content])

    return (
        <div className='p-6'>
            <section className='border border-[#6382a3] rounded-lg overflow-hidden bg-white'>
                <header className='text-white bg-[#6382a3] w-full text-3xl px-4'>{content?.name}</header>
                <div className='block p-2 text-2xl'>
                    {theory.map(line => {
                        if (line.type === 'text')
                            return (
                                <Markdown key={line.content} className='w-full'>
                                    {line.content}
                                </Markdown>
                            )
                        if (line.type === 'geogebra')
                            return (
                                <Geogebra
                                    key={line.content}
                                    id={line.content}
                                    appName='3d'
                                    material_id={line.content}
                                    showMenuBar={false}
                                    lang='vi'
                                />
                            )
                    })}
                </div>
            </section>
            <ul className='grid grid-cols-4 p-6'>
                {examples.map((item, index) => (
                    <li key={item.id} className='relative justify-center col-span-1 cursor-pointer rounded-xl'>
                        <Link className='flex items-center w-full' to={`/question/${item.id}`}>
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
    )
}

export default List
