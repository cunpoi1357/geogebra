import React from 'react'

function TestYourSelfNavBar() {
    return (
        <div className='col-span-3'>
            <div className='rounded-3xl border border-[#0060a7] bg-[#0060a750] overflow-hidden'>
                <h3 className='py-2 text-center text-white font-bold border border-transparent bg-[#0060a7]'>
                    Phiếu trả lời
                </h3>
                <ul className='grid grid-cols-6 gap-4 p-4'>
                    <li className='border border-l-[#ff6348] border-l-4 p-1 col-span-1 hover:bg-[#ff6348] cursor-pointer transition-colors select-none rounded'>
                        <span>1</span>
                        <span className='mx-1'>:</span>
                        <span className='font-bold'>B</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TestYourSelfNavBar
