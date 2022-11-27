import { lazy } from 'react'
import config from '../config'

// import AdminLayout from '../layouts/AdminLayout'

import Question from '../Pages/Question'
import Home from '../Pages/Home'
import Admin from '../Pages/Admin'
import List from '../Pages/List'
import TheoryManagement from '../Pages/TheoryManagement'
import MultipleChoiceManagement from '../Pages/MultipleChoiceManagement'
import DefectManagement from '../Pages/DefectManagement'
import StructureManagement from '../Pages/StructureManagement'
import TestManagement from '../Pages/TestManagement'
const AdminLayout = lazy(() => import('../layouts/AdminLayout'))

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
        path: config.routes.admin,
        component: Admin,
        layout: AdminLayout
    },
    {
        path: config.routes.list,
        component: List
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
        path: config.routes.testManagement,
        component: TestManagement,
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
