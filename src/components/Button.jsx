import React from 'react'

function Button({ className, icon, children, onClick, ...props }) {
    return (
        <button
            className={`min-w-[128px] text-white flex gap-3 justify-center items-center p-4 hover:opacity-95 rounded transition-opacity ${className}`}
            onClick={onClick}
            {...props}
        >
            {icon}
            <span className='text-base font-bold'>{children}</span>
        </button>
    )
}

export default Button
