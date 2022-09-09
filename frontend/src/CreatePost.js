import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function CreatePost() {
    const navigate = useNavigate()

    const [post, setPost] = useState({
        title: "",
        description:"",
    })

    const handleChange = (event) => {
        const {name, value} = event.target

        setPost(prev => {
            return {
                ...prev, 
                [name]: value,
            }
        })
    }

    const handleClick = (event) => {
        event.preventDefault()
        axios.post("/create", post)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

        navigate("posts")
    }

    return(
        <div style={{width: "90%", margin: "auto auto", textAlign: "center"}}>
            <h1>Create a Post</h1>
            <Form>
                <Form.Group>
                    <Form.Control 
                        style={{marginBottom: "1rem"}} 
                        value={post.title}
                        name="title" 
                        placeholder="Title"
                        onChange={handleChange}/>
                    <Form.Control 
                        style={{marginBottom: "1rem"}} 
                        value={post.description}
                        name="description" 
                        placeholder="Description"
                        onChange={handleChange}/>
                </Form.Group>
                <Button 
                    variant='outline-success'
                    style={{width: "100%", marginBottom: "1rem"}} 
                    onClick={handleClick}>Create Post</Button>
            </Form>
            <Button 
                variant='outline-dark'
                style={{width: "100%"}} 
                onClick={() => {
                    navigate(-1)
            }}>Back</Button>
        </div>
    )
}

export default CreatePost