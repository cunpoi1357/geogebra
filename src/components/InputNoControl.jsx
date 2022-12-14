import { useId } from 'react'

function InputNoControl({ className, label, ...props }) {
    const inputId = useId()

    return (
        <div className={`${className} relative`}>
            {label && (
                <label className='block mb-2 text-base font-normal' htmlFor={inputId}>
                    {label}
                </label>
            )}

            <input
                className='w-full p-4 border rounded outline-neutral-600 placeholder-neutrals-04 border-neutral-400 '
                id={inputId}
                {...props}
            />
        </div>
    )
}

export default InputNoControl
