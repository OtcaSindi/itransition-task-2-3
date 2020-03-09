import React from "react"
import DropdownNote from "../dropdown-note"
import InfoNoteModal from "../info-note-modal"

const Note = ({id, title, content, color}) => {
    return (
        <div className="row">
            <div className="col s12 m6">
                <div className="card" style={{backgroundColor: color}}>
                    <div className="card-content white-text"
                         style={{paddingTop: '0'}}>
                        <DropdownNote noteId={id} title={title} content={content} color={color}/>
                        <InfoNoteModal title={title} content={content}/>
                    </div>
                    <div className="card-action">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note
