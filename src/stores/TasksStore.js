import { action, makeAutoObservable, observable, runInAction } from "mobx";
import Service from "../service/Service";

class TasksStore {
    tasks = []
    order = 'desc'
    constructor() {
        this.service = new Service();
        makeAutoObservable(this, {
            tasks: observable,
            order: observable,
            getTasksAsync: action,
            handleSort: action,
            addNewTask: action,
            editTask: action,
            deleteTask: action
        })
    }

    getTasksAsync = async() => {
        const data = await this.service.fetchTasks(localStorage.getItem("user"), this.order);

        runInAction(() => {
            this.tasks = data;
        })
    }

    async handleSort(values) {
        if (values === "asc")
        {
            this.order = values;
            const data = await this.service.fetchTasks(localStorage.getItem("user"), this.order);
            runInAction(() => {
                this.tasks = data;
            })
        }
        if (values === "desc")
        {
            this.order = values;
            const data = await this.service.fetchTasks(localStorage.getItem("user"), this.order);
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

    async addNewTask(userID, title, description) {
        if(title !== "" && description !== "")
        {
            await this.service.addNew(userID, title, description);
            this.getTasksAsync();
        }
        else
        {
            alert("Title or description can't be empty")
        }
    }

    async editTask(title, description, taskID) {
        if(title !== "" && description !== "")
        {
            await this.service.edit(title, description, taskID)
            const data = await this.service.fetchTasks(localStorage.getItem("user"), this.order);
            runInAction(() => {
                this.tasks = data;
            })
        }
        else
        {
            alert("Title or description can't be empty")
        }
    }

    deleteTask = async(id) => {
        await this.service.delete(id);
        this.getTasksAsync();
    }
}

export default new TasksStore();