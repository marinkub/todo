import { action, makeAutoObservable, observable, runInAction } from "mobx";
import Service from "../service/Service";

class Store {
    values = {
        username:'',
        password:''
    }
    task = {
        title:'',
        description:''
    }
    tasks = []
    status = false
    user = []
    id = ''
    taskID = ''
    order = 'desc'
    ModalShow = false
    ModalTitle = ""
    ModalButton = ""
    UserModalShow = false
    isDisabled = false
    constructor() {
        this.service = new Service();
        makeAutoObservable(this, {
            values: observable,
            task: observable,
            tasks: observable,
            status: observable,
            user: observable,
            id: observable,
            taskID: observable,
            order: observable,
            ModalShow: observable,
            ModalTitle: observable,
            ModalButton: observable,
            UserModalShow: observable,
            isDisabled: observable,
            setValues: action,
            isLoogedin: action,
            openModal: action
        })
    }

    getTasksAsync = async() => {
        const data = await this.service.fetchTasks(this.id, this.order);

        runInAction(() => {
            this.tasks = data;
        })
    }

    async handleSort(values) {
        if (values === "asc")
        {
            this.order = values;
            const data = await this.service.fetchTasks(this.id, this.order);
            runInAction(() => {
                this.tasks = data;
            })
        }
        if (values === "desc")
        {
            this.order = values;
            const data = await this.service.fetchTasks(this.id, this.order);
            runInAction(() => {
                this.tasks = data;
            })
        }
    }

    get TasksList() {
        if(this.tasks.length > 0)
        {
            return this.tasks;
        }
        else
        {
            return null;
        }
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
            this.tasks.map(a => {
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

    loginAction = async() => {
        const data = await this.service.loginCheck(this.values.username, this.values.password)

        runInAction(() => {
            this.user = data;
            this.status = this.user[0].status;
            this.id = this.user[0].id;
            localStorage.setItem('user', this.user[0].id);
            localStorage.setItem('status', this.user[0].status);
        })
    }

    isLoogedin() {
        const loggedInUser = localStorage.getItem("user");
        const loggedStatus = localStorage.getItem("status");
        if (loggedInUser && loggedStatus)
        {
            this.status = loggedStatus;
            this.id = loggedInUser;
        }
    }

    logout() {
        this.id = '';
        this.status = false;
        this.tasks = [];
        localStorage.clear();
    }

    modalAction() {
        if(!this.taskID)
        {
            this.service.addNew(localStorage.getItem("user"), this.task.title, this.task.description);
            this.closeModal();
        }
        else
        {
            this.service.edit(this.task.title, this.task.description, this.taskID);
            this.closeModal();
            this.taskID = null;
        }
    }

    addNewUser() {
        this.service.addNewUser(this.values.username, this.values.password);
        this.loginAction();
        this.closeUserModal();
    }

    /*addNew() {
        this.service.addNew(localStorage.getItem("user"), this.task.title, this.task.description);
    }*/

    onDelete = async(id) => {
        await this.service.delete(id);
    }
}

export default new Store();