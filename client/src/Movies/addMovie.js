import React, {useState, useEffect} from "react";
import axios from "axios";
import Styled from "styled-components";


const FormDiv = Styled.div `
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 500px;
    text-align: center;
    background-color: #fff;
    border: 0;
    box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.24);

`

const Form = Styled.form `
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    alignContent: center;

`

const InputText = Styled.input `
    width: 200px;
    margin: 10px;
    padding: 5px 10px;
    background-color: #f2f2f2;

`
const TextArea = Styled.input `
    width: 200px;
    margin: 10px;
    padding: 5px 10px;
    background-color: #f2f2f2;

`

const Button = Styled.button `
    border: 1px solid grey;
    padding: 5px 10px;
    background-color: lightseagreen;
    width: 120px;
    margin: 10px auto 20px auto;
`


const InitialMovie = {
    title: '',
    director: "",
    metascore: '',
    stars: [''],

}

const AddMovie = (props, {errors, touched}) => {
    const [addMovie, setAddMovie] = useState(InitialMovie)
    console.log(props)

    const handleChange = event => {
        setAddMovie({...addMovie, [event.target.name]: event.target.value});
    };


    const handleSubmit = event => {
        event.preventDefault();
        axios
            .post(`http://localhost:5000/api/movies/`, addMovie)
            .then(res => {
                console.log(res)
                setAddMovie(InitialMovie)
                props.history.push("/")
                })
            .catch(error => console.log(error))
    }
  

    const handleStarsChange = (index, event) => {
        const newStars = [...addMovie.stars]
        newStars[index] = event.target.value
        setAddMovie( {...addMovie, stars: newStars})
    }

    const AddActors = (event) => {
        event.preventDefault()
        setAddMovie({...addMovie, stars: [...addMovie.stars, '']})
    }
  
    

    return (
        <FormDiv>
            <h2>Add Movie</h2>
            <Form onSubmit = {handleSubmit}>
                <InputText type = "text" name = "title" placeholder="Title" onChange = {handleChange} value ={addMovie.title} />
                <InputText type = "text" name = "director" placeholder="Director" onChange = {handleChange} value ={addMovie.director}/>
                <InputText type = "text" name = "metascore" placeholder="Metascore" onChange = {handleChange} value ={addMovie.metascore}/>
                {addMovie.stars.map((star, index) => <TextArea key ={index} type = "text" name = "stars" placeholder="Stars" onChange = {event => handleStarsChange(index, event)} value ={addMovie.stars[index]}/> )}
                <Button onClick = {AddActors}>Add Actor</Button>
                <Button type="submit">Update</Button>


            </Form>
        </FormDiv>
    )
}

export default AddMovie