// HomePage.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'; 
import Footer from './Footer'; 

const HomePage = () => {
  const [loading, setLoading] = useState(false);

  // replace with API call later
  const content = [
    { id: 1, title: "Movie Title 1", image: "https://via.placeholder.com/200x300", rating: 8.5 },
    { id: 2, title: "Movie Title 2", image: "https://via.placeholder.com/200x300", rating: 7.0 },
    { id: 3, title: "Movie Title 3", image: "https://via.placeholder.com/200x300", rating: 9.1 },
    { id: 4, title: "Movie Title 4", image: "https://via.placeholder.com/200x300", rating: 6.4 },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      
      {/* Content */}
      <Container>
        <Row>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="light" />
              <p>Loading...</p>
            </div>
          ) : (
            content.map((item) => (
              <Col md={3} sm={6} xs={12} key={item.id} className="mb-4">
                <Card className="bg-secondary text-white">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={item.title}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>Rating: {item.rating}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

    </>
  );
};

export default HomePage;
