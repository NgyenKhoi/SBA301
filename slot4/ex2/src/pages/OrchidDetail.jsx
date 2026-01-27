import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';
import pic1 from '../assets/pic1.jpg';
import pic2 from '../assets/pic2.jpg';
import pic3 from '../assets/pic3.jpg';
import pic4 from '../assets/pic4.jpg';
import pic5 from '../assets/pic5.jpg';
import pic6 from '../assets/pic6.jpg';
import pic7 from '../assets/pic7.jpg';
import pic8 from '../assets/pic8.jpg';

function OrchidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const orchids = [
    {
      id: 1,
      orchidName: "Dendrobium Nobile",
      description: "Beautiful purple orchid with delicate petals",
      image: pic1,
      price: 25.00,
      isSpecial: true,
      category: "Dendrobium",
      detailedDescription: "Dendrobium Nobile là một loài lan đẹp với những cánh hoa màu tím tinh tế. Đây là một trong những loài lan phổ biến nhất trong việc trồng trong nhà. Hoa có thể nở trong nhiều tháng và có hương thơm nhẹ nhàng. Loài lan này có nguồn gốc từ Himalaya và các vùng núi cao ở Đông Nam Á."
    },
    {
      id: 2,
      orchidName: "Phalaenopsis Pink",
      description: "Elegant pink orchid perfect for home decoration",
      image: pic2,
      price: 30.00,
      isSpecial: false,
      category: "Phalaenopsis",
      detailedDescription: "Phalaenopsis Pink là loài lan hồ điệp màu hồng thanh lịch, hoàn hảo cho việc trang trí nhà cửa. Hoa có thể nở liên tục trong nhiều tháng và rất dễ chăm sóc. Đây là lựa chọn tuyệt vời cho người mới bắt đầu trồng lan."
    },
    {
      id: 3,
      orchidName: "Cattleya Orange",
      description: "Vibrant orange orchid with stunning blooms",
      image: pic3,
      price: 35.00,
      isSpecial: true,
      category: "Cattleya",
      detailedDescription: "Cattleya Orange là loài lan màu cam rực rỡ với những bông hoa tuyệt đẹp. Được biết đến như 'Nữ hoàng của các loài lan' với hương thơm đặc trưng và vẻ đẹp quyến rũ. Hoa có kích thước lớn và màu sắc rực rỡ."
    },
    {
      id: 4,
      orchidName: "Oncidium Yellow",
      description: "Bright yellow orchid with multiple flowers",
      image: pic4,
      price: 28.00,
      isSpecial: false,
      category: "Oncidium",
      detailedDescription: "Oncidium Yellow là loài lan màu vàng tươi với nhiều bông hoa nhỏ trên một cành. Được gọi là 'Dancing Lady Orchid' vì hình dáng đặc biệt của hoa giống như một người phụ nữ đang nhảy múa."
    },
    {
      id: 5,
      orchidName: "Vanda Green",
      description: "Exotic green orchid with unique patterns",
      image: pic5,
      price: 40.00,
      isSpecial: true,
      category: "Vanda",
      detailedDescription: "Vanda Green là loài lan xanh kỳ lạ với những họa tiết độc đáo. Đây là loài lan khí sinh, có thể trồng mà không cần đất, chỉ cần độ ẩm cao. Rễ của chúng có thể hấp thụ nước và chất dinh dưỡng từ không khí."
    },
    {
      id: 6,
      orchidName: "Cymbidium Purple",
      description: "Classic purple orchid with long-lasting blooms",
      image: pic6,
      price: 32.00,
      isSpecial: false,
      category: "Cymbidium",
      detailedDescription: "Cymbidium Purple là loài lan tím cổ điển với hoa nở lâu. Thích hợp với khí hậu mát mẻ và có thể nở hoa trong mùa đông. Đây là loài lan được ưa chuộng trong các dịp lễ tết."
    },
    {
      id: 7,
      orchidName: "Paphiopedilum Spotted",
      description: "Unique spotted orchid with slipper-like shape",
      image: pic7,
      price: 45.00,
      isSpecial: true,
      category: "Paphiopedilum",
      detailedDescription: "Paphiopedilum Spotted là loài lan chấm bi độc đáo với hình dáng giống như chiếc dép. Được gọi là 'Lady Slipper Orchid' với vẻ đẹp kỳ lạ và quyến rũ. Hoa có tuổi thọ rất lâu và màu sắc độc đáo."
    },
    {
      id: 8,
      orchidName: "Miltonia Yellow",
      description: "Cheerful yellow orchid with pansy-like flowers",
      image: pic8,
      price: 26.00,
      isSpecial: false,
      category: "Miltonia",
      detailedDescription: "Miltonia Yellow là loài lan màu vàng vui tươi với hoa giống như hoa pansy. Có hương thơm dễ chịu và thích hợp trồng trong nhà. Được gọi là 'Pansy Orchid' vì hình dáng đặc biệt."
    }
  ];

  const orchid = orchids.find(o => o.id === parseInt(id));

  if (!orchid) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <h4>⚠️ Orchid Not Found</h4>
          <p>The orchid you're looking for doesn't exist or may have been removed.</p>
          <Button variant="primary" onClick={() => navigate('/orchids')}>
            Back to Orchid List
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={6} className="mb-4">
          <Card className="border-0 shadow-lg">
            <div className="position-relative">
              <Card.Img 
                variant="top" 
                src={orchid.image} 
                alt={orchid.orchidName}
                style={{ 
                  height: '400px', 
                  objectFit: 'cover',
                  borderRadius: '15px'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                }}
              />
              {orchid.isSpecial && (
                <div className="position-absolute top-0 end-0 m-3">
                  <Badge bg="warning" className="fs-6 p-2">
                    ⭐ Special Orchid
                  </Badge>
                </div>
              )}
            </div>
          </Card>
        </Col>
        
        <Col md={6}>
          <div className="h-100 d-flex flex-column">
            <div className="mb-3">
              <Badge bg="secondary" className="mb-2">
                {orchid.category}
              </Badge>
              <h1 className="display-5 fw-bold text-primary mb-3">
                {orchid.orchidName}
              </h1>
            </div>
            
            <div className="mb-4">
              <h5 className="text-muted mb-3">Description</h5>
              <p className="lead">{orchid.description}</p>
            </div>
            
            <div className="mb-4 flex-grow-1">
              <h5 className="text-muted mb-3">Detailed Information</h5>
              <p className="text-justify">{orchid.detailedDescription}</p>
            </div>
            
            <div className="mt-auto">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="text-success mb-0">
                    ${orchid.price}
                  </h3>
                  <small className="text-muted">Price per plant</small>
                </div>
                {orchid.isSpecial && (
                  <Badge bg="warning" className="fs-6 p-2">
                    ⭐ Special Offer
                  </Badge>
                )}
              </div>
              
              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="fw-bold"
                >
                  🛒 Add to Cart
                </Button>
                <Button 
                  variant="outline-secondary"
                  onClick={() => navigate('/orchids')}
                >
                  ← Back to Orchid List
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      
      {/* Additional Information Section */}
      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">🌱 Care Instructions</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <h6>💧 Watering</h6>
                  <p className="small text-muted">
                    Water when the potting medium is almost dry. Avoid overwatering.
                  </p>
                </Col>
                <Col md={4}>
                  <h6>☀️ Light</h6>
                  <p className="small text-muted">
                    Bright, indirect light. Avoid direct sunlight which can burn the leaves.
                  </p>
                </Col>
                <Col md={4}>
                  <h6>🌡️ Temperature</h6>
                  <p className="small text-muted">
                    Maintain temperature between 65-80°F (18-27°C) during the day.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrchidDetail;