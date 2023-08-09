import { observer } from "mobx-react"

function Todo(props) {
    return(
        <>
            <div className="topBar">
                <p>{props.store.UserStore.username}</p>
                <p className="logoutButton" onClick={() => {props.store.UserStore.Logout()}}>Logout</p>
            </div>
            <h1>Todo list</h1>
        </>
    )
}

export default observer(Todo);