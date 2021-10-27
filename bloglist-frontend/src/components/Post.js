import React, { useState } from 'react';

const Post = ( { post, deletePost, likePost } ) => {
    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleLike = async (postId, currentLikes) => {
        await likePost(postId, currentLikes)
    }

    /* const handleLike = async (postId, currentLikes) => {
        const likeIncremented = currentLikes + 1
        await axios.put(`${baseUrl}/${postId}`, {likes: likeIncremented})
    } */

    const handleDelete = async (postId) => {
        const deleteConfirmed = window.confirm(`Remove ${post.title} by ${post.author} ?`)
        if (deleteConfirmed) {
            await deletePost(postId)
        }
    }

    /* const handleDelete = async (postId, postTitle, postAuthor) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const deleteConfirmed = window.confirm(`Remove ${postTitle} by ${postAuthor} ?`)
        if (deleteConfirmed) {
            try {
                const response = await axios.delete(`${baseUrl}/${postId}`, config)
            } catch (exception) {
                alert('Post deletion failed.')
            }
        }
    } */

    return (

        <li key={ post.id }>
            <p onClick={toggleVisibility} style={postTitle}>
                { post.title } <em>by</em> { post.author }
                <button style={marginLeft} onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
            </p>


            <div style={{...showWhenVisible, ...listStyle}}>
                <p>Url: { post.url }</p>
                <p>Likes: { post.likes }
                    <button style={marginLeft} onClick={() => handleLike(post.id, post.likes)}>Like</button>
                </p>
                <p>Author: { post.author }</p>
                <button onClick={() => handleDelete(post.id)}>Remove</button>
            </div>

        </li>
    )
}

const marginLeft = {
    marginLeft: 20
}

const postTitle = {
    fontFamily: 'Arial',
    fontWeight: 'bold'
}

const listStyle = {
    borderWidth: 2,
    borderBottom: 1,
    borderColor: 'lightgray',
    border: 'dotted',
    padding: 10
}

export default Post