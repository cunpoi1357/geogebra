import React from 'react'

function DefectQuestion({ data }) {
    return (
        <div className='h-[100vh] flex flex-col relative overflow-hidden'>
            <header className='py-3 px-4 w-[100wh] bg-[#fff2ea] text-xl m-1 rounded rounded-tr-3xl border border-[#6382a3]'>
                <span className='bg-[#6382a3] rounded text-white font-semibold p-1 -ml-4 mr-2 -translate-y-2 inline-block leading-6'>
                    Câu hỏi
                </span>
                {data.question}
            </header>
        </div>
    )
}

export default DefectQuestion
