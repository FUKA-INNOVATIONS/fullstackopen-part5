import React, { useState } from 'react'

const PostForm = ({ createPost }) => {
      const [newTitle, setNewTitle] = useState('')
      const [newAuthor, setNewAuthor] = useState('')
      const [newUrl, setNewUrl] = useState('')
      const [newPost, setNewPost] = useState({})


      const handleTitleChange = (event) => {
            setNewTitle(event.target.value)
            setNewPost({...newPost, title: event.target.value})
      }

      const handleAuthorChange = event => {
            setNewAuthor(event.target.value)
            setNewPost({...newPost, author: event.target.value})
      }

      const handleUrlChange = event => {
            setNewUrl(event.target.value)
            setNewPost({...newPost, url: event.target.value})
      }

      const addPost = (event) => {
        event.preventDefault()
        createPost(newPost)
        setNewTitle(''); setNewAuthor(''); setNewUrl('')
        setNewPost({})
      }

      return (
      <form onSubmit={addPost}>
        <label htmlFor="title">Title:</label><br />
        <input
            type={'text'}
            onChange={handleTitleChange}
            value={newTitle}
        />
        <br />

        <label htmlFor="author">Author:</label><br />
        <input
            type={'text'}
            onChange={handleAuthorChange}
            value={ newAuthor }
        />
        <br />

        <label htmlFor="url">Url:</label><br />
        <input
            type={'text'}
            onChange={handleUrlChange}
            value={ newUrl }
        />
        <br />

        <button type="submit">save</button>
      </form>
  )
}

export default PostForm