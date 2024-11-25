import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import "bootstrap/dist/css/bootstrap.min.css";

function Selection() {
  const content = [
    {
      id: 5,
      title: "The Shawshank Redemption",
      genre: "Drama",
      synopsis:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      year: 1994,
      popularity: 9.3,
      image:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTRQY22fAfc4eI-8Fpg12E7d7O68wz0uqJvXHunh8l3Xbg1T6Np",
    },
  ];

  const Date = () => {
    return <input type="date" />;
  };

  // rating state
  const [rating, setRating] = useState(0);

  return (
    <div>
      {/* content display*/}
      <div className="card">
        <img src={content[0].image} alt="movie image" height={(300, 300)} />
        <h5 className="card-title">{content[0].title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{content[0].genre}</h6>
        <p className="card-text">{content[0].synopsis}</p>
        <p className="card-text">Year: {content[0].year}</p>
        <p className="card-text">Popularity: {content[0].popularity}</p>
        <form>
          <div className="form-group">
            <label for="name">Name</label>
            <textarea className="form-control" id="name" rows={1}></textarea>
          </div>
          <div className="form-group">
            <label for="date">Date</label>
            <Date />
          </div>
          <div className="form-group">
            <label for="review">Review</label>
            <textarea
              className="form-control"
              id="review"
              required
              rows="3"
            ></textarea>
          </div>
          <div className="form-group">
            <label for="rating">Rating</label>
            <Rating onClick={(rate) => setRating(rate)} ratingValue={rating} />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      {/* display the review and rating*/}
    </div>
  );
}

export default Selection;
