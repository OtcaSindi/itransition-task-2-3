import {create} from "../services"

const usersRequested = () => {
    return {
        type: 'FETCH_USERS_REQUEST'
    }
}

const usersLoaded = (newUsers) => {
    return {
        type: 'FETCH_USERS_SUCCESS',
        payload: newUsers
    }
}

const usersError = (error) => {
    return {
        type: 'FETCH_USERS_FAILURE',
        payload: error
    }
}

const editUserCheckbox = (userId) => {
    return {
        type: 'EDIT_USER_CHECKBOX',
        payload: userId
    }
}

const editUserAllCheckbox = () => {
    return {
        type: 'EDIT_USER_ALL_CHECKBOX'
    }
}

const fetchUsers = (token) => (dispatch) => {
    dispatch(usersRequested())
    create().getUsers(token)
        .then(({data}) => {
            dispatch(usersLoaded(data))
        })
        .catch((err) => {
                dispatch(usersError(err))
                throw err
            }
        )
}

const notesRequested = () => {
    return {
        type: 'FETCH_NOTES_REQUEST'
    }
}

const notesLoaded = (newNotes) => {
    return {
        type: 'FETCH_NOTES_SUCCESS',
        payload: newNotes
    }
}

const notesError = (error) => {
    return {
        type: 'FETCH_NOTES_FAILURE',
        payload: error
    }
}

const fetchNotes = (token) => (dispatch) => {
    dispatch(notesRequested())
    create().getNotes(token)
        .then(({data}) => {
            dispatch(notesLoaded(data))
        })
        .catch((err) => {
                dispatch(notesError(err))
                throw err
            }
        )
}

const swapNotesRequest = (token, firstIndex, secondIndex) => (dispatch) => {
    dispatch(notesRequested())
    create().swapNotes(token, {firstIndex, secondIndex})
        .then(({data}) => {
            dispatch(notesLoaded(data))
        })
        .catch((err) => {
                dispatch(notesError(err))
                throw err
            }
        )
}

export {
    usersRequested,
    usersLoaded,
    usersError,
    fetchUsers,
    editUserCheckbox,
    editUserAllCheckbox,
    fetchNotes,
    notesError,
    notesLoaded,
    notesRequested,
    swapNotesRequest
}
