import { get, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useController } from 'react-hook-form'

import { database } from '../firebase'
import { ChevronDownIcon, ChevronUpIcon } from './Icon'

function SelectTopic({ className, name, control, label, isRequired, placeholder, ...props }) {
    const [isSelected, setIdSelected] = useState(false)
    const [options, setOptions] = useState([])
    useEffect(() => {
        get(ref(database, 'structure')).then(snapshot => setOptions(JSON.parse(snapshot.val())))
    }, [])
    const { field, fieldState } = useController({
        name,
        control,
        rules: { required: isRequired },
        defaultValue: ''
    })
    return (
        <div className={`${className} relative`}>
            {label && (
                <label className='block mb-2 text-base font-normal text-neutrals-07'>
                    {label} {isRequired && <span className='font-bold text-primary-red'>*</span>}
                </label>
            )}
            <select
                className={`w-full p-4 border rounded appearance-none placeholder-neutrals-04 border-neutrals-03 ${
                    fieldState.error && 'border-primary-red'
                }`}
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
                {options.map(
                    parent =>
                        parent.children &&
                        parent.children.map(
                            child =>
                                child.children &&
                                child.children.map(item => (
                                    <option key={item.name} value={JSON.stringify(item)}>
                                        {item.name}
                                    </option>
                                ))
                        )
                )}
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
            {fieldState.error && <p className='absolute text-red-400 -bottom-6'>{fieldState.error.message}</p>}
        </div>
    )
}

export default SelectTopic
