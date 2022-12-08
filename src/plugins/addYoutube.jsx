import * as React from 'react'
import { PluginComponent } from 'react-markdown-editor-lite'
import { YoutubeIcon } from '../components/Icon'

export default class addYoutube extends PluginComponent {
    static pluginName = 'add-youtube'
    static align = 'left'

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const youtubeId = prompt('Youtube Id')
        if (youtubeId) {
            this.editor.insertText(
                `:::div{.content-center}
::youtube[Video of a cat in a box]{#${youtubeId}}
:::`
            )
        }
    }

    render() {
        return (
            <span className='justify-center button' title='Youtube' onClick={this.handleClick}>
                <YoutubeIcon className='h-5 mt-1' />
            </span>
        )
    }
}
