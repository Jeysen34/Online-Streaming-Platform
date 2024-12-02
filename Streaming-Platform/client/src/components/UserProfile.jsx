import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Ibriham Hmood",
    email: "ibrihamhmood@gmail.com",
    favoriteGenre: "Drama",
    bio: "I hate coding.",
    reviews: [
      {
        id: 1,
        movieTitle: "The Dark Knight",
        rating: 5,
        review: "An absolute masterpiece! One of my favorite movies of all time.",
      },
      {
        id: 2,
        movieTitle: "Inception",
        rating: 4.5,
        review: "Complex and interesting, though a bit hard to follow at times.",
      },
    ],
  });

  const [editBio, setEditBio] = useState(false);
  const [newBio, setNewBio] = useState(user.bio);

  const handleBioEdit = () => {
    if (editBio) {
      setUser({ ...user, bio: newBio });
    }
    setEditBio(!editBio);
  };

  const handleFavoriteGenreChange = (e) => {
    setUser({ ...user, favoriteGenre: e.target.value });
  };

  const handleReviewDelete = (reviewId) => {
    const updatedReviews = user.reviews.filter((review) => review.id !== reviewId);
    setUser({ ...user, reviews: updatedReviews });
  };

  return (
    <Container className="mt-4">
      {/* Profile Information Section */}
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h3>Profile:</h3>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <p>{user.name}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <p>{user.email}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFavoriteGenre">
                  <Form.Label>Favorite Genre</Form.Label>
                  <Form.Select
                    value={user.favoriteGenre}
                    onChange={handleFavoriteGenreChange}
                  >
                    <option>Action</option>
                    <option>Drama</option>
                    <option>Comedy</option>
                    <option>Documentary</option>
                    <option>Romance</option>
                    <option>Sci-Fi</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBio">
                  <Form.Label>Bio</Form.Label>
                  {editBio ? (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={newBio}
                      onChange={(e) => setNewBio(e.target.value)}
                    />
                  ) : (
                    <p>{user.bio}</p>
                  )}
                </Form.Group>
                <Button variant="primary" onClick={handleBioEdit}>
                  {editBio ? "Save Bio" : "Edit Bio"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Reviews and Ratings Section */}
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h3>Your Reviews and Ratings</h3>
            </Card.Header>
            <Card.Body>
              {user.reviews.length > 0 ? (
                <ListGroup>
                  {user.reviews.map((review) => (
                    <ListGroup.Item key={review.id} className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5>{review.movieTitle}</h5>
                        <p>
                          <strong>Rating:</strong> {review.rating} / 5
                        </p>
                        <p>{review.review}</p>
                      </div>
                      <Button
                        variant="danger"
                        onClick={() => handleReviewDelete(review.id)}
                      >
                        Delete
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>No reviews yet.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
