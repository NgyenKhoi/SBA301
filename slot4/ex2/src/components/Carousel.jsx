import { Carousel as BootstrapCarousel, Image } from 'react-bootstrap';
import banners from '../data/banner';

function CarouselComponent() {
  return (
    <BootstrapCarousel fade interval={3000} className="mb-5">
      {banners.map((banner) => (
        <BootstrapCarousel.Item key={banner.id}>
          <Image
            className="d-block w-100"
            src={banner.image}
            alt={banner.title}
            style={{ objectFit: 'cover', maxHeight: '450px' }}
          />
          <BootstrapCarousel.Caption style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '10px' }}>
            <h3>{banner.title}</h3>
            <p>{banner.description}</p>
          </BootstrapCarousel.Caption>
        </BootstrapCarousel.Item>
      ))}
    </BootstrapCarousel>
  );
}

export default CarouselComponent;