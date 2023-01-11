import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import config from '../config'

import WithoutFooter from '../layouts/WithoutFooter'
import DefaultLayout from '../layouts/DefaultLayout'
import AdminLayout from '../layouts/AdminLayout'

const Home = lazy(() => import('../Pages/Home'))
const About = lazy(() => import('../Pages/About'))
const Contact = lazy(() => import('../Pages/Contact'))
const Login = lazy(() => import('../Pages/Login'))
const Register = lazy(() => import('../Pages/Register'))
const Example = lazy(() => import('../Pages/Example'))
const Topic = lazy(() => import('../Pages/Topic'))
const TestYourSelf = lazy(() => import('../Pages/TestYourSelf'))
const Geogebra = lazy(() => import('../Pages/Geogebra'))
const NotFound = lazy(() => import('../Pages/NotFound'))

const Admin = lazy(() => import('../Pages/Admin'))
const MultipleChoiceManagement = lazy(() => import('../Pages/MultipleChoiceManagement'))
const DefectManagement = lazy(() => import('../Pages/DefectManagement'))
const StructureManagement = lazy(() => import('../Pages/StructureManagement'))
const QuestionManagement = lazy(() => import('../Pages/QuestionManagement'))
const TheoryManagement = lazy(() => import('../Pages/TheoryManagement'))
const GeogebraManagement = lazy(() => import('../Pages/GeogebraManagement'))


const routes = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            {
                path: config.routes.home,
                element: <Home />
            },
            {
                path: config.routes.contact,
                element: <Contact />
            },

            {
                path: config.routes.login,
                element: <Login />
            },
            {
                path: config.routes.register,
                element: <Register />
            },
            {
                path: config.routes.topic,
                element: <Topic />
            },
            {
                path: config.routes.geogebra,
                element: <Geogebra />
            },
            {
                path: config.routes.notFound,
                element: <NotFound />
            }
        ]
    },
    {
        element: <WithoutFooter />,
        children: [
            {
                path: config.routes.about,
                element: <About />
            },
            {
                path: config.routes.example,
                element: <Example />
            },
            {
                path: config.routes.example,
                element: <TestYourSelf />
            }
        ]
    },
    {
        path: config.routes.admin,
        element: <AdminLayout />,
        children: [
            {
                path: '',
                element: <Admin />
            },
            {
                path: config.routes.structureManagement,
                element: <StructureManagement />
            }
            , {
                path: config.routes.multipleChoiceManagement,
                element: <MultipleChoiceManagement />
            },
            {
                path: config.routes.defectManagement,
                element: <DefectManagement />
            },
            {
                path: config.routes.theoryManagement,
                element: <TheoryManagement />
            },
            {
                path: config.routes.questionManagement,
                element: <QuestionManagement />
            },
            {
                path: config.routes.geogebraManagement,
                element: <GeogebraManagement />
            }
        ]
    }
],
    {
        basename: '/'
    }
)

export default routes 
