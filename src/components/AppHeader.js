import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import { useHistory } from "react-router-dom"

import styles from "./AppHeader.module.scss"

export default function AppHeader({path}) {

    const history = useHistory()

    const goTo = (to) => {
        if(!path.endsWith(to)){
            history.push(to)
        }
    }

    return (
        <Segment clearing>
            <Header className={styles.title} as='h2' floated='right' color="teal" onClick={() => goTo("/adresar/omiljeni")}>
                Favourite
            </Header>
            <Header className={styles.title} as='h2' floated='right' color="teal" onClick={() => goTo("/kontakt")}>
                New Contact
            </Header>
            <Header className={styles.title} as='h2' floated='left' color="teal" onClick={() => goTo("/adresar")}>
                Home
            </Header>
        </Segment>
    )
}