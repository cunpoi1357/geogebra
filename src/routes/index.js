import { lazy } from 'react'
import config from '../config'

import Example from '../Pages/Example'
import Home from '../Pages/Home'
import Topic from '../Pages/Topic'
import Admin from '../Pages/Admin'
import TheoryManagement from '../Pages/TheoryManagement'
import MultipleChoiceManagement from '../Pages/MultipleChoiceManagement'
import DefectManagement from '../Pages/DefectManagement'
import StructureManagement from '../Pages/StructureManagement'
import QuestionManagement from '../Pages/QuestionManagement'
import TestYourSelf from '../Pages/TestYourSelf'
import WithoutFooter from '../layouts/WithoutFooter'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import NotFound from '../Pages/NotFound'
const AdminLayout = lazy(() => import('../layouts/AdminLayout'))

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
        path: config.routes.admin,
        component: Admin,
        layout: AdminLayout
    },
    {
        path: config.routes.theoryManagement,
        component: TheoryManagement,
        layout: AdminLayout
    },
    {
        path: config.routes.multipleChoiceManagement,
        component: MultipleChoiceManagement,
        layout: AdminLayout
    },
    {
        path: config.routes.defectManagement,
        component: DefectManagement,
        layout: AdminLayout
    },
    {
        path: config.routes.questionManagement,
        component: QuestionManagement,
        layout: AdminLayout
    },
    {
        path: config.routes.structureManagement,
        component: StructureManagement,
        layout: AdminLayout
    },
    {
        path: config.routes.notFound,
        component: NotFound
    }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
