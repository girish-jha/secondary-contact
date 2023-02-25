import { FlexboxGrid, IconButton, Input } from "rsuite"
import { Search } from "./Search"
import SearchIcon from '@rsuite/icons/Search';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import ArowBackIcon from '@rsuite/icons/ArowBack';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
    onSearch?: (value: string) => void
}


export const ContactHeader = (props: HeaderProps) => {

    const navigate = useNavigate();

    const addContact = () => {
        navigate("edit")
    }
    const backClicked = () => {
        navigate("/")
    }

    return (
        <>
            <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item>
                    <IconButton style={{ padding: "27px 12px 8px 27px" }} onClick={backClicked}><ArowBackIcon /></IconButton>

                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                    {props.onSearch ?
                        <Search onSearch={props.onSearch} />
                        : null}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                    <IconButton style={{ padding: "27px 12px 8px 27px " }} placement="right" onClick={addContact}><AddOutlineIcon /></IconButton>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>

                    {/* <IconButton style={{ padding: "27px 12px 8px 48px" }} placement="right" onClick={() => { }}><SearchIcon /></IconButton> */}
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </>
    )
}