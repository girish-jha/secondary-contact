import { Container, Header, Content, ButtonToolbar, Button, Input, Schema } from "rsuite"
import { ContactList } from "../components/ContactList"
import { ContactHeader } from "../components/Header"
import { Form } from 'rsuite';
import React, { FormEvent } from "react";
import { NumberType } from "schema-typed";
import { useState, useEffect } from 'react';
import { TContact, db, contacts } from '../db';
import { useParams } from "react-router";

type EditProps = {

}

const { StringType } = Schema.Types;
const model = Schema.Model({
    name: StringType().isRequired('Name is required.'),
    email: StringType().isEmail('Please enter a valid email address.'),
    phone: NumberType().pattern(/\d{10}/, 'Please enter a valid email address.'),
    notes: StringType()

});

const emptyForm = {
    name: '',
    email: '',
    phone: '',
    notes: ''
}

export const Edit = (props: EditProps) => {

    const { id } = useParams();
    const [formValue, setFormValue] = useState<Record<string, string>>(emptyForm);

    useEffect(() => {
        if (id)
            contacts.get(Number(id)).then(res => {
                console.log('contact fetrched', id, res)
                if (res)
                    setFormValue({
                        name: res.name,
                        email: res.email ?? '',
                        phone: res.phones ?? '',
                        notes: res.notes ?? ''
                    })
            })
    }, [id])



    const onSubmit = async (status: boolean, e: FormEvent) => {
        e.preventDefault()

        const contactItem: TContact = {
            name: formValue.name,
            email: formValue.email,
            phones: formValue.phone,
            notes: formValue.notes
        };
        await contacts.add(contactItem);
        setFormValue(emptyForm);
    }

    return (
        <>
            <Container >
                <Header style={{ height: "4rem", paddingTop: "1rem" }}>
                    <ContactHeader />
                </Header>
                <Content>
                    <Form fluid model={model} formValue={formValue} onChange={setFormValue} onSubmit={onSubmit}>
                        <Form.Group controlId="name">
                            <Form.ControlLabel>Name</Form.ControlLabel>
                            <Form.Control name="name" />
                            <Form.HelpText>Name is required</Form.HelpText>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.ControlLabel>Email</Form.ControlLabel>
                            <Form.Control name="email" type="email" />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.ControlLabel>Phone</Form.ControlLabel>
                            <Form.Control name="phone" type="tel" autoComplete="off" />
                        </Form.Group>
                        <Form.Group controlId="notes">
                            <Form.ControlLabel>Notes</Form.ControlLabel>
                            <Form.Control name="notes" accepter={Textarea} />
                        </Form.Group>
                        <Form.Group>
                            <ButtonToolbar>
                                <Button type="submit" appearance="primary">Submit</Button>
                                <Button appearance="default">Cancel</Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                </Content>
            </Container>
        </>
    )
}

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" rows={5} />);