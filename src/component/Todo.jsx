import { observer } from "mobx-react"

function Todo(props) {
    return(
        <>
            <h1>Logged in!</h1>
            <button onClick={() => {props.store.logout()}}>Logout</button>
        </>
    )
}

export default observer(Todo);