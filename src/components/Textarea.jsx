import { useId } from 'react'
import { useController } from 'react-hook-form'

function Textarea({ className, name, control, label, isRequired, ...props }) {
    const inputId = useId()
    const { field, fieldState } = useController({
        name,
        control,
        rules: { required: isRequired },
        defaultValue: ''
    })

    return (
        <div className={`${className} relative`}>
            {label && (
                <label className='block mb-2 text-base font-normal' htmlFor={inputId}>
                    {label} {isRequired && <span className='font-bold text-primary-red'>*</span>}
                </label>
            )}

            <textarea
                className={`w-full ${
                    label ? 'h-[calc(100%-32px)] ' : 'h-full'
                } p-4 outline-neutral-600 border border-neutral-400 rounded ${
                    fieldState.error && 'border-primary-red'
                }`}
                id={inputId}
                {...props}
                {...field}
            />
            {fieldState.error && <p className='absolute h-6 text-red-400 -bottom-6'>{fieldState.error.message}</p>}
        </div>
    )
}

export default Textarea
