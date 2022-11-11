import React, { useEffect, useState } from 'react'
import { get, ref, set } from 'firebase/database'

import AdminHeader from '../layouts/components/AdminHeader'
import Markdown from '../components/Markdown'
import { database } from '../firebase'
import SelectTree from '../components/SelectTree'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from '../components/Button'

function TheoryManagement() {
    const [content, setContent] = useState('')
    const [types, setTypes] = useState([])
    const { control, handleSubmit, watch, getValues } = useForm()

    useEffect(() => {
        get(ref(database, 'structure')).then(snapshot => setTypes(JSON.parse(snapshot.val())))
        watch(data => onSubmit(data.type))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = handleSubmit(data => {
        const { name, path } = JSON.parse(data.type)
        get(ref(database, `theory/${path}`)).then(snapshot => {
            const theoryData = snapshot.val()
            if (!theoryData) {
                set(ref(database, `theory/${path}`), { name, content: name }).catch(error => toast.error(error.message))
                setContent(name)
            } else {
                setContent(theoryData.content)
            }
        })
    })

    const handleUpdate = () => {
        const { name, path } = JSON.parse(getValues('type'))
        set(ref(database, `theory/${path}`), {
            name,
            content
        })
            .then(() => toast.success('Lưu thành công'))
            .catch(error => toast.error(error.message))
    }

    return (
        <>
            <AdminHeader>Quản lí lý thuyết</AdminHeader>
            <div className='flex flex-col flex-1 p-10'>
                <form className='flex gap-10 mb-10' onSubmit={onSubmit}>
                    <SelectTree
                        className='flex-1'
                        name='type'
                        control={control}
                        options={types || []}
                        placeholder='Loại'
                    />
                    <Button className='w-24 bg-[#2c3a57]' onClick={handleUpdate}>
                        Lưu
                    </Button>
                </form>
                <div className='box-border grid h-[640px] grid-cols-2 gap-10'>
                    <textarea
                        className='w-full h-full col-span-1 p-4 border rounded outline-neutral-600 border-neutral-400'
                        onChange={e => setContent(e.target.value)}
                        value={content}
                    />
                    <div className='w-full h-full col-span-1 p-4 overflow-auto border rounded outline-neutral-600 border-neutral-400'>
                        <Markdown className='w-full'>{content}</Markdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TheoryManagement
