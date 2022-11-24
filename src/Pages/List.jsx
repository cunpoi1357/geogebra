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
        if (content?.content) {
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
        <div className='h-[100vh] md:p-6 overflow-auto p-1 pb-28'>
            <section className='border border-[#6382a3] rounded-lg bg-white'>
                <header className='text-white bg-[#6382a3] w-full text-3xl px-4'>{content?.name}</header>
                <div className='block py-1 text-2xl md:p-2'>
                    {theory &&
                        theory.map(line => {
                            switch (line.type) {
                                case 'text':
                                    return (
                                        <Markdown key={line.content} className='w-full'>
                                            {line.content}
                                        </Markdown>
                                    )
                                case 'geogebra':
                                    return (
                                        <div key={line.content} className='w-full mb-4'>
                                            <Geogebra
                                                className='h-[800px]'
                                                id={line.content}
                                                appName='3d'
                                                material_id={line.content}
                                                showMenuBar={false}
                                                lang='vi'
                                            />
                                        </div>
                                    )
                                case 'block':
                                    const content = line.content.split('|')
                                    return (
                                        <div key={line.content} className='flex justify-center'>
                                            <div className='bg-[#e5f1ff] w-2/3 sd p-2 rounded-md inline-block'>
                                                <h3 className='bg-[#fffceb] rounded-md px-2'>{content[0]}</h3>
                                                <p>
                                                    <Markdown className='w-full'>{content[1]}</Markdown>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                default:
                                    break
                            }
                            return null
                        })}
                </div>
            </section>
            <ul className='grid grid-cols-2 gap-8 p-6 md:grid-cols-4'>
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
