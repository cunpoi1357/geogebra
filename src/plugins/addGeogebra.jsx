import * as React from 'react'
import { PluginComponent } from 'react-markdown-editor-lite'
import { PrismIcon } from '../components/Icon'

export default class addGeogebra extends PluginComponent {
    static pluginName = 'add-geogebra'
    static align = 'left'

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const geogebraId = prompt('Geogebra Id')
        if (geogebraId) {
            this.editor.insertText(`:::div{.content-center}
::geo{#${geogebraId}}
:::`)
        }
    }

    render() {
        return (
            <span className='justify-center button' title='Geogebra' onClick={this.handleClick}>
                <PrismIcon className='h-5 mt-1' />
            </span>
        )
    }
}
