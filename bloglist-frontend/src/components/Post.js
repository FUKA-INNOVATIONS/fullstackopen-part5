import React, { useState } from 'react'
import Proptypes from 'prop-types'

const Post = ( { post, deletePost, likePost } ) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async (postId, currentLikes) => {
    await likePost(postId, currentLikes)
  }


  const handleDelete = async (postId) => {
    const deleteConfirmed = window.confirm(`Remove ${post.title} by ${post.author} ?`)
    if (deleteConfirmed) {
      await deletePost(postId)
    }
  }


  return (

    <li key={ post.id }>
      <p onClick={toggleVisibility} style={postTitle}>
        { post.title } <em>by</em> { post.author }
        <button style={marginLeft} onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
      </p>


      <div style={{ ...showWhenVisible, ...listStyle }}>
        <p>Url: { post.url }</p>
        <p>Likes: { post.likes }
          <button style={marginLeft} onClick={() => handleLike(post.id, post.likes)}>Like</button>
        </p>
        <p>Author: { post.author }</p>
        {post.isOwner && <button onClick={() => handleDelete(post.id)}>Remove</button>}
      </div>
    </li>
  )
}

Post.propTypes = {
  deletePost: Proptypes.func.isRequired,
  likePost: Proptypes.func.isRequired,
  post: Proptypes.object.isRequired
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