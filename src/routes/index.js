import { lazy } from 'react'

import config from '../config'

import WithoutFooter from '../layouts/WithoutFooter'
import GeogebraManagement from '../Pages/GeogebraManagement'

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

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home
    },
    {
        path: config.routes.example,
        component: Example,
        layout: WithoutFooter
    },
    {
        path: config.routes.testYourSelf,
        component: TestYourSelf,
        layout: WithoutFooter
    },
    {
        path: config.routes.geogebra,
        component: Geogebra
    },
    {
        path: config.routes.topic,
        component: Topic
    },
    {
        path: config.routes.about,
        component: About,
        layout: WithoutFooter
    },
    {
        path: config.routes.contact,
        component: Contact
    },
    {
        path: config.routes.login,
        component: Login
    },
    {
        path: config.routes.register,
        component: Register
    },
    {
        path: config.routes.notFound,
        component: NotFound
    }
]

const privateRoutes = [
    {
        path: config.routes.admin,
        component: Admin
    },
    {
        path: config.routes.theoryManagement,
        component: TheoryManagement
    },
    {
        path: config.routes.multipleChoiceManagement,
        component: MultipleChoiceManagement
    },
    {
        path: config.routes.defectManagement,
        component: DefectManagement
    },
    {
        path: config.routes.questionManagement,
        component: QuestionManagement
    },
    {
        path: config.routes.structureManagement,
        component: StructureManagement
    },
    {
        path: config.routes.geogebraManagement,
        component: GeogebraManagement
    }
]

export { publicRoutes, privateRoutes }
