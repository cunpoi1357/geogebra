import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import ReactModal from 'react-modal'
import { toast } from 'react-toastify'

import Button from './Button'
import { XIcon } from './Icon'
import Input from './Input'

function LoginModal({ onClose, isOpen }) {
    const { control, handleSubmit, reset } = useForm()

    const auth = getAuth()

    const onSubmit = handleSubmit(data => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                toast.success('Đăng nhập thành công')
                reset()
                onClose()
            })
            .catch(error => toast.warning(error.message))
    })

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
            <div className='bg-neutrals-01 p-6 min-h-[200px] min-w-[300px] rounded border border-green-400'>
                <div className='align-center w-[750px] flex flex-col'>
                    <header className='flex items-center w-full'>
                        <span className='inline-block w-1 h-4 mr-3 rounded bg-primary-blue' />
                        <p className='flex-1 inline-block font-bold text-neutrals-07'>Đăng nhập</p>
                        <XIcon className='inline-block cursor-pointer text-neutrals-04' onClick={onClose} />
                    </header>
                    <hr className='bg-neutrals-03 w-full h-[1px] my-6'></hr>
                    <form onSubmit={onSubmit} className='grid grid-rows-2 gap-6'>
                        <Input
                            className='row-span-1'
                            name='email'
                            control={control}
                            placeholder='Email'
                            isRequired='Vui lòng nhập trường này'
                        />
                        <Input
                            className='row-span-1'
                            name='password'
                            control={control}
                            type='password'
                            placeholder='Mật khẩu'
                            isRequired='Vui lòng nhập trường này'
                        />
                        <Button
                            className='row-span-1 mt-2 transition-colors border border-blue-500 bg-primary-blue text-neutrals-06 hover:bg-blue-500 hover:text-white'
                            type='submit'
                        >
                            Đăng nhập
                        </Button>
                    </form>
                </div>
            </div>
        </ReactModal>
    )
}

export default LoginModal
