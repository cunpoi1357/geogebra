import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'geogebra-api.firebaseapp.com',
    projectId: 'geogebra-api',
    storageBucket: 'geogebra-api.appspot.com',
    messagingSenderId: '1026369882889',
    appId: '1:1026369882889:web:04e06870ffc2fdffb3e1d8',
    measurementId: 'G-S2WJCBZ58N'
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
export const auth = getAuth(app)
