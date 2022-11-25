import React from 'react'
import { useEffect } from 'react'
import ReactModal from 'react-modal'
import Button from './Button'
import { XIcon } from './Icon'

function YesNoModal({ title, isOpen, onClose, onSubmit }) {
    useEffect(() => {
        const handleKeyPress = e => {
            if (e.code === 'Enter') onSubmit()
        }
        document.addEventListener('keypress', handleKeyPress)
        return () => document.removeEventListener('keypress', handleKeyPress)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <ReactModal
            appElement={document.getElementById('app')}
            ariaHideApp={false}
            isOpen={isOpen}
            style={{
                overlay: {
                    backgroundColor: 'transparent'
                }
            }}
            onRequestClose={onClose}
            className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-secondary-dark-blue/30'
        >
            <div className='bg-neutrals-01 p-6 min-h-[100px] min-w-[300px] rounded'>
                <div className='flex flex-col w-full align-center'>
                    <XIcon
                        className='inline-block ml-auto transition-colors cursor-pointer text-neutrals-04 hover:opacity-50'
                        onClick={onClose}
                    />
                    <p className='mb-6 font-semibold'>{title}</p>
                    <div className='grid grid-cols-2 gap-6'>
                        <Button
                            className='col-span-1 mt-2 h-12 text-white border bg-[#c0c0c0] hover:opacity-75 transition-colors hover:text-white'
                            onClick={onClose}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            className='h-12 col-span-1 mt-2 text-white transition-colors border bg-primary-blue hover:opacity-75 hover:text-white'
                            onClick={onSubmit}
                        >
                            Đồng ý
                        </Button>
                    </div>
                </div>
            </div>
        </ReactModal>
    )
}

export default YesNoModal
