import { observer } from "mobx-react";
import { useEffect } from "react";

function Login(props) {
    const store = props.store;
    
    return (
        <div>
            <input 
                id="username"
                type="text"
                name="username"
                value={store.values.username}
                placeholder="Username"
                onChange={(e) => store.setUsername(e.target.value)}
                className="userinput"
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
            />
            <br/>
            <button onClick={() => {store.loginAction()}}>Login</button>
        </div>
    )
}

export default observer(Login);