import React from "react"

import {Dropdown} from 'react-materialize'

import {useAuth} from "../../hooks/auth.hook"
import {create} from "../../services"
import {useDispatch} from "react-redux"
import {notesRequested, notesLoaded, notesError} from "../../actionsCreator"
import EditNoteModal from "../edit-note-modal"

const DropdownNote = ({noteId, title, content, color}) => {

    const {token} = useAuth()
    const dispatch = useDispatch()

    const removeNoteById = (id) => async () => {
        try {
            dispatch(notesRequested())
            const {data} = await create().deleteNoteById(token, id)
            dispatch(notesLoaded(data))
        } catch (e) {
            dispatch(notesError(e))
        }
    }

    return (
        <Dropdown
            options={{
                alignment: 'left',
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                container: null,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 250
            }}
            trigger={<i
                style={{
                    border: "1px solid white",
                    borderRadius: '20%',
                    position: 'relative',
                    top: '10px',
                    right: '80px'
                }}
                className="material-icons">edit</i>}
        >
            <EditNoteModal token={token} noteId={noteId} title={title} content={content} color={color}/>
            <a onClick={removeNoteById(noteId)}>
                Delete
            </a>
        </Dropdown>
    )
}

export default DropdownNote
