import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
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
      <button onClick ={() => this.props.history.push(`/update-movie/${this.props.movie.id}`)}>Edit</button>
      <button onClick = {this.deleteMovie}>Delete</button>
      </div>
    );
  }
}
