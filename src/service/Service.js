import { db } from "../utilities/firebase";
import { collection, getDocs, limit, orderBy, query, startAfter, endBefore, deleteDoc, doc, where, addDoc, updateDoc, limitToLast } from "firebase/firestore";

class Service {
    
    loginCheck = async(username, password) => {

        const user = [];
        var status = false;
        var q = query(collection(db, "Users"), where("username", "==", username), where("password", "==", password));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            status = true
            user.push({id: doc.id, status: status});
        }) 

        return user;
    }

    fetchTasks = async(userID) => {
        const tasks = [];
        var q = query(collection(db, "Tasks"), where("userID", "==", userID), orderBy("date", "desc"));
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
}

export default Service;