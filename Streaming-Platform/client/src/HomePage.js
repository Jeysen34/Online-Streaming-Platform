import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/movies`);
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Container fluid className="bg-dark text-white py-4">
      <h1 className="text-center mb-4">Discover Top Content</h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="light" />
          <p>Loading...</p>
        </div>
      ) : (
        <Row>
          {content.map((item) => (
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
                  <Card.Text>Rating: {item.rating || 'N/A'}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
