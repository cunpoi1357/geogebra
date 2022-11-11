import { useState } from 'react'
import { useController } from 'react-hook-form'
import { ChevronDownIcon, ChevronUpIcon } from './Icon'

function Select({ className, name, control, label, isRequired, options, placeholder, ...props }) {
    const [isSelected, setIdSelected] = useState(false)
    const { field, fieldState } = useController({
        name,
        control,
        rules: { required: isRequired },
        defaultValue: ''
    })
    return (
        <div className={`${className} relative`}>
            {label && (
                <label className='mb-2 text-base font-normal text-neutrals-07 block'>
                    {label} {isRequired && <span className='text-primary-red font-bold'>*</span>}
                </label>
            )}
            <select
                className='w-full p-4 placeholder-neutrals-04 border border-neutrals-03 rounded appearance-none'
                onClick={() => setIdSelected(!isSelected)}
                {...field}
                onBlur={() => {
                    field.onBlur()
                    setIdSelected(false)
                }}
                onChange={e => field.onChange(e)}
                {...props}
            >
                <option value='' disabled>
                    {placeholder ?? label}
                </option>
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {isSelected ? (
                <ChevronUpIcon className='absolute block w-4 h-4 top-1/2 right-4 -translate-y-1/2' />
            ) : (
                <ChevronDownIcon className='absolute block w-4 h-4 top-1/2 right-4 -translate-y-1/2' />
            )}
            {fieldState.error && <p className='text-red-400 absolute -bottom-6'>{fieldState.error.message}</p>}
        </div>
    )
}

export default Select
