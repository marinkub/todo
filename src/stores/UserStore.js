import { action, makeAutoObservable, observable, runInAction } from "mobx";
import Service from "../service/Service";

class UserStore {
    userID = ''
    status = false
    user = []
    username = ''
    constructor() {
        this.service = new Service();
        makeAutoObservable(this, {
            userID: observable,
            status: observable,
            user: observable,
            username: observable,
            loginUser: action,
            isLoggedin: action,
            Logout: action,
            addNewUser: action
        })
    }

    loginUser = async(username, password) => {
        if (username !== "" && password !== "")
        {
            const data = await this.service.loginCheck(username, password);

            if(data.length > 0)
            {
                runInAction(() => {
                    this.user = data;
                    this.status = this.user[0].status;
                    this.userID = this.user[0].id;
                    this.username = this.user[0].username;
                    localStorage.setItem('user', this.user[0].id);
                    localStorage.setItem('status', this.user[0].status);
                    localStorage.setItem('username', this.username);
                })
            }
            else
            {
                alert("Username or password are incorrect");
            }
        }
        else
        {
            alert("Username or password can't be empty");
        }
    }

    isLoggedIn() {
        const loggedInUser = localStorage.getItem("user");
        const loggedInStatus = localStorage.getItem("status");
        const loggedInName = localStorage.getItem("username");
        if (loggedInUser && loggedInStatus)
        {
            this.status = loggedInStatus;
            this.userID = loggedInUser;
            this.username = loggedInName;
        }
    }

    Logout() {
        this.id = '';
        this.username = '';
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