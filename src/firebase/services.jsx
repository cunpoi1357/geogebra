import { get, ref as databaseRef, remove, set, update } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { database, storage } from './index'

export const setDatabase = (path, value) => set(databaseRef(database, path), value)

export const getDatabase = path => get(databaseRef(database, path))

export const updateDatabase = (path, value) => update(databaseRef(database, path), value)

export const removeDatabase = path => remove(databaseRef(database, path))

export const uploadData = async (path, data) => {
    const fileRef = storageRef(storage, path)
    await uploadBytes(fileRef, data)
    return await getDownloadURL(fileRef)
}
