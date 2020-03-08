const initialState = {
    notes: [],
    loading: false,
    error: false
}

const notesReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'FETCH_NOTES_REQUEST': {

            return {
                ...state,
                loading: true,
            }
        }

        case 'FETCH_NOTES_SUCCESS': {

            const notes = action.payload

            return {
                ...state,
                loading: false,
                notes
            }
        }

        case 'FETCH_NOTES_FAILURE': {

            return {
                ...state,
                error: action.payload
            }
        }

        // case 'SWAP_NOTES': {
        //
        //     const {firstIndex, secondIndex} = action.payload
        //     const newState = [...state]
        //
        //
        //     return {
        //
        //     }
        // }

        default:
            return state
    }
}

export default notesReducer
