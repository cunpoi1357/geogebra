import React from 'react'

const MENU_LIST = [
    {
        title: 'Giao tuyến',
        children: []
    },
    {
        title: 'Giao điểm',
        children: []
    },
    {
        title: 'Quan hệ song song',
        children: []
    },
    {
        title: 'Quan hệ vuông góc',
        children: []
    },
    {
        title: 'Góc',
        children: []
    },
    {
        title: 'Khoảng cách',
        children: []
    }
]

function Menu() {
    return (
        <ul className='list-decimal p-8 h-full'>
            {MENU_LIST.map(item => (
                <li
                    key={item.title}
                    className='min-h-[80px] flex flex-col items-center justify-center pl-4 rounded-lg mb-4 bg-white shadow-md text-blue-600 '
                >
                    <div className='w-full'>{item.title}</div>
                    {/* {item.children.length > 0 && (
                        <ul className='flex flex-col'>
                            {item.children.map(item => (
                                <li key={item.title} className='min-h-[48px]'>
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    )} */}
                </li>
            ))}
        </ul>
    )
}

export default Menu
