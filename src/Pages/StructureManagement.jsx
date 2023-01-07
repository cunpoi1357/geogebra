import React, { useContext, useState } from 'react'
import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'
import Ajv from 'ajv'

import { AppContext } from '../Context/AppProvider'
import AdminHeader from '../layouts/components/AdminHeader'
import Button from '../components/Button'
import { toast } from 'react-toastify'
import { setDatabase } from '../firebase/services'

const ajv = new Ajv({ allErrors: true, verbose: true })

function StructureManagement() {
    const { topics } = useContext(AppContext)
    const [data, setData] = useState(topics)

    const handleUpdate = () => {
        setDatabase('structure', data)
            .then(() => {
                toast.success('Cập nhật thành công')
            })
            .catch(error => toast.error(error.message))
    }

    return (
        <div className='flex flex-col h-screen overflow-hidden'>
            <AdminHeader>Quản lí menu</AdminHeader>
            <section className='p-16 h-[calc(100vh-128px)] overflow-auto'>
                <div className='p-8'>{data.length > 0 && <Editor value={data} onChange={setData} ajv={ajv} />}</div>
                <Button className='col-span-2 bg-[#247dea] w-20 mx-auto' onClick={handleUpdate}>
                    Cập nhật
                </Button>
            </section>
        </div>
    )
}

export default StructureManagement
