import { ButtonGroup, Col, Grid, IconButton, Panel, Row, Stack } from "rsuite";
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import { useNavigate } from 'react-router-dom';
import { contacts, TContact } from "../db";

type ContactCardProps = {
    contact: TContact
}


export const ContactCard = (props: ContactCardProps) => {
    return (
        <>
            <Row key={`${props.contact.id}-row`}>
                <Col key={`${props.contact.id}-col`} md={6} sm={6} xs={24}>
                    <Card key={`${props.contact.id}-card`} contact={props.contact} />
                </Col>
            </Row>
        </>
    )
}

type CardProps = {
    contact: TContact
}
const Card = (props: CardProps) => {
    const { contact } = props;
    const navigate = useNavigate();
    const detailsClicked = () => {
        navigate("/details/" + contact.id);
    }
    const editClicked = () => {
        navigate("/edit/" + contact.id);

    }
    const deleteClicked = async () => {
        if (contact.id)
            await contacts.delete(contact.id)

    }


    return (
        <Panel key={`${contact.id}-panel`}
            bordered
            shaded
            header={
                <Stack justifyContent="space-between">
                    <span>{contact.name}</span>
                    <ButtonGroup >
                        <IconButton style={{ padding: "27px 12px 8px 48px" }} onClick={detailsClicked}><UserInfoIcon /></IconButton>
                        <IconButton style={{ padding: "27px 12px 8px 48px" }} onClick={editClicked}><EditIcon /></IconButton>
                        <IconButton style={{ padding: "27px 12px 8px 48px" }} onClick={deleteClicked}><TrashIcon /></IconButton>
                    </ButtonGroup>
                </Stack>
            }
        >

            <Grid>
                <Row>
                    <Col><a href={`tel:+91${contact.phones}`}>{contact.phones}</a> </Col>
                </Row>
                <Row>
                    <Col><a href={`mailto:${contact.email}`}>{contact.email}</a> </Col>
                </Row>
                <Row>
                    <Col>{contact.notes}</Col>
                </Row>
            </Grid>
        </Panel>
    );
}

// const ExtendedContacts = (<Grid>
//     {
//         contact.phone?.map(p => (
//             <Row key={`${p}-row`}>
//                 <Col style={{ paddingBottom: "1rem" }}><a href={`tel:+91${p}`}>{p}</a></Col>
//             </Row>))
//     }
//     {
//         contact.email?.map(p => (
//             <Row key={`${p}-row`}>
//                 <Col>{p}</Col>
//             </Row>))
//     }
//     {contact.notes &&
//         <Row>
//             <Col>{contact.notes}</Col>
//         </Row>}
// </Grid>) 
