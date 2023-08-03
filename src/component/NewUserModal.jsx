import './Modal.css';
import { observer } from "mobx-react";


function NewUserModal(props) {
    if(!props.show)
    {
        return null
    }
    const store = props.store;
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Create account</h4>
                </div>
                <div className="modal-body">
                    <label>Username: </label>
                    <input 
                        id="NewUsername"
                        type='text'
                        name='NewUsername'
                        value={store.values.username}
                        placeholder='Username'
                        onChange={(e) => store.setUsername(e.target.value)}
                        className="form-control"
                    />
                    <br/>
                    <label>Password: </label>
                    <input 
                        id="NewPassword"
                        type='Password'
                        name='NewPassword'
                        value={store.values.password}
                        placeholder='Password'
                        onChange={(e) => store.setPassword(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={()=> {store.addNewUser()}}>Create</button>
                    <button className="modal-button" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default observer(NewUserModal);