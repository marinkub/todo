import { db } from "../utilities/firebase";
import { collection, getDocs, orderBy, query, deleteDoc, doc, where, addDoc, updateDoc } from "firebase/firestore";

class Service {
    
    loginCheck = async(username, password) => {
        const user = [];
        var status = false;
        var q = query(collection(db, "Users"), where("username", "==", username), where("password", "==", password));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            status = true
            user.push({id: doc.id, status: status, username: doc.data().username});
        }) 

        return user;
    }

    fetchTasks = async(userID, order) => {
        const tasks = [];
        var q = query(collection(db, "Tasks"), where("userID", "==", userID), orderBy("date", order));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            tasks.push({id: doc.id, title: doc.data().title, description: doc.data().description, date: doc.data().date});
        })

        return tasks;
    }

    addNew = async(userID, title, description) => {
        const date = new Date().toLocaleString('en-GB');
        await addDoc(collection(db, "Tasks"), {
            userID: userID,
            title: title,
            description: description,
            date: date 
        })
    }

    edit = async(title, description, id) => {
        await updateDoc(doc(db, "Tasks", id), {
            title: title,
            description: description
        })
    }

    delete = async(id) => {
        await deleteDoc(doc(db, "Tasks", id));
    }

    addNewUser = async(username, password) => {
        await addDoc(collection(db, "Users"), {
            username: username,
            password: password
        }) 
    }
}

export default Service;