import React, { useEffect, useState } from 'react'
import { Button, Form, Select, Divider } from 'semantic-ui-react'
import { useSelector, useDispatch } from "react-redux"
import ErrorMessage from "../components/ErrorMessage"
import Title from "../components/Title"
import Calendar from "../components/Calendar"
import styles from "./Contact.module.scss"
import { validateContactForm, validateContactSubForm } from "../lib/utils"
import * as actions from "../actions"
import { useHistory } from "react-router-dom"

export default function Contact(props) {

    const history = useHistory()
    const { id } = props.match.params;

    const intialContactValues = {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        contactType: null,
        contact: ''
    }

    const contactOptions = [
        { key: 'null', value: null, text: '' },
        { key: 'mob', value: 'Mobile Phone', text: 'Mobile Phone' },
        { key: 'fix', value: 'Landline Phone', text: 'Landline Phone' },
        { key: 'email', value: 'Email', text: 'Email' },
        { key: 'pager', value: 'Pager', text: 'Pager' },
    ]

    const dispatch = useDispatch();

    const [contact, setContact] = useState(intialContactValues)
    const [formError, setFormError] = useState("")
    const [subFormError, setSubFormError] = useState("")

    const localActions = {
        addContact: (contact, callback) => dispatch(actions.contact.addContact(contact, callback)),
        loadContactById: (id) => dispatch(actions.contact.loadContactById(id)),
        removeContact: (contact, callback) => dispatch(actions.contact.removeContact(contact, callback)),
        updateContact: (contact, callback) => dispatch(actions.contact.editContact(contact, callback)),
    };

    const globalState = {
        isLoading: useSelector(state => state.ui.isLoading),
        currentContact: useSelector(state => state.contact.currentContact)
    };

    const updateContact = (e, data) => {
        if (data) {
            setContact({
                ...contact,
                contactType: data.value,
                contact: ''
            })
        } else {
            setContact({
                ...contact,
                [e.target.name]: e.target.value
            })
        }
    }

    useEffect(() => {
        if (id) {
            localActions.loadContactById(id)
        }
    }, [])

    useEffect(() => {
        if (globalState.currentContact.key) {
            setContact(globalState.currentContact)
        }
    }, [globalState.currentContact.key])

    const onSubmit = () => {
        const error = validateContactForm(contact)
        const subError = validateContactSubForm(contact)
        if (error || subError) {
            setFormError(error)
            setSubFormError(subError)
            return
        } else {
            setFormError('')
            setSubFormError('')
        }
        localActions.addContact(contact, callback)
    }

    const onUpdate = () => {
        localActions.updateContact(contact, callback)
    }

    const onDelete = () => {
        localActions.removeContact(contact, callback)
    }

    const callback = () => {
        history.push("/adresar")
    }

    return (
        <div className={styles.contact}>
            <Title title={id ? "Edit Contact" : "Add new contact"} icon="address card" />
            <Form>
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' onChange={updateContact} value={contact.firstName} name={"firstName"} />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' onChange={updateContact} value={contact.lastName} name={"lastName"} />
                </Form.Field>
                <Form.Field>
                    <label>Select date of birth </label>
                    <Calendar onChange={updateContact} value={contact.dateOfBirth} />
                </Form.Field>
                {
                    formError &&
                    <ErrorMessage title={"Error adding a contact"} subtitle={formError} />
                }
                <Divider hidden></Divider>
                <Divider fitted></Divider>
                <Divider hidden></Divider>
                <Form.Field>
                    <label>Select contact type </label>
                    <Select placeholder='Select contact type' options={contactOptions} onChange={updateContact} value={contact.contactType} />
                </Form.Field>
                {
                    contact.contactType &&
                    <Form.Field>
                        <label>Contact</label>
                        <input
                            placeholder='Enter contact'
                            onChange={updateContact}
                            value={contact.contact}
                            name={"contact"}
                            type={contact.contactType === "Email" ? "email" : "number"}
                        />
                    </Form.Field>
                }

                {
                    subFormError &&
                    <ErrorMessage title={"Error adding a contact"} subtitle={subFormError} />
                }
                {
                    id ?
                        <div>
                            <Button type='update' onClick={onUpdate} loading={globalState.isLoading} color="yellow">
                                Update
                            </Button>
                            <Button type='delete' onClick={onDelete} loading={globalState.isLoading} color="red">
                                Delete
                            </Button>
                        </div>
                        :
                        <Button type='submit' onClick={onSubmit} loading={globalState.isLoading} color="green">
                            Submit
                        </Button>
                }

            </Form>

        </div>
    )
}