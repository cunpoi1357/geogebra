import { useContext, useState } from 'react'
import { signOut } from 'firebase/auth'
import Button from '../../components/Button'
import LoginModal from '../../components/LoginModal'
import { AuthContext } from '../../Context/AuthProvider'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function AdminHeader({ children }) {
    const [showModal, setShowModal] = useState(false)
    const { user } = useContext(AuthContext)

    const handleLogout = () => {
        signOut(auth)
            .then(() => toast.success('Đăng xuất thành công!'))
            .catch(error => toast.error(error.message))
    }

    const handleCloseModal = () => setShowModal(false)

    return (
        <header className='flex items-center justify-between h-20 px-10 m-4 shadow bg-neutrals-01 rounded-xl'>
            <h1 className='text-xl font-bold'>{children}</h1>
            <nav className='flex items-center'>
                <div className='flex items-center cursor-pointer'>
                    {user.uid ? (
                        <>
                            <img
                                className='w-12 h-12 mr-4 rounded-full'
                                src={
                                    user.photoURL ||
                                    'http://yt3.ggpht.com/wgneNTiW753q5G6XMnjyNLAzReR4TVFJryTKTpIqJefrKMyhABPwfnyNWIoT5NNGstFlva1tgw=s176-c-k-c0x00ffffff-no-rj-mo'
                                }
                                alt='F8'
                            />
                            <div className='mr-4 w-44'>
                                <h5 className='font-semibold'>{user.email}</h5>
                                <button className='text-x text-neutrals-05 hover:underline' onClick={handleLogout}>
                                    Đăng xuất
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link to='/login'>
                            <Button className='bg-neutrals-05' onClick={() => setShowModal(true)}>
                                Đăng nhập
                            </Button>
                        </Link>
                    )}
                </div>
            </nav>
            <LoginModal isOpen={showModal} onClose={handleCloseModal} />
        </header>
    )
}

export default AdminHeader
