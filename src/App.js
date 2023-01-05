import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'
import uniq from 'lodash/uniq'
import isEqual from 'lodash/isEqual'
import 'react-toastify/dist/ReactToastify.css'
import 'katex/dist/katex.min.css'

import { publicRoutes, privateRoutes } from './routes'
import AuthProvider from './Context/AuthProvider'
import AppProvider from './Context/AppProvider'
import AdminLayout from './layouts/AdminLayout'
import Loading from './components/Loading'

const DefaultLayout = lazy(() => import('./layouts/DefaultLayout'))
function App() {
    return (
        <>
            <BrowserRouter basename='/'>
                <HelmetProvider>
                    <Suspense>
                        <AppProvider>
                            <AuthProvider>
                                <Routes>
                                    {uniq(publicRoutes.map(route => route.layout)).map((layout, index) => {
                                        // get unique layout
                                        let Wrapper = DefaultLayout
                                        // map route corresponding to layout
                                        const routes = publicRoutes
                                            .filter(route => isEqual(layout, route.layout))
                                            .map(route => {
                                                const Page = route.component
                                                return (
                                                    <Route
                                                        key={route.path}
                                                        path={route.path}
                                                        element={
                                                            <Suspense fallback={<Loading />}>
                                                                <Page />
                                                            </Suspense>
                                                        }
                                                    />
                                                )
                                            })

                                        if (layout) {
                                            Wrapper = layout
                                        } else if (layout === null) {
                                            return routes
                                        }
                                        return (
                                            <Route key={index} element={<Wrapper />}>
                                                {routes}
                                            </Route>
                                        )
                                    })}

                                    <Route element={<AdminLayout />}>
                                        {privateRoutes.map(route => {
                                            const Page = route.component
                                            return (
                                                <Route
                                                    key={route.path}
                                                    path={route.path}
                                                    element={
                                                        <Suspense fallback={<Loading />}>
                                                            <Page />
                                                        </Suspense>
                                                    }
                                                />
                                            )
                                        })}
                                    </Route>
                                </Routes>
                            </AuthProvider>
                        </AppProvider>
                    </Suspense>
                </HelmetProvider>
            </BrowserRouter>
            <ToastContainer limit={1} autoClose={1000} />
        </>
    )
}

export default App
