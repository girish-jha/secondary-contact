import { Outlet } from "react-router"
import { Container, Content, Header } from "rsuite"
import { ContactList } from "./ContactList"
import { ContactHeader } from "./Header"

type ContainerProps = {

}


export const ContactContainer = (props: ContainerProps) => {
    return (
        <>
            <Container >
                <Header style={{ height: "4rem", paddingTop: "1rem" }}>
                    <ContactHeader />
                </Header>
                <Content>
                    <Outlet />
                </Content>
            </Container>
        </>
    )
}