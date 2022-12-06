import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'

const Markdown = props => (
    <ReactMarkdown {...props} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex, rehypeRaw]} />
)

export default Markdown
