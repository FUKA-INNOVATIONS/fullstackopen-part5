import React, { useState, useEffect, useRef } from 'react'
import Post from './components/Post'
import blogService from './services/blogService'
import Footer from './components/Footer'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
import { SuccessNotification, ErrorNotification, } from './components/Notification'
import Togglable from './components/Togglable';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const postFormRef = useRef()
  const [postDeleted, setPostDeleted] = useState(false)
  const [postLiked, setPostLiked] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user !== null) {
      const postsWithOwnership = posts.map(post => {
        return {
          ...post,
          isOwner: (user.username === post.user.username)
        }
      })
      console.log(postsWithOwnership);
      setPosts(postsWithOwnership)
    }
  }, [user, postLiked, postDeleted])

  useEffect(() => {
    blogService
    .getAll().then(initialPosts => {
      // Sort posts by most likes
      initialPosts.sort((a, b) => {
        return b.likes - a.likes
      }).map(post => {
        if (user !== null) {
          post.isOwner = (user.username === post.user.username)
        }
      })

      setPosts(initialPosts)
    })
    setPostDeleted(false)
    setPostLiked(false)
  }, [postDeleted, postLiked])


  if (user !== null) {
    const postsWithOwnership = posts.map(post => {
      return {
        ...post,
        isOwner: (user.username === post.user.username)
      }
    })
    console.log(postsWithOwnership);
    //setPosts(postsWithOwnership)
  }


  const showMessage = ( newMessage, type ) => {
    type === 'success' ? setSuccessMessage( newMessage ) : setErrorMessage(
        newMessage )
    setTimeout( () => {
      setErrorMessage( null )
      setSuccessMessage( null )
    }, 5000 )
  }

  const addPost = async (newPost) => {
    console.log('addPost called');
    postFormRef.current.toggleVisibility()

    try {
      const postCreated = await blogService.create(newPost)
      console.log('postCreated: ', postCreated);
      showMessage(`a new blog ${postCreated.title} by ${postCreated.author} added`, 'success')
      setPosts(posts.concat(postCreated))
    } catch ( exception ) {
      showMessage('Creation of new blog post failed!', 'error')
    }
  }

  const likePost = async (postId, currentLikes) => {
    const likeIncremented = currentLikes + 1
    await axios.put(`/api/posts/${postId}`, {likes: likeIncremented})
    setPostLiked(true)
  }

  const deletePost = async (postId, postTitle, postAuthor) => {
    const token = user.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
      try {
        await axios.delete(`api/posts/${postId}`, config)
        showMessage('Post successfully deleted!', 'success')
        setPostDeleted(true)
      } catch (exception) {
        showMessage('Post deletion failed!', 'error')
      }
  }


  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async (username, password) => {
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
    } catch (exception) {
      showMessage('Login failed!', 'error')
    }
  }

  const loginForm = () => {
    return (
        <Togglable buttonLabel={'Login'}>
          <LoginForm
              handleLogin={handleLogin}
          />
        </Togglable>
    )
  }


  const postForm = () => {
    return (
        <Togglable buttonLabel={'Create new post'} ref={postFormRef}>
          <PostForm
              createPost={addPost}
              token={user.token}
          />
        </Togglable>
    )
  }


  const notificationContent = successMessage
      ? <SuccessNotification message={successMessage} />
      : <ErrorNotification message={errorMessage} />

  return (
      <div>
        { notificationContent }

        {user === null ?
            loginForm()
             :
            <div>
              <p>{user.username} logged in <button onClick={handleLogout}>Logout</button></p>

              {postForm()}

              <div>
                <h2>Blog posts</h2>
                <ul style={ulStyle}>
                  {posts.map(post =>
                      <Post key={post.id}
                            useername={user.username}
                            post={post}
                            deletePost={deletePost}
                            likePost={likePost} />
                  )}
                </ul>
              </div>

            </div>
        }

        <Footer />
      </div>
  )
}

const ulStyle = {
  listStyleType: 'none',
}


export default App