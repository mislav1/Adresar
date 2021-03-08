import React from 'react'
import { Message } from 'semantic-ui-react'
import styles from "./ErrorMessage.module.scss"

export default function ErrorMessage({title = "Error", subtitle = ""}) {

    return (
        <Message negative className={styles.errorMessage}>
            <Message.Header>{title}</Message.Header>
            <p>{subtitle}</p>
        </Message>
    )
}