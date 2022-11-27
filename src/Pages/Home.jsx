function Home() {
    return (
        <main className='overflow-auto'>
            <section className='h-[350px] w-full bg-[#8187d8] p-10'>
                <div className='flex justify-between py-3'>
                    <h3 className='text-2xl text-white'>Surface area and volume of prisms</h3>
                    <div className='bg-[#bb9525]'>
                        <button className='flex h-10 rounded border border-[#bb9525] transition-all hover:-translate-y-2 ease-linear'>
                            <span className='bg-[#fac731] text-white h-full w-32 flex items-center justify-center'>
                                My button
                            </span>
                            <span className='bg-[#e1b32c] text-white h-full w-12 flex items-center justify-center'>
                                0 / 4
                            </span>
                        </button>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-8'>
                    <div className='col-span-1 h-[170px] bg-white rounded-xl p-4'>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore quae quod repellat eos
                            error nihil accusantium quo minima atque voluptates. Ducimus deleniti omnis nisi minima
                            aliquid culpa nulla laboriosam? Tempora.
                        </p>
                    </div>
                    <div className='col-span-1 h-[170px] bg-white rounded-xl p-4'>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore quae quod repellat eos
                            error nihil accusantium quo minima atque voluptates. Ducimus deleniti omnis nisi minima
                            aliquid culpa nulla laboriosam? Tempora.
                        </p>
                    </div>
                    <div className='col-span-1 h-[170px] bg-white rounded-xl p-4'>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore quae quod repellat eos
                            error nihil accusantium quo minima atque voluptates. Ducimus deleniti omnis nisi minima
                            aliquid culpa nulla laboriosam? Tempora.
                        </p>
                    </div>
                </div>
                <h3 className='py-3 text-3xl text-center text-white'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, libero?
                </h3>
            </section>
            <section className='grid grid-cols-12 gap-4 p-10'>
                <div className='col-span-7 bg-white h-80'></div>
                <div className='col-span-5 bg-[#efefef] h-80 rounded-xl'></div>
            </section>
            <footer className='flex justify-center py-4 bg-gray-500'>
                <small className='text-gray-200'>&copy; Copyright 2022</small>
            </footer>
        </main>
    )
}

export default Home
