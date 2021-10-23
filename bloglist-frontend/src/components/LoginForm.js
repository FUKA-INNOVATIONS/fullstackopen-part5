const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {

  return (
      <>
        <h3>Log in to application</h3>
        <form onSubmit={handleLogin}>
          <>
            Username <br />
            <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
          </>
          <div>
            Password<br />
            <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
  )

}

export default LoginForm