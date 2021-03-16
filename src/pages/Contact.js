import React, { useEffect, useState } from 'react'
import { Button, Form, Select, Divider } from 'semantic-ui-react'
import { useSelector, useDispatch } from "react-redux"
import ErrorMessage from "../components/ErrorMessage"
import Title from "../components/Title"
import Calendar from "../components/Calendar"
import styles from "./Contact.module.scss"
import { validateContactForm, validateContactSubForm } from "../lib/utils"
import * as actions from "../actions"

export default function Contact(props) {

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
        addContact: (contact) => dispatch(actions.contact.addContact(contact))
    };

    const globalState = {
        isLoading: useSelector(state => state.ui.isLoading),
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
        console.log(contact.contactType)
    }, [contact.contactType])

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
        localActions.addContact(contact)
    }

    return (
        <div className={styles.contact}>
            <Title title="Add new contact" icon="address card" />
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
                    <Select placeholder='Select contact type' options={contactOptions} onChange={updateContact} />
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
                <Button type='submit' onClick={onSubmit} loading={globalState.isLoading}>
                    Submit
                </Button>
            </Form>

        </div>
    )
}