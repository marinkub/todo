import { action, makeAutoObservable, observable, runInAction } from "mobx";
import Service from "../service/Service";

class Store {
    values = {
        username:'',
        password:''
    }

    status = false
    user = []
    id = ''
    constructor() {
        this.service = new Service();
        makeAutoObservable(this, {
            values: observable,
            status: observable,
            user: observable,
            id: observable,
            setValues: action,
            isLoogedin: action
        })
    }

    setUsername(values) {
        this.values.username = values;
    }

    setPassword(values) {
        this.values.password = values;
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
        localStorage.clear();
    }
}

export default new Store();