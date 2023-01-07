import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css'
import { uploadData } from '../firebase/services'
import Markdown from '../components/Markdown'

import addGeogebra from '../plugins/addGeogebra'
import center from '../plugins/center'
import block from '../plugins/block'
import addYoutube from '../plugins/addYoutube'

MdEditor.use(center)
MdEditor.use(block)
MdEditor.use(addGeogebra)
MdEditor.use(addYoutube)

const handleImageUpload = async file => await uploadData(`images/${file.name}`, file)

function MarkdownEditor({ className, value, onChange }) {
    return (
        <MdEditor
            className={className}
            style={{ height: '100%' }}
            renderHTML={text => <Markdown>{text}</Markdown>}
            onImageUpload={handleImageUpload}
            value={value}
            onChange={onChange}
        />
    )
}

export default MarkdownEditor
