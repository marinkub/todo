import Login from '../component/Login';
import Todo from '../component/Todo';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

function Home(props) {

    useEffect(() => {
        props.store.isLoogedin();
    }, []);

    if (props.store.status === false)
    {
        return (
            <Login store={props.store}/>
        )
    }
    else
    {
        return (
            <Todo store={props.store}/>
        )
    }
}

export default observer(Home);