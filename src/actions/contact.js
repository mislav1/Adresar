import * as types from "./actionTypes";
import { firebase } from "../lib/initFirebase"
import { CONTACTS_PER_PAGE } from "../lib/constants"
const db = firebase.database()


export function addContact(contact) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.SET_LOADING, loading: true });
            const userId = localStorage.getItem('user-key')

            if (userId) {
                const contactRef = db.ref('contact')
                const newContact = contactRef.push()
                await newContact.set({
                    ...contact,
                    createdBy: userId,
                    isFavourite: false
                })
            }

            dispatch({ type: types.SET_LOADING, loading: false });

        } catch (error) {
            console.log(error)
            dispatch({ type: types.SET_LOADING, loading: false });
        }
    };
}

export function loadAllContacts(page, filters, orderBy) {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: types.SET_LOADING, loading: true });
            const userId = localStorage.getItem('user-key')

            if (userId) {
                let contacts = []
                let count = 0;
                await db.ref('contact')
                    .orderByChild('createdBy')
                    .equalTo(userId)
                    .once('value')
                    .then(dataSnapshot => {
                        count = dataSnapshot.numChildren();
                        dataSnapshot.forEach((childSnapshot) => {
                            contacts.push({ ...childSnapshot.val(), key: childSnapshot.key })
                        });
                    })

                if (filters.firstName || filters.lastName || filters.email) {
                    contacts = contacts.filter(c => {
                        if (filters.firstName) {
                            if (!c.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) {
                                return false
                            }
                        }
                        if (filters.lastName) {
                            if (!c.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) {
                                return false
                            }
                        }
                        if (filters.email) {
                            if (!c.contactType === "Email" || !c.contact.toLowerCase().includes(filters.email.toLowerCase())) {
                                return false
                            }
                        }

                        return true
                    })

                    count = contacts.length
                }

                const startIndex = (page - 1) * CONTACTS_PER_PAGE;
                const endIndex = startIndex + CONTACTS_PER_PAGE;

                contacts = contacts.filter((c, index) => {
                    if (index >= startIndex && index < endIndex) {
                        return true;
                    }
                    return false;
                }).sort((a, b) => {
                    if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) { return orderBy === "asc" ? -1 : 1; }
                    if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) { return orderBy === "asc" ? 1 : -1; }
                    return 0;
                })
                console.log(orderBy, filters, page)

                const numberOfPages = Math.ceil(count / CONTACTS_PER_PAGE)
                dispatch({ type: types.SET_ALL_CONTACTS, contacts, count: count > 0 ? numberOfPages : 0 });
            }

            dispatch({ type: types.SET_LOADING, loading: false });

        } catch (error) {
            console.log(error)
            dispatch({ type: types.SET_LOADING, loading: false });
        }
    };
}


export function addToFavourite(contact, callback) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.SET_LOADING, loading: true });
            const userId = localStorage.getItem('user-key')

            if (userId) {

                const updatedContact = {
                    ...contact,
                    isFavourite: true
                }
                delete updatedContact.key

                let contactRef = db.ref('contact/');
                contactRef.child(contact.key).update(updatedContact)
            }

            dispatch({ type: types.SET_LOADING, loading: false });
            callback();

        } catch (error) {
            console.log(error)
            dispatch({ type: types.SET_LOADING, loading: false });
        }
    };
}

export function removeFromFavourite(contact, callback) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.SET_LOADING, loading: true });
            const userId = localStorage.getItem('user-key')

            if (userId) {

                const updatedContact = {
                    ...contact,
                    isFavourite: false
                }
                delete updatedContact.key

                let contactRef = db.ref('contact/');
                contactRef.child(contact.key).update(updatedContact)
            }

            dispatch({ type: types.SET_LOADING, loading: false });
            callback();

        } catch (error) {
            console.log(error)
            dispatch({ type: types.SET_LOADING, loading: false });
        }
    };
}