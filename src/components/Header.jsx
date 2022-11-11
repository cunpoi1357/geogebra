function Header({ title, children }) {
    return (
        <header className='flex justify-between items-center h-[80px] w-full bg-neutrals-01 px-10 shadow'>
            <h2 className='font-bold'>{title || 'Home'}</h2>
            {children}
        </header>
    )
}

export default Header
