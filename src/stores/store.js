import { action, makeAutoObservable, observable } from "mobx";
import Service from "../service/Service";
import TasksStore from "./TasksStore";
import UserStore from "./UserStore";

class Store {
    values = {
        username:'',
        password:''
    }
    task = {
        title:'',
        description:''
    }
    taskID = ''
    ModalShow = false
    ModalTitle = ""
    ModalButton = ""
    UserModalShow = false
    isDisabled = false
    constructor() {
        this.TasksStore = TasksStore;
        this.UserStore = UserStore;
        this.service = new Service();
        makeAutoObservable(this, {
            values: observable,
            task: observable,
            taskID: observable,
            ModalShow: observable,
            ModalTitle: observable,
            ModalButton: observable,
            UserModalShow: observable,
            isDisabled: observable,
            currentId: action,
            openUserModal: action,
            closeUserModal: action,
            openModal: action,
            closeModal: action,
            setUsername: action,
            setPassword: action,
            setTaskTitle: action,
            setTaskDescription: action,
            modalAction: action,
            loginAction: action,
            addNewUser: action
        })
    }

    currentId = (id) => {
        if(!id)
        {
            this.task.title = "";
            this.task.description = "";
            this.ModalTitle = "Add new task";
            this.ModalButton = "Add";
        }
        else
        {
            this.TasksStore.TasksList.map(a => {
                if(a.id === id)
                {
                    this.task.title = a.title;
                    this.task.description = a.description;
                    this.ModalTitle = "Edit task";
                    this.ModalButton = "Edit";
                    this.taskID = a.id;
                }
            })
        }
    }

    openUserModal() {
        this.UserModalShow = true;
        this.isDisabled = true;
    }

    closeUserModal() {
        this.UserModalShow = false;
        this.isDisabled = false;
    }

    openModal(id) {
        this.ModalShow = true;
        this.currentId(id);
    }

    closeModal() {
        this.ModalShow = false;
    }

    setUsername(values) {
        this.values.username = values;
    }

    setPassword(values) {
        this.values.password = values;
    }

    setTaskTitle(values) {
        this.task.title = values;
    }

    setTaskDescription(values) {
        this.task.description = values;
    }

    modalAction() {
        if(!this.taskID)
        {
            this.TasksStore.addNewTask(localStorage.getItem("user"), this.task.title, this.task.description)
            this.closeModal();
        }
        else
        {
            this.TasksStore.editTask(this.task.title, this.task.description, this.taskID);
            this.closeModal();
            this.taskID = null;
        }
    }

    loginAction = async() => {
        this.UserStore.loginUser(this.values.username, this.values.password);
    }
   
    addNewUser() {
        this.UserStore.addNewUser(this.values.username, this.values.password);
        this.closeUserModal();
    }
}

export default new Store();