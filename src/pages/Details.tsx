import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ContactList } from "../components/ContactList"
import { contacts, TContact } from '../db';

type DetailsProps = {

}


export const Details = (props: DetailsProps) => {
    const { id } = useParams();
    const [contact, setContact] = useState<TContact>();

    useEffect(() => {
        if (id)
            contacts.get(Number(id)).then(res => {
                if (res)
                    setContact(res)
            })
    }, [id])
    return (
        <>
        </>
    )
}