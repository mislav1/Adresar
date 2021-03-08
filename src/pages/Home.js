import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react'
import { validateLoginForm } from '../lib/utils'
import ErrorMessage from "../components/ErrorMessage"
import styles from "./Home.module.scss"

export default function Home(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const history = useHistory()

    const signInUser = () => {
        const loginError = validateLoginForm(email, password)
        if (loginError) {
            setEmail('')
            setPassword('')
            setError(loginError)
        } else {
            setError("")
            history.push('adresar')
        }
    }

    return (
        <div className={styles.container}>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Icon name='sign-in' /> Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />

                            <Button color='teal' fluid size='large' onClick={signInUser}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
            {
                error &&
                <ErrorMessage title={"Error with login"} subtitle={error}/>
            }

        </div>
    )
}