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
                const attributes = node.attributes || {}
                const id = attributes?.id
                switch (node.name) {
                    case 'geo':
                        console.log('attributes', attributes)
                        if (node.type === 'textDirective')
                            console.log('Text directives for `geogebra` not supported', node)
                        if (!id) console.log('Missing geogebra id', node)
                        data.hName = 'iframe'
                        data.hProperties = {
                            src: `https://www.geogebra.org/calculator/${id}?embed`,
                            width: 800,
                            height: 600,
                            frameBorder: 0,
                            style: 'border:1px solid #e4e4e4;border-radius: 4px;',
                            allowFullScreen: true
                        }
                        break
                    default:
                        const hast = h(node.name, attributes)
                        data.hName = hast.tagName
                        data.hProperties = hast.properties
                }
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
