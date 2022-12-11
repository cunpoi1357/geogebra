import max from 'lodash/max'

import { BookIcon } from '../Icon'
import Geogebra from '../Geogebra'
import Image from '../Image'
import Markdown from '../Markdown'
import Latex from 'react-latex'

function TestYourSelfQuestion({ index, data, choose, onChoose }) {
    const lengthMaxOfQuestions = max([data.A.length, data.B.length, data.C.length, data.D.length])
    const handleChoose = letter => onChoose(index, letter)
    return (
        <section className='border border-transparent border-b-[#0060a7] p-4' id={`question-${index}`}>
            <div className='py-3 px-4 w-[100wh] bg-[#f0f9fe] text-xl m-1 border border-[#00adf1] shadow-[#9897ff] shadow-lg'>
                <span className='inline-flex h-3 p-1 font-semibold leading-6 text-[#08b1ed] items-center justify-center ml-8 relative'>
                    <BookIcon className='absolute -left-6 w-6 h-6 text-[#08b1ed] mr-1' />
                    Câu {index + 1}.
                </span>
                <Latex>{data.question}</Latex>
            </div>
            <div className='overflow-auto md:p-10'>
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
                    <div className='grid w-full grid-cols-4 gap-4 mt-8 md:gap-x-24 md:gap-y-5'>
                        {['A', 'B', 'C', 'D'].map(letter => (
                            <button
                                key={letter}
                                className={`flex ${
                                    lengthMaxOfQuestions >= 80
                                        ? 'col-span-4'
                                        : lengthMaxOfQuestions <= 10
                                        ? 'col-span-1'
                                        : 'col-span-2'
                                } ${
                                    choose === letter ? 'border-yellow-300' : ''
                                } text-2xl items-center bg-[#f0f9fe] rounded-md border-2 border-[#00adf1] hover:opacity-50 hover:border-black transition-colors`}
                                onClick={() => handleChoose(letter)}
                            >
                                <span className='p-2 w-10 text-[#08b1ed] font-bold rounded-full border border-[#00adf1] flex items-center justify-center m-6'>
                                    {letter}
                                </span>
                                <span className='flex items-start flex-1'>
                                    <Markdown className='text-xl text-left'>{data[letter]}</Markdown>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestYourSelfQuestion
