import React, {useState, Fragment, useContext, useEffect} from "react"
import {GridContextProvider, GridDropZone, GridItem, swap} from "react-grid-dnd"

import Note from "../components/note"
import CreateNoteModal from "../components/create-note-modal"
import {AuthContext} from "../context/AuthContext"
import {create} from "../services"

function NotesPage() {

    const {token} = useContext(AuthContext)
    const [items, setItems] = useState([1, 2, 3, 4, 5])

    const onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
        const nextState = swap(items, sourceIndex, targetIndex)
        setItems(nextState)
        console.log(items)
    }


    return (
        <Fragment>
            <CreateNoteModal token={token}/>
            <GridContextProvider onChange={onChange} style={{maxWidth: '100%'}}>
                <GridDropZone
                    id="items"
                    boxesPerRow={4}
                    rowHeight={320}
                    style={{height: "500px"}}
                >
                    {items.map(item => (
                        <GridItem className="grid-item" key={item}>
                            <div className="center"
                                 style={{
                                     width: "450px",
                                     height: "250px"
                                 }}
                            >
                                <Note/>
                            </div>
                        </GridItem>
                    ))}
                </GridDropZone>
            </GridContextProvider>
        </Fragment>
    )
}

export default NotesPage
