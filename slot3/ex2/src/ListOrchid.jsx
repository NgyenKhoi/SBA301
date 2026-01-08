import { Container, Row, Col, Card } from 'react-bootstrap';
import pic1 from './assets/pic1.jpg';
import pic2 from './assets/pic2.jpg';
import pic3 from './assets/pic3.jpg';
import pic4 from './assets/pic4.jpg';
import pic5 from './assets/pic5.jpg';
import pic6 from './assets/pic6.jpg';
import pic7 from './assets/pic7.jpg';
import pic8 from './assets/pic8.jpg';

function ListOrchid() {
    const orchids = [
        {
            id: 1,
            orchidName: "Dendrobium Nobile",
            description: "Beautiful purple orchid with delicate petals",
            image: pic1,
            price: 25.00,
            isSpecial: true
        },
        {
            id: 2,
            orchidName: "Phalaenopsis Pink",
            description: "Elegant pink orchid perfect for home decoration",
            image: pic2,
            price: 30.00,
            isSpecial: false
        },
        {
            id: 3,
            orchidName: "Cattleya Orange",
            description: "Vibrant orange orchid with stunning blooms",
            image: pic3,
            price: 35.00,
            isSpecial: true
        },
        {
            id: 4,
            orchidName: "Oncidium Yellow",
            description: "Bright yellow orchid with multiple flowers",
            image: pic4,
            price: 28.00,
            isSpecial: false
        },
        {
            id: 5,
            orchidName: "Vanda Green",
            description: "Exotic green orchid with unique patterns",
            image: pic5,
            price: 40.00,
            isSpecial: true
        },
        {
            id: 6,
            orchidName: "Cymbidium Purple",
            description: "Classic purple orchid with long-lasting blooms",
            image: pic6,
            price: 32.00,
            isSpecial: false
        },
        {
            id: 7,
            orchidName: "Paphiopedilum Spotted",
            description: "Unique spotted orchid with slipper-like shape",
            image: pic7,
            price: 45.00,
            isSpecial: true
        },
        {
            id: 8,
            orchidName: "Miltonia Yellow",
            description: "Cheerful yellow orchid with pansy-like flowers",
            image: pic8,
            price: 26.00,
            isSpecial: false
        }
    ];

    return (
        <div>
            <Container className="py-5">
                <h1 className="text-center mb-5">Orchid Collection</h1>
                
                {/* First Row - 4 orchids */}
                <Row className="mb-4">
                    {orchids.slice(0, 4).map((orchid) => (
                        <Col md={3} key={orchid.id} className="mb-4">
                            <Card className="h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={orchid.image} 
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="text-center">{orchid.orchidName}</Card.Title>
                                    <Card.Text className="text-muted small">
                                        {orchid.description}
                                    </Card.Text>
                                    <div className="mt-auto">
                                        <Card.Text className="text-center">
                                            <strong>${orchid.price}</strong>
                                        </Card.Text>
                                        {orchid.isSpecial && (
                                            <div className="text-center">
                                                <span className="badge bg-warning">Special</span>
                                            </div>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Second Row - 4 orchids */}
                <Row>
                    {orchids.slice(4, 8).map((orchid) => (
                        <Col md={3} key={orchid.id} className="mb-4">
                            <Card className="h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={orchid.image} 
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="text-center">{orchid.orchidName}</Card.Title>
                                    <Card.Text className="text-muted small">
                                        {orchid.description}
                                    </Card.Text>
                                    <div className="mt-auto">
                                        <Card.Text className="text-center">
                                            <strong>${orchid.price}</strong>
                                        </Card.Text>
                                        {orchid.isSpecial && (
                                            <div className="text-center">
                                                <span className="badge bg-warning">Special</span>
                                            </div>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default ListOrchid;