import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ReactGA from 'react-ga'

ReactGA.initialize('G-S2WJCBZ58N')
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
