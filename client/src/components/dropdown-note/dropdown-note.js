import React, {useEffect} from 'react'
import M from 'materialize-css'

const DropdownNote = () => {

    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger')
        M.Dropdown.init(elems, {inDuration: 300, outDuration: 225})
    }, [])

    return (
        <div className="input-field col s12">
            <a className='dropdown-button btn' data-activates='dropdown1'>Drop Me!</a>
            <ul id='dropdown1' className='dropdown-content'>
                <li><a href="#!">one</a></li>
                <li><a href="#!">two</a></li>
                <li className="divider"/>
                <li><a href="#!">three</a></li>
                <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
                <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
            </ul>
        </div>
    )

}
export default DropdownNote
