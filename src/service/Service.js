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
}

export default Service;