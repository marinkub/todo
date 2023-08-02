import './Modal.css';
import { observer } from "mobx-react";


function TaskModal(props) {
    if(!props.show)
    {
        return null
    }
    const store = props.store;
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{props.title}</h4>
                </div>
                <div className="modal-body">
                    <label>Title: </label>
                    <input 
                        id="title"
                        type='text'
                        name='title'
                        value={store.task.title}
                        placeholder='Task title'
                        onChange={(e) => store.setTaskTitle(e.target.value)}
                        className="form-control"
                    />
                    <br/>
                    <label>Description:
                    <textarea 
                        id='description'
                        name='description'
                        value={store.task.description}
                        placeholder='Task description'
                        onChange={(e) => store.setTaskDescription(e.target.value)}
                        className="form-control"
                    />
                    </label>
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={()=>{store.modalAction()}}>{props.buttonTitle}</button>
                    <button className="modal-button" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default observer(TaskModal);