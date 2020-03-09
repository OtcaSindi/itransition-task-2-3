import React from "react"
import {Button} from 'react-materialize'
import {useSelector} from "react-redux"

const DownloadAllNotes = () => {

    const notes = useSelector(state => state.notesReducer.notes)
    let result = ''
    for (let i = 0; i < notes.length; i++) {
        result += `Note: ${notes[i].title}\nDescription: ${notes[i].content}\n\n`
    }
    if (!result) {
        result = 'You have no notes.'
    }

    return (
        <Button
            className="waves-effect blue darken-3 btn modal-trigger center"
            style={{position: 'relative', top: '5px', right: '162px', width: '52px'}}
            node="button"
            tooltip="Download all notes"
            waves="light"
        >
            <a  style={{color: 'white'}}
                href={'data:text/plain;charset=UTF-8,' + encodeURIComponent(result)}
                download="allNotes.txt">
                <i className="material-icons">file_download</i>
            </a>
        </Button>
    )
}

export default DownloadAllNotes
