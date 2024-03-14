import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

function NotFound() {
  return (
    <>
      <h1>Oops!</h1>
      <h2>404 - Page Not Found</h2>
      <p>We can&apos;t seem to find the page you&apos;re looking for.</p>
      <p>
        Let&apos;s get you back <Link to="/">home</Link>.
      </p>
    </>
  );
}

export default NotFound;
