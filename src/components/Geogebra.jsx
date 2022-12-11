import React from 'react'

function Geogebra({ id, onLoad }) {
    return (
        <iframe
            title={id}
            loading='lazy'
            src={`https://www.geogebra.org/calculator/${id}?embed`}
            width='800'
            allowFullScreen
            style={{
                border: '1px solid #e4e4e4',
                borderRadius: '4px'
            }}
            lang='vi-vn'
            onLoad={onLoad}
        />
    )
}

export default Geogebra
