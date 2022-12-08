import { PluginComponent } from 'react-markdown-editor-lite'
import { SubTitleIcon } from '../components/Icon'

export default class block extends PluginComponent {
    static pluginName = 'block'
    static align = 'left'

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.editor.insertText(`:::div{.content-center}
:::div{.content-block}
::h3[Heading]{.content-heading.font-bold}
Content
:::`)
    }

    render() {
        return (
            <span className='justify-center button' title='Block' onClick={this.handleClick}>
                <SubTitleIcon className='h-6 mt-1' />
            </span>
        )
    }
}
