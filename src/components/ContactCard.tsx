import { Stack, Avatar, CardContent, Typography, CardHeader, IconButton, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { contacts, TContact } from "../db";
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NotesIcon from '@mui/icons-material/Notes';
import { red } from '@mui/material/colors';
import { Favorite, Share } from '@mui/icons-material';

type ContactCardProps = {
    contact: TContact
}


export const ContactCard = (props: ContactCardProps) => {
    const navigate = useNavigate();
    const { id, name, email, phones, notes, isFavorite, jobTitle } = props.contact;
    const setFavorite = async () => {
        await contacts.update(props.contact, { isFavorite: !isFavorite })
    }

    const editContact = () => {
        navigate(`/edit/${id}`)
    }

    const deleteContact = async () => {
        if (id)
            await contacts.delete(id);
    }

    return (
        <>
            <CardHeader
                avatar={
                    <Avatar {...stringAvatar(name)} />
                }
                action={
                    <>
                        <IconButton aria-label="Edit" onClick={editContact}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Delete" onClick={deleteContact}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                }
                title={name}
                subheader={jobTitle}
            />
            <CardContent>
                <Typography align='justify' variant="body2" color="text.secondary" component="div" >
                    <IconButton href={`tel:${phones}`}><PhoneIcon />{phones}</IconButton>

                </Typography>
                {email && <Typography align='justify' variant="body2" color="text.secondary" component="div">
                    <IconButton href={`mailto:${email}`}><AlternateEmailIcon />{email}</IconButton>
                </Typography>}
                {notes && <Typography align='justify' variant="body2" color="text.secondary" component="div">
                    {notes}
                </Typography>}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={setFavorite}>
                    <Favorite color={isFavorite ? 'primary' : 'action'} />
                </IconButton>
                <IconButton aria-label="share">
                    <Share />
                </IconButton>

            </CardActions>

            {/* <div>{name}</div>
            <div>{phones}</div>
            <div>{email}</div>
            <div>{notes}</div> */}

        </>
    )
}


function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}