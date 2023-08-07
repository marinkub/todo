import { observer } from "mobx-react";

function Login(props) {
    const store = props.store;
    
    return (
        <div className="Login">
            <input 
                id="username"
                type="text"
                name="username"
                value={store.values.username}
                placeholder="Username"
                onChange={(e) => store.setUsername(e.target.value)}
                className="userinput"
                disabled={store.isDisabled}
            />
            <br/>
            <input 
                id="password"
                type="password"
                name="password"
                value={store.values.password}
                placeholder="Password"
                onChange={(e) => store.setPassword(e.target.value)}
                className="userinput"
                disabled={store.isDisabled}
            />
            <br/>
            <button onClick={() => {store.loginAction()}}>Login</button>
            <br/>
            <button onClick={() => {store.openUserModal()}}>Create account</button>
        </div>
    )
}

export default observer(Login);