import React, {useEffect, useState} from "react"
import {useDispatch} from 'react-redux'

import {create} from "../../services"
import {PINK, BLUE, GREY} from "../../constants"
import {Modal} from 'react-materialize'

import "materialize-css/dist/css/materialize.min.css"
import {notesError, notesLoaded, notesRequested} from "../../actionsCreator"
import {useAuth} from "../../hooks/auth.hook"
import {useMessage} from "../../hooks/message.hook"

const EditNoteModal = ({noteId, title, content, color}) => {

    const {token} = useAuth()
    const message = useMessage()
    const dispatch = useDispatch()

    const [newTitle, setNewTitle] = useState(title)
    const [newContent, setNewContent] = useState(content)
    const [newColor, setNewColor] = useState(color)

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const editNote = (noteId) => async () => {
        if (newTitle) {
            if (newTitle !== title || newContent !== content || newColor !== color) {
                try {
                    dispatch(notesRequested())
                    const {data} = await create()
                        .editNote(token, noteId, {
                            title: newTitle,
                            content: newContent,
                            color: newColor
                        })
                    dispatch(notesLoaded(data))
                } catch (e) {
                    dispatch(notesError(e))
                }
            }
        } else {
            message('Give a title to your note.')
        }
    }

    const changeTitle = (e) => {
        setNewTitle(e.target.value)
    }

    const changeContent = (e) => {
        setNewContent(e.target.value)
    }

    const changeColor = (color) => () => {
        setNewColor(color)
    }

    return (
        <Modal style={{width: '35%'}}
            actions={[
                <button className="modal-close waves-effect waves-red btn-flat">
                    Cancel
                </button>,
                <button className="modal-close waves-effect waves-yellow btn-flat"
                onClick={editNote(noteId)}>
                    Edit
                    </button>
            ]}
            id="modal-0"
            options={{
                dismissible: true,
                endingTop: '10%',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                startingTop: '4%'
            }}
            trigger={<a>Edit</a>}
        >
            <div className="center">
                <h3 style={{paddingTop: '5px'}} className="card-title">Editing note</h3>
            </div>
            <div className="modal-content" style={{padding: '0', height: '150px'}}>
                <div className="input-field col s12">
                    <input
                        id={`title-note-modal${noteId}`}
                        type="text"
                        name={`title${noteId}`}
                        value={newTitle}
                        onChange={changeTitle}
                    />
                    <label htmlFor={`title-note-modal${noteId}`}>Title</label>
                </div>

                <div className="row" style={{marginBottom: '0px'}}>
                    <form className="col s12">
                        <div className="row" style={{marginBottom: '0px'}}>
                            <div className="input-field col s12">
                                    <textarea
                                        style={{
                                            overflow: 'hidden',
                                            resize: 'none'
                                        }}
                                        id={`content-note-modal${noteId}`}
                                        className="materialize-textarea"
                                        name={`content${noteId}`}
                                        value={newContent}
                                        onChange={changeContent}
                                    />
                                <label htmlFor={`content-note-modal${noteId}`}>Description</label>
                            </div>
                        </div>
                    </form>
                </div>

                <div>
                    <p style={{margin: '0'}} onClick={changeColor(BLUE)}>
                        <label>
                            <input className="with-gap" name={`radio${noteId}`} type="radio" defaultChecked={newColor === BLUE}/>
                            <span/>
                            <div
                                style={{
                                    display: 'inline-block',
                                    width: '25px',
                                    height: '25px',
                                    borderRadius: '50%',
                                    backgroundColor: BLUE
                                }}/>
                        </label>
                    </p>

                    <p style={{margin: '0'}} onClick={changeColor(GREY)}>
                        <label>
                            <input className="with-gap" name={`radio${noteId}`} type="radio" defaultChecked={newColor === GREY}/>
                            <span/>
                            <div
                                style={{
                                    display: 'inline-block',
                                    width: '25px',
                                    height: '25px',
                                    borderRadius: '50%',
                                    backgroundColor: GREY
                                }}/>
                        </label>
                    </p>

                    <p style={{margin: '0'}} onClick={changeColor(PINK)}>
                        <label>
                            <input className="with-gap" name={`radio${noteId}`} type="radio" defaultChecked={newColor === PINK}/>
                            <span/>
                            <div
                                style={{
                                    display: 'inline-block',
                                    width: '25px',
                                    height: '25px',
                                    borderRadius: '50%',
                                    backgroundColor: PINK
                                }}/>
                        </label>
                    </p>
                </div>

            </div>
            <div className="modal-footer" style={{paddingTop: '0px'}}>

            </div>
        </Modal>
    )
}

export default EditNoteModal

