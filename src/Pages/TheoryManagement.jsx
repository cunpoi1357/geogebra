import React, { useEffect, useState } from 'react'
import { get, ref, set } from 'firebase/database'

import AdminHeader from '../layouts/components/AdminHeader'
import { database } from '../firebase'
import SelectTopic from '../components/SelectTopic'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from '../components/Button'
import MarkdownEditor from '../components/MarkdownEditor'

function TheoryManagement() {
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
                set(ref(database, `theory/${path}`), { name, content: `${name}` }).catch(error =>
                    toast.error(error.message)
                )
                setInput(`${name}`)
            } else {
                setInput(theoryData.content)
            }
        })
    })

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
                <div className='box-border h-[640px]'>
                    <MarkdownEditor value={input} onChange={value => setInput(value.text)} />
                </div>
            </section>
        </>
    )
}

export default TheoryManagement
