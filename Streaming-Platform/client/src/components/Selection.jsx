import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

function Selection() {
  const content = {
    1: {
      title: "The Dark Knight",
      genre: "Action, Crime, Drama",
      synopsis:
        "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      year: 2008,
      popularity: 9.0,
      image:
        "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
      watch: "https://www.justwatch.com/us/movie/batman-the-dark-knight",
    },
    2: {
      title: "Forrest Gump",
      genre: "Drama, Romance",
      synopsis:
        "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an extraordinary life.",
      year: 1994,
      popularity: 8.8,
      image:
        "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
      watch: "https://www.justwatch.com/us/movie/forrest-gump",
    },
    3: {
      title: "The Matrix",
      genre: "Action, Sci-Fi",
      synopsis:
        "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      year: 1999,
      popularity: 8.7,
      image:
        "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
      watch: "https://www.justwatch.com/us/movie/the-matrix",
    },
    4: {
      title: "Inception",
      genre: "Action, Adventure, Sci-Fi",
      synopsis:
        "A thief who enters the dreams of others to steal secrets from their subconscious is given the inverse task of planting an idea into the mind of a CEO.",
      year: 2010,
      popularity: 8.8,
      image:
        "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
      watch: "https://www.justwatch.com/us/movie/inception",
    },
    5: {
      title: "The Shawshank Redemption",
      genre: "Drama",
      synopsis:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      year: 1994,
      popularity: 9.3,
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
      watch: "https://www.justwatch.com/us/movie/the-shawshank-redemption",
    },
    6: {
      title: "13th",
      genre: "Documentary, History",
      synopsis:
        "An in-depth look at the prison system in the United States and how it reveals the nation's history of racial inequality.",
      year: 2016,
      popularity: 8.2,
      image:
        "https://upload.wikimedia.org/wikipedia/en/6/6b/13th_%28film%29.png",
      watch: "https://www.justwatch.com/us/movie/13th",
    },
    7: {
      title: "Won’t You Be My Neighbor?",
      genre: "Documentary, Biography",
      synopsis:
        "Fred Rogers used puppets and songs to explore complex social issues with kindness and compassion.",
      year: 2018,
      popularity: 8.4,
      image:
        "https://upload.wikimedia.org/wikipedia/en/7/7d/Won%27t_You_Be_My_Neighbor%3F.png",
      watch: "https://www.justwatch.com/us/movie/wont-you-be-my-neighbor",
    },
    8: {
      title: "My Octopus Teacher",
      genre: "Documentary, Adventure",
      synopsis:
        "A filmmaker forges an unusual friendship with an octopus living in a South African kelp forest, learning life lessons along the way.",
      year: 2020,
      popularity: 8.1,
      image:
        "https://upload.wikimedia.org/wikipedia/en/0/06/My_Octopus_Teacher_poster.jpg",
      watch: "https://www.justwatch.com/us/movie/my-octopus-teacher",
    },
    9: {
      title: "Free Solo",
      genre: "Documentary, Sport",
      synopsis:
        "A rock climber attempts to climb El Capitan without ropes or safety gear.",
      year: 2018,
      popularity: 8.2,
      image: "https://upload.wikimedia.org/wikipedia/en/9/9c/Free_Solo.png",
      watch: "https://www.justwatch.com/us/movie/free-solo",
    },
    10: {
      title: "The Social Dilemma",
      genre: "Documentary, Drama, Tech",
      synopsis:
        "Explores the dangerous human impact of social networking, with tech experts sounding the alarm on their own creations.",
      year: 2020,
      popularity: 7.6,
      image:
        "https://upload.wikimedia.org/wikipedia/en/2/27/Social_dilemma_xlg.jpg",
      watch: "https://www.justwatch.com/us/movie/the-social-dilemma",
    },
  };

  const { id } = useParams();
  const media = content[id];

  const [name, setName] = useState("");

  const [review, setReview] = useState("");
  // rating state
  const [rating, setRating] = useState(0);

  // date
  const [date, setDate] = useState("");

  // submit button to show reviews
  const [submit = false, setSubmit] = useState(false);

  function handleForm(event) {
    event.preventDefault();
    // fetch request to server
    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, review, rating }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log("Review submitted");
        }
      });

    setSubmit(true);
  }

  return (
    <div>
      {/* content display*/}
      <div className="card">
        <img src={media.image} alt="movie image" height={(300, 300)} />
        <h5 className="card-title">{media.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{media.genre}</h6>
        <p className="card-text">{media.synopsis}</p>
        <p className="card-text">Year: {media.year}</p>
        <p className="card-text">Popularity: {media.popularity}</p>
        <a href={media.watch} className="card-link" target="blank">
          {" "}
          Where to Watch?
        </a>
        <br />
        <form onSubmit={handleForm}>
          <div className="title-review">
            <h3>Add a Review</h3>
          </div>
          <div className="form-group">
            <label for="name">Name</label>
            <textarea
              className="form-control"
              id="name"
              rows={1}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label for="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="review">Review</label>
            <textarea
              className="form-control"
              id="review"
              required
              rows="3"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label for="rating">Rating</label>
            <Rating
              onClick={(rate) => setRating(rate)}
              ratingValue={rating}
              onChange={(e) => setRating(e.target.value)}
              value={rating}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div>
          <div className="title-review">
            <br />
            <br />
            <h3>Reviews</h3>
          </div>
        </div>
        {/* submitting review and sending to database */}
        {submit && (
          <div>
            <h6>{name}</h6>
            <p>Date: {date}</p>
            <p>{review}</p>
            <p>Rating: {rating}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Selection;
