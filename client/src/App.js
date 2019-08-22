import React, { useState } from "react";
import UpdateMovie from "./Movies/Updatemovie.js"
import {Route} from "react-router-dom"
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movie, setMovie] = useState(null);
  console.log(savedList)
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  
  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} movie = {movie} setMovie ={setMovie}/>;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateMovie {...props} updateMovie = {setMovie} movie = {movie}/>;
        }}
      />  
    </>  
  );
};

export default App;
