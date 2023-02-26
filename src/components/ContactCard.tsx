import { Stack, Avatar, CardContent, Typography, CardHeader, IconButton, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { contacts, TContact } from "../db";
import { Phone, Email, Edit, Delete, Note, Favorite, Share, WhatsApp } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import VCard from 'vcard-creator'

type ContactCardProps = {
    contact: TContact
}



export const ContactCard = (props: ContactCardProps) => {
    const navigate = useNavigate();
    const { id, name, email, phones, notes, isFavorite, jobTitle } = props.contact;
    const setFavorite = async () => {
        await contacts.update(props.contact, { isFavorite: !isFavorite })
    }

    const shareContact = () => {
        if (!navigator.canShare) {
            console.log(`Your browser doesn't support the Web Share API.`)
            return
        }
        const vcard = new VCard();
        vcard.addName(name)
            .addJobtitle(jobTitle ?? '')
            .addPhoneNumber(phones ?? '', 'HOME')
            .addEmail(email ?? '', 'HOME')
            .addNote(notes ?? '');

        const data = {
            files: [
                new File([vcard.toString()], 'image.vcf', {
                    type: 'vcard',
                }),
            ],
            title: name,
            text: vcard.toString(),
        };
        console.log(vcard.toString(), navigator.share)
        if (navigator.share) {
            navigator
                .share(data)
                .then(() => {
                    console.log('Successfully shared');
                })
                .catch(error => {
                    console.error('Something went wrong sharing the blog', error);
                });
        }
    };
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
                            <Edit />
                        </IconButton>
                        <IconButton aria-label="Delete" onClick={deleteContact}>
                            <Delete />
                        </IconButton>
                    </>
                }
                title={name}
                subheader={jobTitle}
            />
            <CardContent>
                <Typography align='justify' variant="body2" color="text.secondary" component="div" >
                    {phones}<IconButton href={`tel:${phones}`}><Phone /></IconButton>
                    <IconButton href={`https://wa.me/${phones}`}><WhatsApp /></IconButton>

                </Typography>
                {email && <Typography align='justify' variant="body2" color="text.secondary" component="div">
                    {email} <IconButton href={`mailto:${email}`}><Email /></IconButton>
                </Typography>}
                {notes && <Typography align='justify' variant="body2" color="text.secondary" component="div">
                    {notes}
                </Typography>}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={setFavorite}>
                    <Favorite color={isFavorite ? 'primary' : 'action'} />
                </IconButton>
                <IconButton aria-label="share" onClick={shareContact}>
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
    const nameArray = name.split(' ');
    const fNameFirstChar = nameArray[0][0]
    const lNameFirstChar = nameArray[1]?.[0]
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${fNameFirstChar ?? ''}${lNameFirstChar ?? ''}`,
    };
}