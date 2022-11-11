import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const Markdown = props => <ReactMarkdown {...props} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} />

export default Markdown
