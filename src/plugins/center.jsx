import { PluginComponent } from 'react-markdown-editor-lite'
import { TextCenterIcon } from '../components/Icon'

export default class center extends PluginComponent {
    static pluginName = 'center'
    static align = 'left'

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.editor.insertText(`:::div{.content-center}
Content
:::`)
    }

    render() {
        return (
            <span className='justify-center button' title='Center' onClick={this.handleClick}>
                <TextCenterIcon className='h-6 mt-1' />
            </span>
        )
    }
}
