import React, {useState} from "react"
import {useDispatch} from 'react-redux'

import {create} from "../../services"
import {PINK, BLUE, GREY} from "../../constants"
import {Modal} from 'react-materialize'

import "materialize-css/dist/css/materialize.min.css"
import {fetchNotes} from "../../actionsCreator"
import {useAuth} from "../../hooks/auth.hook"
import {useMessage} from "../../hooks/message.hook"

const CreateNoteModal = () => {

    const {token} = useAuth()
    const dispatch = useDispatch()
    const message = useMessage()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [color, setColor] = useState(PINK)

    const createNote = async () => {
        if (title) {
            await create()
                .createNote(token, {
                    title,
                    content,
                    color
                })
            dispatch(fetchNotes(token))
        } else {
            message('Give a title to your note.')
        }
    }

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const changeContent = (e) => {
        setContent(e.target.value)
    }

    const changeColor = (color) => () => {
        setColor(color)
    }

    return (
        <Modal style={{width: '35%'}}
               actions={[
                   <button className="modal-close waves-effect waves-red btn-flat">
                       Cancel
                   </button>,
                   <button className="modal-close waves-effect waves-green btn-flat"
                           onClick={createNote}>
                       Create
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
               trigger={
                       <button
                           className="waves-effect blue darken-3 btn modal-trigger"
                           style={{fontSize: '22px', position: 'relative', top: '5px', right: '50px'}}
                           data-target="modal1"
                       >
                           +
                       </button>
               }
        >
            <div className="center">
                <h3 style={{paddingTop: '5px'}} className="card-title">Create note</h3>
            </div>
            <div className="modal-content" style={{padding: '0', height: '150px'}}>
                <div className="input-field col s12">
                    <input
                        id={`title-note-modal`}
                        type="text"
                        name={`title`}
                        value={title}
                        onChange={changeTitle}
                    />
                    <label htmlFor={`title-note-modal`}>Title</label>
                </div>

                <div className="row" style={{marginBottom: '0px'}}>
                    <form className="col s12">
                        <div className="row" style={{marginBottom: '0px'}}>
                            <div className="input-field col s12">
                                    <textarea
                                        id={`content-note-modal`}
                                        className="materialize-textarea"
                                        name={`content`}
                                        value={content}
                                        onChange={changeContent}
                                    />
                                <label htmlFor={`content-note-modal`}>Description</label>
                            </div>
                        </div>
                    </form>
                </div>

                <div>
                    <p style={{margin: '0'}} onClick={changeColor(BLUE)}>
                        <label>
                            <input className="with-gap" name={`radio`} type="radio"/>
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
                            <input className="with-gap" name={`radio`} type="radio"/>
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
                            <input className="with-gap" name={`radio`} type="radio"/>
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

export default CreateNoteModal

