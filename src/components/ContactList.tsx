import { TContact } from '../db';
import { ContactCard } from './ContactCard';
type ContactListProps = {
    contactList: TContact[]
}


export const ContactList = (props: ContactListProps) => {
    const { contactList } = props;

    return (
        <>
            {contactList.map((c, i) => <ContactCard contact={c} key={c.name + i} />)}
        </>
    )
}