import { Form, Row, Col, InputGroup } from 'react-bootstrap';

function SearchFilter({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy,
  categories 
}) {
  return (
    <Row className="mb-4">
      <Col md={4}>
        <InputGroup>
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm lan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Col>
      
      <Col md={4}>
        <Form.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Tất cả danh mục</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </Form.Select>
      </Col>
      
      <Col md={4}>
        <Form.Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sắp xếp theo tên</option>
          <option value="price-low">Giá: Thấp đến cao</option>
          <option value="price-high">Giá: Cao đến thấp</option>
          <option value="special">Sản phẩm đặc biệt</option>
        </Form.Select>
      </Col>
    </Row>
  );
}

export default SearchFilter;