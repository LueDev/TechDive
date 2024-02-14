import React from 'react';
import { Link } from 'react-router-dom'
import "./NotFound.css"

const NotFound = () => {
  return (
    <div id='notFound-Div'>
      <h1>Page Not Found</h1>

      <h3>Navigate to the <Link to="/">Home Page</Link></h3>
    </div>
  );
};

export default NotFound;
