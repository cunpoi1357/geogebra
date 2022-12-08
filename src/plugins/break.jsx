import { PluginComponent } from 'react-markdown-editor-lite'

export default class breakLine extends PluginComponent {
    static pluginName = 'break'
    static align = 'left'

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.editor.insertText(`<p class='content-break'>content</p>`)
    }

    render() {
        return (
            <span className='justify-center button' title='Break' onClick={this.handleClick}>
                break
            </span>
        )
    }
}
