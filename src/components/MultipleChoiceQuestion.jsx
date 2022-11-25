import React, { useEffect, useState } from 'react'
import Geogebra from 'react-geogebra'
import Latex from 'react-latex'
import { toast } from 'react-toastify'

function MultipleChoiceQuestion({ data }) {
    const [chose, setChose] = useState(null)

    useEffect(() => {
        if (chose !== null) {
            if (chose === data.answerKey)
                toast.success('Đáp án đúng', {
                    autoClose: 1000
                })
            else
                toast.error('Đáp án sai', {
                    autoClose: 1000
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chose])
    useEffect(() => setChose(null), [data])

    return (
        <div className='h-[100vh] flex flex-col relative overflow-hidden'>
            {data && (
                <>
                    <header className='py-3 px-4 w-[100wh] bg-[#fff2ea] text-xl m-1 rounded rounded-tr-3xl border border-[#6382a3]'>
                        <span className='bg-[#6382a3] rounded-br-xl text-white font-semibold p-1 -ml-4 mr-2 -translate-y-3 inline-block leading-6'>
                            Câu {data.question.split(/^Câu (\d+)\./)[1]}
                        </span>
                        <Latex>{data.question.split(/^Câu (\d+)\./)[2]}</Latex>
                    </header>
                    <section className='pb-20 overflow-auto md:p-10'>
                        {data.geogebraId && (
                            <div className='flex justify-center mt-10'>
                                <Geogebra appName='3d' material_id={data.geogebraId} showMenuBar={false} lang='vi' />
                            </div>
                        )}

                        <div className='flex flex-col items-center p-4'>
                            <div className='md:w-[600px] w-full grid grid-cols-2 grid-rows-2 md:gap-x-24 md:gap-y-5 gap-4 mt-8'>
                                {['A', 'B', 'C', 'D'].map(letter => (
                                    <button
                                        key={letter}
                                        className={`flex text-2xl items-center bg-[#fdfdbd] h-20 rounded-md border-2 border-[#b8b8bb] hover:opacity-50 hover:border-black transition-colors ${
                                            chose === letter &&
                                            (letter === data.answerKey ? 'border-green-500' : 'border-red-500')
                                        }`}
                                        onClick={() => setChose(letter)}
                                    >
                                        <span className='w-20'>{letter}</span>
                                        <span className='flex-1 -ml-10'>
                                            <Latex>{data[letter]}</Latex>
                                        </span>
                                    </button>
                                ))}
                            </div>
                            {chose && data?.answer && (
                                <div className='md:w-[800px]'>
                                    <p>Lời giải:</p>
                                    {data?.answer.split('.').map(item => (
                                        <div key={item}>
                                            <Latex>{item}</Latex>.
                                        </div>
                                    ))}
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
