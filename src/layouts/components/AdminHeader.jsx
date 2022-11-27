import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import Button from '../../components/Button'
import LoginModal from '../../components/LoginModal'

function AdminHeader({ children }) {
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState(null)

    const auth = getAuth()
    useEffect(() => {
        onAuthStateChanged(auth, user => (user ? setUser(user) : setUser(null)))
    }, [auth])

    const handleLogout = () => {
        signOut(auth)
            .then(status => console.log(status))
            .catch(error => console.log(error))
    }

    const handleCloseModal = () => setShowModal(false)

    return (
        <header className='flex items-center justify-between h-20 px-10 m-4 shadow bg-neutrals-01 rounded-xl'>
            <h2 className='font-bold'>{children}</h2>
            <nav className='flex items-center'>
                <div className='flex items-center cursor-pointer'>
                    {user ? (
                        <>
                            <img
                                className='w-12 h-12 mr-4 rounded-full'
                                src='http://yt3.ggpht.com/wgneNTiW753q5G6XMnjyNLAzReR4TVFJryTKTpIqJefrKMyhABPwfnyNWIoT5NNGstFlva1tgw=s176-c-k-c0x00ffffff-no-rj-mo'
                                alt='F8'
                            />
                            <div className='mr-4 w-44'>
                                <h4 className='font-semibold'>{user.email}</h4>
                                <button className='text-x text-neutrals-05 hover:underline' onClick={handleLogout}>
                                    Đăng xuất
                                </button>
                            </div>
                        </>
                    ) : (
                        <Button className='bg-neutrals-05' onClick={() => setShowModal(true)}>
                            Đăng nhập
                        </Button>
                    )}
                </div>
            </nav>
            <LoginModal isOpen={showModal} onClose={handleCloseModal} />
        </header>
    )
}

export default AdminHeader
