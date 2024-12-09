import { db } from "../../_utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc, updateDoc, doc } from "firebase/firestore";

export async function getTodo(userId) {
    try {
        let todoArray = [];
        const todoReference = collection(db, 'users', userId, 'todo');
        const q = query(todoReference);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docSnap) => {
                todoArray.push({
                    id: docSnap.id,
                    ...docSnap.data()
                });
        });
        return todoArray;
    } catch (error) {
        console.error('Error getting user tasks', error);
    }
};

export async function addTodo(userId, newTodoObj) {
    try {
        const newTodoRef = collection(db, 'users', userId, 'todo');
        const newTodoPostPromise = await addDoc(newTodoRef, newTodoObj);
        return newTodoPostPromise.id;
    } catch (error) {
        console.error("Problem adding item", error);
    }
};

export async function deleteTodo(userId, todoId) {
    try {
        const newTodoRef = doc(db, 'users', userId, 'todo', todoId);
        await deleteDoc(newTodoRef);    
    } catch (error) {
        console.error("Problem deleting item", error);
    }
};

export async function updateTodo(userId, todoId, updatedTodo) {
    try {
        const newTodoRef = doc(db, 'users', userId, 'todo', todoId);
        await updateDoc(newTodoRef, updatedTodo);
    } catch (error) {
        console.error("Problem updating item", error);
    }
};