import { Container, Content, Header, Footer } from 'rsuite';
import { ContactList } from "../components/ContactList"
import { ContactHeader } from "../components/Header"
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { contacts } from '../db';

type HomeProps = {

}


export const Home = (props: HomeProps) => {

    const allItems = useLiveQuery(() => contacts.orderBy('name').toArray(), []);
    const [contactList, setContactList] = useState(allItems);
    console.log("🚀 ~ file: Home.tsx:16 ~ Home ~ contactList:", contactList)

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
            <Container >
                <Header style={{ height: "4rem", paddingTop: "1rem" }}>
                    <ContactHeader onSearch={onSearch} />
                </Header>
                <Content>
                    {contactList ? <ContactList contactList={contactList} /> : <div>No contacts Found</div>}
                </Content>
            </Container>

        </>
    )
}

const containsIgnoreCase = (original: string, other: string) => original.toLowerCase().includes(other.toLowerCase())
