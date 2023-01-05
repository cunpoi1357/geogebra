import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <section className='flex items-center min-h-[calc(100vh-236px)] p-16'>
            <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
                <div className='max-w-md text-center'>
                    <h2 className='mb-8 font-extrabold text-9xl '>
                        <span className='sr-only'>Error</span>404
                    </h2>
                    <p className='text-2xl font-semibold md:text-3xl'>
                        Xin lỗi, chúng tôi không tìm thấy trang bạn muốn đến.
                    </p>
                    <p className='mt-4 mb-8 dark:text-gray-400'>
                        Quay lại trang chủ để xem các nội dung khác của website.
                    </p>
                    <Link
                        to='/'
                        className='px-8 py-3 font-semibold rounded bg-[#0060a7] text-white hover:opacity-70 transition-colors'
                    >
                        Về trang chủ
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default NotFound
