import { action, makeAutoObservable, observable, runInAction } from "mobx";
import Service from "../service/Service";

class UserStore {
    userID = ''
    status = false
    user = []
    constructor() {
        this.service = new Service();
        makeAutoObservable(this, {
            userID: observable,
            status: observable,
            user: observable,
            loginUser: action,
            isLoggedin: action,
            Logout: action,
            addNewUser: action
        })
    }

    loginUser = async(username, password) => {
        const data = await this.service.loginCheck(username, password);

        runInAction(() => {
            this.user = data;
            this.status = this.user[0].status;
            this.userID = this.user[0].id;
            localStorage.setItem('user', this.user[0].id);
            localStorage.setItem('status', this.user[0].status);
        })
    }

    isLoggedIn() {
        const loggedInUser = localStorage.getItem("user");
        const loggedInStatus = localStorage.getItem("status");
        if (loggedInUser && loggedInStatus)
        {
            this.status = loggedInStatus;
            this.userID = loggedInUser;
        }
    }

    Logout() {
        this.id = '';
        this.status = false;
        this.tasks = [];
        localStorage.clear();
    }

    addNewUser(username, password) {
        this.service.addNewUser(username, password);
        this.loginUser(username, password);
    }
}

export default new UserStore();