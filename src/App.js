import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'

import 'react-toastify/dist/ReactToastify.css'
import 'katex/dist/katex.min.css'

import routes from './routes'
import AuthProvider from './Context/AuthProvider'
import AppProvider from './Context/AppProvider'

function App() {
    return (
        <>
            <HelmetProvider>
                <AppProvider>
                    <AuthProvider>
                        <RouterProvider router={routes} />
                    </AuthProvider>
                </AppProvider>
            </HelmetProvider>
            <ToastContainer limit={1} autoClose={1000} />
        </>
    )
}

export default App
