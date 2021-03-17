import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import * as actions from "../actions"
import { Pagination, Select } from 'semantic-ui-react'
import ContactCard from "../components/ContactCard"
import styles from "./AddressBook.module.scss"
import Title from "../components/Title"
import Filters from "../components/Filters"
import { useHistory } from "react-router-dom"

export default function AddressBook(props) {

    const isFavouritesPage = props.match.path.includes("omiljeni")
    
    const initialFilters = {
        firstName: '',
        lastName: '',
        email: ''
    }

    const orderByOptions = [
        { key: 'asc', value: 'asc', text: 'asc' },
        { key: 'desc', value: 'desc', text: 'desc' },
    ]

    const dispatch = useDispatch();
    const history = useHistory()
    const page = useRef(1)
    
    const [filters, setFilters] = useState(initialFilters)
    const [orderBy, setOrderBy] = useState("asc")

    const localActions = {
        loadAllContacts: (page, filters, orderBy, onlyFavourite) => dispatch(actions.contact.loadAllContacts(page, filters, orderBy, onlyFavourite))
    };

    const globalState = {
        isLoading: useSelector(state => state.ui.isLoading),
        allContacts: useSelector(state => state.contact.allContacts),
        count: useSelector(state => state.contact.contactsCount)
    };

    useEffect(() => {
        localActions.loadAllContacts(page.current, filters, orderBy, isFavouritesPage ? true : false);
    }, [])

    const changePage = (e, data) => {
        page.current = data.activePage
        localActions.loadAllContacts(data.activePage, filters, orderBy, isFavouritesPage ? true : false)
    }

    const onFilterChange = (filter, value) => {
        if(globalState.isLoading){
            return
        }
        setFilters({
            ...filters,
            [filter]: filters ? value.trim() : ''
        })
    }

    const onChangeOrderBy = (e, data) => {
        setOrderBy(data.value)
        localActions.loadAllContacts(page.current, filters, data.value, isFavouritesPage ? true : false)
    }

    const onFavouriteUpdated = () => {
        localActions.loadAllContacts(page.current, filters, orderBy, isFavouritesPage ? true : false)
    }

    const onNameClick = (key) => {
        history.push(`/kontakt/detalji/${key}` )
    }

    useEffect(() => {
        page.current = 1
        localActions.loadAllContacts(page.current, filters, orderBy, isFavouritesPage ? true : false)
    }, [filters.firstName, filters.lastName, filters.email])

    return (
        <div className={styles["address-book-wrapper"]}>
            <Title title={isFavouritesPage ? "Favourite contacts" : "Address Book"} icon="address book" />
            <Filters onFilterChange={onFilterChange} filters={filters}/>
            <div>
                {"Sorted by Last Name: "}
                <Select options={orderByOptions} onChange={onChangeOrderBy} defaultValue={orderBy}/>
            </div>
            {
                globalState.allContacts.length > 0 &&
                <>
                    
                    <div className={styles["grid-wrapper"]}>
                        {
                            globalState.allContacts.map((contact) => {
                                return <ContactCard contact={contact} key={contact.key} callback={onFavouriteUpdated} onNameClick={onNameClick}/>
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