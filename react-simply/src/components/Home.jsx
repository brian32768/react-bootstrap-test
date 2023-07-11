import { Card } from 'react-bootstrap'
import {Tab, Tabs} from 'react-bootstrap'

const Home = () => {
    return (
        <Card border='primary' bg='light' text='dark'>
            <Card.Header>This is the Card.Header</Card.Header>
        <Card.Body>
            <Card.Title>Hi! This is the Card.Title</Card.Title>
            <Card.Text>
                This is the home of react-simply, in a Bootstrap Card.
                There are <i>many</i> Card formatting options. Follow the link to learn more.
            </Card.Text>
            <Card.Link href="https://react-bootstrap.netlify.app/docs/components/cards">Card docs</Card.Link>
        </Card.Body>
        <Card.Footer>This is the Card.Footer</Card.Footer>
        </Card>
    )
}
export default Home;