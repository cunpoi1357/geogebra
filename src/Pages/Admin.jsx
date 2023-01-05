import { Helmet } from 'react-helmet-async'
import AdminHeader from '../layouts/components/AdminHeader'

function Admin() {
    return (
        <>
            <Helmet>
                <title>StudyGeo3D.com - Trang quản lí</title>
            </Helmet>
            <section>
                <AdminHeader>Trang quản lí</AdminHeader>
            </section>
        </>
    )
}

export default Admin
