import { useEffect } from "react";

function TasksTable(props) {

    useEffect(() => {
        props.store.TasksStore.getTasksAsync();
    }, []);

    return(
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date  added</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list
                        ? props.list.map((task) => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.date}</td>
                                <td><button onClick={() =>{props.store.openModal(task.id)}}>Edit</button></td>
                                <td><button onClick={() =>{props.store.TasksStore.deleteTask(task.id)}}>Delete</button></td>
                            </tr>
                        ))
                        : <tr><td>No results</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TasksTable;