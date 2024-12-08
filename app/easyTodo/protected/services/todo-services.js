import { db } from "../../_utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc, updateDoc } from "firebase/firestore";

export async function getTodo(userId, todoId) {
    try {
        let todoArray = [];
        const todoReference = collection(db, 'users', userId, 'todo', todoId);
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
        const newTodoRef = collection(db, 'users', userId, 'items');
        const newTodoPostPromise = await addDoc(newTodoRef, newTodoObj);
        return newTodoPostPromise.id;
    } catch (error) {
        console.error("Problem adding item", error);
    }
};

export async function deleteTodo(userId, newTodoObj) {
    try {
        const newTodoRef = collection(db, 'users', userId, 'todo');
        const newTodoPostPromise = await deleteDoc(newTodoRef, newTodoObj);
        return newTodoPostPromise.id;
    } catch (error) {
        console.error("Problem deleting item", error);
    }
};

export async function updateTodo(userId, todoId, updatedTodo) {
    try {
        const newTodoRef = collection(db, 'users', userId, 'todo', todoId);
        const newTodoPostPromise = await addDoc(newTodoRef, updatedTodo);
        return newTodoPostPromise.id;
    } catch (error) {
        console.error("Problem adding item", error);
    }
};