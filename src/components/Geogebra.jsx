import React from 'react'

function Geogebra({ id }) {
    return (
        <iframe
            title={id}
            src={`https://www.geogebra.org/calculator/${id}?embed`}
            width='800'
            allowfullscreen
            style={{
                border: '1px solid #e4e4e4',
                borderRadius: '4px'
            }}
            onLoad={() => console.log('iframe loaded')}
            frameborder='0'
            lang='vi-vn'
        />
    )
}

export default Geogebra
