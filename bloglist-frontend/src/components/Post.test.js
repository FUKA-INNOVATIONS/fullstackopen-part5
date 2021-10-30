import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Post from './Post'

test('renders post title and author name in header title', () => {
  const post = {
    title: 'Dummy post title for testing',
    author: 'Dummy author',
    url: 'www.dummy.com'
  }
  const component = render(
    <Post post={post} />
  )
  const postElement = component.container.querySelector('.post')
  expect(postElement).toHaveTextContent(
    'Dummy post title for testing by Dummy author'
  )
})

test('url and likes are hidden by default', () => {
  const post = {
    title: 'Dummy post title for testing',
    author: 'Dummy author',
    url: 'www.dummy.com'
  }
  const component = render(
    <Post post={post} />
  )
  const postDetails = component.container.querySelector('.post-details')
  expect(postDetails).toHaveStyle('display: none')
})