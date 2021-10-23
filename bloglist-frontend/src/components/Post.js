import React from 'react'
const Post = ({post}) => (
  <li key={post.id}>
    {post.title} <em>by</em> {post.author}
  </li>
)

export default Post