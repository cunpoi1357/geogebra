import { lazy } from 'react'
import config from '../config'

// import AdminLayout from '../layouts/AdminLayout'

import Question from '../Pages/Question'
import Home from '../Pages/Home'
import List from '../Pages/List'
import Admin from '../Pages/Admin'
import TheoryManagement from '../Pages/TheoryManagement'
import MultipleChoiceManagement from '../Pages/MultipleChoiceManagement'
import DefectManagement from '../Pages/DefectManagement'
import StructureManagement from '../Pages/StructureManagement'
import QuestionManagement from '../Pages/QuestionManagement'
import TestYourSelf from '../Pages/TestYourSelf'
const AdminLayout = lazy(() => import('../layouts/AdminLayout'))
const HeaderOnly = lazy(() => import('../layouts/HeaderOnly'))

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home
    },
    {
        path: config.routes.question,
        component: Question
    },
    {
        path: config.routes.testYourSelf,
        component: TestYourSelf,
        layout: HeaderOnly
    },
    {
        path: config.routes.list,
        component: List
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
    }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
