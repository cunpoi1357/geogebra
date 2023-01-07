import React, { useEffect, useState } from 'react'

import AdminHeader from '../layouts/components/AdminHeader'
import SelectTopic from '../components/SelectTopic'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from '../components/Button'
import MarkdownEditor from '../components/MarkdownEditor'
import { setDatabase, getDatabase, updateDatabase } from '../firebase/services'

function TheoryManagement() {
    const [input, setInput] = useState('')
    const { control, handleSubmit, watch, getValues } = useForm()

    useEffect(() => {
        watch(data => onSubmit(data.type))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = handleSubmit(data => {
        const { name, path } = JSON.parse(data.type)
        getDatabase(`theory/${path}`).then(snapshot => {
            const theoryData = snapshot.val()
            if (!theoryData) {
                setDatabase(`theory/${path}`, { name, content: 'Nội dung chuyên đề đang cập nhập....' }).catch(error =>
                    toast.error(error.message)
                )
                setInput('Nội dung chuyên đề đang cập nhập....')
            } else {
                setInput(theoryData.content)
            }
        })
    })

    const handleUpdate = () => {
        const { name, path } = JSON.parse(getValues('type'))
        updateDatabase(`theory/${path}`, {
            name,
            content: input
        })
            .then(() => toast.success('Lưu thành công'))
            .catch(error => toast.error(error.message))
    }

    return (
        <>
            <AdminHeader>Quản lí lý thuyết</AdminHeader>
            <section className='flex flex-col flex-1 p-10 h-[calc(100vh-128px)] '>
                <form className='flex gap-10 mb-10' onSubmit={onSubmit}>
                    <SelectTopic className='flex-1' name='type' control={control} placeholder='Loại' />
                    <Button className='w-24 bg-[#2c3a57]' onClick={handleUpdate}>
                        Lưu
                    </Button>
                </form>
                <div>
                    {getValues('type') && (
                        <a
                            className='float-right transition-all hover:text-[#2e88ec] hover:underline'
                            href={`/topic/${JSON.parse(getValues('type')).path}`}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Đến trang nội dung
                        </a>
                    )}
                </div>
                <div className='box-border h-[640px]'>
                    <MarkdownEditor value={input} onChange={value => setInput(value.text)} />
                </div>
            </section>
        </>
    )
}

export default TheoryManagement
