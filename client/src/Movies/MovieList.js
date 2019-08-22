import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import Styled from 'styled-components'
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


    const ButtonDiv = Styled.div `
      display: flex;
      margin: auto;
      flex-direction: column;
    `

    const Button = Styled.button `
    border: 1px solid grey;
    padding: 5px 10px;
    background-color: lightseagreen;
    width: 120px;
    margin: 10px auto 20px auto;
`

    console.log(this.state.movies)
    return (
      <ButtonDiv>
          <Button onClick = {(this.addMovie)}>Add Movie</Button>
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
        
      </ButtonDiv>
    
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
