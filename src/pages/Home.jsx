import Login from '../component/Login';
import Todo from '../component/Todo';
import TaskModal from '../component/TaskModal';
import TasksTable from '../component/TasksTable';
import NewUserModal from '../component/NewUserModal';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

function Home(props) {

    useEffect(() => {
        props.store.isLoogedin();
    }, []);

    if (props.store.status === false)
    {
        return (
            <>
            <Login store={props.store} />
            <NewUserModal store={props.store} show={props.store.UserModalShow} onClose={()=> props.store.closeUserModal()}/>
            </>
        )
    }
    else
    {
        return (
            <>
            <Todo store={props.store} />
            <TasksTable store={props.store} list={props.store.TasksList}/>
            <TaskModal store={props.store} show={props.store.ModalShow} onClose={() => props.store.closeModal()} title={props.store.ModalTitle} buttonTitle={props.store.ModalButton}/>
            </>
        )
    }
}

export default observer(Home);