import { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import pic1 from './assets/pic1.jpg';
import pic2 from './assets/pic2.jpg';
import pic3 from './assets/pic3.jpg';
import pic4 from './assets/pic4.jpg';
import pic5 from './assets/pic5.jpg';
import pic6 from './assets/pic6.jpg';
import pic7 from './assets/pic7.jpg';
import pic8 from './assets/pic8.jpg';

function ListOrchid() {
    const [showModal, setShowModal] = useState(false);
    const [selectedOrchid, setSelectedOrchid] = useState(null);

    const handleShowModal = (orchid) => {
        setSelectedOrchid(orchid);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrchid(null);
    };
    const orchids = [
        {
            id: 1,
            orchidName: "Dendrobium Nobile",
            description: "Beautiful purple orchid with delicate petals",
            image: pic1,
            price: 25.00,
            isSpecial: true,
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 2,
            orchidName: "Phalaenopsis Pink",
            description: "Elegant pink orchid perfect for home decoration",
            image: pic2,
            price: 30.00,
            isSpecial: false,
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 3,
            orchidName: "Cattleya Orange",
            description: "Vibrant orange orchid with stunning blooms",
            image: pic3,
            price: 35.00,
            isSpecial: true,
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 4,
            orchidName: "Oncidium Yellow",
            description: "Bright yellow orchid with multiple flowers",
            image: pic4,
            price: 28.00,
            isSpecial: false,
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 5,
            orchidName: "Vanda Green",
            description: "Exotic green orchid with unique patterns",
            image: pic5,
            price: 40.00,
            isSpecial: true,
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 6,
            orchidName: "Cymbidium Purple",
            description: "Classic purple orchid with long-lasting blooms",
            image: pic6,
            price: 32.00,
            isSpecial: false,
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 7,
            orchidName: "Paphiopedilum Spotted",
            description: "Unique spotted orchid with slipper-like shape",
            image: pic7,
            price: 45.00,
            isSpecial: true,
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 8,
            orchidName: "Miltonia Yellow",
            description: "Cheerful yellow orchid with pansy-like flowers",
            image: pic8,
            price: 26.00,
            isSpecial: false,
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
                                            <div className="text-center mb-2">
                                                <span className="badge bg-warning">Special</span>
                                            </div>
                                        )}
                                        <div className="text-center">
                                            <Button 
                                                variant="primary" 
                                                size="sm"
                                                onClick={() => handleShowModal(orchid)}
                                            >
                                                Details
                                            </Button>
                                        </div>
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
                                            <div className="text-center mb-2">
                                                <span className="badge bg-warning">Special</span>
                                            </div>
                                        )}
                                        <div className="text-center">
                                            <Button 
                                                variant="primary" 
                                                size="sm"
                                                onClick={() => handleShowModal(orchid)}
                                            >
                                                Details
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Modal for orchid details */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedOrchid?.orchidName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrchid && (
                        <Row>
                            <Col md={6}>
                                <img 
                                    src={selectedOrchid.image} 
                                    alt={selectedOrchid.orchidName}
                                    className="img-fluid rounded"
                                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                />
                            </Col>
                            <Col md={6}>
                                <h5>{selectedOrchid.orchidName}</h5>
                                <p className="text-muted">{selectedOrchid.description}</p>
                                <p>{selectedOrchid.detailedDescription}</p>
                                <div className="mt-3">
                                    <p><strong>Price: ${selectedOrchid.price}</strong></p>
                                    {selectedOrchid.isSpecial && (
                                        <span className="badge bg-warning">Special</span>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListOrchid;