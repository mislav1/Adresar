import * as types from "./actionTypes";
import { firebase } from "../lib/initFirebase"
const db = firebase.database()

export function loginUser(email, callback) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.SET_LOADING, loading: true });

            let key = null;
            await db.ref('users')
                .orderByChild('email')
                .equalTo(email)
                .once('value', function (dataSnapshot) {
                    dataSnapshot.forEach(function (childSnapshot) {
                        key = childSnapshot.key;
                    });
                })
            
            if (!key) {
                const userRef = db.ref('users')
                const newUser = userRef.push()
                await newUser.set({
                    email
                })
                key = newUser.key
            }

            localStorage.setItem('user-key', key)

            dispatch({ type: types.SET_LOADING, loading: false });
            
            if(callback){
                callback()
            }

        } catch (error) {
            console.log(error)
            dispatch({ type: types.SET_LOADING, loading: false });
        }
    };
}