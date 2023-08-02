import { observer } from "mobx-react"

function Todo(props) {
    return(
        <>
            <div>
                <button onClick={() => {props.store.logout()}}>Logout</button>
            </div>
            <h1>Logged in!</h1>
            <button onClick={() => props.store.openModal()}>Add new task</button>
        </>
    )
}

export default observer(Todo);