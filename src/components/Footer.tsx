import { ContactPhoneSharp, Favorite, Add, Home } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

type FooterProps = {

}


export const Footer = (props: FooterProps) => {
    const navigate = useNavigate()
    const [value, setValue] = useState();
    const [open, setOpen] = useState(false);
    console.log("🚀 ~ file: Footer.tsx:15 ~ Footer ~ open:", open)
    const handleOpen = () => {
        setOpen(true)
        navigate("/edit")
    };
    const handleClose = () => {
        setOpen(false);
        // navigate("/")
    }
    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
            </SpeedDial>
            <BottomNavigation
                showLabels
                value={value}
                sx={{ position: 'absolute', bottom: 16 }}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Contacts" icon={<Home />} />
                <BottomNavigationAction label="Favorites" icon={<Favorite />} />
                {/* <BottomNavigationAction label="Add" icon={<Add />} /> */}
            </BottomNavigation>
        </>
    )
}