import { onAuthStateChanged } from 'firebase/auth'
import { useState, createContext, useEffect } from 'react'
import { auth } from '../firebase'

export const AuthContext = createContext()

function AuthProvider({ children }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                const {
                    displayName,
                    email,
                    photoURL,
                    reloadUserInfo: { customAttributes },
                    uid
                } = user
                setUser({
                    displayName,
                    email,
                    photoURL,
                    role: customAttributes && JSON.parse(customAttributes),
                    uid
                })
                return
            }
            setUser({})
        })
        return () => unsubscribe
    }, [])

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export default AuthProvider
