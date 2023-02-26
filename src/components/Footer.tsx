import { ContactPhoneSharp, Favorite, Add, Home } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

type FooterProps = {

}


export const Footer = (props: FooterProps) => {
    const navigate = useNavigate()
    // const [value, setValue] = useState();

    return (
        <>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

                <BottomNavigation

                    showLabels
                    // value={value}
                    sx={{ position: 'absolute', bottom: 16 }}
                // onChange={(event, newValue) => {
                //     setValue(newValue);
                // }}
                >
                    <BottomNavigationAction label="Contacts" icon={<Home />} onClick={() => navigate('/')} />
                    <BottomNavigationAction label="Favorites" icon={<Favorite />} onClick={() => navigate('/true')} />
                    {/* <BottomNavigationAction label="Add" icon={<Add />} /> */}
                </BottomNavigation>
            </Paper>
        </>
    )
}