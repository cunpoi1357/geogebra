import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SelectGeogebra from '../SelectGeogebra'
import { XIcon } from '../Icon'
import Button from '../Button'
import Modal from '../Modal'

function CreateGeogebraModal({ isOpen, onClose }) {
    const [geogebra, setGeogeobra] = useState('')
    const navigate = useNavigate()

    const handleSubmit = () => {
        if (geogebra) {
            navigate(`/geogebra/${JSON.parse(geogebra).geogebraId}`)
            setGeogeobra('')
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,.6)',
                    zIndex: 1000,
                },
            }}
            onRequestClose={onClose}
        >
            <div className='bg-neutrals-01 lg:md-0 m-6  p-6 max-h-[80vh] lg:w-96 w-full rounded overflow-auto shadow-2xl'>
                <div className='flex flex-col w-full align-center'>
                    <header className='flex items-center w-full'>
                        <span className='inline-block w-1 h-4 mr-3 rounded bg-primary-blue' />
                        <p className='flex-1 inline-block font-bold text-neutrals-07'>
                            Tạo mô hình 3D
                        </p>
                        <XIcon
                            className='inline-block cursor-pointer text-neutrals-04'
                            onClick={onClose}
                        />
                    </header>
                    <hr className='bg-neutrals-03 w-full h-[1px] my-6'></hr>
                </div>
                <div className='grid gap-4'>
                    <SelectGeogebra
                        placeholder='Chọn mô hình'
                        label='Mô hình'
                        value={geogebra}
                        onChange={e => setGeogeobra(e.target.value)}
                    />

                    <Button
                        className='text-white bg-primary-blue'
                        onClick={handleSubmit}
                    >
                        Tạo
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default CreateGeogebraModal
