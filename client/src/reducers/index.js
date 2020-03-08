import {combineReducers} from "redux"

import usersReducer from './usersReducer'
import notesReducer from "./notesReducer"

export default combineReducers({usersReducer, notesReducer})
