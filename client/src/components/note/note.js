import React from "react"
import DropdownNote from "../dropdown-note"

const Note = ({title, content}) => {
    return (
        <div className="row">
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <DropdownNote/>
                        <span className="card-title">{title}</span>
                        <p>{content}</p>
                    </div>
                    <div className="card-action">
                        {/*<a href="#">This is a link</a>*/}
                        {/*<a href="#">This is a link</a>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note
