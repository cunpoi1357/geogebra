import NavParent from './NavParent'

function Navbar({ className, data, onOpenCreateTestModal }) {
    return (
        <aside className={className}>
            <div className='h-10 px-10 text-2xl leading-10 border-b'>Chủ đề</div>
            <div className='overflow-auto bg-[#f7f8fa]'>
                {data.map(item => (
                    <NavParent key={item.name} {...item} />
                ))}
            </div>
            <div className='h-10 px-10 text-2xl leading-10 border-b'>Luyện tập</div>
            <button className='menu-item bg-[#f7f8faư border border-b-[#dedfe0]' onClick={onOpenCreateTestModal}>
                Đề tự luyện
            </button>
        </aside>
    )
}

export default Navbar
