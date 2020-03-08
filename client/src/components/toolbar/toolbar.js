import React, {useContext} from "react"
import {useDispatch, useSelector} from "react-redux"

import {create} from "../../services"
import {fetchUsers} from "../../actionsCreator"
import {AuthContext} from "../../context/AuthContext"
import {storageName} from "../../hooks/auth.hook"
import {useMessage} from "../../hooks/message.hook"

const Toolbar = () => {

    const {token, logout} = useContext(AuthContext)
    const {usersReducer: {users}} = useSelector(state => state)
    const dispatch = useDispatch()
    const message = useMessage()

    const block = async () => {
        try {
            const usersChecked = users.filter((user) => user.checked === true)

            if (usersChecked.length !== 0) {

                const usersUnlocked = usersChecked.filter((user) => user.status !== 'Blocked')

                if (usersUnlocked.length !== 0) {

                    const currentUserId = JSON.parse(localStorage.getItem(storageName)).userId
                    const currentUser = usersChecked.find((user) => user.id === currentUserId)

                    await Promise.all(usersChecked.map((user) => {
                        return create().blockById(user.id, token)
                    }))

                    if (currentUser) {
                        return logout()
                    }

                    dispatch(fetchUsers(token))
                } else {
                    usersChecked.length === 1 ?
                        message('User is already blocked.') :
                        message('Users are already blocked.')
                }
            }
        } catch (e) {
            throw e
        }
    }

    const remove = async () => {
        try {
            const usersChecked = users.filter((user) => user.checked === true)

            if (usersChecked.length !== 0) {
                const currentUserId = JSON.parse(localStorage.getItem(storageName)).userId
                const currentUser = usersChecked.find((user) => user.id === currentUserId)

                await Promise.all(usersChecked.map((user) => {
                    return create().deleteById(user.id, token)
                }))

                if (currentUser) {
                    return logout()
                }

                dispatch(fetchUsers(token))
            }
        } catch (e) {
            throw e
        }
    }

    const unlock = async () => {
        try {
            const usersChecked = users.filter((user) => user.checked === true)

            if (usersChecked.length !== 0) {

                const usersBlocked = usersChecked.filter((user) => user.status === 'Blocked')

                if (usersBlocked.length !== 0) {
                    await Promise.all(usersChecked.map((user) => {
                        return create().unlockById(user.id, token)
                    }))

                    dispatch(fetchUsers(token))
                } else {
                    usersChecked.length === 1 ?
                        message('User is not blocked.') :
                        message('Users are not blocked.')
                }
            }
        } catch (e) {
            throw e
        }
    }

    return (
        <div className="toolbar-buttons">
            <button className="waves-effect blue darken-3 btn" onClick={block}>Block</button>
            <button className="waves-effect blue darken-3 btn" onClick={unlock}>Unlock</button>
            <button className="waves-effect blue darken-3 btn" onClick={remove}>Delete</button>
        </div>
    )
}

export default Toolbar
