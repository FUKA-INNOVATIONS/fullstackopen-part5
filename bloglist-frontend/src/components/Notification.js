const ErrorNotification = ( { message } ) => {
  if ( message === null ) {
    return null;
  }

  return (
      <div style={ errorStyle }>
        { message }
      </div>
  );
};

const SuccessNotification = ( { message } ) => {
  if ( message === null ) {
    return null;
  }

  return (
      <div style={ successStyle }>
        { message }
      </div>
  );
};

const successStyle = {
  color: 'green',
  fontSize: 20,
  borderStyle: 'solid',
  padding: 10,
};

const errorStyle = {
  color: 'red',
  fontSize: 20,
  borderStyle: 'solid',
  padding: 10,
};

export  {SuccessNotification, ErrorNotification};