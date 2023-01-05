import { Helmet } from 'react-helmet-async'
function About() {
    return (
        <>
            <Helmet>
                <title>StudyGeo3D.com - Giới thiệu</title>
            </Helmet>
            <section className='min-h-[calc(100vh-236px)] lg:px-16 px-4'>
                <div className='text-[#0060a7] w-80 flex flex-col items-center'>
                    <p className='font-bold'>SỞ GIÁO DỤC VÀ ĐÀO TẠO ĐẮK LẮK</p>
                    <p className='font-bold'>TRƯỜNG THPT TRẦN ĐẠI NGHĨA</p>
                    <span className='inline-block w-48 h-1 bg-[#0060a7]'></span>
                </div>
                <h2 className='font-bold text-center text-[#0060a7] px-9 py-14 uppercase'>
                    Sản phẩm dự thi cuộc thi KHKT-Khởi nghiệp cấp tỉnh năm học 2022-2023
                </h2>
                <div className='text-[#0060a7] text-lg'>
                    <p>
                        Tên đề tài:{' '}
                        <span className='font-bold uppercase'>Thiết kế website hỗ trợ hình học không gian.</span>
                    </p>
                    <p>
                        Nhóm trưởng: <span className='uppercase'>Nguyễn Việt Hoàng</span>, học sinh lớp 12B6, trường
                        THPT Trần Đại Nghĩa, huyện Buôn Đôn.
                    </p>
                    <p>
                        Thành viên: <span className='uppercase'>Trần Quốc Khánh</span>, học sinh lớp 12B5, trường THPT
                        Trần Đại Nghĩa, huyện Buôn Đôn.
                    </p>
                    <p>
                        Giáo viên hướng dẫn: <span className='uppercase'>Trần Ngọc Lam</span>, giáo viên Toán THPT Trần
                        Đại Nghĩa, huyện Buôn Đôn.
                    </p>
                </div>
            </section>
        </>
    )
}

export default About
