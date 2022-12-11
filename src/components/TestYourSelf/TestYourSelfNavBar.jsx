import React from 'react'

function TestYourSelfNavBar({ data, onClick, onSubmit }) {
    return (
        <div className='col-span-3'>
            <div className='rounded-3xl border border-[#0060a7] bg-[#0060a750] overflow-hidden'>
                <h3 className='py-2 text-center text-white font-bold border border-transparent bg-[#0060a7]'>
                    Phiếu trả lời
                </h3>
                <ul className='grid grid-cols-6 gap-4 p-4'>
                    {data &&
                        data.map((item, index) => (
                            <li
                                key={index}
                                className='border text-base border-[#0060a7] border-l-4 p-1 col-span-1 hover:bg-[#0060a790] cursor-pointer transition-colors select-none rounded'
                                onClick={() => onClick(index)}
                            >
                                <span>{index + 1}</span>
                                {item && (
                                    <>
                                        <span className='mx-1'>:</span>
                                        <span className='font-bold'>{item}</span>
                                    </>
                                )}
                            </li>
                        ))}
                </ul>
                <div className='flex items-center justify-center h-16'>
                    <button
                        className='text-center bg-[#0060a7] px-6 py-2 rounded-md text-white hover:bg-[#0060a780] transition-colors'
                        onClick={onSubmit}
                    >
                        Trả lời
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TestYourSelfNavBar
