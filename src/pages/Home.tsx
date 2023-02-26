import { ContactList } from "../components/ContactList"
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { contacts } from '../db';
import { useParams, useNavigate } from 'react-router-dom';
import { SpeedDial, SpeedDialIcon } from "@mui/material";

type HomeProps = {
    searchKey?: string
}


export const Home = (props: HomeProps) => {
    const navigate = useNavigate();
    const { showFavorite } = useParams();
    const allItems = useLiveQuery(() => contacts.orderBy('name').toArray(), []);
    const [contactList, setContactList] = useState(allItems);

    useEffect(() => {
        if (Boolean(showFavorite))
            setContactList(allItems?.filter(i => i.isFavorite))
        else setContactList(allItems)
    }, [allItems?.length, showFavorite])

    useEffect(() => {
        onSearch(props.searchKey)
    }, [props.searchKey])



    const onSearch = (value: string | undefined) => {
        if (value) {
            const result = allItems?.filter(c => containsIgnoreCase(`${c.name}ø${c.jobTitle}ø${c.email}ø${c.phones}ø${c.notes}`, value));
            setContactList(result)
        }
        else setContactList(allItems)
    }
    return (
        <>
            {contactList ? <ContactList contactList={contactList} /> : null}
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClick={() => navigate('/edit')}
                open={false}
            >
            </SpeedDial>
        </>
    )
}

const containsIgnoreCase = (original: string, other: string) => original.toLowerCase().includes(other.toLowerCase())
