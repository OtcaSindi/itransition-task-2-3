import React, {Component, Fragment} from "react"

import {create} from "../../services"

import M from "materialize-css"
import "materialize-css/dist/css/materialize.min.css"

class CreateNoteModal extends Component {

    state = {
        title: '',
        content: ''
    }

    componentDidMount() {
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        }
        M.Modal.init(this.Modal, options)
    }

    createNote = () => {
        create().createNote(this.props.token, {...this.state, color: 'blue'})
    }

    changeHandler =  (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {

        return (
            <Fragment>
                <div style={{display:"flex"}}>
                    <button
                        className="waves-effect blue darken-3 btn modal-trigger"
                        data-target="modal1"
                    >
                        Add note
                    </button>
                </div>

                <div
                    ref={Modal => {
                        this.Modal = Modal
                    }}
                    id="modal1"
                    className="modal"
                    style={{width: '35%'}}
                >
                    <div className="center">
                        <h3 className="card-title">New note</h3>
                    </div>
                    <div className="modal-content" style={{paddingBottom: '0px'}}>
                        <div className="input-field col s12">
                            <input
                                   id="title-note-modal"
                                   type="text"
                                   name="title"
                                   value={this.state.title}
                                   onChange={this.changeHandler}
                            />
                            <label htmlFor="title-note-modal">Title</label>
                        </div>

                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea
                                            id="content-note-modal"
                                            className="materialize-textarea"
                                            name="content"
                                            value={this.state.content}
                                            onChange={this.changeHandler}
                                        />
                                        <label htmlFor="content-note-modal">Description</label>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div className="modal-footer" style={{paddingTop: '0px'}}>
                        <button className="modal-close waves-effect waves-red btn-flat">
                            Cancel
                        </button>
                        <button className="modal-close waves-effect waves-green btn-flat"
                                onClick={this.createNote}>
                            Create
                        </button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default CreateNoteModal
