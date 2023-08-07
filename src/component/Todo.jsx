import { observer } from "mobx-react"

function Todo(props) {
    return(
        <>
            <div>
                <button onClick={() => {props.store.UserStore.Logout()}}>Logout</button>
            </div>
            <h1>Logged in!</h1>
            <button onClick={() => props.store.openModal()}>Add new task</button>
            <select
                className="taskSort"
                onChange={(e) => {
                    props.store.TasksStore.handleSort(e.target.value);
                }} 
            >
                <option className="option" value="desc">Newest</option>
                <option className="option" value="asc">Oldest</option>
            </select>
        </>
    )
}

export default observer(Todo);