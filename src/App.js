import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Fragment, lazy, Suspense } from 'react'
import { publicRoutes } from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'katex/dist/katex.min.css'

const DefaultLayout = lazy(() => import('./layouts/DefaultLayout'))
function App() {
    return (
        <>
            <BrowserRouter>
                <Suspense>
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
                </Suspense>
            </BrowserRouter>
            <ToastContainer limit={1} autoClose={1000} />
        </>
    )
}

export default App
