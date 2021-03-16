import React from 'react'
import { Button, Card } from 'semantic-ui-react'

export default function ContactCard({ contact }) {

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
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green'>
                            Add to Favourite
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </>
    )
}