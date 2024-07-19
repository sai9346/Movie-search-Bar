import React from "react";
import "../Styles/MovieCard.css";

const MovieCard = ({ title, author, publishDate, imageUrl }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt="Dog" className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{author}</p>
        <p>{publishDate}</p>
      </div>
    </div>
  );
};

export default MovieCard;
