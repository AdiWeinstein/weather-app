import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => (
  <div className='CardNotFound'>
    <div className='notFoundDetails'>
    <h1 className='notFound'>404</h1>
        <div>
        <h2>Oops!</h2>
        <p>Something went wrong</p>
    <Link className="error-btn" to="/">Back to home page</Link>
    </div>
    </div>
  </div>
);

export default NotFound;