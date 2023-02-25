import { ContactList } from "../components/ContactList"
import React, { FormEvent, MouseEventHandler } from "react";
import { useState, useEffect } from 'react';
import { TContact, db, contacts } from '../db';
import { useParams } from "react-router";
import { useForm } from "material-ui-react-form";
import { Box, Button, Grid, Paper, Stack, styled, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';

type EditProps = {

}

const emptyForm = {
    name: '',
    email: '',
    phone: '',
    notes: ''
}

export const Edit = (props: EditProps) => {

    const { id } = useParams();
    const navigate = useNavigate()
    const [fields, form] = useForm({
        name: { test: "required", message: "Name is required" },
        jobTitle: {},
        email: { test: ["email"], message: "Enter valid email" },
        phones: { test: /(^((0)|\+91)?[1-9][0-9]{9}$)|(^$)/, message: "Enter valid phone" },
        notes: {},
    });

    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const values = form.validate();
        if (!values)
            return;

        const contactItem: TContact = {
            name: values.name as string,
            email: values.email as string,
            jobTitle: values.jobTitle as string,
            phones: values.phones as string,
            notes: values.notes as string
        };
        await contacts.add(contactItem);
        form.setValues({});
        navigate("/")

    }
    return (
        <Stack spacing={2}>
            <TextField {...fields.name} placeholder="Contact Name" fullWidth type="text" />
            <TextField {...fields.jobTitle} placeholder="Job Title" fullWidth type="text" />
            <TextField {...fields.phones} placeholder="Phone" fullWidth type="tel" />
            <TextField {...fields.email} placeholder="Email" fullWidth type="email" />
            <TextField placeholder="Notes" multiline rows={4} fullWidth type="text" />
            <Button onClick={onSubmit}>Save</Button>
        </Stack>
    )
}
