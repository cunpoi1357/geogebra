import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Fragment } from 'react'
import { publicRoutes } from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'katex/dist/katex.min.css'

import DefaultLayout from './layouts/DefaultLayout'
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component
                        let Layout = DefaultLayout

                        if (route.layout) {
                            Layout = route.layout
                        } else if (route.layout === null) {
                            Layout = Fragment
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })}
                </Routes>
            </BrowserRouter>
            <ToastContainer limit={1} />
        </>
    )
}

export default App
