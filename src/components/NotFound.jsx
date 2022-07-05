import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return(
      <div className='d-flex align-items-center justify-content-center flex-column'>
        <h1 className='text-center mt-5'>404 | Not Found!</h1>
        <button className='btn btn-primary mt-4' onClick={() => navigate(-1)}>Go Back</button>
      </div>
  );
}
