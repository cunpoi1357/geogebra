import Button from '../Button'
import { XIcon } from '../Icon'
import Markdown from '../Markdown'
import Modal from '../Modal'

function PreviewQuestionModal({ data, onClose, isOpen }) {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div className='bg-neutrals-01 p-6 min-h-[200px] min-w-[300px] rounded'>
                <div className='align-center w-[80vw] flex flex-col'>
                    <header className='flex items-center w-full'>
                        <span className='inline-block w-1 h-4 mr-3 rounded bg-primary-blue' />
                        <p className='flex-1 inline-block font-bold text-neutrals-07'>Xem trước</p>
                        <XIcon className='inline-block cursor-pointer text-neutrals-04' onClick={onClose} />
                    </header>
                    <hr className='bg-neutrals-03 w-full h-[1px] my-6'></hr>
                    <div className='grid grid-cols-2 gap-6 grid-rows-9'>
                        <div className='grid grid-cols-1 col-span-1 gap-6'>
                            <div className='grid grid-cols-2 gap-6'>
                                <div className='col-span-1 row-span-1'>
                                    <h3>Câu A</h3>
                                    <Markdown className='w-full p-4 border border-neutral-400'>{data.A}</Markdown>
                                </div>
                                <div className='col-span-1 row-span-1'>
                                    <h3>Câu B</h3>
                                    <Markdown className='w-full p-4 border border-neutral-400'>{data.B}</Markdown>
                                </div>
                                <div className='col-span-1 row-span-1utral-400'>
                                    <h3>Câu C</h3>
                                    <Markdown className='w-full p-4 border border-neutral-400'>{data.C}</Markdown>
                                </div>
                                <div className='col-span-1 row-span-1'>
                                    <h3>Câu D</h3>
                                    <Markdown className='w-full p-4 border border-neutral-400'>{data.D}</Markdown>
                                </div>
                                <div className='grid grid-cols-3 col-span-2'>
                                    <div className='col-span-1 row-span-1'>
                                        <h3>Geogebra</h3>
                                        <div className='flex items-center justify-center '>
                                            {data.geogebraId && (
                                                <a
                                                    className='text-xl transition-all hover:underline hover:text-blue-500'
                                                    href={`https://www.geogebra.org/calculator/${data.geogebraId}`}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    Link geogebra
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-span-1 row-span-1'>
                                        <h3>Ảnh minh họa</h3>
                                        <div className='flex items-center justify-center '>
                                            {data.image && (
                                                <a
                                                    className='text-xl transition-all hover:underline hover:text-blue-500'
                                                    href={data.image}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    Link Ảnh minh họa
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-span-1 row-span-1'>
                                        <h3>Youtube</h3>
                                        <div className='flex items-center justify-center '>
                                            {data.youtube && (
                                                <a
                                                    className='text-xl transition-all hover:underline hover:text-blue-500'
                                                    href={`https://www.youtube.com/watch?v=${data.youtube}`}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    Link Youtube
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 col-span-1 grid-rows-4 gap-6'>
                            <div className='row-span-2'>
                                <h3>Đề bài</h3>
                                <Markdown className='w-full p-4 border border-neutral-400'>{data.question}</Markdown>
                            </div>
                            <div className='row-span-2'>
                                <h3>Lời giải</h3>
                                <Markdown className='w-full p-4 border border-neutral-400'>{data.answer}</Markdown>
                            </div>
                        </div>

                        <Button
                            className='col-span-2 row-span-1 mt-2 text-black transition-colors border border-blue-500 bg-primary-blue hover:bg-blue-500 hover:text-white'
                            type='submit'
                            onClick={onClose}
                        >
                            Đóng
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default PreviewQuestionModal
