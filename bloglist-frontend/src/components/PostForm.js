const PostForm = ({ titleInput, authorInput, urlInput, handleTitleChange, handleAuthorChange, handleUrlChange, addPost }) => {
  return (
      <form onSubmit={addPost}>
        <label htmlFor="title">Title:</label><br />
        <input
            type={'text'}
            onChange={(event) => handleTitleChange(event)}
            value={titleInput}
        />
        <br />

        <label htmlFor="author">Author:</label><br />
        <input
            type={'text'}
            onChange={(event) => handleAuthorChange(event)}
            value={ authorInput }
        />
        <br />

        <label htmlFor="url">Url:</label><br />
        <input
            type={'text'}
            onChange={(event) => handleUrlChange(event)}
            value={ urlInput }
        />
        <br />

        <button type="submit">save</button>
      </form>
  )
}

export default PostForm