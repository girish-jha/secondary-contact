import { ContactList } from "../components/ContactList"
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { contacts } from '../db';

type HomeProps = {

}


export const Home = (props: HomeProps) => {

    const allItems = useLiveQuery(() => contacts.orderBy('name').toArray(), []);
    const [contactList, setContactList] = useState(allItems);

    useEffect(() => {
        setContactList(allItems)
    }, [allItems?.length])


    const onSearch = (value: string) => {
        if (value) {
            const result = contactList?.filter(c => containsIgnoreCase(`${c.name}ø${c.email}ø${c.phones}ø${c.notes}`, value));
            setContactList(result)
        }
        else setContactList(allItems)
    }
    return (
        <>
            {contactList ? <ContactList contactList={contactList} /> : <div>No contacts Found</div>}

        </>
    )
}

const containsIgnoreCase = (original: string, other: string) => original.toLowerCase().includes(other.toLowerCase())
