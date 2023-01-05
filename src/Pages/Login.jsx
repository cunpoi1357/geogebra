import React, { useContext, useState } from 'react'
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { auth } from '../firebase'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

import { FacebookIcon, GoogleIcon } from '../components/Icon'
import Input from '../components/Input'
import { AuthContext } from '../Context/AuthProvider'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import ForgotPasswordModal from '../components/ForgotPasswordModal'

const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

function Login() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const { control, handleSubmit, reset } = useForm()
    const { user } = useContext(AuthContext)

    const handleLoginWitPopup = provider => {
        signInWithPopup(auth, provider)
            .then(() => {
                toast.success('Đăng nhập thành công')
                navigate('/')
            })
            .catch(() => toast.warn('Đăng nhập thất bại'))
    }

    const onSubmit = handleSubmit(data => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                toast.success('Đăng nhập thành công')
                reset()
                navigate('/')
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/user-not-found':
                        toast.warning('Email không tồn tại')
                        break
                    case 'auth/wrong-password':
                        toast.error('Mật khẩu không hợp lệ')
                        break
                    default:
                        toast.error(error.message)
                        break
                }
            })
    })

    useEffect(() => {
        if (user.uid) {
            navigate('/')
            toast.info('Bạn đã đăng nhập tài khoản!')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.uid])

    return (
        <>
            <Helmet>
                <title>StudyGeo3D.com - Đăng nhập</title>
            </Helmet>
            <div className='min-h-[calc(100vh-236px)]'>
                <div className='h-full px-6 text-gray-800'>
                    <div className='flex flex-wrap items-center justify-center h-full xl:justify-center lg:justify-between g-6'>
                        <div className='mb-12 grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 md:mb-0'>
                            <img
                                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
                                className='w-full'
                                alt='Sample'
                            />
                        </div>
                        <div className='mb-12 xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 md:mb-0'>
                            <form onSubmit={onSubmit}>
                                <div className='flex flex-row items-center justify-center lg:justify-start'>
                                    <p className='mb-0 mr-4 text-lg'>Đăng nhập với</p>
                                    <button
                                        type='button'
                                        data-mdb-ripple='true'
                                        data-mdb-ripple-color='light'
                                        className='inline-block p-3 mx-1 text-xs font-medium leading-tight text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
                                        onClick={() => handleLoginWitPopup(facebookProvider)}
                                    >
                                        <FacebookIcon className='w-4 h-4' />
                                    </button>

                                    <button
                                        type='button'
                                        data-mdb-ripple='true'
                                        data-mdb-ripple-color='light'
                                        className='inline-block p-3 mx-1 text-xs font-medium leading-tight text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
                                        onClick={() => handleLoginWitPopup(googleProvider)}
                                    >
                                        <GoogleIcon className='w-4 h-4' />
                                    </button>
                                </div>

                                <div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
                                    <p className='mx-4 mb-0 font-semibold text-center'>Hoặc</p>
                                </div>

                                <div className='relative mb-6'>
                                    <Input
                                        control={control}
                                        inputClassName='block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
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

                                <div className='mb-6'>
                                    <Input
                                        control={control}
                                        inputClassName='block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                        name='password'
                                        type='password'
                                        placeholder='Mật khẩu'
                                        isRequired={'Vui lòng nhập nhập mật khẩu'}
                                    />
                                </div>

                                <div className='flex items-center justify-end mb-6'>
                                    <button
                                        className='text-gray-800 hover:underline'
                                        type='button'
                                        onClick={() => setIsOpen(true)}
                                    >
                                        Quên mật khẩu?
                                    </button>
                                </div>

                                <div className='text-center lg:text-left'>
                                    <button
                                        type='submit'
                                        className='inline-block py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
                                    >
                                        Đăng nhập
                                    </button>
                                    <p className='pt-1 mt-2 mb-0 text-sm font-semibold'>
                                        Chưa có tài khoản?{' '}
                                        <Link
                                            to='/register'
                                            className='text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700'
                                        >
                                            Đăng ký
                                        </Link>
                                    </p>
                                </div>
                            </form>

                            <ForgotPasswordModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
