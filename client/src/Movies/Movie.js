import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import Styled from 'styled-components'
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   movie: null
    // };
    console.log(props)
  }
 
  
  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  
  fetchMovie = id => {
    
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res.data) 
        this.props.setMovie(res.data)
      })
      .catch(err => console.log(err.response));
  };

  deleteMovie = event => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.props.movie.id}`)
      .then(res => {
        console.log(res)
        this.props.history.push("/")
        })
      .catch(error => console.log(error))
  }


  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.props.movie);
  };


  render() {

    const EditButton = Styled.button `
    position: absolute;
    top: 25px;
    right: 95px;
    border: 1px solid grey;
    padding: 5px 10px;
    background-color: lightseagreen;
    font-size: 1rem;
    width: 58px;
    height: 30px;
    cursor: pointer;

    &:hover {
      background-color: green;
      color: white;
    }
    
    `

    const DeleteButton = Styled.button `
    position: absolute;
    top: 25px;
    right: 165px;
    border: 1px solid grey;
    padding: 5px 10px;
    background-color: lightseagreen;
    font-size: 1rem;
    width: 65px;
    height: 30px;
    cursor: pointer;

    &:hover {
      background-color: green;
      color: white;
    }
    
    `



    console.log(this.props.movie)
    if (!this.props.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.props.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
      <EditButton onClick ={() => this.props.history.push(`/update-movie/${this.props.movie.id}`)}>Edit</EditButton>
      <DeleteButton onClick = {this.deleteMovie}>Delete</DeleteButton>
      </div>
    );
  }
}
