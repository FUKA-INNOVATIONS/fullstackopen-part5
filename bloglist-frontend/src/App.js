import React, { useState, useEffect } from 'react'
import Post from './components/Post'
import blogService from './services/blogService'
import Footer from './components/Footer'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
import { SuccessNotification, ErrorNotification, } from './components/Notification'

const App = () => {
  const [posts, setPosts] = useState([])
  const [titleInput, setTitleInput] = useState('')
  const [authorInput, setAuthorInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [newPost, setNewPost] = useState({})
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
    .getAll().then(initialPosts => {
      setPosts(initialPosts)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showMessage = ( newMessage, type ) => {
    type === 'success' ? setSuccessMessage( newMessage ) : setErrorMessage(
        newMessage )
    setTimeout( () => {
      setErrorMessage( null )
      setSuccessMessage( null )
    }, 5000 )
  }

  const addPost = async (event) => {
    event.preventDefault()
    console.log('addPost called');

    const postObject = newPost

    try {
      const postCreated = await blogService.create(postObject)
      console.log('postCreated: ', postCreated);
      showMessage(`a new blog ${postCreated.title} by ${postCreated.author} added`, 'success')
      setPosts(posts.concat(postCreated))
      setTitleInput(''); setAuthorInput(''); setUrlInput('')
      setNewPost({})
    } catch ( exception ) {
      showMessage('Creation of new blog post failed!', 'error')
    }

  }

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value)
    setNewPost({...newPost, title: event.target.value})
  }

  const handleAuthorChange = event => {
    setAuthorInput(event.target.value)
    setNewPost({...newPost, author: event.target.value})
  }

  const handleUrlChange = event => {
    setUrlInput(event.target.value)
    setNewPost({...newPost, url: event.target.value})
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showMessage('Login failed!', 'error')
    }
  }

  const notificationContent = successMessage
      ? <SuccessNotification message={successMessage} />
      : <ErrorNotification message={errorMessage} />

  return (
      <div>

        { notificationContent }

        {user === null ?
            <LoginForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
            /> :
            <div>
              <p>{user.username} logged in <button onClick={handleLogout}>Logout</button></p>
              <PostForm
                  titleInput={titleInput}
                  authorInput={authorInput}
                  urlInput={urlInput}
                  handleTitleChange={handleTitleChange}
                  handleAuthorChange={handleAuthorChange}
                  handleUrlChange={handleUrlChange}
                  addPost={addPost}
              />

              <div className={'blog-posts'}>
                <h2>Blog posts</h2>
                <ul>
                  {posts.map(post =>
                      <Post key={post.id} post={post} />
                  )}
                </ul>
              </div>

            </div>
        }

        <Footer />
      </div>
  )
}

export default App