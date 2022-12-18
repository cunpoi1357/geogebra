import Image from '../components/Image'
function Contact() {
    return (
        <section className='grid grid-cols-2'>
            <div className='flex justify-center h-64 col-span-1'>
                <div className='inline-block mr-10 bg-white shadow-2xl rounded-xl w-80'>
                    <div className='flex flex-col items-center py-4 border-b border-b-neutrals-03'>
                        <div className='w-24 h-24 bg-orange-300 rounded-full'></div>
                        <h3 className='mt-3 font-bold'>Nguyễn Việt Hoàng</h3>
                        <p className='text-lg text-neutrals-05'>Lập trình viên</p>
                    </div>
                    <div className='p-4'>
                        <p>
                            Mail:
                            <a
                                href='mailto:cunpoi@hotmail.com'
                                className='hover:text-[#0060a7] hover:underline transition-all ml-2'
                            >
                                cunpoi@hotmail.com
                            </a>
                        </p>
                    </div>
                </div>
                <div className='inline-block bg-white shadow-2xl rounded-xl w-80'>
                    <div className='flex flex-col items-center py-4 border-b border-b-neutrals-03'>
                        <div className='w-24 h-24 bg-orange-300 rounded-full'></div>
                        <h3 className='mt-3 font-bold'>Trần Quốc Khánh</h3>
                        <p className='text-lg text-neutrals-05'>Biên tập nội dung</p>
                    </div>
                    <div className='p-4'>
                        <p>
                            Mail:
                            <a
                                href='mailto:trankhanh0525@gmail.com'
                                className='hover:text-[#0060a7] hover:underline transition-all ml-2'
                            >
                                trankhanh0525@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div className='col-span-1'>
                <Image src='https://1.bp.blogspot.com/-iY7Zm1dawWM/X3Kl-w41h4I/AAAAAAAAJrU/DuG9QnbWM5c845ioowxKprmzJVg_T6CoQCLcBGAsYHQ/s1600/math%2Bgeometry.jpg' />
            </div>
        </section>
    )
}

export default Contact
