import { FacebookIcon, GoogleIcon } from '../components/Icon'

function Contact() {
    return (
        <div className='container flex justify-center mx-auto min-h-[calc(100vh-236px)]'>
            <div className='w-3/4 mb-32 text-center text-gray-800 lg:w-1/2'>
                <h2 className='mb-12 text-3xl font-bold text-blue-600'>Đội ngũ phát triển</h2>
                <div className='grid md:grid-cols-2 gap-x-6 lg:gap-x-12'>
                    <div className='mb-6 lg:mb-0'>
                        <div className='block bg-white rounded-lg shadow-lg'>
                            <div className='relative overflow-hidden bg-no-repeat bg-cover'>
                                <img
                                    src='https://img.freepik.com/premium-vector/person-avatar-design_24877-38137.jpg?w=2000'
                                    className='w-full rounded-t-lg'
                                    alt='avatar'
                                />
                                <a href='#!'>
                                    <div className='absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden bg-fixed' />
                                </a>
                                <svg
                                    className='absolute'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 1440 320'
                                    style={{ left: 0, bottom: 0 }}
                                >
                                    <path
                                        fill='#fff'
                                        d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
                                    ></path>
                                </svg>
                            </div>
                            <div className='p-6'>
                                <h5 className='mb-4 text-lg font-bold'>Nguyễn Việt Hoàng</h5>
                                <p className='mb-4 text-gray-500'>Frontend Developer</p>
                                <ul className='flex justify-center gap-4 mx-auto list-inside'>
                                    <FacebookIcon className='w-4 h-4 text-blue-600' />
                                    <GoogleIcon className='w-4 h-4 text-blue-600' />
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='mb-6 lg:mb-0'>
                        <div className='block bg-white rounded-lg shadow-lg'>
                            <div className='relative overflow-hidden bg-no-repeat bg-cover'>
                                <img
                                    src='https://static.vecteezy.com/system/resources/previews/004/476/164/original/young-man-avatar-character-icon-free-vector.jpg'
                                    className='w-full rounded-t-lg'
                                    alt='avatar'
                                />
                                <a href='#!'>
                                    <div className='absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden bg-fixed' />
                                </a>
                                <svg
                                    className='absolute'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 1440 320'
                                    style={{ left: 0, bottom: 0 }}
                                >
                                    <path
                                        fill='#fff'
                                        d='M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,213.3C672,203,768,213,864,202.7C960,192,1056,160,1152,128C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
                                    ></path>
                                </svg>
                            </div>
                            <div className='p-6'>
                                <h5 className='mb-4 text-lg font-bold'>Trần Quốc Khánh</h5>
                                <p className='mb-4 text-gray-500'>Content creator</p>
                                <ul className='flex justify-center gap-4 mx-auto list-inside'>
                                    <FacebookIcon className='w-4 h-4 text-blue-600' />
                                    <GoogleIcon className='w-4 h-4 text-blue-600' />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
