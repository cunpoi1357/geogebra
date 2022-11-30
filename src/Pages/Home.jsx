import Image from './../components/Image'
import Button from './../components/Button'
import images from '../assets/images'

function Home() {
    return (
        <main className='pb-20 overflow-auto'>
            <section>
                <div className='bg-[#8087d8] px-6 pb-10 pt-4'>
                    <div className='flex justify-between'>
                        <div className='flex items-center px-8 pt-8'>
                            <Image className='inline-block' src={images.icon} alt='logo' />
                            <h2 className='inline-block text-4xl font-bold text-white'>StudyGeo3D.com</h2>
                        </div>
                        <nav className='flex gap-4'>
                            <Button className='bg-[#fac730] h-12 rounded-xl text-xl'>Đăng nhập</Button>
                            <Button className='bg-[#fac730] h-12 rounded-xl text-xl'>Đăng ký</Button>
                            <Button className='bg-[#fac730] h-12 rounded-xl text-xl'>Hỗ trợ</Button>
                        </nav>
                    </div>
                    <h1 className='pt-6 pb-4 text-4xl text-center text-white'>
                        Hỗ trợ dạy và học hình học không gian cấp THPT
                    </h1>
                    <div className='grid gap-8 md:grid-cols-3'>
                        <div className='col-span-1 p-4 bg-white border rounded-3xl'>
                            <p className='text-xl'>
                                Cung cấp tóm tắt lý thuyết các vấn đề về các mô hình hình học không gian, quan hệ song
                                song và quan hệ vuông góc trong trong chương trình học THPT.
                            </p>
                        </div>
                        <div className='col-span-1 p-4 bg-white border rounded-3xl'>
                            <p className='text-xl'>
                                Thực hành làm các bài tập cơ bản để nắm vững kiến thức các chuyên đề thông qua hệ thống
                                ví dụ dưới các hình thức trắc nghiệm, điền khuyết….
                            </p>
                        </div>
                        <div className='col-span-1 p-4 bg-white border rounded-3xl'>
                            <p className='text-xl'>
                                Tự luyện tập thông qua ngân hàng câu hỏi cho từng chuyên đề với bốn cấp độ: Nhận biết,
                                Thông hiểu, Vận dụng thấp, Vận dụng cao.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-4 p-4 md:grid-cols-4 md:p-8'>
                    <div className='flex flex-col col-span-1 h-80 md:col-span-1'>
                        <div className='flex items-center justify-center flex-1'>
                            <Image
                                className='inline-block object-contain w-full h-48'
                                src={images.hinhchopHinhlangtru}
                                alt='Hình chóp – Hình Lăng trụ'
                            />
                        </div>
                        <h3 className='text-2xl text-center text-[#002060] font-bold flex items-center justify-center h-16'>
                            Hình chóp – Hình Lăng trụ
                        </h3>
                    </div>
                    <div className='flex flex-col col-span-1 h-80 md:col-span-1'>
                        <div className='flex items-center justify-center flex-1'>
                            <Image
                                className='inline-block object-contain w-full h-36'
                                src={images.cacmatcautronxoay}
                                alt='Các mặt tròn xoay'
                            />
                        </div>
                        <h3 className='text-2xl text-center text-[#002060] font-bold flex items-center justify-center h-16'>
                            Các mặt tròn xoay
                        </h3>
                    </div>
                    <div className='flex flex-col col-span-1 h-80 md:col-span-1'>
                        <div className='flex items-center justify-center flex-1'>
                            <Image
                                className='inline-block object-contain w-full h-36'
                                src={images.quanheduongthang}
                                alt='Quan hệ song song - Quan hệ vuông góc'
                            />
                        </div>
                        <h3 className='text-2xl text-center text-[#002060] font-bold flex items-center justify-center h-16'>
                            Quan hệ song song <br /> Quan hệ vuông góc
                        </h3>
                    </div>
                    <div className='flex flex-col col-span-1 h-80 md:col-span-1'>
                        <div className='flex items-center justify-center flex-1'>
                            <Image
                                className='inline-block object-contain w-full h-36'
                                src={images.detuluyen}
                                alt='Đề tự luyện'
                            />
                        </div>
                        <h3 className='text-2xl text-center text-[#002060] font-bold flex items-center justify-center h-16'>
                            Đề tự luyện
                        </h3>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home
