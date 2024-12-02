import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Button,
  Form,
  ListGroup,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// home page component
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [filteredContent, setFilteredContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("popularity");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minRating, setMinRating] = useState(0);

  // dummy content until api implementation
  const content = [
    {
      id: 1,
      title: "The Dark Knight",
      genre: "Action, Crime, Drama",
      synopsis:
        "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      year: 2008,
      popularity: 9.0,
    },
    {
      id: 2,
      title: "Forrest Gump",
      genre: "Drama, Romance",
      synopsis:
        "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an extraordinary life.",
      year: 1994,
      popularity: 8.8,
    },
    {
      id: 3,
      title: "The Matrix",
      genre: "Action, Sci-Fi",
      synopsis:
        "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      year: 1999,
      popularity: 8.7,
    },
    {
      id: 4,
      title: "Inception",
      genre: "Action, Adventure, Sci-Fi",
      synopsis:
        "A thief who enters the dreams of others to steal secrets from their subconscious is given the inverse task of planting an idea into the mind of a CEO.",
      year: 2010,
      popularity: 8.8,
    },
    {
      id: 5,
      title: "The Shawshank Redemption",
      genre: "Drama",
      synopsis:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      year: 1994,
      popularity: 9.3,
    },
    {
      id: 6,
      title: "13th",
      genre: "Documentary, History",
      synopsis:
        "An in-depth look at the prison system in the United States and how it reveals the nation's history of racial inequality.",
      year: 2016,
      popularity: 8.2,
    },
    {
      id: 7,
      title: "Won’t You Be My Neighbor?",
      genre: "Documentary, Biography",
      synopsis:
        "Fred Rogers used puppets and songs to explore complex social issues with kindness and compassion.",
      year: 2018,
      popularity: 8.4,
    },
    {
      id: 8,
      title: "My Octopus Teacher",
      genre: "Documentary, Adventure",
      synopsis:
        "A filmmaker forges an unusual friendship with an octopus living in a South African kelp forest, learning life lessons along the way.",
      year: 2020,
      popularity: 8.1,
    },
    {
      id: 9,
      title: "Free Solo",
      genre: "Documentary, Sport",
      synopsis:
        "A rock climber attempts to climb El Capitan without ropes or safety gear.",
      year: 2018,
      popularity: 8.2,
    },
    {
      id: 10,
      title: "The Social Dilemma",
      genre: "Documentary, Drama, Tech",
      synopsis:
        "Explores the dangerous human impact of social networking, with tech experts sounding the alarm on their own creations.",
      year: 2020,
      popularity: 7.6,
    },
  ];

  // Extract unique genres
  const allGenres = Array.from(
    new Set(content.flatMap((item) => item.genre.split(", ")))
  );

  const getRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * content.length);
    return content[randomIndex];
  };

  useEffect(() => {
    setFilteredContent(content);
    setLoading(false);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const suggestions = content
        .filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
        .map((item) => item.title);
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  useEffect(() => {
    let updatedContent = content.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOption === "popularity") {
      updatedContent = updatedContent.sort(
        (a, b) => b.popularity - a.popularity
      );
    } else if (sortOption === "year") {
      updatedContent = updatedContent.sort((a, b) => b.year - a.year);
    } else if (sortOption === "genre") {
      updatedContent = updatedContent.sort((a, b) =>
        a.genre.localeCompare(b.genre)
      );
    }

    if (selectedGenres.length > 0) {
      updatedContent = updatedContent.filter((item) =>
        selectedGenres.some((genre) => item.genre.includes(genre))
      );
    }

    updatedContent = updatedContent.filter(
      (item) => item.popularity >= minRating
    );

    setFilteredContent(updatedContent);
  }, [searchQuery, sortOption, selectedGenres, minRating]);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setFilteredSuggestions([]);
  };

  const randomMovie = getRandomMovie();

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12} className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search for movies, TV shows, documentaries..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {filteredSuggestions.length > 0 && (
            <ListGroup
              className="mt-2"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {filteredSuggestions.map((suggestion, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={12} className="mb-4">
          <Button
            variant="outline-primary"
            className="mr-2"
            onClick={() => setSortOption("popularity")}
          >
            Sort by Popularity
          </Button>
          <Button
            variant="outline-primary"
            className="mr-2"
            onClick={() => setSortOption("year")}
          >
            Sort by Year
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => setSortOption("genre")}
          >
            Sort by Genre
          </Button>
        </Col>
        <Col md={12} className="mb-4">
          <h5>Filter by Genre</h5>
          {allGenres.map((genre) => (
            <Form.Check
              key={genre}
              type="checkbox"
              label={genre}
              onChange={() => handleGenreChange(genre)}
              checked={selectedGenres.includes(genre)}
            />
          ))}
        </Col>
        <Col md={12} className="mb-4">
          <h5>Filter by Rating</h5>
          <InputGroup>
            <Form.Control
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            />
            <InputGroup.Text>{minRating}</InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>

      {/* Recommended for You Section */}
      <Row className="mb-4">
        <Col md={12}>
          <h3>Recommended for You!</h3>
          <Card className="bg-secondary text-white">
            <Link to={`/selection/${randomMovie.id}`}>
              <Card.Img
                variant="top"
                src={`https://via.placeholder.com/150x200?text=${randomMovie.title}`}
                style={{
                  objectFit: "cover",
                  height: "300px",
                  borderRadius: "10px",
                }}
              />
              <Card.Body>
                <Card.Title>{randomMovie.title}</Card.Title>
                <Card.Text>{randomMovie.synopsis}</Card.Text>
                <Button variant="primary">See More</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      </Row>

      {/* Filtered Content Section */}
      {loading ? (
        <Row>
          <Col className="text-center">
            <Spinner animation="border" />
          </Col>
        </Row>
      ) : (
        <Row>
          {filteredContent.map((item) => (
            <Col md={4} key={item.id} className="mb-4">
              <Card>
                <Link to={`/selection/${item.id}`}>
                  <Card.Img
                    variant="top"
                    src={`https://via.placeholder.com/150x200?text=${item.title}`}
                    style={{ objectFit: "cover", height: "300px" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.synopsis}</Card.Text>
                    <Button variant="primary">See More</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
