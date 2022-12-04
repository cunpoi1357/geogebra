import { PriceTagIcon } from '../../components/Icon'
import NavParent from './NavParent'

function Navbar({ className, data, expandedMenu, onOpenCreateTestModal, onOpenMenu }) {
    return (
        <aside className={className} onClick={onOpenMenu}>
            <div className={`overflow-auto ${expandedMenu ? 'w-[400px]' : 'w-16'} transition-all ease-linear`}>
                {data.map(item => (
                    <NavParent key={item.name} expandedMenu={expandedMenu} {...item} />
                ))}
            </div>
            <button
                className='text-[#92a6e2] h-[72px] flex cursor-pointer hover:bg-[#4360b5] hover:text-white transition-colors ease-linear outline-none'
                onClick={onOpenCreateTestModal}
            >
                <span
                    className={`${
                        expandedMenu ? 'h-[72px] w-[72px]' : 'h-[72px] w-16'
                    } transition-all ease-linear flex items-center justify-center`}
                >
                    <PriceTagIcon className={`h-6 mr-1`} />
                </span>
                <span
                    className={`py-6 pr-6 ${
                        expandedMenu ? 'inline-block' : 'hidden'
                    } ease-linear transition-all whitespace-nowrap overflow-hidden`}
                >
                    Đề tự luyện
                </span>
            </button>
        </aside>
    )
}

export default Navbar
