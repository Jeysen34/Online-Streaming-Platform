import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Button, Form, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// home page component
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [filteredContent, setFilteredContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('popularity');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  
  // dummy content until api implementation
  const content = [
    { id: 1, title: "The Dark Knight", genre: "Action, Crime, Drama", synopsis: "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.", year: 2008, popularity: 9.0 },
    { id: 2, title: "Forrest Gump", genre: "Drama, Romance", synopsis: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an extraordinary life.", year: 1994, popularity: 8.8 },
    { id: 3, title: "The Matrix", genre: "Action, Sci-Fi", synopsis: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", year: 1999, popularity: 8.7 },
    { id: 4, title: "Inception", genre: "Action, Adventure, Sci-Fi", synopsis: "A thief who enters the dreams of others to steal secrets from their subconscious is given the inverse task of planting an idea into the mind of a CEO.", year: 2010, popularity: 8.8 },
    { id: 5, title: "The Shawshank Redemption", genre: "Drama", synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", year: 1994, popularity: 9.3 },
    { id: 6, title: "13th", genre: "Documentary, History", synopsis: "An in-depth look at the prison system in the United States and how it reveals the nation's history of racial inequality.", year: 2016, popularity: 8.2 },
    { id: 7, title: "Won’t You Be My Neighbor?", genre: "Documentary, Biography", synopsis: "Fred Rogers used puppets and songs to explore complex social issues with kindness and compassion.", year: 2018, popularity: 8.4 },
    { id: 8, title: "My Octopus Teacher", genre: "Documentary, Adventure", synopsis: "A filmmaker forges an unusual friendship with an octopus living in a South African kelp forest, learning life lessons along the way.", year: 2020, popularity: 8.1 },
    { id: 9, title: "Free Solo", genre: "Documentary, Sport", synopsis: "A rock climber attempts to climb El Capitan without ropes or safety gear.", year: 2018, popularity: 8.2 },
    { id: 10, title: "The Social Dilemma", genre: "Documentary, Drama, Tech", synopsis: "Explores the dangerous human impact of social networking, with tech experts sounding the alarm on their own creations.", year: 2020, popularity: 7.6 },
  ];
  
  useEffect(() => {
    // show all content on initial load
    setFilteredContent(content);
    setLoading(false);
  }, []);

  // handle search query change and auto complete
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // filter suggestions based on search query
    if (query.length > 0) {
      const suggestions = content.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      ).map(item => item.title);
      // show suggestions
      setFilteredSuggestions(suggestions);
    } else {
      // hide remaining suggestions
      setFilteredSuggestions([]);
    }
  };

  // filter and sort the content based on search query and selected option
  useEffect(() => {
    // filter content based on search query
    let updatedContent = content.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // sort content based on selected toggle option
    if (sortOption === 'popularity') {
      updatedContent = updatedContent.sort((a, b) => b.popularity - a.popularity);
    } else if (sortOption === 'year') {
      updatedContent = updatedContent.sort((a, b) => b.year - a.year);
    } else if (sortOption === 'genre') {
      updatedContent = updatedContent.sort((a, b) => a.genre.localeCompare(b.genre));
    }

    // update the filtered content
    setFilteredContent(updatedContent);
  }, [searchQuery, sortOption]);

  // handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    // update search query
    setSearchQuery(suggestion);
    // hide suggestions
    setFilteredSuggestions([]);
  };

  return (
    <>
      {/* content */}
      <Container className="mt-4">
        <Row>
          <Col md={12} className="mb-4">
            {/* search bar with auto complete */}
            <Form.Control
              type="text"
              placeholder="Search for movies, TV shows, documentaries..."
              value={searchQuery}
              onChange={handleSearchChange} // handle search query change
            />
            
            {/* auto complete suggestions */}
            {filteredSuggestions.length > 0 && (
              <ListGroup className="mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
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
            {/* filter buttons */}
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => setSortOption('popularity')} // handle sort by popularity
            >
              Sort by Popularity
            </Button>
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => setSortOption('year')} // handle sort by year
            >
              Sort by Year
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => setSortOption('genre')} // handle sort by genre
            >
              Sort by Genre
            </Button>
          </Col>
        </Row>

        {/* displaying content */}
        <Row>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="light" />
              <p>Loading...</p>
            </div>
          ) : (
            filteredContent.map((item) => (
              <Col md={3} sm={6} xs={12} key={item.id} className="mb-4">
                <Card className="bg-secondary text-white">
                  <Card.Img
                    variant="top"
                    src={`https://via.placeholder.com/200x300?text=${item.title}`}
                    alt={item.title}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text><strong>Genre:</strong> {item.genre}</Card.Text>
                    <Card.Text><strong>Year:</strong> {item.year}</Card.Text>
                    <Card.Text><strong>Rating:</strong> {item.popularity}</Card.Text>
                    <Card.Text>{item.synopsis}</Card.Text>
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