import React, { useEffect, useState } from 'react'
import Latex from 'react-latex'
import { toast } from 'react-toastify'
import { BookIcon, ChatBubbleIcon } from '../Icon'
import Image from '../Image'
import Markdown from '../Markdown'
import Geogebra from '../Geogebra'

function MultipleChoiceQuestion({ data }) {
    const [chose, setChose] = useState(null)

    useEffect(() => {
        if (chose !== null) {
            if (chose === data.answerKey) toast.success('Đáp án đúng')
            else toast.error('Đáp án sai')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chose])
    useEffect(() => setChose(null), [data])

    return (
        <div className='relative flex flex-col h-[calc(100vh-72px)] overflow-hidden'>
            {data && (
                <>
                    <header className='py-3 px-4 w-[100wh] bg-[#f0f9fe] text-xl m-1 border border-[#00adf1] shadow-[#9897ff] shadow-lg'>
                        {data.question.split(/^Câu (\d+)\./)[1] && (
                            <span className='inline-flex h-3 p-1 font-semibold leading-6 text-[#08b1ed] items-center justify-center ml-8 relative'>
                                <BookIcon className='absolute -left-6 w-6 h-6 text-[#08b1ed] mr-1' />
                                Câu {data.question.split(/^Câu (\d+)\./)[1]}.
                            </span>
                        )}
                        <Latex>{data.question.split(/^Câu (\d+)\./)[2] || data.question}</Latex>
                    </header>
                    <section className='overflow-auto pb-44 md:p-10'>
                        {data.geogebraId && (
                            <div className='flex justify-center mt-10 md:h-[600px] h-[500px]'>
                                <Geogebra id={data.geogebraId} />
                            </div>
                        )}
                        {data.image && (
                            <div className='flex justify-center mt-3'>
                                <Image src={data.image} className='object-cover h-[400px]' />
                            </div>
                        )}

                        <div className='flex flex-col items-center p-4'>
                            <div className='md:w-[800px] w-full grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:gap-x-24 md:gap-y-5 gap-4 mt-8'>
                                {['A', 'B', 'C', 'D'].map(letter => (
                                    <button
                                        key={letter}
                                        className={`flex text-2xl items-center bg-[#f0f9fe] h-20 rounded-md border-2 border-[#00adf1] hover:opacity-50 hover:border-black transition-colors ${
                                            chose === letter &&
                                            (letter === data.answerKey ? 'border-green-300' : 'border-red-300')
                                        }`}
                                        onClick={() => setChose(letter)}
                                    >
                                        <span className='p-2 w-10 h-10 text-[#08b1ed] font-bold rounded-full border border-[#00adf1] flex items-center justify-center m-6'>
                                            {letter}
                                        </span>
                                        <span className='flex-1 -ml-10'>
                                            <Latex>{data[letter]}</Latex>
                                        </span>
                                    </button>
                                ))}
                            </div>
                            {chose && data?.answer && (
                                <div className='md:w-[800px] mt-5'>
                                    <div className='flex items-center justify-center text-2xl text-[#08b1ed]'>
                                        <ChatBubbleIcon className='w-6 h-6 mr-2' />
                                        <span>Lời giải:</span>
                                    </div>
                                    <Markdown>{data?.answer}</Markdown>
                                    <span>
                                        Chọn đáp án{' '}
                                        <span className='p-2 w-9 h-9 text-xl text-[#08b1ed] font-bold rounded-full border border-[#00adf1] inline-flex items-center justify-center m-3'>
                                            {data.answerKey}
                                        </span>
                                    </span>
                                </div>
                            )}
                        </div>
                    </section>
                </>
            )}
        </div>
    )
}

export default MultipleChoiceQuestion
