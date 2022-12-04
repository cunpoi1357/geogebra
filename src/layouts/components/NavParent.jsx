import React, { useState } from 'react'
import { useEffect } from 'react'
import { PriceTagIcon } from '../../components/Icon'
import NavChild from './NavChild'

function NavParent({ name, children, className, expandedMenu }) {
    const [expanded, setExpanded] = useState(false)
    useEffect(() => {
        if (!expandedMenu) {
            setExpanded(false)
        }
    }, [expandedMenu])
    return (
        <>
            <span
                className={`text-[#92a6e2] h-[72px] flex cursor-pointer hover:bg-[#4360b5] hover:text-white transition-colors ease-linear ${
                    expanded ? 'underline' : ''
                } ${className} `}
                onClick={() => setExpanded(!expanded)}
            >
                <span
                    className={`${
                        expandedMenu ? 'h-[72px] w-[72px]' : 'h-[72px] w-16'
                    } transition-all ease-linear flex items-center justify-center`}
                >
                    <PriceTagIcon className={`h-6 mr-1`} />
                </span>
                <span
                    className={`py-6 pr-6 ease-linear transition-all whitespace-nowrap overflow-hidden ${
                        expandedMenu ? 'inline-block' : 'hidden'
                    }`}
                >
                    {name}
                </span>
            </span>
            {expanded && (
                <ul className='pl-6 overflow-hidden'>
                    {children &&
                        children.map(item => (
                            <li key={item.name}>
                                {item.children ? (
                                    <NavParent expandedMenu={expandedMenu} {...item} />
                                ) : (
                                    <NavChild data={item} expandedMenu={expandedMenu} />
                                )}
                            </li>
                        ))}
                </ul>
            )}
        </>
    )
}

export default NavParent
