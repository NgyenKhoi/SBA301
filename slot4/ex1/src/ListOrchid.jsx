import { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import FilterSort from './components/FilterSort';
import './ListOrchid.css';
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
    const [filterCategory, setFilterCategory] = useState('');
    const [sortOption, setSortOption] = useState('');

    const handleShowModal = (orchid) => {
        setSelectedOrchid(orchid);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrchid(null);
    };

    const handleFilterChange = (category) => {
        setFilterCategory(category);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };
    const orchids = [
        {
            id: 1,
            orchidName: "Dendrobium Nobile",
            description: "Beautiful purple orchid with delicate petals",
            image: pic1,
            price: 25.00,
            isSpecial: true,
            category: "Dendrobium",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 2,
            orchidName: "Phalaenopsis Pink",
            description: "Elegant pink orchid perfect for home decoration",
            image: pic2,
            price: 30.00,
            isSpecial: false,
            category: "Phalaenopsis",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 3,
            orchidName: "Cattleya Orange",
            description: "Vibrant orange orchid with stunning blooms",
            image: pic3,
            price: 35.00,
            isSpecial: true,
            category: "Cattleya",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 4,
            orchidName: "Oncidium Yellow",
            description: "Bright yellow orchid with multiple flowers",
            image: pic4,
            price: 28.00,
            isSpecial: false,
            category: "Oncidium",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 5,
            orchidName: "Vanda Green",
            description: "Exotic green orchid with unique patterns",
            image: pic5,
            price: 40.00,
            isSpecial: true,
            category: "Vanda",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 6,
            orchidName: "Cymbidium Purple",
            description: "Classic purple orchid with long-lasting blooms",
            image: pic6,
            price: 32.00,
            isSpecial: false,
            category: "Cymbidium",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 7,
            orchidName: "Paphiopedilum Spotted",
            description: "Unique spotted orchid with slipper-like shape",
            image: pic7,
            price: 45.00,
            isSpecial: true,
            category: "Paphiopedilum",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 8,
            orchidName: "Miltonia Yellow",
            description: "Cheerful yellow orchid with pansy-like flowers",
            image: pic8,
            price: 26.00,
            isSpecial: false,
            category: "Miltonia",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    ];

    // Get unique categories for filter
    const categories = [...new Set(orchids.map(orchid => orchid.category))];

    // Filter and sort orchids
    const filteredAndSortedOrchids = useMemo(() => {
        let filtered = orchids;

        // Apply filter
        if (filterCategory) {
            filtered = filtered.filter(orchid => orchid.category === filterCategory);
        }

        // Apply sort
        if (sortOption) {
            filtered = [...filtered].sort((a, b) => {
                switch (sortOption) {
                    case 'price-asc':
                        return a.price - b.price;
                    case 'price-desc':
                        return b.price - a.price;
                    case 'name-asc':
                        return a.orchidName.localeCompare(b.orchidName);
                    case 'name-desc':
                        return b.orchidName.localeCompare(a.orchidName);
                    default:
                        return 0;
                }
            });
        }

        return filtered;
    }, [orchids, filterCategory, sortOption]);

    return (
        <div className="orchid-app">
            <div className="hero-section">
                <Container fluid className="px-3 py-4">
                    <div className="text-center mb-5">
                        <h1 className="hero-title">
                            <span className="gradient-text">🌺 Orchid Collection 🌺</span>
                        </h1>
                        <p className="hero-subtitle">Discover the beauty of nature's most elegant flowers</p>
                    </div>

                    {/* Filter and Sort Component */}
                    <FilterSort 
                        categories={categories}
                        onFilterChange={handleFilterChange}
                        onSortChange={handleSortChange}
                    />

                    {/* Results count */}
                    <div className="results-info">
                        <p className="results-count">
                            Showing {filteredAndSortedOrchids.length} of {orchids.length} orchids
                        </p>
                    </div>

                    {/* Orchid Grid */}
                    <Row className="g-3 justify-content-center">
                        {filteredAndSortedOrchids.map((orchid) => (
                            <Col xl={3} lg={4} md={6} sm={12} key={orchid.id}>
                                <Card className="orchid-card h-100">
                                    <div className="card-image-wrapper">
                                        <Card.Img 
                                            variant="top" 
                                            src={orchid.image} 
                                            className="orchid-image"
                                        />
                                        {orchid.isSpecial && (
                                            <div className="special-badge">
                                                <span>⭐ Special</span>
                                            </div>
                                        )}
                                    </div>
                                    <Card.Body className="card-content">
                                        <div className="category-tag">{orchid.category}</div>
                                        <Card.Title className="orchid-name">{orchid.orchidName}</Card.Title>
                                        <Card.Text className="orchid-description">
                                            {orchid.description}
                                        </Card.Text>
                                        <div className="card-footer-content">
                                            <div className="price-section">
                                                <span className="price">${orchid.price}</span>
                                            </div>
                                            <Button 
                                                className="details-btn"
                                                onClick={() => handleShowModal(orchid)}
                                            >
                                                ✨ Details
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* No results message */}
                    {filteredAndSortedOrchids.length === 0 && (
                        <div className="no-results">
                            <div className="no-results-content">
                                <h3>🔍 No orchids found</h3>
                                <p>Try adjusting your filters or search criteria</p>
                            </div>
                        </div>
                    )}
                </Container>
            </div>

            {/* Enhanced Modal for orchid details */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered className="orchid-modal">
                <div className="modal-content-wrapper">
                    <Modal.Header closeButton className="modal-header-custom">
                        <Modal.Title className="modal-title-custom">
                            🌺 {selectedOrchid?.orchidName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body-custom">
                        {selectedOrchid && (
                            <Row>
                                <Col md={6}>
                                    <div className="modal-image-wrapper">
                                        <img 
                                            src={selectedOrchid.image} 
                                            alt={selectedOrchid.orchidName}
                                            className="modal-image"
                                        />
                                        {selectedOrchid.isSpecial && (
                                            <div className="modal-special-badge">
                                                ⭐ Special Orchid
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="modal-info">
                                        <div className="modal-category">{selectedOrchid.category}</div>
                                        <h4 className="modal-orchid-name">{selectedOrchid.orchidName}</h4>
                                        <p className="modal-description">{selectedOrchid.description}</p>
                                        <p className="modal-detailed-description">{selectedOrchid.detailedDescription}</p>
                                        <div className="modal-price-section">
                                            <span className="modal-price">${selectedOrchid.price}</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="modal-footer-custom">
                        <Button 
                            onClick={handleCloseModal}
                            className="modal-close-btn"
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
}

export default ListOrchid;