const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
      <div style={footerStyle} className={'footer'}>
        <br />
        <em>Blog app by FUKA 2021</em>
      </div>
  )
}

export default Footer