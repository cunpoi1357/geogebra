import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkParse from 'remark-parse'
import remarkDirective from 'remark-directive'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

function myRemarkPlugin() {
    return tree => {
        visit(tree, node => {
            if (node.type === 'textDirective' || node.type === 'leafDirective' || node.type === 'containerDirective') {
                const data = node.data || (node.data = {})
                const hast = h(node.name, node.attributes)

                data.hName = hast.tagName
                data.hProperties = hast.properties
            }
        })
    }
}

const Markdown = props => (
    <ReactMarkdown
        {...props}
        remarkPlugins={[remarkParse, remarkDirective, myRemarkPlugin, remarkRehype, remarkMath, rehypeStringify]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
    />
)

export default Markdown
