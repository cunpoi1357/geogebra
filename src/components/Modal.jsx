import React from 'react'
import ReactModal from 'react-modal'

function Modal({ children, isOpen, onRequestClose, style, ...props }) {
    if (isOpen)
        return (
            <ReactModal
                appElement={document.getElementById('app')}
                ariaHideApp={false}
                {...props}
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                style={{
                    overlay: {
                        backgroundColor: 'transparent'
                    },
                    ...style
                }}
                className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center'
            >
                {children}
            </ReactModal>
        )
    return null
}

export default Modal
