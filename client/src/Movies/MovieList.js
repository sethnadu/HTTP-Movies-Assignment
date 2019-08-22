import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        this.setState({ movies: res.data })}
        )
      .catch(err => console.log(err.response));
  }

  addMovie = event => {
    event.preventDefault();
    this.props.history.push("/add-movie")
  }

  render() {
    console.log(this.state.movies)
    return (
      <div className="movie-list">
        <button onClick = {(this.addMovie)}>Add Movie</button>
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
        
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
