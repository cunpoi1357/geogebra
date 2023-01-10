import { useState, useContext, Fragment } from 'react'

import { AppContext } from '../Context/AppProvider'
import { ChevronDownIcon, ChevronUpIcon } from './Icon'

function SelectGeogebra({
    className,
    name,
    label,
    onChange,
    placeholder,
    ...props
}) {
    const { geogebras } = useContext(AppContext)
    const [isSelected, setIdSelected] = useState(false)

    return (
        <div className={`${className} relative`}>
            {label && (
                <label className='block mb-2 text-base font-normal text-neutrals-07'>
                    {label}
                </label>
            )}
            <select
                className={`w-full p-4 border rounded appearance-none placeholder-neutrals-04 border-neutrals-03 `}
                onClick={() => setIdSelected(!isSelected)}
                onBlur={() => {
                    setIdSelected(false)
                }}
                onChange={e => {
                    if (onChange) {
                        onChange(e)
                    }
                }}
                {...props}
            >
                <option value='' disabled>
                    {placeholder ?? label}
                </option>
                {geogebras.map(
                    parent =>
                        parent.children && (
                            <Fragment key={parent.name}>
                                <option value='' disabled>
                                    ---{parent.name}---
                                </option>
                                {parent.children.map(child => (
                                    <option
                                        key={child.geogebraId}
                                        value={JSON.stringify(child)}
                                    >
                                        {child.name}
                                    </option>
                                ))}
                            </Fragment>
                        )
                )}
            </select>
            {isSelected ? (
                <ChevronUpIcon
                    className={`absolute block w-4 h-4 -translate-y-1/2 ${
                        label ? 'top-[60px]' : 'top-1/2'
                    } right-4`}
                />
            ) : (
                <ChevronDownIcon
                    className={`absolute block w-4 h-4 -translate-y-1/2 ${
                        label ? 'top-[60px]' : 'top-1/2'
                    } right-4`}
                />
            )}
        </div>
    )
}

export default SelectGeogebra
