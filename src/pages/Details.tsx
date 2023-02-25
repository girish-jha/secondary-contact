import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Header, Content, ButtonGroup, Col, Grid, IconButton, Panel, Row, Stack } from "rsuite"
import { ContactList } from "../components/ContactList"
import { ContactHeader } from "../components/Header"
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
            <Container >
                <Header style={{ height: "4rem", paddingTop: "1rem" }}>
                    <ContactHeader />
                </Header>
                <Content>
                    {contact ?
                        <Panel
                            bordered
                            shaded
                            header={
                                <Stack justifyContent="space-between">
                                    <span>{contact.name}</span>
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
                        : null

                    }
                </Content>
            </Container>
        </>
    )
}