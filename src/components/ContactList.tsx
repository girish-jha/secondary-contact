import { ThemeProvider } from '@emotion/react';
import { Grid, Paper, Card } from '@mui/material';
import { Box, styled, Theme } from '@mui/system';
import { TContact } from '../db';
import { ContactCard } from './ContactCard';
import { Item } from './Item';
type ContactListProps = {
    contactList: TContact[]
}


export const ContactList = (props: ContactListProps) => {
    const { contactList } = props;

    return (
        <>

            <Grid container spacing={2}>
                {contactList.map((contact) => (
                    <Grid item xs={12} key={`${contact.id}-item`}>
                        <Card key={`${contact.id}-Card`} elevation={3}>
                            <ContactCard contact={contact} key={contact.name + contact.id} />
                        </Card>
                    </Grid>
                ))}



            </Grid>
        </>
    )
}