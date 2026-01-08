import { Container, Row, Col, Card } from 'react-bootstrap';
import orchidImage from '../assets/download.jpg';

function Orchid() {

    const orchid = {
        id: 1,
        orchidName: "Ceasar 4N",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. or sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. or sit amet, consectetur adipiscing elit",
        image: orchidImage,
        price: 25.00,
        isSpecial: true
    };

    return (
        <div>
            <Container className="py-5">
                <Row>
                    <Col>   
                        <h2 className="text-center mb-4">Hoa phong lan</h2>
                        <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <Card.Img variant="top" style = {{maxHeight: '500px', objectFit: 'cover'}} src={orchid.image} />
                            <Card.Body>
                                <Card.Title>{orchid.orchidName}</Card.Title>
                                <Card.Text>
                                    <p>id: {orchid.id}</p>
                                    <p>orchidName: {orchid.orchidName}</p>
                                </Card.Text>
                                <Card.Text>Description: {orchid.description}</Card.Text>
                                <Card.Text>Price: ${orchid.price}</Card.Text>
                                <Card.Text>isSpecial: {orchid.isSpecial.toString()}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Orchid;
