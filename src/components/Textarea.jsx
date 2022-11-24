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
                <label className='mb-2 block text-base font-normal' htmlFor={inputId}>
                    {label} {isRequired && <span className='text-primary-red font-bold'>*</span>}
                </label>
            )}

            <textarea
                className={`w-full ${
                    label ? 'h-[calc(100%-32px)] ' : 'h-full'
                } p-4 outline-neutral-600 border border-neutral-400 rounded`}
                id={inputId}
                {...props}
                {...field}
            />
            {fieldState.error && <p className='text-red-400 h-6 absolute -bottom-6'>{fieldState.error.message}</p>}
        </div>
    )
}

export default Textarea
