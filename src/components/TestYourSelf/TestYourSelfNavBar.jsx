import React from 'react'

function TestYourSelfNavBar({ className, data, answer, isAnswered, onClick, onSubmit }) {
    return (
        <div className={className}>
            <div className='rounded-3xl border border-[#0060a7] bg-[#0060a750] overflow-hidden'>
                <h3 className='py-2 text-center text-white font-bold border border-transparent bg-[#0060a7]'>
                    Phiếu trả lời
                </h3>
                <div className='flex lg:flex-col'>
                    <ul className='flex flex-1 w-full gap-4 p-4 overflow-x-auto h-22 lg:flex-wrap flex-nowrap'>
                        {data &&
                            data.map((item, index) => (
                                <li
                                    key={index}
                                    className={`${
                                        isAnswered
                                            ? item === answer[index]
                                                ? 'bg-[#9ddfd390] border-[#2ecc71]'
                                                : ''
                                            : ''
                                    } border text-base flex-shrink-0 border-[#0060a7] w-12 h-8 inline-block border-l-4 p-1 col-span-1 hover:bg-[#0060a790] cursor-pointer transition-colors select-none rounded`}
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
                    {!isAnswered && (
                        <div className='flex items-center justify-center h-16 pr-4 lg:pr-0'>
                            <button
                                className='text-center bg-[#0060a7] px-6 py-2 rounded-md text-white hover:bg-[#0060a780] transition-colors'
                                onClick={onSubmit}
                            >
                                NỘP BÀI
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TestYourSelfNavBar
