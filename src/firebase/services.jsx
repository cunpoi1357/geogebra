import { get, ref, remove, set, update } from 'firebase/database'
import { database } from './index'

export const setDatabase = (path, value) => set(ref(database, path), value)

export const getDatabase = path => get(ref(database, path))

export const updateDatabase = (path, value) => update(ref(database, path), value)

export const removeDatabase = path => remove(ref(database, path))
