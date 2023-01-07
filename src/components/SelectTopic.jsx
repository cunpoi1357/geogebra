import { useState, useContext, Fragment } from 'react'
import { useController } from 'react-hook-form'

import { AppContext } from '../Context/AppProvider'
import { ChevronDownIcon, ChevronUpIcon } from './Icon'

function SelectTopic({ className, name, control, label, isRequired, onChange, placeholder, ...props }) {
    const { topics } = useContext(AppContext)
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
                onChange={e => {
                    field.onChange(e)
                    if (onChange) {
                        onChange(e)
                    }
                }}
                {...props}
            >
                <option value='' disabled>
                    {placeholder ?? label}
                </option>
                {topics.map(
                    parent =>
                        parent.children && (
                            <Fragment key={parent.name}>
                                <option value='' disabled>
                                    {parent.name}
                                </option>
                                {parent.children.map(child =>
                                    child.children ? (
                                        <Fragment key={child.name}>
                                            <option value='' disabled>
                                                --- {child.name} ---
                                            </option>
                                            {child.children.map(item => (
                                                <option key={item.path} value={JSON.stringify(item)}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Fragment>
                                    ) : (
                                        <option key={child.path} value={JSON.stringify(child)}>
                                            {child.name}
                                        </option>
                                    )
                                )}
                            </Fragment>
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
