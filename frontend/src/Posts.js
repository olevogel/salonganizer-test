import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';

function Posts() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const [updatedPost, setUpdatedPost] = useState({})

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deletePost = (id) => {
        console.log(id)

        axios.delete(`/delete/${id}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        
        window.location.reload()
    }

    const updatePost = (post) => {
        setUpdatedPost(post)
        handleShow()
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target

        setUpdatedPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const saveUpdatedPost = () => {
        axios.put(`/update/${updatedPost._id}`, updatedPost)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })

        handleClose()
        window.location.reload()
    }

    useEffect(() => {
        axios.get("/posts")
            .then((res) => {
                setPosts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div style={{width: "90%", margin: "auto auto", textAlign: "center"}}>
            <h1>Posts page</h1>
            <Button variant="outline-dark" style={{width: "100%", borderRadius: "8px", marginBottom: "1rem"}}
                onClick={() => navigate(-1)}>
                Back
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update a post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control style={{marginBottom:"1rem"}} placeholder="title" name="title"
                             value={updatedPost.title ? updatedPost.title : ""}
                             onChange={handleChange}/>
                            <Form.Control placeholder="description" name="description" 
                            value={updatedPost.description ? updatedPost.description : ""}
                            onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveUpdatedPost}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {posts ? (
                <>
                    {posts.map((post) => {
                        return(
                            <div key={post._id} style={{border: "solid lightgray 1px", borderRadius: "8px", marginBottom: "1rem", padding: "1rem"}}>
                                <h4>{post.title}</h4>
                                <p>{post.description}</p>
                                <div style={{display: "flex", flexDirection:"row", justifyContent: "space-between"}}>
                                    <Button onClick={() => updatePost(post)} variant="outline-info" style={{width: "100%", marginRight: "1rem"}}>Update</Button>
                                    <Button onClick={() => {
                                        deletePost(post._id)
                                    }} 
                                    variant="outline-danger" style={{width: "100%"}}>Delete</Button>
                                </div>
                            </div>
                        )
                    })}
                </>
            ) : ""}
        </div>
    )
}

export default Posts