import { onValue, ref } from 'firebase/database'
import { createContext, useEffect } from 'react'
import { database } from '../firebase'
import { useState } from 'react'
import toArray from 'lodash/toArray'

export const AppContext = createContext()

function AppProvider({ children }) {
    const [examples, setExamples] = useState([])
    const [questions, setQuestions] = useState([])
    const [topics, setTopics] = useState([])

    useEffect(() => {
        const unsubscribe = onValue(ref(database), snapshot => {
            const { examples, questions, structure } = snapshot.val()
            setExamples(toArray(examples).filter(item => !!item))
            setQuestions(toArray(questions).filter(item => !!item))
            setTopics(structure.filter(item => !!item))
        })
        return unsubscribe
    }, [])
    return <AppContext.Provider value={{ examples, questions, topics }}>{children}</AppContext.Provider>
}

export default AppProvider
