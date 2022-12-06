import { PluginComponent } from 'react-markdown-editor-lite'

export default class center extends PluginComponent {
    static pluginName = 'center'
    static align = 'left'

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.editor.insertText(`<div class='content-center'>Content</div>`)
    }

    render() {
        return (
            <span className='justify-center button' title='Center' onClick={this.handleClick}>
                Center
            </span>
        )
    }
}
