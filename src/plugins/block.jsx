import { PluginComponent } from 'react-markdown-editor-lite'

export default class block extends PluginComponent {
    static pluginName = 'block'
    static align = 'left'

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.editor.insertText(`<div class='content-block'>
   <h3 className='bg-[#fffceb] rounded-md px-2'>Title</h3>
    Content
 </div>`)
    }

    render() {
        return (
            <span className='justify-center button' title='Center' onClick={this.handleClick}>
                block
            </span>
        )
    }
}
