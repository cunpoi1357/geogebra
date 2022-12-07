import MdEditor from 'react-markdown-editor-lite'
// import style manually
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import 'react-markdown-editor-lite/lib/index.css'
import { storage } from '../firebase'
import Markdown from '../components/Markdown'

import addGeogebra from '../plugins/addGeogebra'
import center from '../plugins/center'
import block from '../plugins/block'

MdEditor.use(addGeogebra)
MdEditor.use(center)
MdEditor.use(block)

const handleImageUpload = async file => {
    const imagesRef = ref(storage, `images/${file.name}`)
    await uploadBytes(imagesRef, file)
    const url = await getDownloadURL(imagesRef)
    return url
}

function MarkdownEditor({ value, onChange }) {
    return (
        <MdEditor
            style={{ height: '100%' }}
            renderHTML={text => <Markdown>{text}</Markdown>}
            onImageUpload={handleImageUpload}
            value={value}
            onChange={onChange}
        />
    )
}

export default MarkdownEditor
