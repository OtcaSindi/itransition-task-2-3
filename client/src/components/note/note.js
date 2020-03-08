import React from "react"
import DropdownNote from "../dropdown-note"

const Note = ({id, title, content, color}) => {
    return (
        <div className="row">
            <div className="col s12 m6">
                <div className="card" style={{backgroundColor: color}}>
                    <div className="card-content white-text"
                         style={{paddingTop: '0'}}>
                        <DropdownNote noteId={id} title={title} content={content} color={color}/>
                        <span className="card-title"
                              style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  maxHeight: '50px',
                                  whiteSpace: 'nowrap'
                              }}>{title}</span>
                        <p style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxHeight: '50px',
                            whiteSpace: 'nowrap'
                        }}>{content}</p>
                    </div>
                    <div className="card-action">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note
