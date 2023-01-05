import { sendPasswordResetEmail } from 'firebase/auth'
import { useForm } from 'react-hook-form'

import { auth } from '../firebase'
import Modal from './Modal'
import Input from './Input'
import { XIcon } from './Icon'
import { toast } from 'react-toastify'

function ForgotPasswordModal({ isOpen, onClose }) {
    const { control, handleSubmit } = useForm()
    const onSubmit = handleSubmit(data => {
        sendPasswordResetEmail(auth, data.email)
            .then(() => {
                toast.success('Yêu cầu đặt lại mật khẩu thành công!')
                onClose()
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/user-not-found':
                        toast.warning('Email không hợp lệ')
                        break
                    default:
                        toast.warning(error.message)
                        break
                }
            })
    })
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} shouldCloseOnOverlayClick>
            <div className='mt-7 bg-white  rounded-xl shadow-lg w-[600px] relative'>
                <XIcon
                    className='absolute inline-block cursor-pointer text-neutrals-04 right-4 top-4'
                    onClick={onClose}
                />
                <div className='p-4 sm:p-7'>
                    <div className='text-center'>
                        <h1 className='block text-2xl font-bold text-gray-800'>Forgot password?</h1>
                        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                            Đă nhớ mật khẩu?
                            <button
                                className='ml-2 font-medium text-blue-600 decoration-2 hover:underline'
                                onClick={onClose}
                            >
                                Đăng nhập
                            </button>
                        </p>
                    </div>

                    <div className='mt-5'>
                        <form onSubmit={onSubmit}>
                            <div className='grid gap-y-4'>
                                <div>
                                    <label htmlFor='email' className='block mb-2 ml-1 text-sm font-bold text-gray-700'>
                                        Email
                                    </label>
                                    <div className='relative mb-4'>
                                        <Input
                                            control={control}
                                            id='email'
                                            inputClassName='block w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
                                            name='email'
                                            placeholder='Email'
                                            rules={{
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Email không hợp lệ'
                                                }
                                            }}
                                            isRequired='Vui lòng nhập email'
                                        />
                                    </div>
                                </div>
                                <p className='text-blue-600'>
                                    Note: Nếu không thấy thư khôi phục mật khẩu, xin hãy kiểm tra thư rác (spam mail).
                                </p>
                                <button
                                    type='submit'
                                    className='inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
                                >
                                    Đặt lại mật khẩu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ForgotPasswordModal
