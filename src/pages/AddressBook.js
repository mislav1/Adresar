import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import * as actions from "../actions"
import { Pagination } from 'semantic-ui-react'
import ContactCard from "../components/ContactCard"
import styles from "./AddressBook.module.scss"
import Title from "../components/Title"
import Filters from "../components/Filters"

export default function AddressBook(props) {

    const initialFilters = {
        firstName: '',
        lastName: '',
        email: ''
    }

    const dispatch = useDispatch();
    const page = useRef(1)
    const [filters, setFilters] = useState(initialFilters)

    const localActions = {
        loadAllContacts: (page, filters) => dispatch(actions.contact.loadAllContacts(page, filters))
    };

    const globalState = {
        isLoading: useSelector(state => state.ui.isLoading),
        allContacts: useSelector(state => state.contact.allContacts),
        count: useSelector(state => state.contact.contactsCount)
    };

    useEffect(() => {
        localActions.loadAllContacts(page.current, filters);
    }, [])

    const changePage = (e, data) => {
        page.current = data.activePage
        localActions.loadAllContacts(data.activePage, filters)
    }

    const onFilterChange = (filter, value) => {
        setFilters({
            ...filters,
            [filter]: filters ? value.trim() : ''
        })
    }

    useEffect(() => {
        page.current = 1
        localActions.loadAllContacts(page.current, filters)
    }, [filters.firstName, filters.lastName, filters.email])

    return (
        <div className={styles["address-book-wrapper"]}>
            <Title title="Address Book" icon="address book" />
            <Filters onFilterChange={onFilterChange}/>
            {
                globalState.allContacts.length > 0 &&
                <>
                    
                    <div className={styles["grid-wrapper"]}>
                        {
                            globalState.allContacts.map((contact) => {
                                return <ContactCard contact={contact} key={contact.key} />
                            })
                        }
                    </div >
                    <div className={styles["pagination-wrapper"]}>
                        <Pagination
                            boundaryRange={0}
                            defaultActivePage={page.current}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            siblingRange={1}
                            totalPages={globalState.count}
                            onPageChange={changePage}
                        />
                    </div>
                </>

            }
        </div>

    )
}