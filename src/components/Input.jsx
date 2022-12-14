import { useId } from 'react'
import { useController } from 'react-hook-form'

function Input({ className, id, inputClassName, name, control, label, isRequired, onChange, rules, ...props }) {
    const idGenerator = useId()
    const inputId = id || idGenerator
    const { field, fieldState } = useController({
        name,
        control,
        rules: { required: isRequired, ...rules },
        defaultValue: ''
    })

    return (
        <div className={`${className} relative`}>
            {label && (
                <label className='block mb-2 text-base font-normal' htmlFor={inputId}>
                    {label} {isRequired && <span className='font-bold text-primary-red'>*</span>}
                </label>
            )}

            <input
                className={`w-full p-4 outline-neutral-600 placeholder-neutrals-04 border border-neutral-400 rounded ${
                    fieldState.error && 'border-primary-red'
                } ${inputClassName}`}
                id={inputId}
                {...field}
                onChange={e => {
                    field.onChange(e)
                    if (onChange) {
                        onChange(e)
                    }
                }}
                {...props}
            />
            {fieldState.error && <p className='absolute text-red-400 -bottom-6'>{fieldState.error.message}</p>}
        </div>
    )
}

export default Input
