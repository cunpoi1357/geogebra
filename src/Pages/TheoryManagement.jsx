import React, { useEffect, useState } from 'react'
import { get, ref, set } from 'firebase/database'

import AdminHeader from '../layouts/components/AdminHeader'
import Markdown from '../components/Markdown'
import { database } from '../firebase'
import SelectTopic from '../components/SelectTopic'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from '../components/Button'

function TheoryManagement() {
    const [content, setContent] = useState([])
    const [input, setInput] = useState('')
    const { control, handleSubmit, watch, getValues } = useForm()

    useEffect(() => {
        watch(data => onSubmit(data.type))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = handleSubmit(data => {
        const { name, path } = JSON.parse(data.type)
        get(ref(database, `theory/${path}`)).then(snapshot => {
            const theoryData = snapshot.val()
            if (!theoryData) {
                set(ref(database, `theory/${path}`), { name, content: `[text] ${name}` }).catch(error =>
                    toast.error(error.message)
                )
                setInput(`[text] ${name}`)
            } else {
                setInput(theoryData.content)
            }
        })
    })
    useEffect(() => {
        const Lines = input.split(/\r?\n/) || []
        const regex = /\[(\w+\s*-*\s*\w+)\]\s*([\w\W]*)/
        const result = []
        Lines.forEach(line => {
            const data = line.match(regex)

            data &&
                result.push({
                    type: data[1],
                    content: data[2]
                })
        })
        setContent(result)
    }, [input])

    const handleUpdate = () => {
        const { name, path } = JSON.parse(getValues('type'))
        set(ref(database, `theory/${path}`), {
            name,
            content: input
        })
            .then(() => toast.success('Lưu thành công'))
            .catch(error => toast.error(error.message))
    }

    return (
        <>
            <AdminHeader>Quản lí lý thuyết</AdminHeader>
            <section className='flex flex-col flex-1 p-10'>
                <form className='flex gap-10 mb-10' onSubmit={onSubmit}>
                    <SelectTopic className='flex-1' name='type' control={control} placeholder='Loại' />
                    <Button className='w-24 bg-[#2c3a57]' onClick={handleUpdate}>
                        Lưu
                    </Button>
                </form>
                <div className='box-border grid h-[640px] grid-cols-2 gap-10'>
                    <textarea
                        className='w-full h-full col-span-1 p-4 border rounded outline-neutral-600 border-neutral-400'
                        onChange={e => setInput(e.target.value)}
                        value={input}
                    />
                    <div className='w-full h-full col-span-1 p-4 overflow-auto border rounded outline-neutral-600 border-neutral-400'>
                        {content.map(line => {
                            switch (line.type) {
                                case 'text':
                                    return (
                                        <Markdown key={line.content} className='w-full'>
                                            {line.content}
                                        </Markdown>
                                    )
                                case 'text - center':
                                    return (
                                        <div key={line.content} className='flex justify-center w-full md:px-8'>
                                            <Markdown key={line.content}>{line.content}</Markdown>
                                        </div>
                                    )
                                case 'geogebra':
                                    return (
                                        <span key={line.content} className='block'>
                                            [Geogebra] {line.content}
                                        </span>
                                    )
                                case 'block':
                                    const content = line.content.split('|')
                                    return (
                                        <p key={line.content} className='border border-neutral-400'>
                                            <span className='font-bold'>{content[0]}</span>
                                            <Markdown className='w-full'>{content[1]}</Markdown>
                                        </p>
                                    )
                                default:
                                    break
                            }
                            return null
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default TheoryManagement
