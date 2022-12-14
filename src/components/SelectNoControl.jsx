import { useState, useId } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from './Icon'

function SelectNoControl({ className, label, options, placeholder, ...props }) {
    const [isSelected, setIdSelected] = useState(false)
    const selectId = useId()

    return (
        <div className={`${className} relative`}>
            {label && (
                <label className='block mb-2 text-base font-normal text-neutrals-07' htmlFor={selectId}>
                    {label}
                </label>
            )}
            <select
                className='w-full p-4 border rounded appearance-none placeholder-neutrals-04 border-neutrals-03'
                onClick={() => setIdSelected(!isSelected)}
                onBlur={() => setIdSelected(false)}
                id={selectId}
                {...props}
            >
                <option value='' disabled>
                    {placeholder}
                </option>
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {isSelected ? (
                <ChevronUpIcon
                    className={`absolute block w-4 h-4 -translate-y-1/2 ${label ? 'top-[60px]' : 'top-1/2'} right-4`}
                />
            ) : (
                <ChevronDownIcon
                    className={`absolute block w-4 h-4 -translate-y-1/2 ${label ? 'top-[60px]' : 'top-1/2'} right-4`}
                />
            )}
        </div>
    )
}

export default SelectNoControl
