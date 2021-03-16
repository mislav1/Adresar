import React from 'react'
import { Button, Card, Icon, Header } from 'semantic-ui-react'
import { useSelector, useDispatch } from "react-redux"
import * as actions from "../actions"

export default function ContactCard({ contact, callback }) {
    const dispatch = useDispatch();

    const localActions = {
        addToFavourite: (contact) => dispatch(actions.contact.addToFavourite(contact, callback)),
        removeFromFavourite: (contact) => dispatch(actions.contact.removeFromFavourite(contact, callback))
    };

    const handleClick = () => {
        contact.isFavourite ? localActions.removeFromFavourite(contact, callback) : localActions.addToFavourite(contact, callback)
    }

    return (
        <>
            <Card>
                <Card.Content>

                    <Card.Header>{contact.firstName + " " + contact.lastName}</Card.Header>
                    <Card.Description>
                        <strong>Contact type: </strong> {contact.contactType}
                    </Card.Description>
                    <Card.Description>
                        {contact.contact}
                    </Card.Description>
                </Card.Content>
                <Header as='h2' color='teal' textAlign='center'>
                    <Icon name={"favorite"} color={contact.isFavourite ? "yellow" : "grey"} onClick={handleClick}/>
                </Header>

            </Card>
        </>
    )
}