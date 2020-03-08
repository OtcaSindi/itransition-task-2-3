import React, {useState, Fragment, useContext, useEffect} from "react"
import {GridContextProvider, GridDropZone, GridItem, swap} from "react-grid-dnd"

import Note from "../components/note"
import CreateNoteModal from "../components/create-note-modal"
import {AuthContext} from "../context/AuthContext"
import {useDispatch, useSelector} from "react-redux"
import {fetchNotes, swapNotesRequest} from "../actionsCreator"
import Loader from "../components/loader"

function NotesPage() {

    const {notes, loading} = useSelector(state => state.notesReducer)
    const dispatch = useDispatch()
    const {token} = useContext(AuthContext)
    const [items, setItems] = useState([])

    const onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
        if (sourceIndex !== targetIndex && targetIndex < notes.length) {
            const nextState = swap(items, sourceIndex, targetIndex)
            setItems(nextState)
            dispatch(swapNotesRequest(token, sourceIndex, targetIndex))
        }
    }

    useEffect(() => {
        dispatch(fetchNotes(token))
    }, [dispatch, token])

    if (loading) {
        return <Loader/>
    }

    return (
        <Fragment>
            <CreateNoteModal token={token}/>
            <GridContextProvider onChange={onChange} style={{maxWidth: '100%'}}>
                <GridDropZone
                    id="items"
                    boxesPerRow={4}
                    rowHeight={200}
                    style={{height: "500px"}}
                >
                    {notes.map(note => (
                        <GridItem className="grid-item" key={note.id}>
                            <div className="center"
                                 style={{
                                     width: "450px",
                                     height: "250px"
                                 }}
                            >
                                <Note title={note.title} content={note.content}/>
                            </div>
                        </GridItem>
                    ))}
                </GridDropZone>
            </GridContextProvider>
        </Fragment>
    )
}

export default NotesPage
