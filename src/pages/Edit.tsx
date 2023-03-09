import { ContactList } from "../components/ContactList"
import React, { FormEvent, MouseEventHandler } from "react";
import { useState, useEffect } from 'react';
import { TContact, db, contacts } from '../db';
import { useParams } from "react-router";
import { useForm } from "material-ui-react-form";
import { Box, Button, Grid, Paper, SpeedDial, SpeedDialIcon, Stack, styled, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';

type EditProps = {

}

export const Edit = (props: EditProps) => {

    const { id } = useParams();
    const navigate = useNavigate()
    const [fields, form] = useForm({
        name: { test: "required", message: "Name is required" },
        jobTitle: {},
        email: { test: ["email"], message: "Enter valid email" },
        phones: { test: /(^[1-9][0-9]{9}$)|(^$)/, message: "Enter valid phone, enter 10 digit mobile/telephone number" },
        notes: {},
    });

    const [currentContact, setCurrentContact] = useState<TContact>();

    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const values = form.validate();
        if (!values)
            return;

        const contactItem: TContact = {
            name: values.name as string,
            email: values.email as string,
            jobTitle: values.jobTitle as string,
            phones: `+91${values.phones}` as string,
            notes: values.notes as string
        };

        if (id && currentContact) {
            await contacts.update(currentContact, { ...contactItem })
        }
        else
            await contacts.add(contactItem);
        form.setValues({});
        navigate("/")

    }
    useEffect(() => {
        if (id)
            contacts.get(Number(id)).then(res => {
                if (res) {
                    setCurrentContact(res)
                    form.setValues({
                        name: res.name ?? '',
                        email: res.email ?? '',
                        jobTitle: res.jobTitle ?? '',
                        notes: res.notes ?? '',
                        phones: (res.phones ? res.phones.substring(3) : '') ?? ''
                    })
                }
            })
    }, [id])



    return (
        <Stack spacing={2}>
            <TextField {...fields.name} placeholder="Contact Name" fullWidth type="text" />
            <TextField {...fields.jobTitle} placeholder="Job Title" fullWidth type="text" />
            <TextField {...fields.phones} placeholder="Phone" fullWidth type="tel" inputProps={{ maxLength: 10 }} />
            <TextField {...fields.email} placeholder="Email" fullWidth type="email" />
            <TextField {...fields.notes} placeholder="Notes" multiline rows={4} fullWidth type="text" />
            <Button onClick={onSubmit}>Save</Button>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClick={() => navigate('/')}
                open={true}
            >
            </SpeedDial>
        </Stack>
    )
}
