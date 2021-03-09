import React, { useEffect, useState } from 'react'
import { Button, Form, Grid, Header, Segment, Icon, Select } from 'semantic-ui-react'
import ErrorMessage from "../components/ErrorMessage"
import Title from "../components/Title"
import Calendar from "../components/Calendar"
import styles from "./Contact.module.scss"

export default function Contact(props) {

    const contactOptions = [
        { key: 'mob', value: 'mob', text: 'Mobile Phone' },
        { key: 'fix', value: 'fix', text: 'Landline Phone' },
        { key: 'email', value: 'email', text: 'Email' },
        { key: 'pager', value: 'pager', text: 'Pager' },
    ]

    return (
        <div className={styles.contact}>
            <Title title="Add new contact" icon="address card" />
            <Form>
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                    <label>Select date of birth </label>
                    <Calendar />
                </Form.Field>
                <Form.Field>
                    <label>Select contact type </label>
                    <Select placeholder='Select contact type' options={contactOptions} />
                </Form.Field>

                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}