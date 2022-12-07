import { PluginComponent } from 'react-markdown-editor-lite'

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
            <span className='justify-center button' title='Center' onClick={this.handleClick}>
                block
            </span>
        )
    }
}
