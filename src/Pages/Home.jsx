import Image from './../components/Image'
import images from '../assets/images'

function Home() {
    return (
        <main className='overflow-auto'>
            <section>
                <div className='flex items-end px-8 pt-8'>
                    <Image className='inline-block' src={images.icon} />
                    <h2 className='text-[#0000cc] text-4xl inline-block font-bold'>StudyGeo3D.com</h2>
                </div>
                <h1 className='text-[#002060] text-4xl text-center p-8'>
                    Hỗ trợ dạy và học hình học không gian cấp THPT
                </h1>
                <div className='grid gap-4 p-4 md:grid-cols-3 md:p-8'>
                    <div className='col-span-1 border border-[#002060] rounded-lg p-4'>
                        <p className='text-xl'>
                            Cung cấp tóm tắt lý thuyết các vấn đề về các mô hình hình học không gian, quan hệ song song
                            và quan hệ vuông góc trong trong chương trình học THPT.
                        </p>
                    </div>
                    <div className='col-span-1 border border-[#002060] rounded-lg p-4'>
                        <p className='text-xl'>
                            Thực hành làm các bài tập cơ bản để nắm vững kiến thức các chuyên đề thông qua hệ thống ví
                            dụ dưới các hình thức trắc nghiệm, điền khuyết….
                        </p>
                    </div>
                    <div className='col-span-1 border border-[#002060] rounded-lg p-4'>
                        <p className='text-xl'>
                            Tự luyện tập thông qua ngân hàng câu hỏi cho từng chuyên đề với bốn cấp độ: Nhận biết, Thông
                            hiểu, Vận dụng thấp, Vận dụng cao.
                        </p>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4 p-4 grid-rows-11 md:grid-cols-11 md:p-8'>
                    <div className='flex flex-col col-span-1 row-span-1 md:col-span-3'>
                        <Image className='object-contain w-full h-72' src={images.hinhchopHinhlangtru} />
                        <h3 className='flex-1 text-2xl text-center text-[#002060] font-bold flex items-center justify-center'>
                            Hình chóp – Hình Lăng trụ
                        </h3>
                    </div>
                    <div className='flex flex-col col-span-1 row-span-1 md:col-span-3'>
                        <Image className='object-contain w-full h-72' src={images.cacmatcautronxoay} />
                        <h3 className='flex-1 text-2xl text-center text-[#002060] font-bold flex items-center justify-center'>
                            Các mặt tròn xoay
                        </h3>
                    </div>
                    <div className='flex flex-col col-span-1 row-span-1 md:col-span-3'>
                        <Image className='object-contain w-full h-72' src={images.quanheduongthang} />
                        <h3 className='flex-1 text-2xl text-center text-[#002060] font-bold flex items-center justify-center'>
                            Quan hệ song song <br /> Quan hệ vuông góc
                        </h3>
                    </div>
                    <div className='flex flex-col col-span-1 row-span-1 md:col-span-2'>
                        <div className='flex items-end justify-center h-72'>
                            <Image className='object-contain' src={images.detuluyen} />
                        </div>
                        <h3 className='flex-1 text-2xl text-center text-[#002060] font-bold flex items-center justify-center'>
                            Đề tự luyện
                        </h3>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home
