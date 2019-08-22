import React, {useState, useEffect} from "react";
import axios from "axios";

const InitialMovie = {
    title: '',
    director: "",
    metascore: '',
    stars: []

}

const UpdateMovie = props => {
    const [update, setUpdate] = useState(InitialMovie)
    console.log(props)
    useEffect(() => {
        const id = props.match.params.id;
        // const findMovie = props.movie.find(movie => `${movie.id}` === id);
        if (id) setUpdate(props.movie);
    }, [props.movie, props.match.params.id])

    const handleChange = event => {
        setUpdate({...update, [event.target.name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${update.id}`, update)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }




    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit = {handleSubmit}>
                <input type = "text" name = "title" placeholder="Title" onChange = {handleChange} value ={update.title} />
                <input type = "text" name = "director" placeholder="Director" onChange = {handleChange} value ={update.director}/>
                <input type = "text" name = "metascore" placeholder="Metascore" onChange = {handleChange} value ={update.metascore}/>
                <input type = "text" name = "stars" placeholder="Stars" onChange = {handleChange} value ={update.stars}/>
                <button type="submit">Update</button>

            </form>
        </div>
    )
}

export default UpdateMovie