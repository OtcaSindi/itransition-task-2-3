import axios from 'axios'

export const create = (baseURL = '') => {

    const api = axios.create({
        baseURL,
        headers: {
            'content-type': 'application/json',
        }
    })

    const setHeader = (token) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    const getUsers = (token) => {
        setHeader(token)
        try {
            return api.get('/api/users')
        } catch (e) {
            throw e
        }
    }

    const deleteById = async (id, token) => {
        setHeader(token)
        try {
            return api.delete(`/api/users/delete/${id}`)
        } catch (e) {
            throw e
        }
    }

    const blockById = async (id, token) => {
        setHeader(token)
        try {
            return api.post(`/api/users/block/${id}`)
        } catch (e) {
            throw e
        }
    }

    const unlockById = async (id, token) => {
        setHeader(token)
        try {
            return api.post(`/api/users/unlock/${id}`)
        } catch (e) {
            throw e
        }
    }

    const logoutRequest = (token) => {
        setHeader(token)
        api.get('/api/users/logout')
    }

    const auth = async (form) => {
        const data = await api.post(
            '/api/auth/login',
            {...form}
            )

        setHeader(data.token)

        return data
    }

    const createNote = async (token, form) => {
        setHeader(token)
        await api.post('/api/notes/create', {...form})
    }

    const getNotes = async (token) => {
        setHeader(token)
        return await api.get('/api/notes')
    }

    const swapNotes = async (token, indexes)=> {
        setHeader(token)
        return await api.post('/api/notes/swap', {...indexes})
    }

    const deleteNoteById = async (token, id) => {
        setHeader(token)
        return await api.delete(`/api/notes/delete/${id}`)
    }

    const editNote = async (token, id, form) => {
        setHeader(token)
        return await api.post(`/api/notes/edit/${id}`, {...form})
    }

    return {
        auth,
        getUsers,
        deleteById,
        blockById,
        unlockById,
        logoutRequest,
        createNote,
        getNotes,
        swapNotes,
        deleteNoteById,
        editNote
    }
}
